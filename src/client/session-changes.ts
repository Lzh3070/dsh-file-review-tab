/**
 * Session-wide produced-file derivation from a finalized ConversationSnapshot.
 * Client-only and model-free: the vocabulary is the mutation tools' own
 * follow-along `locations` and diff views, never the closing prose. This is
 * the sidebar-tab analogue of dsh-file-review's turn-deliverables.ts: instead
 * of a ConversationNodeDefinition accumulating one turn's data for the
 * turn-tail slot, it derives EVERY in-window turn's changes from the session
 * snapshot's finalized nodes, attributing each tool result to its owning
 * turn through `turnEnds` (completed turns) or the live turn counters.
 */
import type {
  ConversationSnapshot, ToolResultNode,
} from '@deepseek-ai/dsh-client-runtime/client'
import type { ProducedFileDiff } from '../change-types.ts'

/** One changed file inside one turn, hunks appended in settlement order. */
export interface SessionFileChange {
  readonly path: string
  readonly diffs: readonly ProducedFileDiff[]
}

/** One turn's produced files, in first-seen order. */
export interface TurnFileChanges {
  readonly turn: number
  /** Whether the owning turn is still running (its change set may grow). */
  readonly live: boolean
  readonly files: readonly SessionFileChange[]
}

/**
 * Paths a call view reports having created or changed, by render intent
 * rather than tool name: a diff card, or a generic card whose kind is `edit`.
 * Mirrors dsh-file-review's producedPaths exactly (unknown-safe).
 */
export function producedPaths(view: unknown): readonly string[] {
  if (typeof view !== 'object' || view === null || Array.isArray(view)) return []
  const record = view as Record<string, unknown>
  if (record.card !== 'diff' && !(record.card === 'generic' && record.kind === 'edit')) return []
  const locations = record.locations
  if (!Array.isArray(locations)) return []
  const paths: string[] = []
  const seen = new Set<string>()
  for (const location of locations) {
    if (typeof location !== 'object' || location === null || Array.isArray(location)) continue
    const path = (location as Record<string, unknown>).path
    if (typeof path !== 'string' || seen.has(path)) continue
    seen.add(path)
    paths.push(path)
  }
  return paths
}

/** Validate diff hunks crossing the Host/browser transport (unknown-safe). */
export function producedDiffs(view: unknown): readonly ProducedFileDiff[] {
  if (typeof view !== 'object' || view === null || Array.isArray(view)) return []
  const record = view as Record<string, unknown>
  if (record.card !== 'diff' || !Array.isArray(record.diffs)) return []
  const diffs: ProducedFileDiff[] = []
  for (const value of record.diffs) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return []
    const { path, oldText, newText, oldStart, newStart } = value as Record<string, unknown>
    if (typeof path !== 'string'
      || (oldText !== null && typeof oldText !== 'string')
      || typeof newText !== 'string'
      || (oldStart !== undefined
        && (typeof oldStart !== 'number' || !Number.isInteger(oldStart) || oldStart < 1))
      || (newStart !== undefined
        && (typeof newStart !== 'number' || !Number.isInteger(newStart) || newStart < 1))) return []
    diffs.push({
      path,
      oldText,
      newText,
      ...(typeof oldStart === 'number' ? { oldStart } : {}),
      ...(typeof newStart === 'number' ? { newStart } : {}),
    })
  }
  return diffs
}

/** Applied result hunks, or call-intent hunks when no result view exists. */
function reviewDiffs(node: ToolResultNode): readonly ProducedFileDiff[] {
  if (node.resultView !== null) return producedDiffs(node.resultView)
  return producedDiffs(node.callView)
}

/**
 * Attribute an event seq to its owning turn. Completed turns own the seq
 * range up to their `turn/end` seq; anything past the last completed end
 * belongs to the live turn (the in-flight `partial` / running call's turn,
 * or the next turn number when nothing live is observable).
 */
function turnAttribution(snapshot: ConversationSnapshot): (seq: number) => { turn: number; live: boolean } {
  const ends = [...snapshot.turnEnds.entries()].sort((a, b) => a[1] - b[1])
  const liveTurn = snapshot.partial?.turn
    ?? snapshot.runningCalls[0]?.turn
    ?? ((ends.at(-1)?.[0] ?? 0) + 1)
  return (seq: number) => {
    for (const [turn, endSeq] of ends) {
      if (endSeq >= seq) return { turn, live: false }
    }
    return { turn: liveTurn, live: true }
  }
}

/** Derive one session's per-turn produced-file changes (uncached core). */
function derive(snapshot: ConversationSnapshot): TurnFileChanges[] {
  const attribute = turnAttribution(snapshot)
  const byTurn = new Map<number, { live: boolean; files: Map<string, ProducedFileDiff[]> }>()
  for (const node of snapshot.nodes) {
    if (node.kind !== 'tool-result' || node.isError) continue
    const paths = producedPaths(node.callView)
    if (paths.length === 0) continue
    const diffs = reviewDiffs(node)
    const { turn, live } = attribute(node.seq)
    let group = byTurn.get(turn)
    if (group === undefined) {
      group = { live, files: new Map() }
      byTurn.set(turn, group)
    }
    for (const path of paths) {
      const own = diffs.filter(diff => diff.path === path)
      const existing = group.files.get(path)
      if (existing === undefined) group.files.set(path, [...own])
      else existing.push(...own)
    }
  }
  return [...byTurn.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([turn, group]) => ({
      turn,
      live: group.live,
      files: [...group.files.entries()].map(([path, diffs]) => ({ path, diffs })),
    }))
}

/**
 * Snapshot-identity cache: the sidebar badge runs this derivation on every
 * tab-bar render, so the result is memoized per immutable snapshot reference
 * (the session publishes a fresh reference only when content changes).
 */
const cache = new WeakMap<ConversationSnapshot, TurnFileChanges[]>()

/** Derive per-turn produced-file changes for one session snapshot. */
export function deriveSessionChanges(snapshot: ConversationSnapshot | null): TurnFileChanges[] {
  if (snapshot === null) return []
  const hit = cache.get(snapshot)
  if (hit !== undefined) return hit
  const derived = derive(snapshot)
  cache.set(snapshot, derived)
  return derived
}

/** Count distinct changed paths across every turn (the sidebar badge count). */
export function countChangedFiles(turns: readonly TurnFileChanges[]): number {
  const paths = new Set<string>()
  for (const turn of turns) {
    for (const file of turn.files) paths.add(file.path)
  }
  return paths.size
}

/** Trailing path segment, the part that identifies the file at a glance. */
export function basename(path: string): string {
  const at = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  return at === -1 ? path : path.slice(at + 1)
}

/** POSIX root, drive-letter, or UNC absolute-path test (separator-agnostic). */
function isAbsolutePath(path: string): boolean {
  return path.startsWith('/') || path.startsWith('\\\\') || /^[A-Za-z]:[\\/]/.test(path)
}

/** Resolve a (possibly relative) tool path against the session cwd. */
export function resolveSessionPath(cwd: string | undefined, path: string): string {
  if (isAbsolutePath(path)) return path
  const base = cwd ?? ''
  if (base === '') return path
  const separator = base.includes('\\') ? '\\' : '/'
  return `${base.replace(/[\\/]+$/, '')}${separator}${path}`
}

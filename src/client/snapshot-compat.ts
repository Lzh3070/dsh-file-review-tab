/**
 * Cross-release ConversationSnapshot compatibility.
 *
 * dsh 0.1.1-rc.2 (and earlier 0.1.0/0.1.1 line): the chat projection is
 * mirrored to TOP-LEVEL legacy fields — `nodes`, `turnTimings`, `turnEnds`,
 * `partial`, `runningCalls` — on `ConversationSnapshot` itself.
 *
 * dsh 0.1.2-alpha.1: those top-level fields are gone; the same slice moved
 * into `views.get('chat').legacy` (ChatSnapshot.legacy: LegacyConversationSlice).
 *
 * Every consumer takes this normalized view, so the plugin works unchanged on
 * both releases. Old snapshots take the zero-cost top-level path; new ones
 * resolve the chat view once per call.
 */

/** The legacy slice shape shared by both releases (Map identity included). */
export interface NormalizedConversationSnapshot {
  readonly nodes: readonly unknown[]
  readonly turnEnds: ReadonlyMap<number, number>
  readonly partial: { readonly turn?: number } | null
  readonly runningCalls: readonly { readonly turn?: number }[]
}

/** Structural view-source guard: a store with a callable `get`. */
function viewStore(value: unknown): { get(name: string): unknown } | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const store = value as { get?: unknown }
  return typeof store.get === 'function' ? (store as { get(name: string): unknown }) : undefined
}

/** Structural guard for the 0.1.2 ChatSnapshot.legacy slice. */
function legacySlice(value: unknown): NormalizedConversationSnapshot | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const record = value as Record<string, unknown>
  if (!Array.isArray(record.nodes)
    || !(record.turnEnds instanceof Map)
    || !(record.partial === null || typeof record.partial === 'object')
    || !Array.isArray(record.runningCalls)) return undefined
  return {
    nodes: record.nodes,
    turnEnds: record.turnEnds,
    partial: record.partial as NormalizedConversationSnapshot['partial'],
    runningCalls: record.runningCalls as NormalizedConversationSnapshot['runningCalls'],
  }
}

/**
 * Normalize either release's ConversationSnapshot into the legacy slice.
 * Returns undefined for non-objects (defensive; the legacy contract returns
 * null instead of a snapshot when unbound).
 */
export function normalizeSnapshot(snapshot: unknown): NormalizedConversationSnapshot | undefined {
  if (typeof snapshot !== 'object' || snapshot === null) return undefined
  const record = snapshot as Record<string, unknown>
  const direct = legacySlice(record)
  if (direct !== undefined) return direct
  // dsh 0.1.2-alpha.1: ConversationSnapshot { views, activeTargets } — the
  // chat slice lives at views.get('chat').legacy.
  const store = viewStore(record.views)
  if (store === undefined) return undefined
  const chat = store.get('chat') as Record<string, unknown> | undefined
  if (typeof chat !== 'object' || chat === null) return undefined
  return legacySlice(chat.legacy)
}

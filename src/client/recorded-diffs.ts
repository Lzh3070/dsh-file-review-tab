/**
 * Reconstruct line-level review hunks from one recorded Code Mode mutation's
 * full before/after content. The wire views that carry reusable hunks only
 * ride model-direct tool/call frames; nested `run_code` dispatches are logged
 * with the raw values instead, so this module rebuilds the same hunk shape
 * (`ProducedFileDiff` with line anchors) the rest of the tab renders and the
 * Host undo service applies.
 */
import { diffArrays } from 'diff'
import type { ProducedFileDiff } from '../change-types.ts'
import { diffContentLines } from './diff-text.ts'

/** Unchanged lines kept around each change run, matching unified-diff taste. */
const CONTEXT_LINES = 3

interface Hunk {
  readonly oldStart: number
  readonly newStart: number
  readonly old: string[]
  readonly new: string[]
}

/** Count identical trailing (context) lines of one hunk. */
function trailingContext(hunk: Hunk): number {
  let count = 0
  const max = Math.min(hunk.old.length, hunk.new.length)
  for (let offset = 1; offset <= max; offset += 1) {
    if (hunk.old[hunk.old.length - offset] !== hunk.new[hunk.new.length - offset]) break
    count += 1
  }
  return count
}

/**
 * Line-level hunks for one file mutation, or a single whole-file entry when the
 * file was created (`before === null`, mirroring the write tool's null-content
 * card). Returns [] when the mutation did not change the file.
 */
export function diffsFromBeforeAfter(
  path: string,
  before: string | null,
  after: string,
): readonly ProducedFileDiff[] {
  if (before === null) {
    return after === '' ? [] : [{ path, oldText: null, newText: after }]
  }
  const oldLines = diffContentLines(before)
  const newLines = diffContentLines(after)
  if (oldLines.length === 0 && newLines.length === 0) return []
  if (oldLines.join('\n') === newLines.join('\n')) return []

  const hunks: Hunk[] = []
  const changes = diffArrays(oldLines, newLines)
  // Last CONTEXT_LINES of unchanged lines not yet claimed by an open hunk;
  // they seed the next hunk's leading context.
  let contextBuffer: string[] = []
  let oldCursor = 1
  let newCursor = 1
  let hunk: Hunk | null = null

  for (const change of changes) {
    if (!change.removed && !change.added) {
      const run = change.value
      if (hunk !== null) {
        const beforeLen = hunk.old.length
        hunk.old.push(...run)
        hunk.new.push(...run)
        oldCursor += run.length
        newCursor += run.length
        // A too-long unchanged span breaks the hunk: keep the FIRST
        // CONTEXT_LINES of the span as this hunk's trailing context and save
        // the span's LAST CONTEXT_LINES as the next hunk's leading context —
        // both tails stay contiguous with their own change runs.
        if (run.length > CONTEXT_LINES * 2) {
          const target = beforeLen + CONTEXT_LINES
          hunk.old.length = target
          hunk.new.length = target
          contextBuffer = run.slice(-CONTEXT_LINES)
          hunk = null
        }
      } else {
        contextBuffer.push(...run)
        oldCursor += run.length
        newCursor += run.length
        if (contextBuffer.length > CONTEXT_LINES) {
          contextBuffer = contextBuffer.slice(-CONTEXT_LINES)
        }
      }
      continue
    }
    const removed = change.removed ? change.value : []
    const added = change.added ? change.value : []
    if (hunk === null) {
      const leading = contextBuffer
      hunk = {
        oldStart: oldCursor - leading.length,
        newStart: newCursor - leading.length,
        old: [...leading],
        new: [...leading],
      }
      hunks.push(hunk)
    }
    hunk.old.push(...removed)
    hunk.new.push(...added)
    oldCursor += removed.length
    newCursor += added.length
  }

  // Trim each hunk's trailing context to CONTEXT_LINES (an unchanged run split
  // a hunk only after exceeding 2*CONTEXT_LINES, so at most an end-of-file run
  // remains over-fed).
  for (const current of hunks) {
    const extra = Math.max(0, trailingContext(current) - CONTEXT_LINES)
    if (extra > 0) {
      current.old.length -= extra
      current.new.length -= extra
    }
  }

  return hunks
    .filter(hunkEntry => hunkEntry.old.length > 0 || hunkEntry.new.length > 0)
    .map(hunkEntry => ({
      path,
      // An empty old side (content written into a previously empty file) must
      // stay '' — collapsing it to null would mislabel the hunk as a file
      // creation and make it non-reversible, unlike its model-direct twin
      // ('' + oldStart over the wire). Only the before === null entry above
      // carries a null oldText.
      oldText: hunkEntry.old.join('\n'),
      newText: hunkEntry.new.join('\n'),
      oldStart: hunkEntry.oldStart,
      newStart: hunkEntry.newStart,
    }))
}

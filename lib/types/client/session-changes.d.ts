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
import type { ConversationSnapshot } from '@deepseek-ai/dsh-client-runtime/client';
import type { ProducedFileDiff } from '../change-types.ts';
/** One changed file inside one turn, hunks appended in settlement order. */
export interface SessionFileChange {
    readonly path: string;
    readonly diffs: readonly ProducedFileDiff[];
}
/** One turn's produced files, in first-seen order. */
export interface TurnFileChanges {
    readonly turn: number;
    /** Whether the owning turn is still running (its change set may grow). */
    readonly live: boolean;
    readonly files: readonly SessionFileChange[];
}
/**
 * Paths a call view reports having created or changed, by render intent
 * rather than tool name: a diff card, or a generic card whose kind is `edit`.
 * Mirrors dsh-file-review's producedPaths exactly (unknown-safe).
 */
export declare function producedPaths(view: unknown): readonly string[];
/** Validate diff hunks crossing the Host/browser transport (unknown-safe). */
export declare function producedDiffs(view: unknown): readonly ProducedFileDiff[];
/** Derive per-turn produced-file changes for one session snapshot. */
export declare function deriveSessionChanges(snapshot: ConversationSnapshot | null): TurnFileChanges[];
/** Count distinct changed paths across every turn (the sidebar badge count). */
export declare function countChangedFiles(turns: readonly TurnFileChanges[]): number;
/** Trailing path segment, the part that identifies the file at a glance. */
export declare function basename(path: string): string;
/** Resolve a (possibly relative) tool path against the session cwd. */
export declare function resolveSessionPath(cwd: string | undefined, path: string): string;
//# sourceMappingURL=session-changes.d.ts.map
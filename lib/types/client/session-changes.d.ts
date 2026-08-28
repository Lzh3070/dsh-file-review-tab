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
import type { ProducedFileDiff, RecordedMutation } from '../change-types.ts';
/** One changed file inside one turn, hunks appended in settlement order. */
export interface SessionFileChange {
    readonly path: string;
    readonly diffs: readonly ProducedFileDiff[];
    /** Terminal commands deleted this path in this turn (display-only). */
    readonly deleted?: true;
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
/**
 * One Code Mode (`run_code`) root visible in the snapshot, with the turn it
 * settles into. Children (`subCalls`) carry no reusable views, so the reset of
 * their review data arrives asynchronously from the Host recorder; these roots
 * are the join keys (the `run_code` `callId` is the dispatch `rootCallId`).
 */
export interface SessionRoot {
    readonly turn: number;
    readonly live: boolean;
    readonly rootCallId: string;
}
/** Every `run_code` tool-result node in the window, in node order. */
export declare function deriveSessionRoots(snapshot: ConversationSnapshot): SessionRoot[];
/**
 * Merge Host-recorded Code Mode mutations into the snapshot-derived turns:
 * hunks rebuilt from the full before/after are appended to the owning turn's
 * file groups (same-path entries stay one row, hunks appended in dispatch
 * order), so the tab's diff rendering, status inspection and undo all work on
 * programmatic edits exactly like model-direct ones. All inputs are immutable;
 * the result is a fresh array only when a recorded mutation matched a visible
 * root.
 */
export declare function mergeRecordedTurns(turns: readonly TurnFileChanges[], roots: readonly SessionRoot[], recorded: readonly RecordedMutation[]): readonly TurnFileChanges[];
/** Count distinct changed paths across every turn (the sidebar badge count). */
export declare function countChangedFiles(turns: readonly TurnFileChanges[]): number;
/**
 * Turns that stay in the review tab's MAIN list: the newest
 * {@link ARCHIVE_KEEP_TURNS} turns plus every live (still-running) turn.
 * Older completed turns auto-archive to the tab's bottom section (issue #5:
 * long sessions accumulate dozens of diff groups and weigh the page down).
 */
export declare const ARCHIVE_KEEP_TURNS = 5;
/** Archived turns render this many groups per loaded page once the section opens. */
export declare const ARCHIVE_PAGE_TURNS = 10;
/** Split turns into the main list and the auto-archived tail (both newest-first). */
export declare function splitArchivedTurns(turns: readonly TurnFileChanges[], keep?: number): {
    main: readonly TurnFileChanges[];
    archived: readonly TurnFileChanges[];
};
/** Trailing path segment, the part that identifies the file at a glance. */
export declare function basename(path: string): string;
/** Resolve a (possibly relative) tool path against the session cwd. */
export declare function resolveSessionPath(cwd: string | undefined, path: string): string;
//# sourceMappingURL=session-changes.d.ts.map
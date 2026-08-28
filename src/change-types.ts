/** Shared wire vocabulary for inspecting and toggling one turn's text changes. */

/** One validated contextual diff hunk attached to a produced file. */
export interface ProducedFileDiff {
  readonly path: string
  readonly oldText: string | null
  readonly newText: string
  readonly oldStart?: number | undefined
  readonly newStart?: number | undefined
}

/** One produced file and the applied hunks available for review. */
export interface ProducedFileReview {
  readonly path: string
  readonly diffs: readonly ProducedFileDiff[]
  /**
   * The turn's terminal commands deleted this path (dsh has no delete-file
   * tool, so deletions arrive as parsed rm-family arguments). Deleted entries
   * carry no hunks, no undo, and no openable file — review-display vocabulary
   * only.
   */
  readonly deleted?: true
}

/** Direction requested by the produced-files toggle. */
export type FileReviewAction = 'undo' | 'redo'

/** One turn-scoped file supplied to the Host toggle service. */
export interface FileReviewChange {
  readonly path: string
  readonly diffs: readonly ProducedFileDiff[]
}

/** Host request for status inspection or one toggle direction. */
export interface FileReviewRequest {
  readonly action: FileReviewAction
  readonly files: readonly FileReviewChange[]
}

/** Current relationship between a file and the recorded turn change. */
export type FileReviewFileState = 'applied' | 'undone' | 'conflict' | 'unsupported' | 'error'

/** Per-file result; a request never hides skipped or failed files. */
export interface FileReviewFileResult {
  readonly path: string
  readonly state: FileReviewFileState
  readonly changed: boolean
  readonly reason?: string | undefined
}

/** Complete result returned by both Host endpoints. */
export interface FileReviewResult {
  readonly files: readonly FileReviewFileResult[]
}

/**
 * One mutation a Code Mode `run_code` program dispatched to a file-editing
 * tool, captured host-side with the FULL before/after content. The wire views
 * (diff cards) only ride model-direct tool/call frames; nested dispatches
 * carry neither a view nor hunks, so review of programmatic edits must
 * reconstruct the diff from these two snapshots instead.
 */
export interface RecordedMutation {
  /** The `run_code` call that owns this dispatch (its `callId`). */
  readonly rootCallId: string
  /** The dispatched tool name (`edit`, `write`, …). */
  readonly name: string
  /** Display path the tool reported; resolved against the session cwd. */
  readonly path: string
  /** Full file content before the mutation; `null` when the file was created. */
  readonly before: string | null
  /** Full file content after the mutation. */
  readonly after: string
}

/** Host request for the recorded Code Mode mutations of one session. */
export interface RecordedRequest {
  /** Root (`run_code`) call-ids whose recorded mutations are wanted. */
  readonly rootCallIds: readonly string[]
}

/** Host response: every requested root's mutations, in dispatch order. */
export interface RecordedResult {
  readonly mutations: readonly RecordedMutation[]
}


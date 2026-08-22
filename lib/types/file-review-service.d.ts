/** Host-side, workspace-contained undo / redo service for produced text diffs. */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { FileReviewAction, FileReviewChange, FileReviewRequest, FileReviewResult, RecordedMutation, RecordedRequest, RecordedResult } from './change-types.ts';
/** Apply a complete file's hunk sequence in memory, or report a strict mismatch. */
export declare function transformFile(text: string, file: FileReviewChange, action: FileReviewAction): string | null;
/** Host service published as the `fileReview` Remote namespace. */
export declare class FileReviewService extends TypertRemoteService {
    /** Per-agent record of Code Mode (`run_code`) file mutations, dispatch order. */
    private readonly recordLog;
    constructor(ctx: Context);
    /** Append one nested (Code Mode) file mutation for the receiving agent. */
    recordMutation(agent: Agent, mutation: RecordedMutation): void;
    /** Return the recorded mutations for the requested `run_code` roots. */
    recorded(agent: Agent, request: RecordedRequest): Promise<RecordedResult>;
    /** Inspect current disk state without changing files. */
    status(agent: Agent, request: FileReviewRequest): Promise<FileReviewResult>;
    /** Toggle every independently safe file while the receiving Agent is idle. */
    apply(agent: Agent, request: FileReviewRequest): Promise<FileReviewResult>;
}
//# sourceMappingURL=file-review-service.d.ts.map
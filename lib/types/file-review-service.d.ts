/** Host-side, workspace-contained undo / redo service for produced text diffs. */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { FileReviewAction, FileReviewChange, FileReviewRequest, FileReviewResult } from './change-types.ts';
/** Apply a complete file's hunk sequence in memory, or report a strict mismatch. */
export declare function transformFile(text: string, file: FileReviewChange, action: FileReviewAction): string | null;
/** Host service published as the `fileReview` Remote namespace. */
export declare class FileReviewService extends TypertRemoteService {
    constructor(ctx: Context);
    /** Inspect current disk state without changing files. */
    status(agent: Agent, request: FileReviewRequest): Promise<FileReviewResult>;
    /** Toggle every independently safe file while the receiving Agent is idle. */
    apply(agent: Agent, request: FileReviewRequest): Promise<FileReviewResult>;
}
//# sourceMappingURL=file-review-service.d.ts.map
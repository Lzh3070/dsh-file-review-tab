/** Browser Typert contribution for the Host file-review service. */
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client';
import type { RemoteResult, TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol';
import type { FileReviewRequest, FileReviewResult } from './change-types.ts';
declare module '@deepseek-ai/dsh-typert-protocol' {
    interface TypertRemoteNamespaceMap {
        fileReview: {
            status: (agentId: SessionId, request: FileReviewRequest) => Promise<RemoteResult<FileReviewResult>>;
            apply: (agentId: SessionId, request: FileReviewRequest) => Promise<RemoteResult<FileReviewResult>>;
        };
    }
    interface TypertRemoteMap {
        'fileReview/status': (agentId: SessionId, request: FileReviewRequest) => Promise<RemoteResult<FileReviewResult>>;
        'fileReview/apply': (agentId: SessionId, request: FileReviewRequest) => Promise<RemoteResult<FileReviewResult>>;
    }
    interface TypertRemoteScopeMap {
        'agent:fileReview/status': (request: FileReviewRequest) => Promise<RemoteResult<FileReviewResult>>;
        'agent:fileReview/apply': (request: FileReviewRequest) => Promise<RemoteResult<FileReviewResult>>;
    }
}
export declare const TYPERT_REMOTE: TypertRemoteContribution;
export default TYPERT_REMOTE;
//# sourceMappingURL=remote.d.ts.map
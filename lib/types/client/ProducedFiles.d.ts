import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { TurnTailOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { FileReviewRequest, FileReviewResult } from '../change-types.ts';
import { type ProducedFileReview } from './turn-deliverables.ts';
import type { NS } from './chat-locales.ts';
/** Matched file reviews plus the opener and locale supplied by the turn-tail slot. */
export type ProducedFilesProps = Pick<TurnTailOwnerProps, 'openFile' | 'turn'> & {
    matched: readonly ProducedFileReview[];
    /** Session workspace root (reserved; the chat card shows tool paths verbatim). */
    projectRoot?: string | undefined;
    inspectChanges?: (request: FileReviewRequest) => Promise<FileReviewResult>;
    applyChanges?: (request: FileReviewRequest) => Promise<FileReviewResult>;
    /**
     * Open the plugin's sidebar tab with the given paths pre-expanded
     * (the 审查 button passes every produced path; a file chip passes its own).
     * The owning turn number rides along so the tab expands only this turn's
     * rows — a path that recurs in other turns stays collapsed there.
     */
    openInSidebarTab?: (paths: readonly string[], turn?: number) => void;
} & PropsLocale<typeof NS>;
/** Render one turn's produced files as a summary card opening the sidebar tab. */
export declare function ProducedFiles({ matched: reviews, openFile, turn: turnLocation, inspectChanges, applyChanges, openInSidebarTab, t, }: ProducedFilesProps): import("react").JSX.Element;
//# sourceMappingURL=ProducedFiles.d.ts.map
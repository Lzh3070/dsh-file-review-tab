import type { Context } from '@deepseek-ai/cordis';
/** Tab component props (a narrowing of better-sidebar's TabComponentProps). */
export interface FileReviewTabProps {
    readonly ctx: Context;
    readonly sessionId: string;
    readonly cwd: string | undefined;
    /** Active tab + open panel; live status inspection pauses while false. */
    readonly visible: boolean;
    /**
     * The sidebar tab handle. `meta.expandPaths` (string[]) is the deep link
     * the chat turn-tail row writes via updateTab/openTab: a fresh meta
     * reference replays as "expand those files' diffs and scroll to the first".
     */
    readonly tab: {
        readonly meta?: unknown;
    };
}
/** The sidebar tab body: per-turn change groups with inline diffs and undo. */
export declare function FileReviewTab({ ctx, sessionId, cwd, visible, tab }: FileReviewTabProps): import("react").JSX.Element;
//# sourceMappingURL=FileReviewTab.d.ts.map
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
    readonly nodes: readonly unknown[];
    readonly turnEnds: ReadonlyMap<number, number>;
    readonly partial: {
        readonly turn?: number;
    } | null;
    readonly runningCalls: readonly {
        readonly turn?: number;
    }[];
}
/**
 * Normalize either release's ConversationSnapshot into the legacy slice.
 * Returns undefined for non-objects (defensive; the legacy contract returns
 * null instead of a snapshot when unbound).
 */
export declare function normalizeSnapshot(snapshot: unknown): NormalizedConversationSnapshot | undefined;
//# sourceMappingURL=snapshot-compat.d.ts.map
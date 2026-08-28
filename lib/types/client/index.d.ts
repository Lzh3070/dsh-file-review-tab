/**
 * File-review-tab plugin, browser half: TWO coexisting surfaces over the same
 * produced-file vocabulary —
 *
 * 1. the chat turn-tail row (the original dsh-file-review card: "Edited N
 *    files · +M -K / Undo / Review"), registered into the
 *    'conversation.chat.turnTail' chain at priority -2 so it claims the chain
 *    BEFORE dsh-better-sidebar's own -1 interception row (chain election is
 *    first-claim-wins: exactly one row ever renders, never both); and
 * 2. the 'file-review' better-sidebar tab (per-session change list + inline
 *    red/green diffs + per-turn/per-file undo).
 *
 * The Host half's undo/redo capability reaches both surfaces through the
 * package's Typert remote contribution, mounted here exactly like
 * dsh-file-review did. Every registration is wrapped in ctx.effect so fiber
 * disposal (HMR / plugin disable) unregisters cleanly.
 */
import type { Context } from '@deepseek-ai/cordis';
import { type DeliverablesKey } from './chat-locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Turn-tail row copy (the chat-side surface). */
        'file-review': DeliverablesKey;
    }
}
/**
 * Required services: the sidebar registry, session snapshots, locale, remote,
 * and the slot registry (turn-tail chain). The conversation Definition
 * registry is deliberately NOT a static inject: its service name moved across
 * dsh releases (<= 0.1.1: root `conversationEvents`; 0.1.2-alpha.1+:
 * `uiConversation.events`), so a hard inject on either name leaves the whole
 * plugin forever "pending" on the other version and fails web boot (issue
 * #6). It is resolved dynamically in apply() instead.
 */
export declare const inject: string[];
/**
 * Client plugin body: attach locale, mount the Typert remote, register the
 * chat turn-tail row AND the sidebar tab.
 * @param ctx - client root context.
 */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map
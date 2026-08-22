/**
 * File-review-tab plugin, node half. Registers the response-format guidance
 * that lets the browser half recognize final-response file references. The
 * browser half ships via exports["./client"], discovered through the
 * package.json dsh.client declaration.
 */
import type { Context } from '@deepseek-ai/cordis';
export type * from './change-types.ts';
export { FileReviewService, transformFile } from './file-review-service.ts';
/** Services required for the model guidance paired with the browser renderer. */
export declare const inject: string[];
/**
 * Register model guidance for the file-reference renderer shipped by this package,
 * and the Code Mode (`run_code`) mutation recorder that backs the browser-side
 * review tab.
 *
 * Nested dispatch results carry no wire views — the diff cards only ride
 * model-direct tool/call frames — so reviewing programmatic file edits needs a
 * second source: this listener snapshots the full `before`/`after` content of
 * every nested file mutation (`edit`/`write` — recognized by result shape, not
 * tool name) into the `fileReview` service, which the browser half later turns
 * into line-level hunks and merges into the owning `run_code` turn.
 * @param ctx - host context carrying the system-prompt registry and tool waterfall.
 */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map
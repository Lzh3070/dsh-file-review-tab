import { z } from "zod";
//#region src/typert-descriptors.ts
/** Strict Typert codecs shared by the Host and browser contribution artifacts. */
const PACKAGE_NAME = "dsh-file-review-tab";
const diffSchema = z.object({
	path: z.string(),
	oldText: z.string().nullable(),
	newText: z.string(),
	oldStart: z.number().int().min(1).optional(),
	newStart: z.number().int().min(1).optional()
});
const requestSchema = z.object({
	action: z.enum(["undo", "redo"]),
	files: z.array(z.object({
		path: z.string(),
		diffs: z.array(diffSchema)
	}))
});
const resultSchema = z.object({ files: z.array(z.object({
	path: z.string(),
	state: z.enum([
		"applied",
		"undone",
		"conflict",
		"unsupported",
		"error"
	]),
	changed: z.boolean(),
	reason: z.string().optional()
})) });
const agentCodec = {
	mode: "strict",
	typeSymbol: "@deepseek-ai/dsh-session/types#SessionId",
	schema: z.intersection(z.string(), z.unknown())
};
const requestCodec = {
	mode: "strict",
	typeSymbol: `${PACKAGE_NAME}#FileReviewRequest`,
	schema: requestSchema
};
const resultCodec = {
	mode: "strict",
	typeSymbol: `${PACKAGE_NAME}#FileReviewResult`,
	schema: resultSchema
};
function descriptor(method) {
	return {
		id: `${PACKAGE_NAME}#fileReview/${method}`,
		service: "fileReview",
		namespace: "fileReview",
		method,
		invocation: { kind: "direct" },
		scope: {
			context: "agent",
			wire: "agentId"
		},
		parameters: [{
			name: "agent",
			wire: "agentId",
			source: "lookup",
			lookup: "agent",
			codec: agentCodec
		}, {
			name: "request",
			wire: "request",
			source: "json",
			codec: requestCodec
		}],
		result: resultCodec
	};
}
const FILE_REVIEW_INVOCATIONS = [descriptor("status"), descriptor("apply")];
//#endregion
export { PACKAGE_NAME as n, FILE_REVIEW_INVOCATIONS as t };

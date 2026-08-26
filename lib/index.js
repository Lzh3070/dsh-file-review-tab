import { lstat, readFile, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";
import { writeFileAtomic } from "@deepseek-ai/dsh-atomic-write";
import { TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
//#region src/file-review-service.ts
/** Host-side, workspace-contained undo / redo service for produced text diffs. */
/**
* The mutation tools' recorded hunks (both diff cards and Code Mode
* before/after values) ride the filesystem backend's LF-normalized basis,
* while files on disk may use CRLF. All hunk matching therefore runs on the
* normalized text; the write path restores the file's own line-ending style.
*/
function normalizeNewlines(text) {
	return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
function restoreNewlines(text, crlf) {
	return crlf ? text.replace(/\n/g, "\r\n") : text;
}
function inside(root, candidate) {
	const child = relative(root, candidate);
	return child === "" || !child.startsWith("..") && !isAbsolute(child);
}
async function resolveFile(cwd, requestedPath) {
	const root = await realpath(cwd);
	const candidate = resolve(root, requestedPath);
	if (!inside(root, candidate)) throw new Error("path is outside the session workspace");
	const linkStat = await lstat(candidate);
	if (linkStat.isSymbolicLink()) throw new Error("symbolic links are not supported");
	if (!linkStat.isFile()) throw new Error("path is not a regular file");
	const filename = await realpath(candidate);
	if (!inside(root, filename)) throw new Error("resolved path is outside the session workspace");
	const bytes = await readFile(filename);
	const text = bytes.toString("utf8");
	if (!Buffer.from(text, "utf8").equals(bytes)) throw new Error("file is not valid UTF-8 text");
	const crlf = text.includes("\r");
	return {
		filename,
		mode: linkStat.mode & 511,
		bytes,
		text,
		crlf,
		lfText: normalizeNewlines(text)
	};
}
function offsetAtLine(text, line) {
	if (!Number.isInteger(line) || line < 1) return null;
	if (line === 1) return 0;
	let offset = 0;
	for (let current = 1; current < line; current += 1) {
		const next = text.indexOf("\n", offset);
		if (next === -1) return null;
		offset = next + 1;
	}
	return offset;
}
function replaceHunk(text, source, replacement, line) {
	let offset;
	if (line !== void 0) {
		const located = offsetAtLine(text, line);
		if (located === null || text.slice(located, located + source.length) !== source) return null;
		offset = located;
	} else {
		if (source === "") return null;
		offset = text.indexOf(source);
		if (offset === -1 || text.indexOf(source, offset + 1) !== -1) return null;
	}
	return text.slice(0, offset) + replacement + text.slice(offset + source.length);
}
function hunkSupported(diff, path) {
	if (diff.path !== path || diff.oldText === null || diff.oldText === diff.newText) return false;
	if (diff.oldText === "" && diff.oldStart === void 0) return false;
	if (diff.newText === "" && diff.newStart === void 0) return false;
	return true;
}
/** Apply a complete file's hunk sequence in memory, or report a strict mismatch. */
function transformFile(text, file, action) {
	if (file.diffs.length === 0 || !file.diffs.every((diff) => hunkSupported(diff, file.path))) return null;
	const diffs = action === "undo" ? [...file.diffs].reverse() : file.diffs;
	let next = text;
	for (const diff of diffs) {
		const source = action === "undo" ? diff.newText : diff.oldText;
		const replacement = action === "undo" ? diff.oldText : diff.newText;
		if (source === null || replacement === null) return null;
		const changed = replaceHunk(next, source, replacement, action === "undo" ? diff.newStart : diff.oldStart);
		if (changed === null) return null;
		next = changed;
	}
	return next;
}
function hunkSidePresent(text, file, side) {
	for (const diff of file.diffs) {
		const source = side === "old" ? diff.oldText : diff.newText;
		if (source === null) continue;
		const line = side === "old" ? diff.oldStart : diff.newStart;
		if (line !== void 0) {
			const located = offsetAtLine(text, line);
			if (located === null || text.slice(located, located + source.length) !== source) return false;
		} else if (text.indexOf(source) === -1) return false;
	}
	return true;
}
function inspectText(text, file) {
	if (file.diffs.length === 0 || !file.diffs.every((diff) => hunkSupported(diff, file.path))) return {
		state: "unsupported",
		reason: "change has no complete reversible diff"
	};
	const undone = transformFile(text, file, "undo");
	const redone = transformFile(text, file, "redo");
	if (undone !== null && redone !== null) return hunkSidePresent(text, file, "new") ? {
		state: "applied",
		text,
		nextText: undone
	} : {
		state: "undone",
		text,
		nextText: redone
	};
	if (undone !== null) return {
		state: "applied",
		text,
		nextText: undone
	};
	if (redone !== null) return {
		state: "undone",
		text,
		nextText: redone
	};
	return {
		state: "conflict",
		reason: "current content does not match the recorded change"
	};
}
async function inspectOne(cwd, file) {
	if (file.diffs.length === 0 || !file.diffs.every((diff) => hunkSupported(diff, file.path))) return {
		path: file.path,
		state: "unsupported",
		changed: false,
		reason: "change has no complete reversible diff"
	};
	try {
		const inspected = inspectText((await resolveFile(cwd, file.path)).lfText, file);
		return {
			path: file.path,
			state: inspected.state,
			changed: false,
			reason: inspected.reason
		};
	} catch (error) {
		return {
			path: file.path,
			state: "error",
			changed: false,
			reason: error instanceof Error ? error.message : String(error)
		};
	}
}
async function applyOne(cwd, file, action) {
	if (file.diffs.length === 0 || !file.diffs.every((diff) => hunkSupported(diff, file.path))) return {
		path: file.path,
		state: "unsupported",
		changed: false,
		reason: "change has no complete reversible diff"
	};
	try {
		const resolved = await resolveFile(cwd, file.path);
		const inspected = inspectText(resolved.lfText, file);
		const sourceState = action === "undo" ? "applied" : "undone";
		const targetState = action === "undo" ? "undone" : "applied";
		if (inspected.state === targetState) return {
			path: file.path,
			state: targetState,
			changed: false
		};
		if (inspected.state !== sourceState || inspected.nextText === void 0) return {
			path: file.path,
			state: inspected.state,
			changed: false,
			reason: inspected.reason
		};
		const current = await readFile(resolved.filename);
		if (!Buffer.from(resolved.bytes).equals(current)) return {
			path: file.path,
			state: "conflict",
			changed: false,
			reason: "file changed while the operation was being prepared"
		};
		await writeFileAtomic(resolved.filename, restoreNewlines(inspected.nextText, resolved.crlf), { mode: resolved.mode });
		return {
			path: file.path,
			state: targetState,
			changed: true
		};
	} catch (error) {
		return {
			path: file.path,
			state: "error",
			changed: false,
			reason: error instanceof Error ? error.message : String(error)
		};
	}
}
function sessionCwd(agent) {
	const cwd = agent.session.header.cwd;
	if (cwd === void 0 || cwd.trim() === "") throw new Error("session has no workspace directory");
	return cwd;
}
/** Per-agent cap on recorded Code Mode mutations (oldest evicted first). */
const RECORDED_PER_AGENT_CAP = 4e3;
function agentKey(agent) {
	return String(agent.id);
}
/** Host service published as the `fileReview` Remote namespace. */
var FileReviewService = class extends TypertRemoteService {
	/** Per-agent record of Code Mode (`run_code`) file mutations, dispatch order. */
	recordLog = /* @__PURE__ */ new Map();
	constructor(ctx) {
		super(ctx, "fileReview");
	}
	/** Append one nested (Code Mode) file mutation for the receiving agent. */
	recordMutation(agent, mutation) {
		const key = agentKey(agent);
		const list = this.recordLog.get(key);
		if (list === void 0) {
			this.recordLog.set(key, [mutation]);
			return;
		}
		list.push(mutation);
		if (list.length > RECORDED_PER_AGENT_CAP) list.splice(0, list.length - RECORDED_PER_AGENT_CAP);
	}
	/** Return the recorded mutations for the requested `run_code` roots. */
	async recorded(agent, request) {
		const list = this.recordLog.get(agentKey(agent));
		if (list === void 0 || request.rootCallIds.length === 0) return { mutations: [] };
		const wanted = new Set(request.rootCallIds);
		return { mutations: list.filter((mutation) => wanted.has(mutation.rootCallId)) };
	}
	/** Inspect current disk state without changing files. */
	async status(agent, request) {
		const cwd = sessionCwd(agent);
		return { files: await Promise.all(request.files.map((file) => inspectOne(cwd, file))) };
	}
	/** Toggle every independently safe file while the receiving Agent is idle. */
	async apply(agent, request) {
		const cwd = sessionCwd(agent);
		return agent.runMaintenance(async () => {
			const files = [];
			for (const file of request.files) files.push(await applyOne(cwd, file, request.action));
			return { files };
		});
	}
};
//#endregion
//#region src/index.ts
/** Services required for the model guidance paired with the browser renderer. */
const inject = ["systemPrompt"];
/** Stable final-response guidance owned by the matching renderer. */
const FILE_REFERENCE_PROMPT = "When you successfully create or modify files, mention the primary outputs in your final response. To make those and any other changed-file references clickable in Web, format them as Markdown inline code using the exact file-tool path, or a basename when unique among the files changed in that turn.";
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
function apply(ctx) {
	const service = new FileReviewService(ctx);
	ctx.systemPrompt.section({
		name: "ui:file-review-references",
		order: 190,
		text: FILE_REFERENCE_PROMPT
	});
	const emitter = ctx;
	ctx.effect(() => {
		const off = emitter.on("tools/post-execute", async (execRaw, resultRaw, nextRaw) => {
			const exec = execRaw;
			const result = resultRaw;
			const decision = await nextRaw();
			if (decision.kind !== "accept") return decision;
			if (exec.parent === void 0 || exec.agent === void 0) return decision;
			const value = result.value;
			if (typeof value !== "object" || value === null || Array.isArray(value)) return decision;
			const candidate = value;
			if (typeof candidate.path !== "string" || typeof candidate.after !== "string") return decision;
			if (candidate.before !== null && typeof candidate.before !== "string") return decision;
			service.recordMutation(exec.agent, {
				rootCallId: String(exec.rootCallId ?? exec.callId),
				name: exec.name,
				path: candidate.path,
				before: candidate.before ?? null,
				after: candidate.after
			});
			return decision;
		});
		return () => {
			off();
		};
	}, "file-review-tab: ptc recorder");
}
//#endregion
export { FileReviewService, apply, inject, transformFile };

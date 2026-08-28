window.__ModuleLoader__.load({
	id: "dsh-file-review-tab",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
		var _a$1;
		function $constructor(name, initializer, params) {
			function init(inst, def) {
				if (!inst._zod) Object.defineProperty(inst, "_zod", {
					value: {
						def,
						constr: _,
						traits: /* @__PURE__ */ new Set()
					},
					enumerable: false
				});
				if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				const proto = _.prototype;
				const keys = Object.keys(proto);
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				var _a;
				const inst = params?.Parent ? new Definition() : this;
				init(inst, def);
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				for (const fn of inst._zod.deferred) fn();
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		function cached(getter) {
			return { get value() {
				{
					const value = getter();
					Object.defineProperty(this, "value", { value });
					return value;
				}
			} };
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
		function defineLazy(object, key, getter) {
			let value = void 0;
			Object.defineProperty(object, key, {
				get() {
					if (value === EVALUATING) return;
					if (value === void 0) {
						value = EVALUATING;
						value = getter();
					}
					return value;
				},
				set(v) {
					Object.defineProperty(object, key, { value: v });
				},
				configurable: true
			});
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) {
				const descriptors = Object.getOwnPropertyDescriptors(def);
				Object.assign(mergedDescriptors, descriptors);
			}
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = {
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = {};
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						newShape[key] = currDef.shape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = { ...schema._zod.def.shape };
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						delete newShape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = schema._zod.def.shape;
				for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function merge(a, b) {
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			return clone(a, mergeDefs(a._zod.def, {
				get shape() {
					const _shape = {
						...a._zod.def.shape,
						...b._zod.def.shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				},
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask) {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
					}
					else for (const key in oldShape) shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
					assignProp(this, "shape", shape);
					return shape;
				},
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
				}
				else for (const key in oldShape) shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
				assignProp(this, "shape", shape);
				return shape;
			} }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config) {
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
			rest.path ?? (rest.path = []);
			rest.message = message;
			if (ctx?.reportInput) rest.input = _input;
			return rest;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			Object.defineProperty(inst, "_zod", {
				value: inst._zod,
				enumerable: false
			});
			Object.defineProperty(inst, "issues", {
				value: def,
				enumerable: false
			});
			inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
			Object.defineProperty(inst, "toString", {
				value: () => inst.message,
				enumerable: false
			});
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
		const _parse = (_Err) => (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee);
				throw e;
			}
			return result.value;
		};
		const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee);
				throw e;
			}
			return result.value;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
		const _encode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parse(_Err)(schema, value, ctx);
		};
		const _decode = (_Err) => (schema, value, _ctx) => {
			return _parse(_Err)(schema, value, _ctx);
		};
		const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parseAsync(_Err)(schema, value, ctx);
		};
		const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _parseAsync(_Err)(schema, value, _ctx);
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^[A-Za-z0-9_-]*$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time$1(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime$1(args) {
			const time = timeSource({ precision: args.precision });
			const opts = ["Z"];
			if (args.local) opts.push("");
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const timeRegex = `${time}(?:${opts.join("|")})`;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const string$1 = (params) => {
			const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
			return new RegExp(`^${regex}$`);
		};
		const integer = /^-?\d+$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const boolean$1 = /^(?:true|false)$/i;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
				if (def.value < curr) {
					if (def.inclusive) bag.maximum = def.value;
					else bag.exclusiveMaximum = def.value;
				}
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
				if (def.value > curr) {
					if (def.inclusive) bag.minimum = def.value;
					else bag.exclusiveMinimum = def.value;
				}
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				var _a;
				(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
			});
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				bag.minimum = minimum;
				bag.maximum = maximum;
				if (isInt) bag.pattern = integer;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.minimum = def.length;
				bag.maximum = def.length;
				bag.length = def.length;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				const length = input.length;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				if (def.pattern) {
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(def.pattern);
				}
			});
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
			def.pattern = pattern;
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = []) {
				this.content = [];
				this.indent = 0;
				if (this) this.args = args;
			}
			indented(fn) {
				this.indent += 1;
				fn(this);
				this.indent -= 1;
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const args = this?.args;
				const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
				return new F(...args, lines.join("\n"));
			}
		};
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 4,
			patch: 3
		};
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const checks = [...inst._zod.def.checks ?? []];
			if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
			defineLazy(inst, "~standard", () => ({
				validate: (value) => {
					try {
						const r = safeParse$1(inst, value);
						return r.success ? { value: r.data } : { issues: r.error?.issues };
					} catch (_) {
						return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
					}
				},
				vendor: "zod",
				version: 1
			}));
		});
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					if (!def.normalize && def.protocol?.source === httpProtocol.source) {
						if (!/^https?:\/\//i.test(trimmed)) {
							payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid URL format",
								input: payload.value,
								inst,
								continue: !def.abort
							});
							return;
						}
					}
					const url = new URL(trimmed);
					if (def.hostname) {
						def.hostname.lastIndex = 0;
						if (!def.hostname.test(url.hostname)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: def.hostname.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.protocol) {
						def.protocol.lastIndex = 0;
						if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid protocol",
							pattern: def.protocol.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.normalize) payload.value = url.href;
					else payload.value = trimmed;
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			def.pattern ?? (def.pattern = nanoid);
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv4`;
		});
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv6`;
			inst._zod.check = (payload) => {
				try {
					new URL(`http://[${payload.value}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "ipv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				const parts = payload.value.split("/");
				try {
					if (parts.length !== 2) throw new Error();
					const [address, prefix] = parts;
					if (!prefix) throw new Error();
					const prefixNum = Number(prefix);
					if (`${prefixNum}` !== prefix) throw new Error();
					if (prefixNum < 0 || prefixNum > 128) throw new Error();
					new URL(`http://[${address}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "cidrv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64";
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64URL(data) {
			if (!base64url.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64url);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64url";
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = boolean$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Boolean(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "boolean") return payload;
				payload.issues.push({
					expected: "boolean",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = Array(input.length);
				const proms = [];
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else handleArrayResult(result, payload, i);
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
			const isPresent = key in input;
			if (result.issues.length) {
				if (isOptionalIn && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && !isOptionalIn) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				keys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const isOptionalIn = _catchall.optin === "optional";
			const isOptionalOut = _catchall.optout === "optional";
			for (const key in input) {
				if (key === "__proto__") continue;
				if (keySet.has(key)) continue;
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
				const sh = def.shape;
				Object.defineProperty(def, "shape", { get: () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					return newSh;
				} });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazy(inst._zod, "propValues", () => {
				const shape = def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
					}
				}
				return propValues;
			});
			const isObject$1 = isObject;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = {};
				const proms = [];
				const shape = value.shape;
				for (const key of value.keys) {
					const el = shape[key];
					const isOptionalIn = el._zod.optin === "optional";
					const isOptionalOut = el._zod.optout === "optional";
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const generateFastpass = (shape) => {
				const doc = new Doc([
					"shape",
					"payload",
					"ctx"
				]);
				const normalized = _normalized.value;
				const parseStr = (key) => {
					const k = esc(key);
					return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				};
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.keys) ids[key] = `key_${counter++}`;
				doc.write(`const newResult = {};`);
				for (const key of normalized.keys) {
					const id = ids[key];
					const k = esc(key);
					const schema = shape[key];
					const isOptionalIn = schema?._zod?.optin === "optional";
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(key)};`);
					if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
					else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				const fn = doc.compile();
				return (payload, ctx) => fn(shape, payload, ctx);
			};
			let fastpass;
			const isObject$2 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "values", () => {
				if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazy(inst._zod, "pattern", () => {
				if (def.options.every((o) => o._zod.pattern)) {
					const patterns = def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
				unrecIssue ?? (unrecIssue = iss);
				for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).l = true;
				}
			} else result.issues.push(iss);
			for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
			else result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length && unrecIssue) result.issues.push({
				...unrecIssue,
				keys: bothKeys
			});
			if (aborted(result)) return result;
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			result.value = merged.data;
			return result;
		}
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				payload.fallback = true;
				return payload;
			};
		});
		function handleOptionalResult(result, input) {
			if (input === void 0 && (result.issues.length || result.fallback)) return {
				issues: [],
				value: void 0
			};
			return result;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.optout = "optional";
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
			});
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (def.innerType._zod.optin === "optional") {
					const input = payload.value;
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
					return handleOptionalResult(result, input);
				}
				if (payload.value === void 0) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => {
				const v = def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => {
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				});
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => def.in._zod.values);
			defineLazy(inst._zod, "optin", () => def.in._zod.optin);
			defineLazy(inst._zod, "optout", () => def.out._zod.optout);
			defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.length) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues,
				fallback: left.fallback
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
			defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class({
				type: "string",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class({
				type: "number",
				checks: [],
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class, params) {
			return new Class({
				type: "boolean",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				external: params?.external ?? void 0
			};
		}
		function process(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					process(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) Object.assign(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
					};
				}
				if (entry[1] === root) return { ref: "#" };
				const defUriPrefix = `#/${defsSegment}/`;
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + defId
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") {
						extractToDef(entry);
						continue;
					}
				}
			}
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else Object.assign(schema, refSchema);
					Object.assign(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			Object.assign(result, root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					defs[seen.defId] = seen.def;
				}
			}
			if (ctx.external) {} else if (Object.keys(defs).length > 0) {
				if (ctx.target === "draft-2020-12") result.$defs = defs;
				else result.definitions = defs;
			}
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time") delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const regexes = [...patterns];
				if (regexes.length === 1) json.pattern = regexes[0].source;
				else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
			if (typeof format === "string" && format.includes("int")) json.type = "integer";
			else json.type = "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) {
				if (legacy) {
					json.minimum = exclusiveMinimum;
					json.exclusiveMinimum = true;
				} else json.exclusiveMinimum = exclusiveMinimum;
			} else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) {
				if (legacy) {
					json.maximum = exclusiveMaximum;
					json.exclusiveMaximum = true;
				} else json.exclusiveMaximum = exclusiveMaximum;
			} else if (typeof maximum === "number") json.maximum = maximum;
			if (typeof multipleOf === "number") json.multipleOf = multipleOf;
		};
		const booleanProcessor = (_schema, _ctx, json, _params) => {
			json.type = "boolean";
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const customProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = schema._zod.bag;
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = process(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			json.properties = {};
			const shape = def.shape;
			for (const key in shape) json.properties[key] = process(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			});
			const allKeys = new Set(Object.keys(shape));
			const requiredKeys = new Set([...allKeys].filter((key) => {
				const v = def.shape[key]._zod;
				if (ctx.io === "input") return v.optin === void 0;
				else return v.optout === void 0;
			}));
			if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => process(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = process(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = process(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				throw new Error("Dynamic catch values are not supported in JSON Schema");
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
			return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
		}
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function date(params) {
			return /* @__PURE__ */ _isoDate(ZodISODate, params);
		}
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function time(params) {
			return /* @__PURE__ */ _isoTime(ZodISOTime, params);
		}
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function duration(params) {
			return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
		}
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			Object.defineProperties(inst, {
				format: { value: (mapper) => formatError(inst, mapper) },
				flatten: { value: (mapper) => flattenError(inst, mapper) },
				addIssue: { value: (issue) => {
					inst.issues.push(issue);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				addIssues: { value: (issues) => {
					inst.issues.push(...issues);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				isEmpty: { get() {
					return inst.issues.length === 0;
				} }
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
		const _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
			const proto = Object.getPrototypeOf(inst);
			let installed = _installedGroups.get(proto);
			if (!installed) {
				installed = /* @__PURE__ */ new Set();
				_installedGroups.set(proto, installed);
			}
			if (installed.has(group)) return;
			installed.add(group);
			for (const key in methods) {
				const fn = methods[key];
				Object.defineProperty(proto, key, {
					configurable: true,
					enumerable: false,
					get() {
						const bound = fn.bind(this);
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: bound
						});
						return bound;
					},
					set(v) {
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: v
						});
					}
				});
			}
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			$ZodType.init(inst, def);
			Object.assign(inst["~standard"], { jsonSchema: {
				input: createStandardJSONSchemaMethod(inst, "input"),
				output: createStandardJSONSchemaMethod(inst, "output")
			} });
			inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
			inst.def = def;
			inst.type = def.type;
			Object.defineProperty(inst, "_def", { value: def });
			inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
			inst.safeParse = (data, params) => safeParse(inst, data, params);
			inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
			inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
			inst.spa = inst.safeParseAsync;
			inst.encode = (data, params) => encode(inst, data, params);
			inst.decode = (data, params) => decode(inst, data, params);
			inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
			inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
			inst.safeEncode = (data, params) => safeEncode(inst, data, params);
			inst.safeDecode = (data, params) => safeDecode(inst, data, params);
			inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
			inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
			_installLazyMethods(inst, "ZodType", {
				check(...chks) {
					const def = this.def;
					return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
						check: ch,
						def: { check: "custom" },
						onattach: []
					} } : ch)] }), { parent: true });
				},
				with(...chks) {
					return this.check(...chks);
				},
				clone(def, params) {
					return clone(this, def, params);
				},
				brand() {
					return this;
				},
				register(reg, meta) {
					reg.add(this, meta);
					return this;
				},
				refine(check, params) {
					return this.check(refine(check, params));
				},
				superRefine(refinement, params) {
					return this.check(superRefine(refinement, params));
				},
				overwrite(fn) {
					return this.check(/* @__PURE__ */ _overwrite(fn));
				},
				optional() {
					return optional(this);
				},
				exactOptional() {
					return exactOptional(this);
				},
				nullable() {
					return nullable(this);
				},
				nullish() {
					return optional(nullable(this));
				},
				nonoptional(params) {
					return nonoptional(this, params);
				},
				array() {
					return array(this);
				},
				or(arg) {
					return union([this, arg]);
				},
				and(arg) {
					return intersection(this, arg);
				},
				transform(tx) {
					return pipe(this, transform(tx));
				},
				default(d) {
					return _default(this, d);
				},
				prefault(d) {
					return prefault(this, d);
				},
				catch(params) {
					return _catch(this, params);
				},
				pipe(target) {
					return pipe(this, target);
				},
				readonly() {
					return readonly(this);
				},
				describe(description) {
					const cl = this.clone();
					globalRegistry.add(cl, { description });
					return cl;
				},
				meta(...args) {
					if (args.length === 0) return globalRegistry.get(this);
					const cl = this.clone();
					globalRegistry.add(cl, args[0]);
					return cl;
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(fn) {
					return fn(this);
				}
			});
			Object.defineProperty(inst, "description", {
				get() {
					return globalRegistry.get(inst)?.description;
				},
				configurable: true
			});
			return inst;
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
			const bag = inst._zod.bag;
			inst.format = bag.format ?? null;
			inst.minLength = bag.minimum ?? null;
			inst.maxLength = bag.maximum ?? null;
			_installLazyMethods(inst, "_ZodString", {
				regex(...args) {
					return this.check(/* @__PURE__ */ _regex(...args));
				},
				includes(...args) {
					return this.check(/* @__PURE__ */ _includes(...args));
				},
				startsWith(...args) {
					return this.check(/* @__PURE__ */ _startsWith(...args));
				},
				endsWith(...args) {
					return this.check(/* @__PURE__ */ _endsWith(...args));
				},
				min(...args) {
					return this.check(/* @__PURE__ */ _minLength(...args));
				},
				max(...args) {
					return this.check(/* @__PURE__ */ _maxLength(...args));
				},
				length(...args) {
					return this.check(/* @__PURE__ */ _length(...args));
				},
				nonempty(...args) {
					return this.check(/* @__PURE__ */ _minLength(1, ...args));
				},
				lowercase(params) {
					return this.check(/* @__PURE__ */ _lowercase(params));
				},
				uppercase(params) {
					return this.check(/* @__PURE__ */ _uppercase(params));
				},
				trim() {
					return this.check(/* @__PURE__ */ _trim());
				},
				normalize(...args) {
					return this.check(/* @__PURE__ */ _normalize(...args));
				},
				toLowerCase() {
					return this.check(/* @__PURE__ */ _toLowerCase());
				},
				toUpperCase() {
					return this.check(/* @__PURE__ */ _toUpperCase());
				},
				slugify() {
					return this.check(/* @__PURE__ */ _slugify());
				}
			});
		});
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
			inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
			inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
			inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
			inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
			inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
			inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
			inst.datetime = (params) => inst.check(datetime(params));
			inst.date = (params) => inst.check(date(params));
			inst.time = (params) => inst.check(time(params));
			inst.duration = (params) => inst.check(duration(params));
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			_installLazyMethods(inst, "ZodNumber", {
				gt(value, params) {
					return this.check(/* @__PURE__ */ _gt(value, params));
				},
				gte(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				min(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				lt(value, params) {
					return this.check(/* @__PURE__ */ _lt(value, params));
				},
				lte(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				max(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				int(params) {
					return this.check(int(params));
				},
				safe(params) {
					return this.check(int(params));
				},
				positive(params) {
					return this.check(/* @__PURE__ */ _gt(0, params));
				},
				nonnegative(params) {
					return this.check(/* @__PURE__ */ _gte(0, params));
				},
				negative(params) {
					return this.check(/* @__PURE__ */ _lt(0, params));
				},
				nonpositive(params) {
					return this.check(/* @__PURE__ */ _lte(0, params));
				},
				multipleOf(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				step(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				finite() {
					return this;
				}
			});
			const bag = inst._zod.bag;
			inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
			inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
			inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
			inst.isFinite = true;
			inst.format = bag.format ?? null;
		});
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
			$ZodBoolean.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean(params) {
			return /* @__PURE__ */ _boolean(ZodBoolean, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
			_installLazyMethods(inst, "ZodArray", {
				min(n, params) {
					return this.check(/* @__PURE__ */ _minLength(n, params));
				},
				nonempty(params) {
					return this.check(/* @__PURE__ */ _minLength(1, params));
				},
				max(n, params) {
					return this.check(/* @__PURE__ */ _maxLength(n, params));
				},
				length(n, params) {
					return this.check(/* @__PURE__ */ _length(n, params));
				},
				unwrap() {
					return this.element;
				}
			});
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			defineLazy(inst, "shape", () => {
				return def.shape;
			});
			_installLazyMethods(inst, "ZodObject", {
				keyof() {
					return _enum(Object.keys(this._zod.def.shape));
				},
				catchall(catchall) {
					return this.clone({
						...this._zod.def,
						catchall
					});
				},
				passthrough() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				loose() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				strict() {
					return this.clone({
						...this._zod.def,
						catchall: never()
					});
				},
				strip() {
					return this.clone({
						...this._zod.def,
						catchall: void 0
					});
				},
				extend(incoming) {
					return extend(this, incoming);
				},
				safeExtend(incoming) {
					return safeExtend(this, incoming);
				},
				merge(other) {
					return merge(this, other);
				},
				pick(mask) {
					return pick(this, mask);
				},
				omit(mask) {
					return omit(this, mask);
				},
				partial(...args) {
					return partial(ZodOptional, this, args[0]);
				},
				required(...args) {
					return required(ZodNonOptional, this, args[0]);
				}
			});
		});
		function object(shape, params) {
			const def = {
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			};
			return new ZodObject(def);
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = Object.values(def.entries);
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
			return new ZodEnum({
				type: "enum",
				entries,
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				payload.value = output;
				payload.fallback = true;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region src/typert-descriptors.ts
		/** Strict Typert codecs shared by the Host and browser contribution artifacts. */
		const PACKAGE_NAME = "dsh-file-review-tab";
		const diffSchema = object({
			path: string(),
			oldText: string().nullable(),
			newText: string(),
			oldStart: number().int().min(1).optional(),
			newStart: number().int().min(1).optional()
		});
		const requestSchema = object({
			action: _enum(["undo", "redo"]),
			files: array(object({
				path: string(),
				diffs: array(diffSchema)
			}))
		});
		const resultSchema = object({ files: array(object({
			path: string(),
			state: _enum([
				"applied",
				"undone",
				"conflict",
				"unsupported",
				"error"
			]),
			changed: boolean(),
			reason: string().optional()
		})) });
		const agentCodec = {
			mode: "strict",
			typeSymbol: "@deepseek-ai/dsh-session/types#SessionId",
			schema: intersection(string(), unknown())
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
		const recordedMutationSchema = object({
			rootCallId: string(),
			name: string(),
			path: string(),
			before: string().nullable(),
			after: string()
		});
		const recordedRequestSchema = object({ rootCallIds: array(string()) });
		const recordedResultSchema = object({ mutations: array(recordedMutationSchema) });
		const recordedRequestCodec = {
			mode: "strict",
			typeSymbol: `${PACKAGE_NAME}#RecordedRequest`,
			schema: recordedRequestSchema
		};
		const recordedResultCodec = {
			mode: "strict",
			typeSymbol: `${PACKAGE_NAME}#RecordedResult`,
			schema: recordedResultSchema
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
		function recordedDescriptor() {
			return {
				id: `${PACKAGE_NAME}#fileReview/recorded`,
				service: "fileReview",
				namespace: "fileReview",
				method: "recorded",
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
					codec: recordedRequestCodec
				}],
				result: recordedResultCodec
			};
		}
		//#endregion
		//#region src/remote.ts
		const TYPERT_REMOTE = {
			package: PACKAGE_NAME,
			descriptors: [
				descriptor("status"),
				descriptor("apply"),
				recordedDescriptor()
			]
		};
		//#endregion
		//#region src/client/deleted-paths.ts
		/**
		* Literal deletion-path extraction from terminal call views (unknown-safe).
		*
		* dsh has no dedicated delete-file tool: agents delete through the Bash/Pwsh
		* terminals, whose call views carry the raw command line in `title`. There is
		* no filesystem snapshot to consult, so this parser is deliberately
		* conservative — it only reports paths that appear VERBATIM as arguments of a
		* known deletion command:
		*
		* - command substitution (`$(…)`, backticks) or process substitution anywhere
		*   in a segment disqualifies that whole segment;
		* - glob characters (`* ? [`) or variable expansion (`$`) in an argument
		*   disqualify that argument (the affected set cannot be enumerated post
		*   hoc);
		* - shell separators (`&&`, `||`, `|`, `;`, newline) split the line so
		*   `rm a && rm b` reports both while `echo rm x` reports nothing.
		*
		* A reported path is display-only vocabulary: the file is gone, so it carries
		* no diff hunks and no undo. Directories deleted with `rm -r` surface as the
		* directory path itself.
		*/
		/** Commands whose literal arguments name deleted paths (POSIX + PowerShell aliases). */
		const DELETERS = /* @__PURE__ */ new Set([
			"rm",
			"rmdir",
			"unlink",
			"shred",
			"trash",
			"remove-item",
			"ri",
			"del",
			"rd",
			"erase"
		]);
		/** PowerShell parameters whose NEXT argument is the path, not an option value. */
		const PATH_PARAMETERS = /^-(path|literalpath)$/i;
		/** Arguments never treated as paths: glob/expansion-bearing or self/parent refs. */
		function isPathlike(token) {
			if (token === "" || token === "." || token === "..") return false;
			return !/[*?\[\]$]/.test(token);
		}
		/**
		* Split one command line on shell separators, honoring quotes so a `;` inside
		* a quoted argument does not split.
		*/
		function splitSegments(command) {
			const segments = [];
			let current = "";
			let quote = null;
			for (let at = 0; at < command.length; at += 1) {
				const char = command[at];
				if (quote !== null) {
					if (char === "\\") {
						const next = command[at + 1];
						if (quote === "\"" && next === "\"") {
							current += char + "\"";
							at += 1;
							continue;
						}
						current += char;
						continue;
					}
					if (char === quote) quote = null;
					current += char;
					continue;
				}
				if (char === "\"" || char === "'") {
					quote = char;
					current += char;
					continue;
				}
				const two = command.slice(at, at + 2);
				if (two === "&&" || two === "||") {
					segments.push(current);
					current = "";
					at += 1;
					continue;
				}
				if (char === "|" || char === ";" || char === "\n") {
					segments.push(current);
					current = "";
					continue;
				}
				current += char;
			}
			segments.push(current);
			return segments;
		}
		/**
		* Shell-like tokenization of one segment, quotes joined into the token.
		* Backslash semantics follow the Windows-relevant reading: inside SINGLE
		* quotes (bash/PowerShell alike) everything is literal, and unquoted
		* backslashes stay literal too (PowerShell paths); only inside DOUBLE quotes
		* does a backslash escape the closing quote or itself (bash). A trailing open
		* quote still yields the tokens gathered so far.
		*/
		function tokenize$1(segment) {
			const tokens = [];
			let current = "";
			let quote = null;
			const flush = () => {
				if (current !== "") tokens.push(current);
				current = "";
			};
			for (let at = 0; at < segment.length; at += 1) {
				const char = segment[at];
				if (char === void 0) break;
				if (quote !== null) {
					if (char === "\\") {
						const next = segment[at + 1];
						if (quote === "\"" && (next === "\"" || next === "\\")) {
							current += next;
							at += 1;
							continue;
						}
						current += char;
						continue;
					}
					if (char === quote) {
						quote = null;
						continue;
					}
					current += char;
					continue;
				}
				if (char === "\"" || char === "'") {
					quote = char;
					continue;
				}
				if (/\s/.test(char)) {
					flush();
					continue;
				}
				current += char;
			}
			flush();
			return tokens;
		}
		/**
		* Deletion paths named literally by one terminal command line, in argument
		* order, deduplicated. `undefined`/non-string titles and non-terminal views
		* report nothing.
		*/
		function deletedPathsFromCommand(command) {
			const paths = [];
			const seen = /* @__PURE__ */ new Set();
			const accept = (raw) => {
				for (const part of raw.split(",")) {
					if (!isPathlike(part) || seen.has(part)) continue;
					seen.add(part);
					paths.push(part);
				}
			};
			for (const segment of splitSegments(command)) {
				if (segment.includes("$(") || segment.includes("`") || segment.includes("<(")) continue;
				const tokens = tokenize$1(segment);
				let at = 0;
				while (at < tokens.length) {
					const head = tokens[at];
					if (head === void 0 || !/^[A-Za-z_][A-Za-z0-9_]*=/.test(head)) break;
					at += 1;
				}
				const commandWord = tokens[at];
				if (commandWord === void 0) continue;
				const basename = commandWord.slice(Math.max(commandWord.lastIndexOf("/"), commandWord.lastIndexOf("\\")) + 1);
				if (!DELETERS.has(basename.toLowerCase())) continue;
				for (let index = at + 1; index < tokens.length; index += 1) {
					const token = tokens[index];
					if (token === void 0) continue;
					if (token.startsWith("-")) {
						if (PATH_PARAMETERS.test(token) && index + 1 < tokens.length) {
							index += 1;
							const named = tokens[index];
							if (named !== void 0) accept(named);
						}
						continue;
					}
					accept(token);
				}
			}
			return paths;
		}
		/**
		* Deleted paths reported by one tool call view: terminal cards carry the
		* command in `title`. Every other card shape (diff/generic/…) declares no
		* deletions.
		*/
		function deletedPaths(view) {
			if (typeof view !== "object" || view === null || Array.isArray(view)) return [];
			const record = view;
			if (record.card !== "terminal" || typeof record.title !== "string") return [];
			return deletedPathsFromCommand(record.title);
		}
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/base.js
		var Diff = class {
			diff(oldStr, newStr, options = {}) {
				let callback;
				if (typeof options === "function") {
					callback = options;
					options = {};
				} else if ("callback" in options) callback = options.callback;
				const oldString = this.castInput(oldStr, options);
				const newString = this.castInput(newStr, options);
				const oldTokens = this.removeEmpty(this.tokenize(oldString, options));
				const newTokens = this.removeEmpty(this.tokenize(newString, options));
				return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
			}
			diffWithOptionsObj(oldTokens, newTokens, options, callback) {
				var _a;
				const done = (value) => {
					value = this.postProcess(value, options);
					if (callback) {
						setTimeout(function() {
							callback(value);
						}, 0);
						return;
					} else return value;
				};
				const newLen = newTokens.length, oldLen = oldTokens.length;
				let editLength = 1;
				let maxEditLength = newLen + oldLen;
				if (options.maxEditLength != null) maxEditLength = Math.min(maxEditLength, options.maxEditLength);
				const maxExecutionTime = (_a = options.timeout) !== null && _a !== void 0 ? _a : Infinity;
				const abortAfterTimestamp = Date.now() + maxExecutionTime;
				const bestPath = [{
					oldPos: -1,
					lastComponent: void 0
				}];
				let newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
				if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
				let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
				const execEditLength = () => {
					for (let diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
						let basePath;
						const removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
						if (removePath) bestPath[diagonalPath - 1] = void 0;
						let canAdd = false;
						if (addPath) {
							const addPathNewPos = addPath.oldPos - diagonalPath;
							canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
						}
						const canRemove = removePath && removePath.oldPos + 1 < oldLen;
						if (!canAdd && !canRemove) {
							bestPath[diagonalPath] = void 0;
							continue;
						}
						if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) basePath = this.addToPath(addPath, true, false, 0, options);
						else basePath = this.addToPath(removePath, false, true, 1, options);
						newPos = this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
						if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) return done(this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
						else {
							bestPath[diagonalPath] = basePath;
							if (basePath.oldPos + 1 >= oldLen) maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
							if (newPos + 1 >= newLen) minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
						}
					}
					editLength++;
				};
				if (callback) (function exec() {
					setTimeout(function() {
						if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) return callback(void 0);
						if (!execEditLength()) exec();
					}, 0);
				})();
				else while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
					const ret = execEditLength();
					if (ret) return ret;
				}
			}
			addToPath(path, added, removed, oldPosInc, options) {
				const last = path.lastComponent;
				if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) return {
					oldPos: path.oldPos + oldPosInc,
					lastComponent: {
						count: last.count + 1,
						added,
						removed,
						previousComponent: last.previousComponent
					}
				};
				else return {
					oldPos: path.oldPos + oldPosInc,
					lastComponent: {
						count: 1,
						added,
						removed,
						previousComponent: last
					}
				};
			}
			extractCommon(basePath, newTokens, oldTokens, diagonalPath, options) {
				const newLen = newTokens.length, oldLen = oldTokens.length;
				let oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
				while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldTokens[oldPos + 1], newTokens[newPos + 1], options)) {
					newPos++;
					oldPos++;
					commonCount++;
					if (options.oneChangePerToken) basePath.lastComponent = {
						count: 1,
						previousComponent: basePath.lastComponent,
						added: false,
						removed: false
					};
				}
				if (commonCount && !options.oneChangePerToken) basePath.lastComponent = {
					count: commonCount,
					previousComponent: basePath.lastComponent,
					added: false,
					removed: false
				};
				basePath.oldPos = oldPos;
				return newPos;
			}
			equals(left, right, options) {
				if (options.comparator) return options.comparator(left, right);
				else return left === right || !!options.ignoreCase && left.toLowerCase() === right.toLowerCase();
			}
			removeEmpty(array) {
				const ret = [];
				for (let i = 0; i < array.length; i++) if (array[i]) ret.push(array[i]);
				return ret;
			}
			castInput(value, options) {
				return value;
			}
			tokenize(value, options) {
				return Array.from(value);
			}
			join(chars) {
				return chars.join("");
			}
			postProcess(changeObjects, options) {
				return changeObjects;
			}
			get useLongestToken() {
				return false;
			}
			buildValues(lastComponent, newTokens, oldTokens) {
				const components = [];
				let nextComponent;
				while (lastComponent) {
					components.push(lastComponent);
					nextComponent = lastComponent.previousComponent;
					delete lastComponent.previousComponent;
					lastComponent = nextComponent;
				}
				components.reverse();
				const componentLen = components.length;
				let componentPos = 0, newPos = 0, oldPos = 0;
				for (; componentPos < componentLen; componentPos++) {
					const component = components[componentPos];
					if (!component.removed) {
						if (!component.added && this.useLongestToken) {
							let value = newTokens.slice(newPos, newPos + component.count);
							value = value.map(function(value, i) {
								const oldValue = oldTokens[oldPos + i];
								return oldValue.length > value.length ? oldValue : value;
							});
							component.value = this.join(value);
						} else component.value = this.join(newTokens.slice(newPos, newPos + component.count));
						newPos += component.count;
						if (!component.added) oldPos += component.count;
					} else {
						component.value = this.join(oldTokens.slice(oldPos, oldPos + component.count));
						oldPos += component.count;
					}
				}
				return components;
			}
		};
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/character.js
		var CharacterDiff = class extends Diff {};
		new CharacterDiff();
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/util/string.js
		function longestCommonPrefix(str1, str2) {
			let i;
			for (i = 0; i < str1.length && i < str2.length; i++) if (str1[i] != str2[i]) return str1.slice(0, i);
			return str1.slice(0, i);
		}
		function longestCommonSuffix(str1, str2) {
			let i;
			if (!str1 || !str2 || str1[str1.length - 1] != str2[str2.length - 1]) return "";
			for (i = 0; i < str1.length && i < str2.length; i++) if (str1[str1.length - (i + 1)] != str2[str2.length - (i + 1)]) return str1.slice(-i);
			return str1.slice(-i);
		}
		function replacePrefix(string, oldPrefix, newPrefix) {
			if (string.slice(0, oldPrefix.length) != oldPrefix) throw Error(`string ${JSON.stringify(string)} doesn't start with prefix ${JSON.stringify(oldPrefix)}; this is a bug`);
			return newPrefix + string.slice(oldPrefix.length);
		}
		function replaceSuffix(string, oldSuffix, newSuffix) {
			if (!oldSuffix) return string + newSuffix;
			if (string.slice(-oldSuffix.length) != oldSuffix) throw Error(`string ${JSON.stringify(string)} doesn't end with suffix ${JSON.stringify(oldSuffix)}; this is a bug`);
			return string.slice(0, -oldSuffix.length) + newSuffix;
		}
		function removePrefix(string, oldPrefix) {
			return replacePrefix(string, oldPrefix, "");
		}
		function removeSuffix(string, oldSuffix) {
			return replaceSuffix(string, oldSuffix, "");
		}
		function maximumOverlap(string1, string2) {
			return string2.slice(0, overlapCount(string1, string2));
		}
		function overlapCount(a, b) {
			let startA = 0;
			if (a.length > b.length) startA = a.length - b.length;
			let endB = b.length;
			if (a.length < b.length) endB = a.length;
			const map = Array(endB);
			let k = 0;
			map[0] = 0;
			for (let j = 1; j < endB; j++) {
				if (b[j] == b[k]) map[j] = map[k];
				else map[j] = k;
				while (k > 0 && b[j] != b[k]) k = map[k];
				if (b[j] == b[k]) k++;
			}
			k = 0;
			for (let i = startA; i < a.length; i++) {
				while (k > 0 && a[i] != b[k]) k = map[k];
				if (a[i] == b[k]) k++;
			}
			return k;
		}
		/**
		* Split a string into segments using a word segmenter, merging consecutive
		* segments if they are both whitespace segments. Whitespace segments can
		* appear adjacent to one another for two reasons:
		* - newlines always get their own segment
		* - where a diacritic is attached to a whitespace character in the text, the
		*   segment ends after the diacritic, so e.g. " \u0300 " becomes two segments.
		* This function therefore runs the segmenter's .segment() method and then
		* merges consecutive segments of whitespace into a single part.
		*/
		function segment(string, segmenter) {
			const parts = [];
			for (const segmentObj of Array.from(segmenter.segment(string))) {
				const segment = segmentObj.segment;
				if (parts.length && /\s/.test(parts[parts.length - 1]) && /\s/.test(segment)) parts[parts.length - 1] += segment;
				else parts.push(segment);
			}
			return parts;
		}
		function trailingWs(string, segmenter) {
			if (segmenter) return leadingAndTrailingWs(string, segmenter)[1];
			let i;
			for (i = string.length - 1; i >= 0; i--) if (!string[i].match(/\s/)) break;
			return string.substring(i + 1);
		}
		function leadingWs(string, segmenter) {
			if (segmenter) return leadingAndTrailingWs(string, segmenter)[0];
			const match = string.match(/^\s*/);
			return match ? match[0] : "";
		}
		function leadingAndTrailingWs(string, segmenter) {
			if (!segmenter) return [leadingWs(string), trailingWs(string)];
			if (segmenter.resolvedOptions().granularity != "word") throw new Error("The segmenter passed must have a granularity of \"word\"");
			const segments = segment(string, segmenter);
			const firstSeg = segments[0];
			const lastSeg = segments[segments.length - 1];
			return [/\s/.test(firstSeg) ? firstSeg : "", /\s/.test(lastSeg) ? lastSeg : ""];
		}
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/word.js
		const extendedWordChars = "a-zA-Z0-9_\\u{AD}\\u{C0}-\\u{D6}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}";
		const tokenizeIncludingWhitespace = new RegExp(`[${extendedWordChars}]+|\\s+|[^${extendedWordChars}]`, "ug");
		var WordDiff = class extends Diff {
			equals(left, right, options) {
				if (options.ignoreCase) {
					left = left.toLowerCase();
					right = right.toLowerCase();
				}
				return left.trim() === right.trim();
			}
			tokenize(value, options = {}) {
				let parts;
				if (options.intlSegmenter) {
					const segmenter = options.intlSegmenter;
					if (segmenter.resolvedOptions().granularity != "word") throw new Error("The segmenter passed must have a granularity of \"word\"");
					parts = segment(value, segmenter);
				} else parts = value.match(tokenizeIncludingWhitespace) || [];
				const tokens = [];
				let prevPart = null;
				parts.forEach((part) => {
					if (/\s/.test(part)) {
						if (prevPart == null) tokens.push(part);
						else tokens.push(tokens.pop() + part);
					} else if (prevPart != null && /\s/.test(prevPart)) {
						if (tokens[tokens.length - 1] == prevPart) tokens.push(tokens.pop() + part);
						else tokens.push(prevPart + part);
					} else tokens.push(part);
					prevPart = part;
				});
				return tokens;
			}
			join(tokens) {
				return tokens.map((token, i) => {
					if (i == 0) return token;
					else return token.replace(/^\s+/, "");
				}).join("");
			}
			postProcess(changes, options) {
				if (!changes || options.oneChangePerToken) return changes;
				let lastKeep = null;
				let insertion = null;
				let deletion = null;
				changes.forEach((change) => {
					if (change.added) insertion = change;
					else if (change.removed) deletion = change;
					else {
						if (insertion || deletion) dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, change, options.intlSegmenter);
						lastKeep = change;
						insertion = null;
						deletion = null;
					}
				});
				if (insertion || deletion) dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, null, options.intlSegmenter);
				return changes;
			}
		};
		new WordDiff();
		function dedupeWhitespaceInChangeObjects(startKeep, deletion, insertion, endKeep, segmenter) {
			if (deletion && insertion) {
				const [oldWsPrefix, oldWsSuffix] = leadingAndTrailingWs(deletion.value, segmenter);
				const [newWsPrefix, newWsSuffix] = leadingAndTrailingWs(insertion.value, segmenter);
				if (startKeep) {
					const commonWsPrefix = longestCommonPrefix(oldWsPrefix, newWsPrefix);
					startKeep.value = replaceSuffix(startKeep.value, newWsPrefix, commonWsPrefix);
					deletion.value = removePrefix(deletion.value, commonWsPrefix);
					insertion.value = removePrefix(insertion.value, commonWsPrefix);
				}
				if (endKeep) {
					const commonWsSuffix = longestCommonSuffix(oldWsSuffix, newWsSuffix);
					endKeep.value = replacePrefix(endKeep.value, newWsSuffix, commonWsSuffix);
					deletion.value = removeSuffix(deletion.value, commonWsSuffix);
					insertion.value = removeSuffix(insertion.value, commonWsSuffix);
				}
			} else if (insertion) {
				if (startKeep) {
					const ws = leadingWs(insertion.value, segmenter);
					insertion.value = insertion.value.substring(ws.length);
				}
				if (endKeep) {
					const ws = leadingWs(endKeep.value, segmenter);
					endKeep.value = endKeep.value.substring(ws.length);
				}
			} else if (startKeep && endKeep) {
				const newWsFull = leadingWs(endKeep.value, segmenter), [delWsStart, delWsEnd] = leadingAndTrailingWs(deletion.value, segmenter);
				const newWsStart = longestCommonPrefix(newWsFull, delWsStart);
				deletion.value = removePrefix(deletion.value, newWsStart);
				const newWsEnd = longestCommonSuffix(removePrefix(newWsFull, newWsStart), delWsEnd);
				deletion.value = removeSuffix(deletion.value, newWsEnd);
				endKeep.value = replacePrefix(endKeep.value, newWsFull, newWsEnd);
				startKeep.value = replaceSuffix(startKeep.value, newWsFull, newWsFull.slice(0, newWsFull.length - newWsEnd.length));
			} else if (endKeep) {
				const endKeepWsPrefix = leadingWs(endKeep.value, segmenter);
				const overlap = maximumOverlap(trailingWs(deletion.value, segmenter), endKeepWsPrefix);
				deletion.value = removeSuffix(deletion.value, overlap);
			} else if (startKeep) {
				const overlap = maximumOverlap(trailingWs(startKeep.value, segmenter), leadingWs(deletion.value, segmenter));
				deletion.value = removePrefix(deletion.value, overlap);
			}
		}
		var WordsWithSpaceDiff = class extends Diff {
			tokenize(value) {
				const regex = new RegExp(`(\\r?\\n)|[${extendedWordChars}]+|[^\\S\\n\\r]+|[^${extendedWordChars}]`, "ug");
				return value.match(regex) || [];
			}
		};
		new WordsWithSpaceDiff();
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/line.js
		var LineDiff = class extends Diff {
			constructor() {
				super(...arguments);
				this.tokenize = tokenize;
			}
			equals(left, right, options) {
				if (options.ignoreWhitespace) {
					if (!options.newlineIsToken || !left.includes("\n")) left = left.trim();
					if (!options.newlineIsToken || !right.includes("\n")) right = right.trim();
				} else if (options.ignoreNewlineAtEof && !options.newlineIsToken) {
					if (left.endsWith("\n")) left = left.slice(0, -1);
					if (right.endsWith("\n")) right = right.slice(0, -1);
				}
				return super.equals(left, right, options);
			}
		};
		new LineDiff();
		function tokenize(value, options) {
			if (options.stripTrailingCr) value = value.replace(/\r\n/g, "\n");
			const retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
			if (!linesAndNewlines[linesAndNewlines.length - 1]) linesAndNewlines.pop();
			for (let i = 0; i < linesAndNewlines.length; i++) {
				const line = linesAndNewlines[i];
				if (i % 2 && !options.newlineIsToken) retLines[retLines.length - 1] += line;
				else retLines.push(line);
			}
			return retLines;
		}
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/sentence.js
		function isSentenceEndPunct(char) {
			return char == "." || char == "!" || char == "?";
		}
		var SentenceDiff = class extends Diff {
			tokenize(value) {
				var _a;
				const result = [];
				let tokenStartI = 0;
				for (let i = 0; i < value.length; i++) {
					if (i == value.length - 1) {
						result.push(value.slice(tokenStartI));
						break;
					}
					if (isSentenceEndPunct(value[i]) && value[i + 1].match(/\s/)) {
						result.push(value.slice(tokenStartI, i + 1));
						i = tokenStartI = i + 1;
						while ((_a = value[i + 1]) === null || _a === void 0 ? void 0 : _a.match(/\s/)) i++;
						result.push(value.slice(tokenStartI, i + 1));
						tokenStartI = i + 1;
					}
				}
				return result;
			}
		};
		new SentenceDiff();
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/css.js
		var CssDiff = class extends Diff {
			tokenize(value) {
				return value.split(/([{}:;,]|\s+)/);
			}
		};
		new CssDiff();
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/json.js
		var JsonDiff = class extends Diff {
			constructor() {
				super(...arguments);
				this.tokenize = tokenize;
			}
			get useLongestToken() {
				return true;
			}
			castInput(value, options) {
				const { undefinedReplacement, stringifyReplacer = (k, v) => typeof v === "undefined" ? undefinedReplacement : v } = options;
				return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), null, "  ");
			}
			equals(left, right, options) {
				return super.equals(left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"), options);
			}
		};
		new JsonDiff();
		function canonicalize(obj, stack, replacementStack, replacer, key) {
			stack = stack || [];
			replacementStack = replacementStack || [];
			if (replacer) obj = replacer(key === void 0 ? "" : key, obj);
			let i;
			for (i = 0; i < stack.length; i += 1) if (stack[i] === obj) return replacementStack[i];
			let canonicalizedObj;
			if ("[object Array]" === Object.prototype.toString.call(obj)) {
				stack.push(obj);
				canonicalizedObj = new Array(obj.length);
				replacementStack.push(canonicalizedObj);
				for (i = 0; i < obj.length; i += 1) canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, String(i));
				stack.pop();
				replacementStack.pop();
				return canonicalizedObj;
			}
			if (obj && obj.toJSON) obj = obj.toJSON();
			if (typeof obj === "object" && obj !== null) {
				stack.push(obj);
				canonicalizedObj = {};
				replacementStack.push(canonicalizedObj);
				const sortedKeys = [];
				let key;
				for (key in obj)
 /* istanbul ignore else */
				if (Object.prototype.hasOwnProperty.call(obj, key)) sortedKeys.push(key);
				sortedKeys.sort();
				for (i = 0; i < sortedKeys.length; i += 1) {
					key = sortedKeys[i];
					canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack, replacer, key);
				}
				stack.pop();
				replacementStack.pop();
			} else canonicalizedObj = obj;
			return canonicalizedObj;
		}
		//#endregion
		//#region node_modules/.pnpm/diff@9.0.0/node_modules/diff/libesm/diff/array.js
		var ArrayDiff = class extends Diff {
			tokenize(value) {
				return value.slice();
			}
			join(value) {
				return value;
			}
			removeEmpty(value) {
				return value;
			}
		};
		const arrayDiff = new ArrayDiff();
		function diffArrays(oldArr, newArr, options) {
			return arrayDiff.diff(oldArr, newArr, options);
		}
		//#endregion
		//#region src/client/diff-text.ts
		/**
		* Split one side of a diff into content lines without manufacturing a final
		* empty line for a trailing line terminator.
		* @param text - One diff side's text.
		* @returns Content lines without the terminating newline.
		*/
		function diffContentLines(text) {
			if (text === "") return [];
			return (text.endsWith("\n") ? text.slice(0, -1) : text).split("\n");
		}
		//#endregion
		//#region src/client/recorded-diffs.ts
		/**
		* Reconstruct line-level review hunks from one recorded Code Mode mutation's
		* full before/after content. The wire views that carry reusable hunks only
		* ride model-direct tool/call frames; nested `run_code` dispatches are logged
		* with the raw values instead, so this module rebuilds the same hunk shape
		* (`ProducedFileDiff` with line anchors) the rest of the tab renders and the
		* Host undo service applies.
		*/
		/** Unchanged lines kept around each change run, matching unified-diff taste. */
		const CONTEXT_LINES = 3;
		/** Count identical trailing (context) lines of one hunk. */
		function trailingContext(hunk) {
			let count = 0;
			const max = Math.min(hunk.old.length, hunk.new.length);
			for (let offset = 1; offset <= max; offset += 1) {
				if (hunk.old[hunk.old.length - offset] !== hunk.new[hunk.new.length - offset]) break;
				count += 1;
			}
			return count;
		}
		/**
		* Line-level hunks for one file mutation, or a single whole-file entry when the
		* file was created (`before === null`, mirroring the write tool's null-content
		* card). Returns [] when the mutation did not change the file.
		*/
		function diffsFromBeforeAfter(path, before, after) {
			if (before === null) return after === "" ? [] : [{
				path,
				oldText: null,
				newText: after
			}];
			const oldLines = diffContentLines(before);
			const newLines = diffContentLines(after);
			if (oldLines.length === 0 && newLines.length === 0) return [];
			if (oldLines.join("\n") === newLines.join("\n")) return [];
			const hunks = [];
			const changes = diffArrays(oldLines, newLines);
			let contextBuffer = [];
			let oldCursor = 1;
			let newCursor = 1;
			let hunk = null;
			for (const change of changes) {
				if (!change.removed && !change.added) {
					const run = change.value;
					if (hunk !== null) {
						const beforeLen = hunk.old.length;
						hunk.old.push(...run);
						hunk.new.push(...run);
						oldCursor += run.length;
						newCursor += run.length;
						if (run.length > 6) {
							const target = beforeLen + CONTEXT_LINES;
							hunk.old.length = target;
							hunk.new.length = target;
							contextBuffer = run.slice(-3);
							hunk = null;
						}
					} else {
						contextBuffer.push(...run);
						oldCursor += run.length;
						newCursor += run.length;
						if (contextBuffer.length > CONTEXT_LINES) contextBuffer = contextBuffer.slice(-3);
					}
					continue;
				}
				const removed = change.removed ? change.value : [];
				const added = change.added ? change.value : [];
				if (hunk === null) {
					const leading = contextBuffer;
					hunk = {
						oldStart: oldCursor - leading.length,
						newStart: newCursor - leading.length,
						old: [...leading],
						new: [...leading]
					};
					hunks.push(hunk);
				}
				hunk.old.push(...removed);
				hunk.new.push(...added);
				oldCursor += removed.length;
				newCursor += added.length;
			}
			for (const current of hunks) {
				const extra = Math.max(0, trailingContext(current) - CONTEXT_LINES);
				if (extra > 0) {
					current.old.length -= extra;
					current.new.length -= extra;
				}
			}
			return hunks.filter((hunkEntry) => hunkEntry.old.length > 0 || hunkEntry.new.length > 0).map((hunkEntry) => ({
				path,
				oldText: hunkEntry.old.join("\n"),
				newText: hunkEntry.new.join("\n"),
				oldStart: hunkEntry.oldStart,
				newStart: hunkEntry.newStart
			}));
		}
		//#endregion
		//#region src/client/session-changes.ts
		/**
		* Paths a call view reports having created or changed, by render intent
		* rather than tool name: a diff card, or a generic card whose kind is `edit`.
		* Mirrors dsh-file-review's producedPaths exactly (unknown-safe).
		*/
		function producedPaths$1(view) {
			if (typeof view !== "object" || view === null || Array.isArray(view)) return [];
			const record = view;
			if (record.card !== "diff" && !(record.card === "generic" && record.kind === "edit")) return [];
			const locations = record.locations;
			if (!Array.isArray(locations)) return [];
			const paths = [];
			const seen = /* @__PURE__ */ new Set();
			for (const location of locations) {
				if (typeof location !== "object" || location === null || Array.isArray(location)) continue;
				const path = location.path;
				if (typeof path !== "string" || seen.has(path)) continue;
				seen.add(path);
				paths.push(path);
			}
			return paths;
		}
		/** Validate diff hunks crossing the Host/browser transport (unknown-safe). */
		function producedDiffs$1(view) {
			if (typeof view !== "object" || view === null || Array.isArray(view)) return [];
			const record = view;
			if (record.card !== "diff" || !Array.isArray(record.diffs)) return [];
			const diffs = [];
			for (const value of record.diffs) {
				if (typeof value !== "object" || value === null || Array.isArray(value)) return [];
				const { path, oldText, newText, oldStart, newStart } = value;
				if (typeof path !== "string" || oldText !== null && typeof oldText !== "string" || typeof newText !== "string" || oldStart !== void 0 && (typeof oldStart !== "number" || !Number.isInteger(oldStart) || oldStart < 1) || newStart !== void 0 && (typeof newStart !== "number" || !Number.isInteger(newStart) || newStart < 1)) return [];
				diffs.push({
					path,
					oldText,
					newText,
					...typeof oldStart === "number" ? { oldStart } : {},
					...typeof newStart === "number" ? { newStart } : {}
				});
			}
			return diffs;
		}
		/** Applied result hunks, or call-intent hunks when no result view exists. */
		function reviewDiffs$1(node) {
			if (node.resultView !== null) return producedDiffs$1(node.resultView);
			return producedDiffs$1(node.callView);
		}
		/**
		* Attribute an event seq to its owning turn. Completed turns own the seq
		* range up to their `turn/end` seq; anything past the last completed end
		* belongs to the live turn (the in-flight `partial` / running call's turn,
		* or the next turn number when nothing live is observable).
		*/
		function turnAttribution(snapshot) {
			const ends = [...snapshot.turnEnds.entries()].sort((a, b) => a[1] - b[1]);
			const liveTurn = snapshot.partial?.turn ?? snapshot.runningCalls[0]?.turn ?? (ends.at(-1)?.[0] ?? 0) + 1;
			return (seq) => {
				for (const [turn, endSeq] of ends) if (endSeq >= seq) return {
					turn,
					live: false
				};
				return {
					turn: liveTurn,
					live: true
				};
			};
		}
		/** Derive one session's per-turn produced-file changes (uncached core). */
		function derive(snapshot) {
			const attribute = turnAttribution(snapshot);
			const byTurn = /* @__PURE__ */ new Map();
			for (const node of snapshot.nodes) {
				if (node.kind !== "tool-result" || node.isError) continue;
				const paths = producedPaths$1(node.callView);
				const deletions = paths.length === 0 ? deletedPaths(node.callView) : [];
				if (paths.length === 0 && deletions.length === 0) continue;
				const diffs = reviewDiffs$1(node);
				const { turn, live } = attribute(node.seq);
				let group = byTurn.get(turn);
				if (group === void 0) {
					group = {
						live,
						files: /* @__PURE__ */ new Map()
					};
					byTurn.set(turn, group);
				}
				for (const path of paths) {
					const own = diffs.filter((diff) => diff.path === path);
					const existing = group.files.get(path);
					if (existing === void 0) group.files.set(path, { diffs: [...own] });
					else {
						existing.diffs.push(...own);
						delete existing.deleted;
					}
				}
				for (const path of deletions) {
					const existing = group.files.get(path);
					if (existing === void 0) group.files.set(path, {
						diffs: [],
						deleted: true
					});
					else existing.deleted = true;
				}
			}
			return [...byTurn.entries()].sort((a, b) => a[0] - b[0]).map(([turn, group]) => ({
				turn,
				live: group.live,
				files: [...group.files.entries()].map(([path, own]) => ({
					path,
					diffs: own.diffs,
					...own.deleted === true ? { deleted: true } : {}
				}))
			}));
		}
		/**
		* Snapshot-identity cache: the sidebar badge runs this derivation on every
		* tab-bar render, so the result is memoized per immutable snapshot reference
		* (the session publishes a fresh reference only when content changes).
		*/
		const cache = /* @__PURE__ */ new WeakMap();
		/** Derive per-turn produced-file changes for one session snapshot. */
		function deriveSessionChanges(snapshot) {
			if (snapshot === null) return [];
			const hit = cache.get(snapshot);
			if (hit !== void 0) return hit;
			const derived = derive(snapshot);
			cache.set(snapshot, derived);
			return derived;
		}
		/** Every `run_code` tool-result node in the window, in node order. */
		function deriveSessionRoots(snapshot) {
			const attribute = turnAttribution(snapshot);
			const roots = [];
			for (const node of snapshot.nodes) {
				if (node.kind !== "tool-result" || node.isError) continue;
				if (node.subCalls.length === 0) continue;
				const { turn, live } = attribute(node.seq);
				roots.push({
					turn,
					live,
					rootCallId: node.callId
				});
			}
			return roots;
		}
		/**
		* Merge Host-recorded Code Mode mutations into the snapshot-derived turns:
		* hunks rebuilt from the full before/after are appended to the owning turn's
		* file groups (same-path entries stay one row, hunks appended in dispatch
		* order), so the tab's diff rendering, status inspection and undo all work on
		* programmatic edits exactly like model-direct ones. All inputs are immutable;
		* the result is a fresh array only when a recorded mutation matched a visible
		* root.
		*/
		function mergeRecordedTurns(turns, roots, recorded) {
			if (recorded.length === 0 || roots.length === 0) return turns;
			const rootTurns = /* @__PURE__ */ new Map();
			for (const root of roots) rootTurns.set(root.rootCallId, {
				turn: root.turn,
				live: root.live
			});
			const byRoot = /* @__PURE__ */ new Map();
			for (const mutation of recorded) {
				const list = byRoot.get(mutation.rootCallId);
				if (list === void 0) byRoot.set(mutation.rootCallId, [mutation]);
				else list.push(mutation);
			}
			let matched = false;
			for (const root of roots) if (byRoot.has(root.rootCallId)) {
				matched = true;
				break;
			}
			if (!matched) return turns;
			const groups = /* @__PURE__ */ new Map();
			for (const turn of turns) {
				const files = /* @__PURE__ */ new Map();
				for (const file of turn.files) files.set(file.path, {
					diffs: [...file.diffs],
					...file.deleted === true ? { deleted: true } : {}
				});
				groups.set(turn.turn, {
					live: turn.live,
					files
				});
			}
			for (const [rootCallId, mutations] of byRoot) {
				const owner = rootTurns.get(rootCallId);
				if (owner === void 0) continue;
				let group = groups.get(owner.turn);
				if (group === void 0) {
					group = {
						live: owner.live,
						files: /* @__PURE__ */ new Map()
					};
					groups.set(owner.turn, group);
				}
				for (const mutation of mutations) {
					const diffs = diffsFromBeforeAfter(mutation.path, mutation.before, mutation.after);
					if (diffs.length === 0) continue;
					const existing = group.files.get(mutation.path);
					if (existing === void 0) group.files.set(mutation.path, { diffs: [...diffs] });
					else existing.diffs.push(...diffs);
				}
			}
			return [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([turn, group]) => ({
				turn,
				live: group.live,
				files: [...group.files.entries()].map(([path, own]) => ({
					path,
					diffs: own.diffs,
					...own.deleted === true ? { deleted: true } : {}
				}))
			}));
		}
		/** Count distinct changed paths across every turn (the sidebar badge count). */
		function countChangedFiles(turns) {
			const paths = /* @__PURE__ */ new Set();
			for (const turn of turns) for (const file of turn.files) paths.add(file.path);
			return paths.size;
		}
		/** Trailing path segment, the part that identifies the file at a glance. */
		function basename$1(path) {
			const at = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
			return at === -1 ? path : path.slice(at + 1);
		}
		/** POSIX root, drive-letter, or UNC absolute-path test (separator-agnostic). */
		function isAbsolutePath(path) {
			return path.startsWith("/") || path.startsWith("\\\\") || /^[A-Za-z]:[\\/]/.test(path);
		}
		/** Resolve a (possibly relative) tool path against the session cwd. */
		function resolveSessionPath(cwd, path) {
			if (isAbsolutePath(path)) return path;
			const base = cwd ?? "";
			if (base === "") return path;
			const separator = base.includes("\\") ? "\\" : "/";
			return `${base.replace(/[\\/]+$/, "")}${separator}${path}`;
		}
		//#endregion
		//#region \0dsh-file-review-tab-css:D:\DSH plugs\dsh-file-review-tab\src\client\UnifiedDiff.module.css.mjs
		const css$2 = ".Xu-SpW_unifiedBlock{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-markdown-code-block);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;margin:16px 0;position:relative;overflow:hidden}.Xu-SpW_unifiedEmbedded{border:0;border-radius:0;margin:0}.Xu-SpW_unifiedCopyButton{z-index:2;color:var(--dsw-alias-label-secondary);cursor:pointer;font:var(--dsw-font-xs-13);background:0 0;border:0;padding:0;position:absolute;top:10px;right:12px}.Xu-SpW_unifiedFile+.Xu-SpW_unifiedFile{border-top:1px solid var(--dsw-alias-border-l2)}.Xu-SpW_unifiedHeader{border-bottom:1px solid var(--dsw-alias-border-l2);min-height:38px;font:var(--dsw-font-markdown-code-block);align-items:center;gap:8px;padding:0 72px 0 12px;display:flex}.Xu-SpW_unifiedStatus{color:var(--dsw-alias-state-success-primary);font-weight:700}.Xu-SpW_unifiedPath{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.Xu-SpW_unifiedAdded{color:var(--dsw-alias-state-success-primary);margin-left:auto}.Xu-SpW_unifiedRemoved{color:var(--dsw-alias-state-error-primary)}.Xu-SpW_unifiedHunkHeader{border-bottom:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font:var(--dsw-font-markdown-code-block);padding:6px 12px}.Xu-SpW_unifiedBody{font:var(--dsw-font-markdown-code-block);overflow:auto hidden}.Xu-SpW_unifiedLine{white-space:pre;grid-template-columns:48px 24px minmax(max-content,1fr);min-width:max-content;min-height:23px;line-height:23px;display:grid}.Xu-SpW_unifiedLineNumber{border-right:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);text-align:right;user-select:none;padding:0 8px}.Xu-SpW_unifiedSign{text-align:center;user-select:none}.Xu-SpW_unifiedText{padding-right:14px}.Xu-SpW_unified_del{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 11%, transparent)}.Xu-SpW_unified_add{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 11%, transparent)}.Xu-SpW_unified_context{color:var(--dsw-alias-label-primary)}.Xu-SpW_unifiedGap{border:0;border-top:1px solid var(--dsw-alias-border-l1);border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-border-l1);width:100%;min-height:32px;color:var(--dsw-alias-label-secondary);cursor:pointer;font:var(--dsw-font-xs-13);text-align:left;padding:0 12px 0 72px;display:block}.Xu-SpW_unifiedGap:hover{color:var(--dsw-alias-label-primary)}.Xu-SpW_unifiedOmitted{border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-border-l1);min-height:32px;color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xs-13);align-items:center;gap:12px;padding:0 12px;display:flex}";
		const styleId$2 = "dsh-file-review-tab/UnifiedDiff.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(styleId$2) + "]") === null) {
			const style = document.createElement("style");
			style.dataset.plugin = "dsh-file-review-tab";
			style.dataset.pluginCss = styleId$2;
			style.textContent = css$2;
			document.head.appendChild(style);
		}
		var UnifiedDiff_module_css_default = {
			"unifiedOmitted": "Xu-SpW_unifiedOmitted",
			"unified_add": "Xu-SpW_unified_add",
			"unifiedBody": "Xu-SpW_unifiedBody",
			"unifiedHeader": "Xu-SpW_unifiedHeader",
			"unifiedEmbedded": "Xu-SpW_unifiedEmbedded",
			"unifiedAdded": "Xu-SpW_unifiedAdded",
			"unifiedGap": "Xu-SpW_unifiedGap",
			"unified_context": "Xu-SpW_unified_context",
			"unifiedStatus": "Xu-SpW_unifiedStatus",
			"unifiedLineNumber": "Xu-SpW_unifiedLineNumber",
			"unifiedFile": "Xu-SpW_unifiedFile",
			"unifiedHunkHeader": "Xu-SpW_unifiedHunkHeader",
			"unifiedPath": "Xu-SpW_unifiedPath",
			"unifiedCopyButton": "Xu-SpW_unifiedCopyButton",
			"unifiedText": "Xu-SpW_unifiedText",
			"unifiedSign": "Xu-SpW_unifiedSign",
			"unifiedBlock": "Xu-SpW_unifiedBlock",
			"unifiedRemoved": "Xu-SpW_unifiedRemoved",
			"unifiedLine": "Xu-SpW_unifiedLine",
			"unified_del": "Xu-SpW_unified_del"
		};
		//#endregion
		//#region src/client/UnifiedDiff.tsx
		function hunkLines(diff) {
			const changes = diffArrays(diff.oldText === null ? [] : diffContentLines(diff.oldText), diffContentLines(diff.newText));
			const lines = [];
			let oldNumber = diff.oldStart ?? 1;
			let newNumber = diff.newStart ?? 1;
			for (const change of changes) if (change.removed) for (const text of change.value) {
				lines.push({
					kind: "del",
					oldNumber,
					newNumber: null,
					text
				});
				oldNumber++;
			}
			else if (change.added) for (const text of change.value) {
				lines.push({
					kind: "add",
					oldNumber: null,
					newNumber,
					text
				});
				newNumber++;
			}
			else for (const text of change.value) {
				lines.push({
					kind: "context",
					oldNumber,
					newNumber,
					text
				});
				oldNumber++;
				newNumber++;
			}
			return lines;
		}
		function collapsedRows(lines, contextLines, hunkIndex) {
			const rows = [];
			let cursor = 0;
			let gapIndex = 0;
			while (cursor < lines.length) {
				const current = lines[cursor];
				if (current?.kind !== "context") {
					if (current !== void 0) rows.push(current);
					cursor++;
					continue;
				}
				const start = cursor;
				while (cursor < lines.length && lines[cursor]?.kind === "context") cursor++;
				const run = lines.slice(start, cursor);
				const leading = start === 0;
				const trailing = cursor === lines.length;
				const hiddenStart = leading ? 0 : Math.min(contextLines, run.length);
				const hiddenEnd = trailing ? run.length : Math.max(hiddenStart, run.length - contextLines);
				rows.push(...run.slice(0, hiddenStart));
				const hidden = run.slice(hiddenStart, hiddenEnd);
				if (hidden.length > 0) {
					rows.push({
						kind: "gap",
						id: `${hunkIndex}:${gapIndex}`,
						lines: hidden
					});
					gapIndex++;
				}
				rows.push(...run.slice(hiddenEnd));
			}
			return rows;
		}
		function buildHunks(diffs, contextLines) {
			let previousPath;
			let previousOldEnd = 1;
			let previousNewEnd = 1;
			return diffs.map((diff, index) => {
				const lines = hunkLines(diff);
				const oldCount = lines.filter((line) => line.oldNumber !== null).length;
				const newCount = lines.filter((line) => line.newNumber !== null).length;
				const oldStart = diff.oldStart ?? 1;
				const newStart = diff.newStart ?? 1;
				const unchangedBefore = diff.oldStart !== void 0 && diff.newStart !== void 0 ? Math.max(0, Math.min(oldStart - (diff.path === previousPath ? previousOldEnd : 1), newStart - (diff.path === previousPath ? previousNewEnd : 1))) : 0;
				previousPath = diff.path;
				previousOldEnd = oldStart + oldCount;
				previousNewEnd = newStart + newCount;
				return {
					rows: collapsedRows(lines, contextLines, index),
					added: lines.filter((line) => line.kind === "add").length,
					removed: lines.filter((line) => line.kind === "del").length,
					unchangedBefore
				};
			});
		}
		/** Serialize recorded hunks as one plain-text unified diff. */
		function unifiedDiffText(diffs) {
			let previousPath;
			const output = [];
			for (const diff of diffs) {
				if (diff.path !== previousPath) output.push(diff.path);
				else output.push(`@@ -${diff.oldStart ?? 1} +${diff.newStart ?? 1} @@`);
				previousPath = diff.path;
				for (const line of hunkLines(diff)) {
					const prefix = line.kind === "del" ? "-" : line.kind === "add" ? "+" : " ";
					output.push(`${prefix} ${line.text}`);
				}
			}
			return output.join("\n");
		}
		/** Count added and removed lines using the viewer's exact line-diff algorithm. */
		function summarizeDiffs(diffs) {
			let added = 0;
			let removed = 0;
			for (const diff of diffs) for (const line of hunkLines(diff)) {
				if (line.kind === "add") added++;
				if (line.kind === "del") removed++;
			}
			return {
				added,
				removed
			};
		}
		function lineNumbers(line) {
			return `${line.oldNumber === null ? "" : String(line.oldNumber)}, ${line.newNumber === null ? "" : String(line.newNumber)}`;
		}
		function lineNumber(line) {
			return line.kind === "del" ? line.oldNumber : line.newNumber;
		}
		/**
		* Render line-aligned hunks with a single gutter and expandable context gaps.
		* @param props - Unified diff data, locale labels, and presentation options.
		* @returns The line-numbered unified diff surface.
		*/
		function UnifiedDiff({ diffs, contextLines, labels, className, showCopyButton = true, showFileHeaders = true }) {
			const hunks = (0, react.useMemo)(() => buildHunks(diffs, contextLines), [contextLines, diffs]);
			const [expandedGaps, setExpandedGaps] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			const [copied, setCopied] = (0, react.useState)(false);
			const onCopy = (0, react.useCallback)(() => {
				if (copied) return;
				navigator.clipboard?.writeText(unifiedDiffText(diffs)).then(() => {
					setCopied(true);
					window.setTimeout(() => {
						setCopied(false);
					}, 1e3);
				}).catch(() => {});
			}, [copied, diffs]);
			if (diffs.length === 0) return null;
			const totals = /* @__PURE__ */ new Map();
			for (const [index, diff] of diffs.entries()) {
				const hunk = hunks[index];
				const previous = totals.get(diff.path) ?? {
					added: 0,
					removed: 0
				};
				totals.set(diff.path, {
					added: previous.added + (hunk?.added ?? 0),
					removed: previous.removed + (hunk?.removed ?? 0)
				});
			}
			let previousPath;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${UnifiedDiff_module_css_default.unifiedBlock} ${showFileHeaders ? "" : UnifiedDiff_module_css_default.unifiedEmbedded} ${className ?? ""}`,
				"data-diff": "",
				"data-diff-layout": "unified",
				children: [showCopyButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: UnifiedDiff_module_css_default.unifiedCopyButton,
					onClick: onCopy,
					children: copied ? labels.copied : labels.copy
				}), diffs.map((diff, hunkIndex) => {
					const firstForPath = diff.path !== previousPath;
					previousPath = diff.path;
					const total = totals.get(diff.path) ?? {
						added: 0,
						removed: 0
					};
					const hunk = hunks[hunkIndex];
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: UnifiedDiff_module_css_default.unifiedFile,
						children: [showFileHeaders && firstForPath ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
							className: UnifiedDiff_module_css_default.unifiedHeader,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: UnifiedDiff_module_css_default.unifiedStatus,
									children: "M"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: UnifiedDiff_module_css_default.unifiedPath,
									children: diff.path
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: UnifiedDiff_module_css_default.unifiedAdded,
									children: ["+", total.added]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: UnifiedDiff_module_css_default.unifiedRemoved,
									children: ["-", total.removed]
								})
							]
						}) : !firstForPath && (hunk?.unchangedBefore ?? 0) === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UnifiedDiff_module_css_default.unifiedHunkHeader,
							children: [
								"@@ -",
								diff.oldStart ?? 1,
								" +",
								diff.newStart ?? 1,
								" @@"
							]
						}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: UnifiedDiff_module_css_default.unifiedBody,
							children: [(hunk?.unchangedBefore ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: UnifiedDiff_module_css_default.unifiedOmitted,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "↕"
								}), labels.showUnchanged(hunk?.unchangedBefore ?? 0)]
							}), (hunk?.rows ?? []).flatMap((row) => {
								if (row.kind !== "gap") {
									const sign = row.kind === "del" ? "-" : row.kind === "add" ? "+" : " ";
									return [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: `${UnifiedDiff_module_css_default.unifiedLine} ${UnifiedDiff_module_css_default[`unified_${row.kind}`] ?? ""}`,
										"data-line-kind": row.kind,
										"data-old-line": row.oldNumber ?? void 0,
										"data-new-line": row.newNumber ?? void 0,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: UnifiedDiff_module_css_default.unifiedLineNumber,
												children: lineNumber(row)
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: UnifiedDiff_module_css_default.unifiedSign,
												children: sign
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: UnifiedDiff_module_css_default.unifiedText,
												children: row.text
											})
										]
									}, `${row.kind}:${row.oldNumber ?? ""}:${row.newNumber ?? ""}`)];
								}
								if (expandedGaps.has(row.id)) return [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: UnifiedDiff_module_css_default.unifiedGap,
									"aria-expanded": "true",
									onClick: () => {
										setExpandedGaps((current) => {
											const next = new Set(current);
											next.delete(row.id);
											return next;
										});
									},
									children: labels.hideUnchanged(row.lines.length)
								}, `${row.id}:control`), ...row.lines.map((line) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: `${UnifiedDiff_module_css_default.unifiedLine} ${UnifiedDiff_module_css_default.unified_context}`,
									"data-line-kind": "context",
									"data-old-line": line.oldNumber ?? void 0,
									"data-new-line": line.newNumber ?? void 0,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: UnifiedDiff_module_css_default.unifiedLineNumber,
											children: lineNumber(line)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: UnifiedDiff_module_css_default.unifiedSign,
											children: " "
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: UnifiedDiff_module_css_default.unifiedText,
											children: line.text
										})
									]
								}, `${row.id}:${lineNumbers(line)}`))];
								return [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: UnifiedDiff_module_css_default.unifiedGap,
									"aria-expanded": "false",
									onClick: () => {
										setExpandedGaps((current) => /* @__PURE__ */ new Set([...current, row.id]));
									},
									children: labels.showUnchanged(row.lines.length)
								}, row.id)];
							})]
						})]
					}, `${diff.path}:${hunkIndex}`);
				})]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/**
		* Minimal zh/en copy for the file-review sidebar tab. Follows the DSH i18n
		* system: the client apply attaches the locale service (`ctx.locale`,
		* provided by `@deepseek-ai/dsh-client-locale`) through {@link attachLocale},
		* and `t()` resolves the active locale from it. Without an attached service
		* (standalone/test compositions) the browser language is used. Mirrors the
		* dsh-better-sidebar locales pattern.
		*/
		/** The dictionary namespace this plugin owns in the DSH locale registry. */
		const LOCALE_NS = "fileReviewTab";
		/** The zh dictionary (the key-set source of truth). */
		const zh$1 = {
			tabTitle: "文件审查",
			empty: "本会话暂无文件改动",
			sessionUnavailable: "会话不可用",
			remoteUnavailable: "文件审查服务不可用",
			turn: "第 {n} 轮",
			turnLive: "进行中",
			files: "{count} 个文件",
			filesOne: "1 个文件",
			undo: "撤销",
			redo: "重新应用",
			undoing: "正在撤销…",
			redoing: "正在重新应用…",
			undoTurn: "撤销本轮",
			redoTurn: "重新应用本轮",
			toggleUnavailable: "没有可安全还原的文件",
			stateUndone: "已撤销",
			stateConflict: "内容冲突",
			stateUnsupported: "不可还原",
			stateError: "错误",
			deleted: "已删除",
			deletedHint: "该文件在本轮中被终端命令删除，内容已不存在，无法查看差异或撤销。",
			undoSuccess: "已成功撤销更改",
			redoSuccess: "已成功重新应用更改",
			undoPartial: "部分文件未能撤销",
			redoPartial: "部分文件未能重新应用",
			toggleError: "操作失败",
			openInEditor: "在编辑器中打开",
			open: "打开 {name}",
			copy: "复制差异",
			copied: "已复制",
			showUnchanged: "显示 {count} 行未更改内容",
			hideUnchanged: "隐藏 {count} 行未更改内容",
			stats: "新增 {added} 行，删除 {removed} 行",
			unavailable: "无法为此更改还原可审查的差异。",
			refresh: "刷新状态"
		};
		/** The en dictionary. */
		const en$1 = {
			tabTitle: "File Review",
			empty: "No file changes in this session yet",
			sessionUnavailable: "Session is unavailable",
			remoteUnavailable: "File review service is unavailable",
			turn: "Turn {n}",
			turnLive: "in progress",
			files: "{count} files",
			filesOne: "1 file",
			undo: "Undo",
			redo: "Reapply",
			undoing: "Undoing…",
			redoing: "Reapplying…",
			undoTurn: "Undo turn",
			redoTurn: "Reapply turn",
			toggleUnavailable: "No safely reversible files are available",
			stateUndone: "undone",
			stateConflict: "conflict",
			stateUnsupported: "not reversible",
			stateError: "error",
			deleted: "deleted",
			deletedHint: "This file was deleted by a terminal command in this turn; its content is gone, so no diff or undo is available.",
			undoSuccess: "Changes undone",
			redoSuccess: "Changes reapplied",
			undoPartial: "Some files could not be undone",
			redoPartial: "Some files could not be reapplied",
			toggleError: "Operation failed",
			openInEditor: "Open in editor",
			open: "Open {name}",
			copy: "Copy diff",
			copied: "Copied",
			showUnchanged: "{count} unchanged lines",
			hideUnchanged: "Hide {count} unchanged lines",
			stats: "{added} lines added, {removed} lines removed",
			unavailable: "No reconstructable diff is available for this change.",
			refresh: "Refresh status"
		};
		/** The DSH locale service attached by the client apply (absent → browser detection). */
		let localeService;
		/** Attach (or detach, with undefined) the DSH locale service. */
		function attachLocale(service) {
			localeService = service;
		}
		/** The active locale id ('zh' | 'en'): the DSH locale service's snapshot when attached. */
		function activeLocale() {
			return localeService?.getSnapshot().active ?? (typeof navigator !== "undefined" ? navigator.language : "") ?? "en";
		}
		/** Translate a copy key; `{name}` placeholders interpolate from `params`. */
		function t(key, params) {
			let text = (activeLocale().toLowerCase().startsWith("zh") ? zh$1 : en$1)[key];
			if (params !== void 0) for (const [name, value] of Object.entries(params)) text = text.replaceAll(`{${name}}`, String(value));
			return text;
		}
		//#endregion
		//#region \0dsh-file-review-tab-css:D:\DSH plugs\dsh-file-review-tab\src\client\FileReviewTab.module.css.mjs
		const css$1 = ".HuDuBG_root{height:100%;min-height:0;color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);flex-direction:column;display:flex}.HuDuBG_header{border-bottom:1px solid var(--dsw-alias-border-l2);flex:none;align-items:center;gap:8px;min-height:36px;padding:0 10px;display:flex}.HuDuBG_headerTitle{font-weight:600}.HuDuBG_refreshButton{color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;border-radius:6px;margin-left:auto;padding:2px 6px;font-size:13px;line-height:1}.HuDuBG_refreshButton:hover:not(:disabled){background:var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary)}.HuDuBG_refreshButton:disabled{opacity:.5;cursor:default}.HuDuBG_notice{border-radius:8px;flex:none;margin:8px 10px 0;padding:6px 10px;font-size:12px}.HuDuBG_noticeSuccess{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent);border:1px solid color-mix(in srgb, var(--dsw-alias-state-success-primary) 35%, transparent)}.HuDuBG_noticeError{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, transparent)}.HuDuBG_body{flex:1;min-height:0;padding:8px 0 16px;overflow-y:auto}.HuDuBG_empty{color:var(--dsw-alias-label-tertiary);text-align:center;padding:24px 12px}.HuDuBG_turnGroup{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-markdown-code-block);border-radius:10px;margin:0 8px 10px;overflow:hidden}.HuDuBG_turnHeader{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;min-height:34px;padding:0 8px 0 10px;display:flex}.HuDuBG_turnTitle{white-space:nowrap;font-weight:600}.HuDuBG_liveBadge{color:var(--dsw-alias-state-warning-primary,#d9a13b);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary,#d9a13b) 14%, transparent);white-space:nowrap;border-radius:999px;padding:1px 6px;font-size:11px}.HuDuBG_turnCount{color:var(--dsw-alias-label-tertiary);white-space:nowrap}.HuDuBG_stats{white-space:nowrap;gap:6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;display:inline-flex}.HuDuBG_added{color:var(--dsw-alias-state-success-primary)}.HuDuBG_removed{color:var(--dsw-alias-state-error-primary)}.HuDuBG_actionButton{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);cursor:pointer;white-space:nowrap;background:0 0;border-radius:6px;align-items:center;gap:4px;margin-left:auto;padding:3px 8px;font-size:12px;display:inline-flex}.HuDuBG_actionButton:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-border-l1)}.HuDuBG_actionButton:disabled{opacity:.5;cursor:default}.HuDuBG_buttonIcon{fill:none;stroke:currentColor;stroke-width:1.6px;stroke-linecap:round;stroke-linejoin:round;width:13px;height:13px}.HuDuBG_fileList{margin:0;padding:0;list-style:none}.HuDuBG_fileItem+.HuDuBG_fileItem{border-top:1px solid var(--dsw-alias-border-l2)}.HuDuBG_fileRow{cursor:pointer;user-select:none;align-items:center;gap:6px;min-height:32px;padding:0 8px 0 6px;display:flex}.HuDuBG_fileRow:hover{background:color-mix(in srgb, var(--dsw-alias-border-l1) 55%, transparent)}.HuDuBG_chevron{fill:none;width:12px;height:12px;stroke:var(--dsw-alias-label-tertiary);stroke-width:1.8px;stroke-linecap:round;stroke-linejoin:round;flex:none;transition:transform .12s}.HuDuBG_chevronOpen{transform:rotate(90deg)}.HuDuBG_fileName{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;overflow:hidden}.HuDuBG_stateBadge{white-space:nowrap;border-radius:999px;padding:1px 6px;font-size:11px}.HuDuBG_badgeUndone{color:var(--dsw-alias-state-warning-primary,#d9a13b);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary,#d9a13b) 14%, transparent)}.HuDuBG_badgeMuted{color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-border-l1)}.HuDuBG_badgeError{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent)}.HuDuBG_smallButton{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);cursor:pointer;white-space:nowrap;background:0 0;border-radius:6px;flex:none;padding:2px 7px;font-size:11px}.HuDuBG_smallButton:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-border-l1)}.HuDuBG_smallButton:disabled{opacity:.5;cursor:default}.HuDuBG_fileRow .HuDuBG_smallButton:first-of-type{margin-left:auto}.HuDuBG_diffWrap{border-top:1px solid var(--dsw-alias-border-l2);overflow-x:auto}.HuDuBG_diffUnavailable{color:var(--dsw-alias-label-tertiary);margin:0;padding:10px 12px;font-size:12px}.HuDuBG_reviewDiff{border:0;border-radius:0;margin:0}.HuDuBG_deletedBadge{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);white-space:nowrap;border-radius:999px;padding:1px 6px;font-size:11px}";
		const styleId$1 = "dsh-file-review-tab/FileReviewTab.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(styleId$1) + "]") === null) {
			const style = document.createElement("style");
			style.dataset.plugin = "dsh-file-review-tab";
			style.dataset.pluginCss = styleId$1;
			style.textContent = css$1;
			document.head.appendChild(style);
		}
		var FileReviewTab_module_css_default = {
			"turnTitle": "HuDuBG_turnTitle",
			"empty": "HuDuBG_empty",
			"turnHeader": "HuDuBG_turnHeader",
			"badgeMuted": "HuDuBG_badgeMuted",
			"body": "HuDuBG_body",
			"root": "HuDuBG_root",
			"refreshButton": "HuDuBG_refreshButton",
			"fileList": "HuDuBG_fileList",
			"fileName": "HuDuBG_fileName",
			"badgeUndone": "HuDuBG_badgeUndone",
			"diffWrap": "HuDuBG_diffWrap",
			"header": "HuDuBG_header",
			"chevron": "HuDuBG_chevron",
			"added": "HuDuBG_added",
			"liveBadge": "HuDuBG_liveBadge",
			"turnCount": "HuDuBG_turnCount",
			"turnGroup": "HuDuBG_turnGroup",
			"chevronOpen": "HuDuBG_chevronOpen",
			"noticeSuccess": "HuDuBG_noticeSuccess",
			"badgeError": "HuDuBG_badgeError",
			"buttonIcon": "HuDuBG_buttonIcon",
			"reviewDiff": "HuDuBG_reviewDiff",
			"noticeError": "HuDuBG_noticeError",
			"stats": "HuDuBG_stats",
			"headerTitle": "HuDuBG_headerTitle",
			"smallButton": "HuDuBG_smallButton",
			"notice": "HuDuBG_notice",
			"actionButton": "HuDuBG_actionButton",
			"diffUnavailable": "HuDuBG_diffUnavailable",
			"fileItem": "HuDuBG_fileItem",
			"stateBadge": "HuDuBG_stateBadge",
			"deletedBadge": "HuDuBG_deletedBadge",
			"fileRow": "HuDuBG_fileRow",
			"removed": "HuDuBG_removed"
		};
		//#endregion
		//#region src/client/FileReviewTab.tsx
		const SUCCESS_NOTICE_DURATION$1 = 3e3;
		const ERROR_NOTICE_DURATION$1 = 8e3;
		/** State map key for one (turn, file) change group. */
		function stateKey(turn, path) {
			return `${turn}|${path}`;
		}
		/** A change group is reversible only with complete contextual hunks. */
		function isReversible(file) {
			return file.diffs.length > 0 && file.diffs.every((diff) => diff.path === file.path && diff.oldText !== null && diff.oldText !== diff.newText && (diff.oldText !== "" || diff.oldStart !== void 0) && (diff.newText !== "" || diff.newStart !== void 0));
		}
		function addStats$1(left, right) {
			return {
				added: left.added + right.added,
				removed: left.removed + right.removed
			};
		}
		function Stats$1({ stats }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: FileReviewTab_module_css_default.stats,
				"aria-label": t("stats", {
					added: String(stats.added),
					removed: String(stats.removed)
				}),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: FileReviewTab_module_css_default.added,
					children: ["+", stats.added]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: FileReviewTab_module_css_default.removed,
					children: ["-", stats.removed]
				})]
			});
		}
		function UndoIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: FileReviewTab_module_css_default.buttonIcon,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M8 5 4 9l4 4M4 9h7a5 5 0 0 1 5 5v1" })
			});
		}
		function RedoIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: FileReviewTab_module_css_default.buttonIcon,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m12 5 4 4-4 4M16 9H9a5 5 0 0 0-5 5v1" })
			});
		}
		function Chevron({ open }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: `${FileReviewTab_module_css_default.chevron} ${open ? FileReviewTab_module_css_default.chevronOpen : ""}`,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m7 5 5 5-5 5" })
			});
		}
		/** Per-(turn,file) host-inspected state badge; nothing renders for 'applied'. */
		function StateBadge({ state }) {
			if (state === void 0 || state === "applied") return null;
			const label = state === "undone" ? t("stateUndone") : state === "conflict" ? t("stateConflict") : state === "unsupported" ? t("stateUnsupported") : t("stateError");
			const tone = state === "undone" ? FileReviewTab_module_css_default.badgeUndone : state === "unsupported" ? FileReviewTab_module_css_default.badgeMuted : FileReviewTab_module_css_default.badgeError;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: `${FileReviewTab_module_css_default.stateBadge} ${tone}`,
				children: label
			});
		}
		/** Mounts the heavy diff renderer only when the row nears the viewport. */
		function LazyDiff({ children }) {
			const holderRef = (0, react.useRef)(null);
			const [inView, setInView] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				if (inView) return;
				const element = holderRef.current;
				if (element === null) return;
				if (typeof IntersectionObserver === "undefined") {
					setInView(true);
					return;
				}
				const observer = new IntersectionObserver((entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						setInView(true);
						observer.disconnect();
					}
				}, { rootMargin: "200px 0px" });
				observer.observe(element);
				return () => {
					observer.disconnect();
				};
			}, [inView]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: holderRef,
				children: inView ? children : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: { minHeight: "96px" } })
			});
		}
		/** The sidebar tab body: per-turn change groups with inline diffs and undo. */
		function FileReviewTab({ ctx, sessionId, cwd, visible, tab }) {
			const sessions = ctx.sessions;
			const [states, setStates] = (0, react.useState)(() => /* @__PURE__ */ new Map());
			const [statusPending, setStatusPending] = (0, react.useState)(false);
			const [busyKey, setBusyKey] = (0, react.useState)(null);
			const [expanded, setExpanded] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			const [notice, setNotice] = (0, react.useState)(null);
			const [tick, setTick] = (0, react.useState)(0);
			const noticeSeqRef = (0, react.useRef)(0);
			const noticeTimerRef = (0, react.useRef)(null);
			const session = sessions.binding(sessionId)?.session;
			const subscribe = (0, react.useCallback)((listener) => session?.subscribe(listener) ?? (() => {}), [session]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, () => session?.getSnapshot() ?? null);
			const roots = (0, react.useMemo)(() => snapshot === null ? [] : deriveSessionRoots(snapshot), [snapshot]);
			const rootsKey = (0, react.useMemo)(() => roots.map((root) => root.rootCallId).join("|"), [roots]);
			const [recorded, setRecorded] = (0, react.useState)(() => []);
			(0, react.useEffect)(() => {
				if (!visible || roots.length === 0) return;
				let active = true;
				const timer = window.setTimeout(() => {
					const scope = sessions.scope(sessionId);
					const remote = scope?.get("remote.fileReview");
					if (scope === void 0 || remote === void 0) {
						active = false;
						return;
					}
					remote.recorded({ rootCallIds: roots.map((root) => root.rootCallId) }).then((result) => {
						if (!result.ok || !active) return;
						setRecorded(result.value.mutations);
					}).catch(() => {});
				}, 200);
				return () => {
					active = false;
					window.clearTimeout(timer);
				};
			}, [
				visible,
				rootsKey,
				tick,
				sessions,
				sessionId
			]);
			const turns = (0, react.useMemo)(() => mergeRecordedTurns(deriveSessionChanges(snapshot), roots, recorded), [
				snapshot,
				roots,
				recorded
			]);
			const flat = (0, react.useMemo)(() => turns.flatMap((turn) => turn.files.map((file) => ({
				turn: turn.turn,
				path: file.path,
				diffs: file.diffs,
				...file.deleted === true ? { deleted: true } : {}
			}))), [turns]);
			const inspectable = (0, react.useMemo)(() => flat.filter((item) => item.deleted !== true), [flat]);
			const flatKey = (0, react.useMemo)(() => flat.map((item) => `${item.turn}|${item.path}|${item.diffs.length}`).join(";"), [flat]);
			const flatRef = (0, react.useRef)(flat);
			flatRef.current = flat;
			const rowRefs = (0, react.useRef)(/* @__PURE__ */ new Map());
			const turnRefs = (0, react.useRef)(/* @__PURE__ */ new Map());
			const lastMetaRef = (0, react.useRef)(void 0);
			const pendingScrollRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const meta = tab.meta;
				if (meta === lastMetaRef.current) return;
				lastMetaRef.current = meta;
				if (typeof meta !== "object" || meta === null || Array.isArray(meta)) return;
				const raw = meta.expandPaths;
				if (!Array.isArray(raw)) return;
				const paths = raw.filter((value) => typeof value === "string");
				if (paths.length === 0) return;
				const turnNo = meta.turn;
				const targetTurn = typeof turnNo === "number" && Number.isInteger(turnNo) ? turnNo : void 0;
				const matches = (item) => paths.includes(item.path) && (targetTurn === void 0 || item.turn === targetTurn);
				setExpanded((current) => {
					const next = new Set(current);
					for (const item of flatRef.current) if (matches(item)) next.add(stateKey(item.turn, item.path));
					return next;
				});
				const first = flatRef.current.find((item) => matches(item));
				pendingScrollRef.current = first === void 0 ? null : {
					rowKey: stateKey(first.turn, first.path),
					turn: paths.length > 1 ? first.turn : null
				};
			}, [tab.meta]);
			(0, react.useEffect)(() => {
				if (!visible) return;
				const pending = pendingScrollRef.current;
				if (pending === null) return;
				const element = (pending.turn !== null ? turnRefs.current.get(pending.turn) : void 0) ?? rowRefs.current.get(pending.rowKey);
				if (element === void 0) return;
				pendingScrollRef.current = null;
				const scroll = () => element.scrollIntoView({
					block: "start",
					behavior: "smooth"
				});
				scroll();
				const timer = window.setTimeout(scroll, 150);
				return () => window.clearTimeout(timer);
			}, [
				visible,
				expanded,
				tab.meta,
				flatKey
			]);
			const showNotice = (0, react.useCallback)((tone, text) => {
				noticeSeqRef.current += 1;
				const seq = noticeSeqRef.current;
				if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
				noticeTimerRef.current = window.setTimeout(() => {
					setNotice((current) => current?.seq === seq ? null : current);
				}, tone === "success" ? SUCCESS_NOTICE_DURATION$1 : ERROR_NOTICE_DURATION$1);
				setNotice({
					seq,
					tone,
					text
				});
			}, []);
			(0, react.useEffect)(() => () => {
				if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
			}, []);
			const invoke = (0, react.useCallback)(async (method, request) => {
				const scope = sessions.scope(sessionId);
				if (scope === void 0) throw new Error(t("sessionUnavailable"));
				const remote = scope.get("remote.fileReview");
				if (remote === void 0) throw new Error(t("remoteUnavailable"));
				const result = await remote[method](request);
				if (!result.ok) throw new Error(result.error.message);
				return result.value;
			}, [sessions, sessionId]);
			(0, react.useEffect)(() => {
				if (!visible || flat.length === 0) return;
				let active = true;
				setStatusPending(true);
				const timer = window.setTimeout(() => {
					const request = {
						action: "undo",
						files: inspectable.map((item) => ({
							path: item.path,
							diffs: item.diffs
						}))
					};
					invoke("status", request).then((result) => {
						if (!active) return;
						setStates(() => {
							const next = /* @__PURE__ */ new Map();
							inspectable.forEach((item, index) => {
								const file = result.files[index];
								if (file !== void 0) next.set(stateKey(item.turn, item.path), file.state);
							});
							return next;
						});
					}).catch(() => {}).finally(() => {
						if (active) setStatusPending(false);
					});
				}, 300);
				return () => {
					active = false;
					window.clearTimeout(timer);
				};
			}, [
				visible,
				flatKey,
				tick,
				invoke
			]);
			const mergeResultStates = (0, react.useCallback)((items, result) => {
				setStates((current) => {
					const next = new Map(current);
					items.forEach((item, index) => {
						const file = result.files[index];
						if (file !== void 0) next.set(stateKey(item.turn, item.path), file.state);
					});
					return next;
				});
			}, []);
			/** Toggle one change set (a whole turn, or one file) undo ↔ redo. */
			const runToggle = (0, react.useCallback)((key, items, action) => {
				if (busyKey !== null || items.length === 0) return;
				setBusyKey(key);
				invoke("apply", {
					action,
					files: items.map((item) => ({
						path: item.path,
						diffs: item.diffs
					}))
				}).then((result) => {
					mergeResultStates(items, result);
					const target = action === "undo" ? "undone" : "applied";
					if (result.files.filter((file) => file.state !== target).length === 0) showNotice("success", t(action === "undo" ? "undoSuccess" : "redoSuccess"));
					else showNotice("error", t(action === "undo" ? "undoPartial" : "redoPartial"));
				}).catch((error) => {
					showNotice("error", `${t("toggleError")}: ${error instanceof Error ? error.message : String(error)}`);
				}).finally(() => {
					setBusyKey(null);
				});
			}, [
				busyKey,
				invoke,
				mergeResultStates,
				showNotice
			]);
			const toggleExpanded = (0, react.useCallback)((key) => {
				setExpanded((current) => {
					const next = new Set(current);
					if (next.has(key)) next.delete(key);
					else next.add(key);
					return next;
				});
			}, []);
			const openInEditor = (0, react.useCallback)((path) => {
				const absolute = resolveSessionPath(cwd, path);
				ctx.betterSidebar?.openFile({
					sessionId,
					...cwd !== void 0 ? { cwd } : {}
				}, absolute, basename$1(absolute));
			}, [
				ctx,
				cwd,
				sessionId
			]);
			const totalStats = (0, react.useMemo)(() => flat.reduce((total, item) => addStats$1(total, summarizeDiffs(item.diffs)), {
				added: 0,
				removed: 0
			}), [flat]);
			/** Render one turn group (latest turn first). */
			const renderTurn = (turn) => {
				const turnStats = turn.files.reduce((total, file) => addStats$1(total, summarizeDiffs(file.diffs)), {
					added: 0,
					removed: 0
				});
				const reversible = turn.files.filter(isReversible);
				const turnAction = reversible.length > 0 && reversible.every((file) => states.get(stateKey(turn.turn, file.path)) === "undone") ? "redo" : "undo";
				const turnKey = `turn:${turn.turn}`;
				const turnBusy = busyKey === turnKey;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					ref: (element) => {
						if (element === null) turnRefs.current.delete(turn.turn);
						else turnRefs.current.set(turn.turn, element);
					},
					className: FileReviewTab_module_css_default.turnGroup,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: FileReviewTab_module_css_default.turnHeader,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FileReviewTab_module_css_default.turnTitle,
								children: t("turn", { n: turn.turn })
							}),
							turn.live && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FileReviewTab_module_css_default.liveBadge,
								children: t("turnLive")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FileReviewTab_module_css_default.turnCount,
								children: turn.files.length === 1 ? t("filesOne") : t("files", { count: turn.files.length })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stats$1, { stats: turnStats }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: FileReviewTab_module_css_default.actionButton,
								disabled: statusPending || busyKey !== null || reversible.length === 0,
								title: reversible.length === 0 ? t("toggleUnavailable") : void 0,
								onClick: () => {
									runToggle(turnKey, turn.files.filter((file) => file.deleted !== true).map((file) => ({
										turn: turn.turn,
										path: file.path,
										diffs: file.diffs
									})), turnAction);
								},
								children: [turnAction === "undo" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UndoIcon, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RedoIcon, {}), turnBusy ? t(turnAction === "undo" ? "undoing" : "redoing") : t(turnAction === "undo" ? "undoTurn" : "redoTurn")]
							})
						]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
						className: FileReviewTab_module_css_default.fileList,
						children: turn.files.map((file) => renderFile(turn, file))
					})]
				}, turn.turn);
			};
			/** Render one changed file row plus its inline diff when expanded. */
			const renderFile = (turn, file) => {
				const key = stateKey(turn.turn, file.path);
				const isOpen = expanded.has(key);
				const state = states.get(key);
				const reversible = isReversible(file);
				const fileAction = state === "undone" ? "redo" : "undo";
				const fileBusy = busyKey === key;
				const stats = summarizeDiffs(file.diffs);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					className: FileReviewTab_module_css_default.fileItem,
					ref: (element) => {
						if (element === null) rowRefs.current.delete(key);
						else rowRefs.current.set(key, element);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: FileReviewTab_module_css_default.fileRow,
						role: "button",
						tabIndex: 0,
						title: file.path,
						"aria-expanded": isOpen,
						onClick: () => {
							toggleExpanded(key);
						},
						onKeyDown: (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								toggleExpanded(key);
							}
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Chevron, { open: isOpen }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FileReviewTab_module_css_default.fileName,
								children: basename$1(file.path)
							}),
							file.deleted === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FileReviewTab_module_css_default.deletedBadge,
								children: t("deleted")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stats$1, { stats }),
							file.deleted !== true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StateBadge, { state }),
							file.deleted !== true && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: FileReviewTab_module_css_default.smallButton,
								onClick: (event) => {
									event.stopPropagation();
									openInEditor(file.path);
								},
								children: t("openInEditor")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: FileReviewTab_module_css_default.smallButton,
								disabled: statusPending || busyKey !== null || !reversible,
								title: file.deleted === true ? t("deletedHint") : !reversible ? t("toggleUnavailable") : void 0,
								onClick: (event) => {
									event.stopPropagation();
									runToggle(key, [{
										turn: turn.turn,
										path: file.path,
										diffs: file.diffs
									}], fileAction);
								},
								children: fileBusy ? t(fileAction === "undo" ? "undoing" : "redoing") : t(fileAction === "undo" ? "undo" : "redo")
							})
						]
					}), isOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: FileReviewTab_module_css_default.diffWrap,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LazyDiff, { children: file.deleted === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: FileReviewTab_module_css_default.diffUnavailable,
							children: t("deletedHint")
						}) : file.diffs.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: FileReviewTab_module_css_default.diffUnavailable,
							children: t("unavailable")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnifiedDiff, {
							diffs: file.diffs,
							contextLines: 3,
							showCopyButton: true,
							showFileHeaders: false,
							labels: {
								copy: t("copy"),
								copied: t("copied"),
								showUnchanged: (count) => t("showUnchanged", { count }),
								hideUnchanged: (count) => t("hideUnchanged", { count })
							},
							className: FileReviewTab_module_css_default.reviewDiff
						}) })
					})]
				}, file.path);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: FileReviewTab_module_css_default.root,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: FileReviewTab_module_css_default.header,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: FileReviewTab_module_css_default.headerTitle,
								children: t("tabTitle")
							}),
							flat.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stats$1, { stats: totalStats }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: FileReviewTab_module_css_default.refreshButton,
								disabled: statusPending,
								title: t("refresh"),
								onClick: () => {
									setTick((value) => value + 1);
								},
								children: "⟳"
							})
						]
					}),
					notice !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: `${FileReviewTab_module_css_default.notice} ${notice.tone === "success" ? FileReviewTab_module_css_default.noticeSuccess : FileReviewTab_module_css_default.noticeError}`,
						role: "alert",
						children: notice.text
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: FileReviewTab_module_css_default.body,
						children: turns.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: FileReviewTab_module_css_default.empty,
							children: t("empty")
						}) : [...turns].reverse().map(renderTurn)
					})
				]
			});
		}
		//#endregion
		//#region src/client/turn-deliverables.ts
		/**
		* Paths a call view reports having created or changed, by render intent rather
		* than tool name: a diff card, or a generic card whose kind is `edit` (the
		* shape `str_replace_editor`'s insert presents). Every other card produces
		* nothing to open — a read looked, a delete removed, a terminal ran. Only
		* root call views enter this Turn accumulator; nested Code Mode dispatches
		* preserve the pre-assembly behavior and do not contribute independently.
		*/
		function producedPaths(view) {
			if (view === null || view.card !== "diff" && !(view.card === "generic" && view.kind === "edit")) return [];
			const locations = view.locations;
			if (!Array.isArray(locations)) return [];
			const paths = [];
			const seen = /* @__PURE__ */ new Set();
			for (const location of locations) {
				if (typeof location !== "object" || location === null || Array.isArray(location)) continue;
				const path = location.path;
				if (typeof path !== "string" || seen.has(path)) continue;
				seen.add(path);
				paths.push(path);
			}
			return paths;
		}
		/** Validate diff hunks crossing the Host/browser transport. */
		function producedDiffs(view) {
			if (typeof view !== "object" || view === null || Array.isArray(view)) return [];
			const record = view;
			if (record.card !== "diff" || !Array.isArray(record.diffs)) return [];
			const diffs = [];
			for (const value of record.diffs) {
				if (typeof value !== "object" || value === null || Array.isArray(value)) return [];
				const { path, oldText, newText, oldStart, newStart } = value;
				if (typeof path !== "string" || oldText !== null && typeof oldText !== "string" || typeof newText !== "string" || oldStart !== void 0 && (typeof oldStart !== "number" || !Number.isInteger(oldStart) || oldStart < 1) || newStart !== void 0 && (typeof newStart !== "number" || !Number.isInteger(newStart) || newStart < 1)) return [];
				diffs.push({
					path,
					oldText,
					newText,
					...typeof oldStart === "number" ? { oldStart } : {},
					...typeof newStart === "number" ? { newStart } : {}
				});
			}
			return diffs;
		}
		/** Applied result hunks, or successful-call intent only when no result view exists. */
		function reviewDiffs(callView, resultView) {
			if (resultView?.for === "result") return producedDiffs(resultView.view);
			return producedDiffs(callView);
		}
		/**
		* Files and review hunks available at one closing Assistant boundary.
		* @param data - engine-published Deliverables data for one Turn.
		* @param seq - closing Assistant seq; later Tool settlements are excluded.
		* @returns Produced files in first-seen order with same-path hunks appended in settlement order.
		*/
		function reviewsForClosing(data, seq = Number.POSITIVE_INFINITY) {
			if (data === void 0) return [];
			const reviews = [];
			const byPath = /* @__PURE__ */ new Map();
			for (const produced of data.produced) {
				if (produced.seq > seq) continue;
				const review = byPath.get(produced.path);
				if (review === void 0) {
					const created = {
						path: produced.path,
						diffs: [...produced.diffs],
						...produced.deleted === true ? { deleted: true } : {}
					};
					byPath.set(produced.path, created);
					reviews.push(created);
				} else {
					review.diffs.push(...produced.diffs);
					if (produced.deleted === true) review.deleted = true;
					else delete review.deleted;
				}
			}
			return reviews;
		}
		/**
		* Claim the turn-tail chain only when its closing turn produced files.
		* @param owner - Turn-tail owner currency for the closing assistant.
		* @returns Produced-file reviews as the component's match, or null to decline before mount.
		*/
		function selectProducedFiles(owner) {
			const reviews = reviewsForClosing(owner.turn.data.get("deliverables"), owner.seq);
			return reviews.length === 0 ? null : reviews;
		}
		/** Turn-local successful mutation accumulator; it publishes no view Node. */
		const deliverablesDefinition = {
			kind: "deliverables",
			match: (event) => {
				if (event.type === "turn/start") return {
					id: String(event.data.turn),
					role: "start"
				};
				if (event.type === "tool/call") return {
					id: String(event.data.turn),
					role: "update"
				};
				if (event.type === "tool/result" && event.surfaceOp === "append") return {
					id: String(event.data.turn),
					role: "update"
				};
				return null;
			},
			start: (_context, match) => {
				if (match.event.type !== "turn/start") throw new Error("deliverables start requires turn/start");
				return {
					turn: match.event.data.turn,
					calls: /* @__PURE__ */ new Map(),
					produced: []
				};
			},
			update: (context, match) => {
				if (match.event.type === "tool/call") {
					const calls = new Map(context.state.calls);
					calls.set(String(match.event.data.callId), match.view?.for === "call" ? match.view.view : null);
					return {
						...context.state,
						calls
					};
				}
				if (match.event.type !== "tool/result") return context.state;
				if (match.event.data.message.content[0].isError === true) return context.state;
				const callId = String(match.event.data.message.source.callId);
				const callView = context.state.calls.get(callId) ?? null;
				const diffs = reviewDiffs(callView, match.view);
				const additions = producedPaths(callView).map((path) => ({
					seq: match.event.seq,
					path,
					diffs: diffs.filter((diff) => diff.path === path)
				}));
				for (const path of callView !== null ? deletedPaths(callView) : []) {
					if (additions.some((addition) => addition.path === path)) continue;
					additions.push({
						seq: match.event.seq,
						path,
						diffs: [],
						deleted: true
					});
				}
				return additions.length === 0 ? context.state : {
					...context.state,
					produced: [...context.state.produced, ...additions]
				};
			},
			buildLocationData: (context, scope) => scope !== "turn" || context.state === void 0 ? null : {
				kind: "turn",
				turn: context.state.turn,
				key: "deliverables",
				value: { produced: context.state.produced }
			}
		};
		/**
		* Trailing path segment, the part that identifies the file at a glance.
		* @param path - Slash- or backslash-separated path.
		* @returns The final segment, or the whole string when separator-free.
		*/
		function basename(path) {
			const at = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
			return at === -1 ? path : path.slice(at + 1);
		}
		/**
		* File-mention vocabulary over one turn's produced paths, for the closing
		* message's prose: an inline-code token opens the file it names. A token
		* resolves by exact path, or by being exactly the basename of exactly one
		* produced path — a basename two paths share stays inert rather than
		* guessing, so a mention link can never open the wrong file or 404.
		* @param paths - The turn's produced paths (tool order, already deduped).
		* @param openFile - The chat view's file opener.
		* @param label - Localizes the accessible open-label for a resolved path.
		* @returns The resolver MarkdownText consumes; the full path rides `title`,
		* the same disambiguator the row's chips carry.
		*/
		function producedFileMentions(paths, openFile, label) {
			return { resolve(value) {
				const path = paths.includes(value) ? value : onlyPathWithBasename(paths, value);
				if (path === void 0) return void 0;
				return {
					open: () => {
						openFile(path);
					},
					label: label(path),
					title: path
				};
			} };
		}
		/** The single produced path whose basename is exactly `value`, else undefined. */
		function onlyPathWithBasename(paths, value) {
			const matches = paths.filter((path) => basename(path) === value);
			return matches.length === 1 ? matches[0] : void 0;
		}
		//#endregion
		//#region \0dsh-file-review-tab-css:D:\DSH plugs\dsh-file-review-tab\src\client\ProducedFiles.module.css.mjs
		const css = ".aWtFNa_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-container,Canvas);color:var(--dsw-alias-label-primary);border-radius:12px;margin-top:16px;font-size:13px;overflow:hidden}.aWtFNa_cardHeader{align-items:center;gap:10px;min-height:56px;padding:0 12px;display:flex}.aWtFNa_fileIconWrap{background:var(--dsw-alias-interactive-bg-hover);width:30px;height:30px;color:var(--dsw-alias-label-secondary);border-radius:8px;flex:none;place-items:center;display:grid}.aWtFNa_icon,.aWtFNa_buttonIcon,.aWtFNa_closeIcon{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.4px}.aWtFNa_icon{width:18px;height:18px}.aWtFNa_buttonIcon{width:16px;height:16px}.aWtFNa_closeIcon{width:20px;height:20px}.aWtFNa_cardTitleBlock{flex:auto;align-items:baseline;gap:10px;min-width:0;display:flex}.aWtFNa_cardTitle{text-overflow:ellipsis;white-space:nowrap;font-weight:600;overflow:hidden}.aWtFNa_stats{font-variant-numeric:tabular-nums;white-space:nowrap;flex:none;gap:5px;display:inline-flex}.aWtFNa_added{color:var(--dsw-alias-state-success-primary)}.aWtFNa_removed{color:var(--dsw-alias-state-error-primary)}.aWtFNa_reviewButton,.aWtFNa_toggleButton,.aWtFNa_toolbarButton,.aWtFNa_openButton,.aWtFNa_closeButton{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-container,Canvas);color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit}.aWtFNa_reviewButton,.aWtFNa_toggleButton,.aWtFNa_toolbarButton{border-radius:8px;flex:none;align-items:center;gap:6px;min-height:30px;padding:0 10px;display:inline-flex}.aWtFNa_reviewButton:hover,.aWtFNa_toggleButton:hover:not(:disabled),.aWtFNa_toolbarButton:hover:not(:disabled),.aWtFNa_openButton:hover,.aWtFNa_closeButton:hover{background:var(--dsw-alias-interactive-bg-hover)}.aWtFNa_reviewButton:focus-visible,.aWtFNa_toggleButton:focus-visible,.aWtFNa_toolbarButton:focus-visible,.aWtFNa_openButton:focus-visible,.aWtFNa_closeButton:focus-visible,.aWtFNa_fileRow:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-alias-border-l3);outline:none}.aWtFNa_fileList{border-top:1px solid var(--dsw-alias-border-l1)}.aWtFNa_fileRow{border:0;border-bottom:1px solid var(--dsw-alias-border-l1);width:100%;min-height:38px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;text-align:left;background:0 0;align-items:center;gap:12px;margin:0;padding:0 12px;display:flex}.aWtFNa_fileRow:hover{background:var(--dsw-alias-interactive-bg-hover)}.aWtFNa_fileName{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.aWtFNa_moreFiles{min-height:34px;color:var(--dsw-alias-label-tertiary);padding:0 12px;line-height:34px}.aWtFNa_drawer{z-index:1000;width:var(--review-drawer-width,36vw);border-left:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-container,Canvas);max-width:100vw;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex;position:fixed;inset:0 0 0 auto;box-shadow:-12px 0 32px #0000001f}.aWtFNa_drawerSplit{z-index:1;box-shadow:none}.aWtFNa_drawerResizing,.aWtFNa_drawerResizing *{cursor:col-resize;user-select:none}.aWtFNa_resizeHandle{z-index:5;cursor:col-resize;touch-action:none;background:0 0;border:0;width:12px;margin:0;padding:0;position:absolute;inset:0 auto 0 -6px}.aWtFNa_resizeHandle:after{content:\"\";background:0 0;width:2px;transition:background .12s;position:absolute;inset:0 auto 0 5px}.aWtFNa_resizeHandle:hover:after,.aWtFNa_resizeHandle:focus-visible:after,.aWtFNa_drawerResizing .aWtFNa_resizeHandle:after{background:var(--dsw-alias-border-l3)}.aWtFNa_resizeHandle:focus-visible{outline:none}.aWtFNa_drawerHeader{border-bottom:1px solid var(--dsw-alias-border-l2);flex:none;align-items:center;gap:12px;min-height:64px;padding:0 14px 0 18px;display:flex}.aWtFNa_drawerHeading{flex-direction:column;flex:auto;gap:2px;min-width:0;display:flex}.aWtFNa_drawerTitle{font-size:15px;font-weight:600;line-height:20px}.aWtFNa_drawerSubtitle{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:16px;overflow:hidden}.aWtFNa_toolbarButton:disabled,.aWtFNa_toggleButton:disabled{cursor:default;opacity:.45}.aWtFNa_toast{z-index:1200;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-container,Canvas);width:min(430px,100vw - 32px);color:var(--dsw-alias-label-primary);border-radius:14px;padding:14px;position:fixed;top:120px;left:50%;transform:translate(-50%);box-shadow:0 8px 24px #00000029}.aWtFNa_toastSuccess{border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 28%, transparent);width:auto;min-width:220px;max-width:min(430px,100vw - 32px);padding:8px 10px}.aWtFNa_toastError{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, transparent)}.aWtFNa_toastHeader{align-items:flex-start;gap:10px;display:flex}.aWtFNa_noticeIcon{border-radius:9px;flex:none;place-items:center;width:30px;height:30px;display:grid}.aWtFNa_toastSuccess .aWtFNa_noticeIcon{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent);color:var(--dsw-alias-state-success-primary)}.aWtFNa_toastError .aWtFNa_noticeIcon{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);color:var(--dsw-alias-state-error-primary)}.aWtFNa_noticeIconSvg{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.7px;width:18px;height:18px}.aWtFNa_toastCopy{flex-direction:column;flex:auto;gap:3px;min-width:0;padding-top:3px;display:flex}.aWtFNa_toastTitle{font-size:14px;font-weight:600;line-height:20px}.aWtFNa_toastDescription{overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}.aWtFNa_toastCloseButton{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;border-radius:7px;flex:none;place-items:center;padding:0;display:grid}.aWtFNa_toastCloseButton:hover,.aWtFNa_toastCloseButton:focus-visible,.aWtFNa_noticeFileButton:hover,.aWtFNa_noticeFileButton:focus-visible{background:var(--dsw-alias-interactive-bg-hover)}.aWtFNa_toastCloseButton:focus-visible,.aWtFNa_noticeFileButton:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-alias-border-l3);outline:none}.aWtFNa_noticeFiles{margin:12px 0 0 40px}.aWtFNa_noticeFileListLabel{color:var(--dsw-alias-label-secondary);margin:0 8px 4px;font-size:12px;line-height:18px;display:block}.aWtFNa_noticeFileList{flex-direction:column;gap:2px;max-height:220px;margin:0;padding:0;list-style:none;display:flex;overflow:auto}.aWtFNa_noticeFileButton{width:100%;min-height:34px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;text-align:left;background:0 0;border:0;border-radius:7px;align-items:center;gap:12px;padding:5px 8px;display:flex}.aWtFNa_noticeFilePath{min-width:0;font:var(--dsw-font-markdown-code-block);text-overflow:ellipsis;white-space:nowrap;flex:auto;overflow:hidden}.aWtFNa_noticeFileArrow{color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:none;font-size:14px}.aWtFNa_noticeDismissButton{background:var(--dsw-alias-label-primary);width:100%;min-height:34px;color:var(--dsw-alias-bg-container,Canvas);cursor:pointer;font:inherit;border:0;border-radius:8px;margin-top:12px;padding:0 12px;font-weight:600}.aWtFNa_noticeDismissButton:hover{opacity:.9}.aWtFNa_noticeDismissButton:focus-visible{outline:2px solid var(--dsw-alias-border-l3);outline-offset:2px}.aWtFNa_closeButton{background:0 0;border-color:#0000;border-radius:8px;flex:none;place-items:center;width:32px;height:32px;padding:0;display:grid}.aWtFNa_drawerBody{flex:auto;min-height:0;overflow:auto}.aWtFNa_reviewFile+.aWtFNa_reviewFile{border-top:8px solid var(--dsw-alias-border-l1)}.aWtFNa_reviewFileHeader{z-index:2;border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-container,Canvas);min-height:44px;font:var(--dsw-font-markdown-code-block);align-items:center;gap:8px;padding:0 12px;display:flex;position:sticky;top:0}.aWtFNa_reviewStatus{color:var(--dsw-alias-state-success-primary);font-weight:700}.aWtFNa_reviewPath{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.aWtFNa_openButton{min-height:28px;font:var(--dsw-font-xs-13);border-radius:7px;flex:none;padding:0 9px}.aWtFNa_reviewDiff{color:var(--dsw-alias-label-primary)}.aWtFNa_reviewUnavailable{background:var(--dsw-alias-markdown-code-block);color:var(--dsw-alias-label-secondary);margin:0;padding:22px 16px;font-size:13px;line-height:20px}@media (width<=760px){.aWtFNa_cardHeader{flex-wrap:wrap;padding-block:10px}.aWtFNa_cardTitleBlock{flex-direction:column;gap:1px}.aWtFNa_drawer{border-left:0;width:100vw}.aWtFNa_resizeHandle{display:none}.aWtFNa_drawerHeader{gap:8px;padding-left:12px}.aWtFNa_toolbarButton{color:#0000;justify-content:center;width:32px;padding:0;overflow:hidden}.aWtFNa_toolbarButton .aWtFNa_buttonIcon{color:var(--dsw-alias-label-primary)}.aWtFNa_reviewFileHeader{flex-wrap:wrap;padding-block:8px}.aWtFNa_reviewPath{flex-basis:calc(100% - 30px)}.aWtFNa_openButton{margin-left:auto}}@media (prefers-reduced-motion:no-preference){.aWtFNa_drawer{animation:.16s ease-out aWtFNa_drawer-enter}}@keyframes aWtFNa_drawer-enter{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}.aWtFNa_deletedBadge{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);white-space:nowrap;border-radius:999px;padding:1px 6px;font-size:11px}";
		const styleId = "dsh-file-review-tab/ProducedFiles.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(styleId) + "]") === null) {
			const style = document.createElement("style");
			style.dataset.plugin = "dsh-file-review-tab";
			style.dataset.pluginCss = styleId;
			style.textContent = css;
			document.head.appendChild(style);
		}
		var ProducedFiles_module_css_default = {
			"reviewFileHeader": "aWtFNa_reviewFileHeader",
			"drawer-enter": "aWtFNa_drawer-enter",
			"reviewFile": "aWtFNa_reviewFile",
			"cardHeader": "aWtFNa_cardHeader",
			"reviewStatus": "aWtFNa_reviewStatus",
			"toast": "aWtFNa_toast",
			"noticeFilePath": "aWtFNa_noticeFilePath",
			"drawerBody": "aWtFNa_drawerBody",
			"drawerHeading": "aWtFNa_drawerHeading",
			"resizeHandle": "aWtFNa_resizeHandle",
			"closeIcon": "aWtFNa_closeIcon",
			"removed": "aWtFNa_removed",
			"toastError": "aWtFNa_toastError",
			"toastDescription": "aWtFNa_toastDescription",
			"cardTitle": "aWtFNa_cardTitle",
			"fileRow": "aWtFNa_fileRow",
			"noticeFiles": "aWtFNa_noticeFiles",
			"drawerHeader": "aWtFNa_drawerHeader",
			"icon": "aWtFNa_icon",
			"noticeDismissButton": "aWtFNa_noticeDismissButton",
			"buttonIcon": "aWtFNa_buttonIcon",
			"toggleButton": "aWtFNa_toggleButton",
			"noticeIcon": "aWtFNa_noticeIcon",
			"toastHeader": "aWtFNa_toastHeader",
			"cardTitleBlock": "aWtFNa_cardTitleBlock",
			"added": "aWtFNa_added",
			"card": "aWtFNa_card",
			"openButton": "aWtFNa_openButton",
			"drawerSubtitle": "aWtFNa_drawerSubtitle",
			"noticeIconSvg": "aWtFNa_noticeIconSvg",
			"reviewButton": "aWtFNa_reviewButton",
			"toastCloseButton": "aWtFNa_toastCloseButton",
			"noticeFileButton": "aWtFNa_noticeFileButton",
			"moreFiles": "aWtFNa_moreFiles",
			"drawer": "aWtFNa_drawer",
			"reviewUnavailable": "aWtFNa_reviewUnavailable",
			"deletedBadge": "aWtFNa_deletedBadge",
			"toastTitle": "aWtFNa_toastTitle",
			"closeButton": "aWtFNa_closeButton",
			"fileIconWrap": "aWtFNa_fileIconWrap",
			"toolbarButton": "aWtFNa_toolbarButton",
			"reviewDiff": "aWtFNa_reviewDiff",
			"noticeFileListLabel": "aWtFNa_noticeFileListLabel",
			"reviewPath": "aWtFNa_reviewPath",
			"toastCopy": "aWtFNa_toastCopy",
			"stats": "aWtFNa_stats",
			"drawerSplit": "aWtFNa_drawerSplit",
			"toastSuccess": "aWtFNa_toastSuccess",
			"drawerTitle": "aWtFNa_drawerTitle",
			"noticeFileList": "aWtFNa_noticeFileList",
			"drawerResizing": "aWtFNa_drawerResizing",
			"fileList": "aWtFNa_fileList",
			"fileName": "aWtFNa_fileName",
			"noticeFileArrow": "aWtFNa_noticeFileArrow"
		};
		//#endregion
		//#region src/client/ProducedFiles.tsx
		/** Keep the turn-tail card compact; the sidebar tab always lists every file. */
		const SHOWN_LIMIT = 6;
		const SUCCESS_NOTICE_DURATION = 2e3;
		const ERROR_NOTICE_DURATION = 5e3;
		const unavailableChanges = async (request) => ({ files: request.files.map((file) => ({
			path: file.path,
			state: "unsupported",
			changed: false,
			reason: "Host file toggle is unavailable"
		})) });
		function FileIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: ProducedFiles_module_css_default.icon,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5.25 2.75h6l3.5 3.5v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1Z" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M11.25 2.75v3.5h3.5M7 10h5M7 13h5" })]
			});
		}
		function ReviewIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: ProducedFiles_module_css_default.buttonIcon,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4.5 3.5h8a1 1 0 0 1 1 1v3M6.5 6.5h4M6.5 9.5h2.25" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m10.5 13 1.5 1.5 3.5-4" })]
			});
		}
		function CloseIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: ProducedFiles_module_css_default.closeIcon,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m5.5 5.5 9 9m0-9-9 9" })
			});
		}
		function SuccessIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: ProducedFiles_module_css_default.noticeIconSvg,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m5 10 3.25 3.25L15 6.5" })
			});
		}
		function ErrorIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				className: ProducedFiles_module_css_default.noticeIconSvg,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					cx: "10",
					cy: "10",
					r: "6.5"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m7.5 7.5 5 5m0-5-5 5" })]
			});
		}
		function ResultToast({ notice, closeLabel, dismissLabel, fileListLabel, fileOpenLabel, openFile, onDone }) {
			(0, react.useEffect)(() => {
				const duration = notice.tone === "success" ? SUCCESS_NOTICE_DURATION : ERROR_NOTICE_DURATION;
				const timer = window.setTimeout(onDone, duration);
				return () => {
					window.clearTimeout(timer);
				};
			}, [notice.tone, onDone]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${ProducedFiles_module_css_default.toast} ${notice.tone === "success" ? ProducedFiles_module_css_default.toastSuccess : ProducedFiles_module_css_default.toastError}`,
				role: "alert",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ProducedFiles_module_css_default.toastHeader,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ProducedFiles_module_css_default.noticeIcon,
								children: notice.tone === "success" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SuccessIcon, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ErrorIcon, {})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: ProducedFiles_module_css_default.toastCopy,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
									className: ProducedFiles_module_css_default.toastTitle,
									children: notice.title
								}), notice.description !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ProducedFiles_module_css_default.toastDescription,
									children: notice.description
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ProducedFiles_module_css_default.toastCloseButton,
								"aria-label": closeLabel,
								onClick: onDone,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CloseIcon, {})
							})
						]
					}),
					notice.files.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ProducedFiles_module_css_default.noticeFiles,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ProducedFiles_module_css_default.noticeFileListLabel,
							children: fileListLabel
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
							className: ProducedFiles_module_css_default.noticeFileList,
							children: notice.files.map((file) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ProducedFiles_module_css_default.noticeFileButton,
								"aria-label": fileOpenLabel(file.path),
								onClick: () => {
									openFile(file.path);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ProducedFiles_module_css_default.noticeFilePath,
									children: basename(file.path)
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ProducedFiles_module_css_default.noticeFileArrow,
									"aria-hidden": "true",
									children: "↗"
								})]
							}) }, file.path))
						})]
					}),
					notice.tone === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: ProducedFiles_module_css_default.noticeDismissButton,
						onClick: onDone,
						children: dismissLabel
					})
				]
			});
		}
		function addStats(left, right) {
			return {
				added: left.added + right.added,
				removed: left.removed + right.removed
			};
		}
		function Stats({ stats, label }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: ProducedFiles_module_css_default.stats,
				"aria-label": label,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: ProducedFiles_module_css_default.added,
					children: ["+", stats.added]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: ProducedFiles_module_css_default.removed,
					children: ["-", stats.removed]
				})]
			});
		}
		/** Render one turn's produced files as a summary card opening the sidebar tab. */
		function ProducedFiles({ matched: reviews, openFile, turn: turnLocation, inspectChanges = unavailableChanges, applyChanges = unavailableChanges, openInSidebarTab, t }) {
			const turnNumber = turnLocation.turn;
			const [toggleAction, setToggleAction] = (0, react.useState)("undo");
			const [statusPending, setStatusPending] = (0, react.useState)(true);
			const [togglePending, setTogglePending] = (0, react.useState)(false);
			const [toast, setToast] = (0, react.useState)(null);
			const toastSeqRef = (0, react.useRef)(0);
			const reviewsWithStats = (0, react.useMemo)(() => reviews.map((review) => ({
				review,
				stats: summarizeDiffs(review.diffs)
			})), [reviews]);
			const totalStats = (0, react.useMemo)(() => reviewsWithStats.reduce((total, item) => addStats(total, item.stats), {
				added: 0,
				removed: 0
			}), [reviewsWithStats]);
			const toggleFiles = (0, react.useMemo)(() => reviews.filter((review) => review.deleted !== true).map((review) => ({
				path: review.path,
				diffs: review.diffs
			})), [reviews]);
			const reversiblePaths = (0, react.useMemo)(() => new Set(reviews.filter((review) => review.diffs.length > 0 && review.diffs.every((diff) => diff.path === review.path && diff.oldText !== null && diff.oldText !== diff.newText && (diff.oldText !== "" || diff.oldStart !== void 0) && (diff.newText !== "" || diff.newStart !== void 0))).map((review) => review.path)), [reviews]);
			const hasReversibleFiles = reversiblePaths.size > 0;
			const shown = reviewsWithStats.slice(0, SHOWN_LIMIT);
			const hidden = reviewsWithStats.length - shown.length;
			const allPaths = (0, react.useMemo)(() => reviews.map((review) => review.path), [reviews]);
			const allDeleted = reviews.length > 0 && reviews.every((review) => review.deleted === true);
			const statsMatter = totalStats.added > 0 || totalStats.removed > 0;
			const showToast = (0, react.useCallback)((notice) => {
				toastSeqRef.current += 1;
				setToast({
					seq: toastSeqRef.current,
					...notice
				});
			}, []);
			const phaseForResult = (0, react.useCallback)((result, currentAction) => {
				if (reversiblePaths.size === 0) return "undo";
				const byPath = new Map(result.files.map((file) => [file.path, file]));
				const target = currentAction === "undo" ? "undone" : "applied";
				return [...reversiblePaths].every((path) => byPath.get(path)?.state === target) ? currentAction === "undo" ? "redo" : "undo" : currentAction;
			}, [reversiblePaths]);
			(0, react.useEffect)(() => {
				let active = true;
				setStatusPending(true);
				inspectChanges({
					action: "undo",
					files: toggleFiles
				}).then((result) => {
					if (!active) return;
					const allUndone = reversiblePaths.size > 0 && [...reversiblePaths].every((path) => result.files.find((file) => file.path === path)?.state === "undone");
					setToggleAction(allUndone ? "redo" : "undo");
				}).catch(() => {}).finally(() => {
					if (active) setStatusPending(false);
				});
				return () => {
					active = false;
				};
			}, [
				inspectChanges,
				reversiblePaths,
				toggleFiles
			]);
			const runToggle = (0, react.useCallback)(() => {
				if (statusPending || togglePending || !hasReversibleFiles) return;
				const action = toggleAction;
				setTogglePending(true);
				applyChanges({
					action,
					files: toggleFiles
				}).then((result) => {
					setToggleAction(phaseForResult(result, action));
					const targetState = action === "undo" ? "undone" : "applied";
					const byPath = new Map(result.files.map((file) => [file.path, file]));
					const failures = toggleFiles.flatMap((file) => {
						if (byPath.get(file.path)?.state === targetState) return [];
						return [{ path: file.path }];
					});
					if (failures.length === 0) {
						showToast({
							tone: "success",
							title: t(action === "undo" ? "produced.undoSuccess" : "produced.redoSuccess"),
							files: []
						});
						return;
					}
					showToast({
						tone: "error",
						title: t(action === "undo" ? "produced.undoPartial" : "produced.redoPartial"),
						description: t(action === "undo" ? "produced.undoPartialDescription" : "produced.redoPartialDescription"),
						files: failures
					});
				}).catch((error) => {
					showToast({
						tone: "error",
						title: t(action === "undo" ? "produced.undoError" : "produced.redoError"),
						description: error instanceof Error ? error.message : String(error),
						files: []
					});
				}).finally(() => {
					setTogglePending(false);
				});
			}, [
				applyChanges,
				hasReversibleFiles,
				phaseForResult,
				showToast,
				t,
				statusPending,
				toggleAction,
				toggleFiles,
				togglePending
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: ProducedFiles_module_css_default.card,
				"aria-label": t("produced.summary"),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
					className: ProducedFiles_module_css_default.cardHeader,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ProducedFiles_module_css_default.fileIconWrap,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileIcon, {})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ProducedFiles_module_css_default.cardTitleBlock,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ProducedFiles_module_css_default.cardTitle,
								children: allDeleted ? reviews.length === 1 ? t("produced.deletedOne") : t("produced.deletedAll", { count: String(reviews.length) }) : reviews.length === 1 ? t("produced.editedOne") : t("produced.edited", { count: String(reviews.length) })
							}), statsMatter && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stats, {
								stats: totalStats,
								label: t("review.stats", {
									added: String(totalStats.added),
									removed: String(totalStats.removed)
								})
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ProducedFiles_module_css_default.toggleButton,
							disabled: statusPending || togglePending || !hasReversibleFiles,
							title: !hasReversibleFiles ? t("produced.toggleUnavailable") : void 0,
							"aria-label": toggleAction === "undo" ? t("produced.undo") : t("produced.redo"),
							onClick: runToggle,
							children: togglePending ? toggleAction === "undo" ? t("produced.undoing") : t("produced.redoing") : toggleAction === "undo" ? t("produced.undo") : t("produced.redo")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: ProducedFiles_module_css_default.reviewButton,
							"aria-label": t("produced.reviewAll"),
							onClick: () => {
								openInSidebarTab?.(allPaths, turnNumber);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ReviewIcon, {}), t("review.title")]
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ProducedFiles_module_css_default.fileList,
					children: [shown.map(({ review, stats }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: ProducedFiles_module_css_default.fileRow,
						title: review.path,
						"aria-label": t("produced.review", { name: review.path }),
						onClick: () => {
							openInSidebarTab?.([review.path], turnNumber);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ProducedFiles_module_css_default.fileName,
							children: basename(review.path)
						}), review.deleted === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ProducedFiles_module_css_default.deletedBadge,
							children: t("produced.deleted")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stats, {
							stats,
							label: t("review.stats", {
								added: String(stats.added),
								removed: String(stats.removed)
							})
						})]
					}, review.path)), hidden > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: ProducedFiles_module_css_default.moreFiles,
						children: hidden === 1 ? t("produced.moreOne") : t("produced.more", { count: String(hidden) })
					})]
				})]
			}), toast !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ResultToast, {
				notice: toast,
				closeLabel: t("produced.noticeClose"),
				dismissLabel: t("produced.noticeDismiss"),
				fileListLabel: t("produced.skippedFiles", { count: String(toast.files.length) }),
				fileOpenLabel: (path) => t("produced.open", { name: basename(path) }),
				openFile,
				onDone: () => {
					setToast((current) => current?.seq === toast.seq ? null : current);
				}
			}, toast.seq)] });
		}
		//#endregion
		//#region src/client/chat-locales.ts
		/** `file-review` namespace dictionaries. */
		/** Dictionary namespace owned by this plugin. */
		const NS = "file-review";
		/** English dictionary (the key-set source of truth). */
		const en = {
			"produced.summary": "Edited files",
			"produced.editedOne": "Edited 1 file",
			"produced.edited": "Edited {count} files",
			"produced.moreOne": "1 more file",
			"produced.more": "{count} more files",
			"produced.open": "Open {name}",
			"produced.review": "Review {name}",
			"produced.reviewAll": "Review all produced files",
			"produced.undo": "Undo",
			"produced.redo": "Reapply",
			"produced.undoing": "Undoing…",
			"produced.redoing": "Reapplying…",
			"produced.toggleUnavailable": "No safely reversible files are available in this change",
			"produced.undoSuccess": "Changes undone",
			"produced.redoSuccess": "Changes reapplied",
			"produced.undoPartial": "Not all changes were restored",
			"produced.redoPartial": "Not all changes were reapplied",
			"produced.undoPartialDescription": "An error occurred while restoring some files",
			"produced.redoPartialDescription": "An error occurred while reapplying some files",
			"produced.skippedFiles": "Skipped ({count})",
			"produced.undoError": "Could not undo changes",
			"produced.redoError": "Could not reapply changes",
			"produced.noticeClose": "Dismiss notification",
			"produced.noticeDismiss": "Close",
			"produced.deleted": "deleted",
			"produced.deletedOne": "Deleted 1 file",
			"produced.deletedAll": "Deleted {count} files",
			"review.title": "Review",
			"review.fileOne": "1 file",
			"review.files": "{count} files",
			"review.close": "Close",
			"review.resize": "Resize review panel",
			"review.resizeHint": "Drag to resize. Double-click to reset.",
			"review.openInEditor": "Open in editor",
			"review.copy": "Copy diff",
			"review.copied": "Copied",
			"review.showUnchanged": "{count} unchanged lines",
			"review.hideUnchanged": "Hide {count} unchanged lines",
			"review.stats": "{added} lines added, {removed} lines removed",
			"review.unavailable": "No reconstructable diff is available for this change. You can still open the current file."
		};
		/** Simplified Chinese dictionary. */
		const zh = {
			"produced.summary": "已编辑文件",
			"produced.editedOne": "已编辑 1 个文件",
			"produced.edited": "已编辑 {count} 个文件",
			"produced.moreOne": "另有 1 个文件",
			"produced.more": "另有 {count} 个文件",
			"produced.open": "打开 {name}",
			"produced.review": "审查 {name}",
			"produced.reviewAll": "审查所有产出文件",
			"produced.undo": "撤销",
			"produced.redo": "重新应用",
			"produced.undoing": "正在撤销…",
			"produced.redoing": "正在重新应用…",
			"produced.toggleUnavailable": "本次更改中没有可安全还原的文件",
			"produced.undoSuccess": "已成功撤销更改",
			"produced.redoSuccess": "已成功重新应用更改",
			"produced.undoPartial": "未还原全部更改",
			"produced.redoPartial": "未重新应用全部更改",
			"produced.undoPartialDescription": "还原部分文件时出错",
			"produced.redoPartialDescription": "重新应用部分文件时出错",
			"produced.skippedFiles": "已跳过（{count} 个）",
			"produced.undoError": "未能撤销更改",
			"produced.redoError": "未能重新应用更改",
			"produced.noticeClose": "关闭提示",
			"produced.noticeDismiss": "关闭",
			"produced.deleted": "已删除",
			"produced.deletedOne": "已删除 1 个文件",
			"produced.deletedAll": "已删除 {count} 个文件",
			"review.title": "审查",
			"review.fileOne": "1 个文件",
			"review.files": "{count} 个文件",
			"review.close": "关闭",
			"review.resize": "调整审查面板大小",
			"review.resizeHint": "拖动以调整大小。双击恢复默认大小。",
			"review.openInEditor": "在编辑器中打开",
			"review.copy": "复制差异",
			"review.copied": "已复制",
			"review.showUnchanged": "显示 {count} 行未更改内容",
			"review.hideUnchanged": "隐藏 {count} 行未更改内容",
			"review.stats": "新增 {added} 行，删除 {removed} 行",
			"review.unavailable": "无法为此更改还原可审查的差异。你仍可打开当前文件。"
		};
		//#endregion
		//#region src/client/index.tsx
		/**
		* Required services: the sidebar registry, session snapshots, locale, remote,
		* and the slot registry (turn-tail chain). The conversation Definition
		* registry is deliberately NOT a static inject: its service name moved across
		* dsh releases (<= 0.1.1: root `conversationEvents`; 0.1.2-alpha.1+:
		* `uiConversation.events`), so a hard inject on either name leaves the whole
		* plugin forever "pending" on the other version and fails web boot (issue
		* #6). It is resolved dynamically in apply() instead.
		*/
		const inject = [
			"betterSidebar",
			"sessions",
			"locale",
			"remote",
			"slots"
		];
		/** The tab icon: a modest line-diff glyph drawn at the host-given size. */
		function FileReviewIcon({ size }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 20 20",
				"aria-hidden": "true",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.5,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5.25 2.75h6l3.5 3.5v10a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1Z" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M11.25 2.75v3.5h3.5" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M7 10h2.5M10.5 10H12M7 13h5" })
				]
			});
		}
		/**
		* The tab-strip badge: the number of distinct files this session changed.
		* The sidebar re-renders the tab bar constantly (and streams publish a fresh
		* snapshot reference per event), so the derivation is memoized by a cheap
		* structural fingerprint per session — streaming token flushes keep the
		* fingerprint stable and skip the full re-derive.
		*/
		const badgeMemo = /* @__PURE__ */ new Map();
		function snapshotFingerprint(snapshot) {
			if (snapshot === null) return "none";
			let lastEnd = 0;
			for (const endSeq of snapshot.turnEnds.values()) lastEnd = endSeq;
			return `${snapshot.nodes.length}:${snapshot.turnEnds.size}:${lastEnd}`;
		}
		function badgeCount(ctx, sessionId) {
			const snapshot = (ctx.sessions.binding(sessionId)?.session)?.getSnapshot() ?? null;
			const fingerprint = snapshotFingerprint(snapshot);
			const hit = badgeMemo.get(sessionId);
			if (hit !== void 0 && hit.fingerprint === fingerprint) return hit.count;
			const count = countChangedFiles(deriveSessionChanges(snapshot));
			const value = count === 0 ? null : count;
			badgeMemo.set(sessionId, {
				fingerprint,
				count: value
			});
			return value;
		}
		/**
		* Resolve the conversation Definition registry without statically injecting
		* it. dsh 0.1.2-alpha.1+ folds the old `conversationEvents` /
		* `conversationViews` pair into a single `uiConversation` service (the
		* registry is its `.events` property); dsh 0.1.1 and earlier expose it as the
		* standalone root `conversationEvents` service. Returns undefined when the
		* running dsh provides neither — the caller degrades instead of blocking.
		*/
		function resolveConversationEvents(ctx) {
			const lookup = (name) => {
				const anyCtx = ctx;
				if (typeof anyCtx.get === "function") return anyCtx.get(name);
				return ctx.reflect.get(name);
			};
			const uiConversation = lookup("uiConversation");
			if (uiConversation?.events !== void 0 && uiConversation.events !== null) return uiConversation.events;
			const conversationEvents = lookup("conversationEvents");
			if (conversationEvents !== void 0 && conversationEvents !== null) return conversationEvents;
		}
		/**
		* Client plugin body: attach locale, mount the Typert remote, register the
		* chat turn-tail row AND the sidebar tab.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			attachLocale(ctx.locale);
			ctx.effect(() => {
				const offZh = ctx.locale.register(LOCALE_NS, "zh", zh$1);
				const offEn = ctx.locale.register(LOCALE_NS, "en", en$1);
				return () => {
					offZh();
					offEn();
				};
			}, "file-review-tab: tab dictionaries");
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "file-review-tab: chat dictionaries");
			ctx.effect(() => {
				let disposed = false;
				let disposeRemote;
				ctx.remote.$mount(TYPERT_REMOTE).then((dispose) => {
					if (disposed) dispose();
					else disposeRemote = dispose;
				}).catch((error) => {
					console.error("[dsh-file-review-tab] remote mount error:", error);
				});
				return () => {
					disposed = true;
					if (disposeRemote !== void 0) disposeRemote();
				};
			}, "file-review-tab: typert remote");
			let registeredOn;
			const registerDeliverables = () => {
				const events = resolveConversationEvents(ctx);
				if (events === void 0 || events === registeredOn) return;
				registeredOn = events;
				ctx.effect(() => events.register(deliverablesDefinition), "file-review-tab: deliverables definition");
			};
			registerDeliverables();
			ctx.on("internal/service", (name) => {
				if (name === "conversationEvents" || name === "uiConversation") registerDeliverables();
			});
			ctx.effect(() => ctx.slots.inject("conversation.chat.turnTail", () => ctx.slots.register({
				name: "conversation.chat.turnTail",
				select: selectProducedFiles,
				priority: -2,
				locale: NS,
				registrant: "dsh-file-review-tab",
				inject: (sessionId) => {
					const sessions = ctx.sessions;
					const projectRoot = sessions.list.getSnapshot().byId[sessionId]?.cwd;
					const invoke = async (method, request) => {
						const scope = sessions.scope(sessionId);
						if (scope === void 0) throw new Error("Session is unavailable");
						const fileReview = scope.get("remote.fileReview");
						if (fileReview === void 0) throw new Error("File review Remote is unavailable");
						const result = await fileReview[method](request);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					};
					return {
						projectRoot,
						inspectChanges: (request) => invoke("status", request),
						applyChanges: (request) => invoke("apply", request),
						openInSidebarTab: (paths, turn) => {
							const sidebar = ctx.betterSidebar;
							const first = paths[0];
							if (sidebar === void 0 || first === void 0) return;
							const meta = {
								expandPaths: [...paths],
								...turn !== void 0 ? { turn } : {}
							};
							const scope = {
								sessionId,
								...projectRoot !== void 0 ? { cwd: projectRoot } : {}
							};
							sidebar.updateTab("file-review", { meta });
							sidebar.openTab({
								type: "file-review",
								path: first,
								meta
							}, scope);
							sidebar.activateTab("file-review", scope);
						}
					};
				}
			}, ProducedFiles)), "file-review-tab: turn-tail row");
			ctx.effect(() => {
				const tChat = ctx.locale.bind(NS);
				return ctx.provide("chatFileMentions", { forClosing(owner) {
					const reviews = selectProducedFiles(owner);
					if (reviews === null) return void 0;
					return producedFileMentions(reviews.map((review) => review.path), owner.openFile, (path) => tChat("produced.open", { name: path }));
				} });
			}, "file-review-tab: chat file mentions");
			ctx.effect(() => ctx.betterSidebar.registerTab({
				id: "file-review",
				title: () => t("tabTitle"),
				icon: (size) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileReviewIcon, { size }),
				order: 35,
				single: true,
				badge: (badgeCtx, scope) => badgeCount(badgeCtx, scope.sessionId),
				component: ({ ctx: tabCtx, scope, visible, tab }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileReviewTab, {
					ctx: tabCtx,
					sessionId: scope.sessionId,
					cwd: scope.cwd,
					visible,
					tab
				})
			}), "file-review-tab: register tab");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
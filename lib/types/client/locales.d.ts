/**
 * Minimal zh/en copy for the file-review sidebar tab. Follows the DSH i18n
 * system: the client apply attaches the locale service (`ctx.locale`,
 * provided by `@deepseek-ai/dsh-client-locale`) through {@link attachLocale},
 * and `t()` resolves the active locale from it. Without an attached service
 * (standalone/test compositions) the browser language is used. Mirrors the
 * dsh-better-sidebar locales pattern.
 */
/** The dictionary namespace this plugin owns in the DSH locale registry. */
export declare const LOCALE_NS = "fileReviewTab";
/** The zh dictionary (the key-set source of truth). */
export declare const zh: {
    readonly tabTitle: "文件审查";
    readonly empty: "本会话暂无文件改动";
    readonly sessionUnavailable: "会话不可用";
    readonly remoteUnavailable: "文件审查服务不可用";
    readonly turn: "第 {n} 轮";
    readonly turnLive: "进行中";
    readonly files: "{count} 个文件";
    readonly filesOne: "1 个文件";
    readonly undo: "撤销";
    readonly redo: "重新应用";
    readonly undoing: "正在撤销…";
    readonly redoing: "正在重新应用…";
    readonly undoTurn: "撤销本轮";
    readonly redoTurn: "重新应用本轮";
    readonly toggleUnavailable: "没有可安全还原的文件";
    readonly stateUndone: "已撤销";
    readonly stateConflict: "内容冲突";
    readonly stateUnsupported: "不可还原";
    readonly stateError: "错误";
    readonly deleted: "已删除";
    readonly deletedHint: "该文件在本轮中被终端命令删除，内容已不存在，无法查看差异或撤销。";
    readonly archived: "已归档 {n} 轮";
    readonly archivedExpand: "展开已归档轮次";
    readonly archivedCollapse: "收起已归档轮次";
    readonly loadMore: "加载更多（还有 {n} 轮）";
    readonly undoSuccess: "已成功撤销更改";
    readonly redoSuccess: "已成功重新应用更改";
    readonly undoPartial: "部分文件未能撤销";
    readonly redoPartial: "部分文件未能重新应用";
    readonly toggleError: "操作失败";
    readonly openInEditor: "在编辑器中打开";
    readonly open: "打开 {name}";
    readonly copy: "复制差异";
    readonly copied: "已复制";
    readonly showUnchanged: "显示 {count} 行未更改内容";
    readonly hideUnchanged: "隐藏 {count} 行未更改内容";
    readonly stats: "新增 {added} 行，删除 {removed} 行";
    readonly unavailable: "无法为此更改还原可审查的差异。";
    readonly refresh: "刷新状态";
};
/** Union of this namespace's dictionary keys. */
export type CopyKey = keyof typeof zh;
/** The en dictionary. */
export declare const en: Record<CopyKey, string>;
/** Attach (or detach, with undefined) the DSH locale service. */
export declare function attachLocale(service: {
    getSnapshot(): {
        active: string;
    };
} | undefined): void;
/** Translate a copy key; `{name}` placeholders interpolate from `params`. */
export declare function t(key: CopyKey, params?: Record<string, string | number>): string;
//# sourceMappingURL=locales.d.ts.map
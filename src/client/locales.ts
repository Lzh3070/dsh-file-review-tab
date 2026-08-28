/**
 * Minimal zh/en copy for the file-review sidebar tab. Follows the DSH i18n
 * system: the client apply attaches the locale service (`ctx.locale`,
 * provided by `@deepseek-ai/dsh-client-locale`) through {@link attachLocale},
 * and `t()` resolves the active locale from it. Without an attached service
 * (standalone/test compositions) the browser language is used. Mirrors the
 * dsh-better-sidebar locales pattern.
 */

/** The dictionary namespace this plugin owns in the DSH locale registry. */
export const LOCALE_NS = 'fileReviewTab'

/** The zh dictionary (the key-set source of truth). */
export const zh = {
  tabTitle: '文件审查',
  empty: '本会话暂无文件改动',
  sessionUnavailable: '会话不可用',
  remoteUnavailable: '文件审查服务不可用',
  turn: '第 {n} 轮',
  turnLive: '进行中',
  files: '{count} 个文件',
  filesOne: '1 个文件',
  undo: '撤销',
  redo: '重新应用',
  undoing: '正在撤销…',
  redoing: '正在重新应用…',
  undoTurn: '撤销本轮',
  redoTurn: '重新应用本轮',
  toggleUnavailable: '没有可安全还原的文件',
  stateUndone: '已撤销',
  stateConflict: '内容冲突',
  stateUnsupported: '不可还原',
  stateError: '错误',
  deleted: '已删除',
  deletedHint: '该文件在本轮中被终端命令删除，内容已不存在，无法查看差异或撤销。',
  archived: '已归档 {n} 轮',
  archivedExpand: '展开已归档轮次',
  archivedCollapse: '收起已归档轮次',
  loadMore: '加载更多（还有 {n} 轮）',
  undoSuccess: '已成功撤销更改',
  redoSuccess: '已成功重新应用更改',
  undoPartial: '部分文件未能撤销',
  redoPartial: '部分文件未能重新应用',
  toggleError: '操作失败',
  openInEditor: '在编辑器中打开',
  open: '打开 {name}',
  copy: '复制差异',
  copied: '已复制',
  showUnchanged: '显示 {count} 行未更改内容',
  hideUnchanged: '隐藏 {count} 行未更改内容',
  stats: '新增 {added} 行，删除 {removed} 行',
  unavailable: '无法为此更改还原可审查的差异。',
  refresh: '刷新状态',
} as const

/** Union of this namespace's dictionary keys. */
export type CopyKey = keyof typeof zh

/** The en dictionary. */
export const en: Record<CopyKey, string> = {
  tabTitle: 'File Review',
  empty: 'No file changes in this session yet',
  sessionUnavailable: 'Session is unavailable',
  remoteUnavailable: 'File review service is unavailable',
  turn: 'Turn {n}',
  turnLive: 'in progress',
  files: '{count} files',
  filesOne: '1 file',
  undo: 'Undo',
  redo: 'Reapply',
  undoing: 'Undoing…',
  redoing: 'Reapplying…',
  undoTurn: 'Undo turn',
  redoTurn: 'Reapply turn',
  toggleUnavailable: 'No safely reversible files are available',
  stateUndone: 'undone',
  stateConflict: 'conflict',
  stateUnsupported: 'not reversible',
  stateError: 'error',
  deleted: 'deleted',
  deletedHint: 'This file was deleted by a terminal command in this turn; its content is gone, so no diff or undo is available.',
  archived: 'Archived turns ({n})',
  archivedExpand: 'Expand archived turns',
  archivedCollapse: 'Collapse archived turns',
  loadMore: 'Load more ({n} more turns)',
  undoSuccess: 'Changes undone',
  redoSuccess: 'Changes reapplied',
  undoPartial: 'Some files could not be undone',
  redoPartial: 'Some files could not be reapplied',
  toggleError: 'Operation failed',
  openInEditor: 'Open in editor',
  open: 'Open {name}',
  copy: 'Copy diff',
  copied: 'Copied',
  showUnchanged: '{count} unchanged lines',
  hideUnchanged: 'Hide {count} unchanged lines',
  stats: '{added} lines added, {removed} lines removed',
  unavailable: 'No reconstructable diff is available for this change.',
  refresh: 'Refresh status',
}

/** The DSH locale service attached by the client apply (absent → browser detection). */
let localeService: { getSnapshot(): { active: string } } | undefined

/** Attach (or detach, with undefined) the DSH locale service. */
export function attachLocale(service: { getSnapshot(): { active: string } } | undefined): void {
  localeService = service
}

/** The active locale id ('zh' | 'en'): the DSH locale service's snapshot when attached. */
function activeLocale(): string {
  return localeService?.getSnapshot().active
    ?? (typeof navigator !== 'undefined' ? navigator.language : '')
    ?? 'en'
}

/** Translate a copy key; `{name}` placeholders interpolate from `params`. */
export function t(key: CopyKey, params?: Record<string, string | number>): string {
  const dict = activeLocale().toLowerCase().startsWith('zh') ? zh : en
  let text: string = dict[key]
  if (params !== undefined) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value))
    }
  }
  return text
}

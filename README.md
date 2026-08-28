# dsh-file-review-tab

把 [dsh-file-review](https://github.com/left0ver/dsh-file-review)（作者 [left0ver](https://github.com/left0ver)）的"改动审查"能力移植为 [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) 的侧边栏 Tab，并保留对话尾部的审查行——两个入口同源，互不干扰。

> Port of [left0ver/dsh-file-review](https://github.com/left0ver/dsh-file-review)'s change-review capability into a [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) sidebar tab, keeping the chat turn-tail review row.

## 功能

- **对话尾部审查行**：回合结束出现"已编辑 N 个文件 +M −K / 撤销 / 审查"；点「审查」或单个文件名，**深链打开侧边栏 Tab，自动展开对应文件的 diff 并定位到该轮分组顶部**（不再弹全宽 drawer）。
- **侧边栏 Tab「文件审查」**：按轮次分组列出本会话改动文件；点击展开行级红绿 diff；支持撤销本轮 / 单文件撤销 / 重新应用；Tab 角标实时显示改动文件数。
- **删除文件可见**：dsh 没有删除文件的工具，删除发生在终端命令里——插件解析 `rm` 族命令（`rm` / `rmdir` / `unlink` / `Remove-Item` / `del` / `rd` 等）的字面路径参数，被删文件以「已删除」标记出现在两个入口（内容已不存在，故无行级 diff、不可撤销）。带通配符（`rm *.log`）或命令替换（`rm $(...)`）的删除不识别——受影响文件事后无法枚举。
- **自动归档**：主列表只保留最近 5 轮（进行中的轮次永不归档），更早的已完成轮次沉入底部「已归档 N 轮」折叠区。折叠时归档内容零渲染，展开后每页加载 10 轮（「加载更多」续页），diff 行另有懒挂载——长会话不再一次性挂载几十个 diff 组。深链跳到已归档轮次会自动展开并定位；展开状态按会话记忆；角标只统计主列表。
- **PTC / Code Mode 支持**：`run_code` 程序内部的 `edit`/`write` 子调用也会被捕获——Host 端快照完整 before/after，浏览器端重建带行号的行级 hunks 并入所属轮次；diff 查看、状态检查、撤销/重做均可用。标准模式行为不变（对话尾部审查行仍只覆盖标准模式轮次）。
- **会话隔离**：每个会话只看自己的改动；Tab 不可见时暂停状态巡检。
- **窄容器自适应**：工作台横向分屏半宽或浮动独立窗口下，轮次头部自动换行、次要信息（行数统计、「在编辑器中打开」）让位，撤销操作与文件名始终完整。
- **样式隔离**：全部 CSS Module + 宿主 `--dsw-alias-*` 主题令牌，不与对话区或其他插件冲突。

![对话尾部的审查行：已编辑 N 个文件、撤销与审查按钮、文件名列表](docs/screenshot.png)

## 安装

```sh
# npm（推荐）
dsh plugin --profile web add dsh-file-review-tab

# 或 GitHub 源
dsh plugin --profile web add github:Lzh3070/dsh-file-review-tab
```

前置依赖：DeepSeek Harness web（≥ 0.1.0-rc.5，兼容 0.1.2-alpha 系列）+ [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar)（≥ 0.12.0）。

安装后**重启 dsh web**，在 better-sidebar 侧边栏「+」菜单打开「文件审查」即可。

## 致谢

核心 diff 渲染器与撤销服务移植自 [left0ver/dsh-file-review](https://github.com/left0ver/dsh-file-review)（MIT License, © ZhangWenChao）。侧边栏集成基于 [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) 开放的 `ctx.betterSidebar` 注册 API。

## License

[MIT](./LICENSE)

---

## Features (English)

- Chat turn-tail review row ("Edited N files +M −K · Undo · Review") that deep-links into the sidebar tab (auto-expanding the diffs and scrolling the turn group to the top) instead of a full-width drawer.
- Sidebar tab "File Review" in dsh-better-sidebar: per-turn grouped changed files, line-level red/green diffs, undo per turn or per file, live badge with the changed-file count.
- Deleted files stay visible: dsh has no delete-file tool, so deletions happen in terminal commands — literal `rm`-family arguments (`rm`, `rmdir`, `unlink`, `Remove-Item`, `del`, …) are parsed and deleted files appear marked "deleted" in both surfaces (no line diff, no undo: the content is gone). Glob/command-substitution deletions are not guessed.
- Auto-archive: only the newest 5 turns stay in the main list (live turns never archive); older completed turns sink into an "Archived turns" section pinned to the tab's bottom. Collapsed it renders nothing; open, it loads 10 turns per page. Deep links auto-open and page to their target; the badge counts the main list only.
- Session-isolated, pause-when-hidden, CSS-Module scoped styling (no conflicts with the chat area or other plugins).
- Narrow-pane adaptive: in half-width splits and floated free windows the turn header wraps and secondary content yields so undo and file names never clip.

Requires DeepSeek Harness web (≥ 0.1.0-rc.5, compatible with the 0.1.2-alpha line) and dsh-better-sidebar (≥ 0.12.0). Restart `dsh web` after installing, then open the "File Review" tab from the sidebar's "+" menu.

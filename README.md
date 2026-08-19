# dsh-file-review-tab

把 [dsh-file-review](https://github.com/left0ver/dsh-file-review)（作者 [left0ver](https://github.com/left0ver)）的"改动审查"能力移植为 [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) 的侧边栏 Tab，并保留对话尾部的审查行——两个入口同源，互不干扰。

> Port of [left0ver/dsh-file-review](https://github.com/left0ver/dsh-file-review)'s change-review capability into a [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) sidebar tab, keeping the chat turn-tail review row.

## 功能

- **对话尾部审查行**：回合结束出现"已编辑 N 个文件 +M −K / 撤销 / 审查"；点「审查」或单个文件名，**深链打开侧边栏 Tab 并自动展开对应文件的 diff**（不再弹全宽 drawer）。
- **侧边栏 Tab「文件审查」**：按轮次分组列出本会话改动文件；点击展开行级红绿 diff；支持撤销本轮 / 单文件撤销 / 重新应用；Tab 角标实时显示改动文件数。
- **会话隔离**：每个会话只看自己的改动；Tab 不可见时暂停状态巡检。
- **样式隔离**：全部 CSS Module + 宿主 `--dsw-alias-*` 主题令牌，不与对话区或其他插件冲突。

## 安装

```sh
# npm（推荐）
dsh plugin --profile web add dsh-file-review-tab

# 或 GitHub 源
dsh plugin --profile web add github:Lzh3070/dsh-file-review-tab
```

前置依赖：DeepSeek Harness web（≥ 0.1.0-rc.5）+ [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar)（≥ 0.12.0）。

安装后**重启 dsh web**，在 better-sidebar 侧边栏「+」菜单打开「文件审查」即可。

## 致谢

核心 diff 渲染器与撤销服务移植自 [left0ver/dsh-file-review](https://github.com/left0ver/dsh-file-review)（MIT License, © ZhangWenChao）。侧边栏集成基于 [dsh-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) 开放的 `ctx.betterSidebar` 注册 API。

## License

[MIT](./LICENSE)

---

## Features (English)

- Chat turn-tail review row ("Edited N files +M −K · Undo · Review") that deep-links into the sidebar tab instead of a full-width drawer.
- Sidebar tab "File Review" in dsh-better-sidebar: per-turn grouped changed files, line-level red/green diffs, undo per turn or per file, live badge with the changed-file count.
- Session-isolated, pause-when-hidden, CSS-Module scoped styling (no conflicts with the chat area or other plugins).

Requires DeepSeek Harness web (≥ 0.1.0-rc.5) and dsh-better-sidebar (≥ 0.12.0). Restart `dsh web` after installing, then open the "File Review" tab from the sidebar's "+" menu.

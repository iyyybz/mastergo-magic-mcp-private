## 上下文

本仓库为 MasterGo MCP 的 fork，主要交付 Node 侧 MCP 服务。用户若在浏览器登录 MasterGo（或其它站点），部分会话信息在 **非 HttpOnly** 的 Cookie 中可通过 `document.cookie` 读取；HttpOnly 的 Cookie **无法**被页面脚本读取，这是浏览器安全模型，脚本须在说明中明确限制。

## 目标 / 非目标

**目标：**

- 提供单文件 **Userscript**，`@match` 宜宽松（如 `*://*/*` 或至少 `https://mastergo.com/*`），便于在目标站点任意页使用。
- **Cookie 名可配置**：使用 Tampermonkey API `GM_getValue` / `GM_setValue` 持久化默认名；并提供 **菜单项「设置 Cookie 名」**（`GM_registerMenuCommand` + `prompt`）以便用户随时修改，无需编辑脚本源码。
- 执行 **「复制已配置名称的 Cookie 值」** 菜单（或主菜单）：解析 `document.cookie`，按名称匹配（区分大小写与常见实现一致：先 `decodeURIComponent` 再比对 name），将 **value** 复制到剪贴板（`GM_setClipboard`，需 `@grant`）。
- 若名称不存在或 `document.cookie` 中无该项：给出明确提示（`alert` 或页面轻提示），禁止静默失败。
- 在变更目录或脚本头部注释中说明：**HttpOnly Cookie 不可用本脚本获取**。

**非目标：**

- 不实现绕过 HttpOnly 或窃取跨站 Cookie。
- 不强制与 MCP 仓库构建流程耦合（不要求 `npm run build` 打包该脚本）。

## 决策

1. **存储键名**：使用固定键如 `copyCookieName`，避免与用户其它脚本冲突可在键前缀加 `mgMcp_`。
2. **默认 Cookie 名**：空字符串或占位 `session_id` 二选一；若为空，首次执行「复制」时提示用户先去「设置 Cookie 名」。实现采用 **默认可配置占位** 并在菜单设置中覆盖更稳妥。
3. **解析**：`document.cookie.split(';')`，trim 后按第一个 `=` 分割 name/value，对 value 做 `decodeURIComponent`（与浏览器常见行为对齐）。
4. **权限**：`@grant GM_setValue`、`GM_getValue`、`GM_setClipboard`、`GM_registerMenuCommand`；`@connect` 不需要（无远程请求）。

## 风险 / 权衡

| 风险 | 缓解 |
|------|------|
| 用户误以为能复制 HttpOnly | 脚本注释与 README 短说明中写明限制 |
| `prompt` 在非 HTTPS 或某些浏览器受限 | 仍保留 GM 存储，用户可先在设置里保存名称 |
| Cookie 名含特殊字符 | 按标准 `document.cookie` 解析规则处理 |

## 迁移计划

用户侧：安装管理器 → 安装脚本 → 菜单中设置 Cookie 名 → 在目标站点使用「复制」。

## 开放问题

- 脚本文件落盘路径：`userscripts/copy-cookie-by-name.user.js`（实现阶段按任务创建）。

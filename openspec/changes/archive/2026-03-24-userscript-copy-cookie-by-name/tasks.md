## 1. 用户脚本文件

- [x] 1.1 在仓库中新增 `userscripts/copy-cookie-by-name.user.js`（路径可按设计微调），包含完整 Tampermonkey 元数据块（`@name`、`@match`、`@grant` 等）与 HttpOnly 限制说明注释。
- [x] 1.2 实现 `document.cookie` 解析函数（按 name 查找 value，注意 trim 与 `decodeURIComponent`）。
- [x] 1.3 使用 `GM_getValue` / `GM_setValue` 存储 Cookie 名；`GM_registerMenuCommand` 提供「设置 Cookie 名」与「复制 Cookie 值」菜单。
- [x] 1.4 使用 `GM_setClipboard` 将匹配到的值写入剪贴板；未找到或名称为空时用 `alert` 或同等可见方式提示。

## 2. 文档

- [x] 2.1 在 `README.md` 与 `README.zh-CN.md` 中增加简短小节（或链到 `userscripts/README.md`）：如何安装油猴、安装本脚本、配置 Cookie 名、HttpOnly 限制与配合 `MG_MCP_COOKIE` 的用途说明。

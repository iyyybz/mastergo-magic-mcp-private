## 1. 包元数据

- [x] 1.1 将根目录 `package.json` 的 `name` 改为 `mastergo-magic-mcp-private`
- [x] 1.2 将 `bin` 改为单一键 `mastergo-magic-mcp-private` 指向 `dist/index.js`（移除旧键 `magic-mcp-private`）
- [x] 1.3 由维护者视需要 bump `version`（破坏性更名建议至少 minor 或 major），并确认 `prepublishOnly` / `files` 无需改动

## 2. 用户文档与仓库内引用

- [x] 2.1 更新 `README.md`：文首发布名、迁移说明、`npx` / 对比表 / MCP JSON 示例中凡指本 fork 包处均改为 `mastergo-magic-mcp-private`；补充从 `magic-mcp-private` 迁往新包名的 **BREAKING** 简短说明（卸载旧包、更新 `args` 与全局命令名）
- [x] 2.2 对 `README.zh-CN.md` 做与 2.1 对等的中文替换
- [x] 2.3 更新 `userscripts/README.md` 中的包名描述；按需更新 `userscripts/copy-cookie-by-name.user.js` 中与包标识相关的元信息（如 `@author`，避免与 npm 包名冲突时仍以仓库为准）
- [x] 2.4 在仓库根目录（排除 `openspec/changes/archive` 历史归档）全文检索 `magic-mcp-private`，将仍面向维护者/用户的活文档与配置改为新名；保留仅用于描述「旧包」的迁移句子中的旧名

## 3. 验证

- [x] 3.1 执行 `npm run build`，确认 `dist/` 正常生成
- [x] 3.2 可选：本地 `npx .` 或安装后运行 `mastergo-magic-mcp-private --help`（若 CLI 支持）smoke 验证

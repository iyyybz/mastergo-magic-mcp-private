## 为什么

仓库目录与对外品牌已使用 **mastergo-magic-mcp-private**，但 npm 发包名仍为 **`magic-mcp-private`**，与仓库标识不一致，易造成「装哪个包、文档里写哪个名」的混淆。将发包名统一为 **`mastergo-magic-mcp-private`** 可与仓库与发布入口对齐，减少认知成本。

## 变更内容

- 将根目录 `package.json` 的 **`name`** 改为 **`mastergo-magic-mcp-private`**。
- 将 **`bin`** 中与旧包名一致的可执行键名改为与包名一致（例如 **`mastergo-magic-mcp-private`** 指向 `dist/index.js`），避免安装后命令名与包名脱节（**BREAKING**：已依赖旧 CLI 名的脚本或文档需同步更新）。
- 全文更新 **README.md**、**README.zh-CN.md**、**userscripts** 说明、以及归档/提案中若仍引用旧 `npx`/MCP 示例的路径（以当前仓库需维护的文档为准），使 **`npm` / `npx` / MCP `args`** 中的包名与 `package.json` 一致。
- **BREAKING**：所有已使用 `magic-mcp-private` 作为依赖名或 `npx magic-mcp-private` 的部署与文档需迁移到新包名；npm registry 上将出现新的包标识（旧包是否保留或弃用由维护者另行决定，本提案仅定义新规范）。

## 功能 (Capabilities)

### 新增功能

- `npm-package-mastergo-magic-mcp-private`: 规定 npm 包发布标识必须为 `mastergo-magic-mcp-private`，且面向用户的安装文档与 CLI/MCP 示例中的包名、`bin` 命令名与 `package.json` 保持一致；发布前仍须通过 `prepublishOnly` 完成构建。

### 修改功能

（项目根目录 `openspec/specs/` 下无现行基线规范；历史归档中的 `npm-package-magic-mcp-private` 已由本次命名目标替代，不在此重复列为「修改现有规范 ID」。）

## 影响

- **package.json**：`name`、`bin`。
- **文档**：中英文 README、userscripts 辅助说明、可能涉及的 OpenSpec 归档或示例中的包名引用。
- **使用者**：依赖安装命令、`npx`、`mcpServers` JSON 中的包名与可执行路径需更新；属于破坏性变更。

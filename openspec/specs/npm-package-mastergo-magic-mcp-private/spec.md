## 新增需求

### 需求:npm 包必须以 mastergo-magic-mcp-private 为名发布

`package.json` 中的 `name` 字段必须为 `mastergo-magic-mcp-private`。面向使用者的安装说明（至少包含根目录 `README.md`、`README.zh-CN.md` 中关于本 fork 安装与 MCP 配置的部分）中出现的本包 `npm` / `npx` 包名及 MCP `args` 中与 `-y` 连用的标识必须与 `package.json` 的 `name` 一致。`prepublishOnly` 必须在 `npm publish` 前成功执行并完成构建，且 `files` 字段所涵盖的发布物已生成。

#### 场景:包元数据一致

- **当** 维护者查看根目录 `package.json`
- **那么** `name` 必须为 `mastergo-magic-mcp-private`，且面向用户的安装文档中引用本 fork 发布包时使用的名称必须与 `name` 一致

#### 场景:可执行入口与包名一致

- **当** 用户通过全局安装或 `npx` 调用本包提供的 CLI 入口
- **那么** `package.json` 的 `bin` 必须包含键 `mastergo-magic-mcp-private`，且其值为 `dist/index.js`（或与本仓库构建输出一致的路径）

#### 场景:发布前构建

- **当** 执行 `npm publish`
- **那么** 必须先运行 `prepublishOnly` 中定义的构建脚本并生成 `files` 字段所涵盖的发布内容

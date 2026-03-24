## 新增需求

### 需求:npm 包必须以 magic-mcp-private 为名发布

`package.json` 中的 `name` 字段必须为 `magic-mcp-private`，且仓库内面向使用者的安装说明（README 等）必须与之一致；`prepublishOnly` 必须在发布前执行成功构建。

#### 场景:包元数据一致

- **当** 维护者查看根目录 `package.json`
- **那么** `name` 必须为 `magic-mcp-private`，且面向用户的安装文档中的包名必须与 `package.json` 一致

#### 场景:发布前构建

- **当** 执行 `npm publish`
- **那么** 必须先运行 `prepublishOnly` 中定义的构建脚本并生成 `files` 字段所涵盖的发布内容

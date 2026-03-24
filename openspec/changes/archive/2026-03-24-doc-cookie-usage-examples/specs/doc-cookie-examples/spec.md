## 新增需求

### 需求:用户文档必须包含可复制的 Cookie 配置示例

面向使用者的文档（`README.md` 与 `README.zh-CN.md`）必须在「使用方法」范围内提供 Cookie 的配置示例；示例必须展示如何通过命令行或环境变量设置 Cookie，并必须提醒用户不得将真实 Cookie 提交到版本库。

#### 场景:命令行示例存在

- **当** 读者打开英文或中文 README 中 Cookie 相关说明
- **那么** 文档中必须至少包含一条使用 `magic-mcp-private` 与 `--cookie`（或 `--cookie=`）的完整示例命令（可使用占位符表示 Cookie 值）

#### 场景:MCP 环境变量示例存在

- **当** 读者需要仅在 MCP 客户端 `env` 中配置 Cookie
- **那么** 文档中必须提供示例 JSON 片段，展示在 `env` 中设置 `MG_MCP_COOKIE`（或等价说明与 `MASTERGO_API_COOKIE` 的关系），且 Cookie 值必须为占位符

#### 场景:安全提示

- **当** 读者阅读 Cookie 示例
- **那么** 文档中必须包含明确表述，禁止将真实 Cookie 写入仓库或公开配置

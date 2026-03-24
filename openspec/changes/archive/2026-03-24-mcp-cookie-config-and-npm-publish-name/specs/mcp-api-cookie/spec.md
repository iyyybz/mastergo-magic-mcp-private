## 新增需求

### 需求:MCP HTTP 客户端必须支持可配置的 Cookie

系统必须在调用 MasterGo MCP 相关 HTTP API（与 `getBaseUrl()` 一致的基址下的业务接口）时，支持将配置来源提供的 Cookie 字符串作为 `Cookie` 请求头发送；若某次请求已显式指定 `Cookie` 头，则系统必须保留该显式值、不得用配置中的 Cookie 覆盖。

#### 场景:通过环境变量注入 Cookie

- **当** 环境变量中设置了 Cookie 配置（例如 `MG_MCP_COOKIE`）且值为非空字符串
- **那么** 对 MCP API 的 `axios` 请求必须包含 `Cookie` 头，其值为该配置（经与现有公共头合并后的结果）

#### 场景:显式请求头优先

- **当** 调用方在 `httpUtil.request` 或等价入口传入的 `headers` 中包含 `Cookie`
- **那么** 最终发往服务器的 `Cookie` 必须与调用方传入一致，不得被环境变量或 CLI 中的 Cookie 覆盖

#### 场景:未配置 Cookie 时行为不变

- **当** 未设置任何 Cookie 配置且调用方未传入 `Cookie`
- **那么** 请求不得无故添加空的 `Cookie` 头（或行为与变更前一致，不强制发送 `Cookie`）

## 为什么

当前 fork 在对接需要浏览器会话或网关鉴权的 MasterGo API 时，仅靠 Token 头不足以满足服务端对 Cookie 的校验；同时 fork 需要以独立包名发布，避免与上游 `@mastergo/magic-mcp` 混淆。本变更在 HTTP 层支持可配置的 Cookie 预置，并统一 npm 发包标识为 `magic-mcp-private`。

## 变更内容

- 为 MCP 服务端增加 **Cookie 配置能力**（环境变量与/或 CLI，与现有 `MG_MCP_TOKEN`、`API_BASE_URL` 等约定一致），并在 `src/utils/api.ts` 中于发起请求前合并到请求头（`Cookie`）。
- **审查并文档化** 当前 `npm publish` 流程：`prepublishOnly` 构建、`files` 白名单、bin 入口等；将 **`package.json` 的 `name` 改为 `magic-mcp-private`**（**BREAKING**：与 `@mastergo/magic-mcp` 不兼容，下游需更新依赖名与安装命令）。
- 视需要同步 **README / smithery / Dockerfile** 中与包名、安装方式相关的引用，避免文档与真实包名不一致。

## 功能 (Capabilities)

### 新增功能

- `mcp-api-cookie`: MCP 工具在调用 MasterGo HTTP API 前可预置 `Cookie` 请求头，来源为环境变量（及可选 CLI），与 `getCommonHeader()` 合并策略明确（不覆盖调用方显式传入的 Cookie）。
- `npm-package-magic-mcp-private`: 将 npm 包名设为 `magic-mcp-private`，并明确发布前检查项（构建、版本号、registry、私有/公有）及与 fork 维护相关的说明。

### 修改功能

（无 — 项目根目录尚无既有 `specs/` 规范文件；本变更为首次在变更目录下新增规范。）

## 影响

- **代码**：`src/utils/api.ts`（及可能的 `args.ts` / `index.ts` 启动参数解析）、`package.json`（`name`、若需则调整 `bin` 名称或保留兼容别名需在设计中拍板）。
- **运维/用户**：需在部署或本地运行 MCP 时配置新的 Cookie 相关变量；升级依赖时需将 `@mastergo/magic-mcp` 替换为 `magic-mcp-private`。
- **安全**：Cookie 与 Token 同属敏感信息，文档中需提示勿提交到仓库、优先使用环境变量或密钥管理。

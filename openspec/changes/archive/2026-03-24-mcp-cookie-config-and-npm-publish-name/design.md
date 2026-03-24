## 上下文

本仓库为 MasterGo MCP 的 fork，HTTP 调用集中在 `src/utils/api.ts`：`getCommonHeader()` 提供 `Content-Type`、`Accept` 与 `X-MG-UserAccessToken`（来自环境变量或 CLI）。上游包名为 `@mastergo/magic-mcp`；fork 需独立发布且名称定为 `magic-mcp-private`。部分部署场景下 API 网关或业务侧除 Token 外还要求浏览器会话 Cookie，需在 axios 请求层统一注入。

## 目标 / 非目标

**目标：**

- 支持通过**环境变量**（必选路径）配置一段 Cookie 字符串，并在所有经 `createHttpUtil()` 发起的 API 请求中自动带上 `Cookie` 头（与现有头合并；若单次请求已显式传入 `Cookie`，则**不覆盖**调用方值）。
- 可选支持 **CLI**（例如 `--cookie` / `--cookie=`），解析方式与现有 `parseToken` / `parseUrl` 一致，便于本地调试；优先级：**显式请求头 > CLI > 环境变量**（若采用此优先级，需在实现中与 `getCommonHeader` 合并顺序一致）。
- 将 `package.json` 的 `name` 更新为 `magic-mcp-private`，并梳理 `prepublishOnly`、`files`、`bin` 与 README/容器配置中的包名引用，保证文档与安装命令一致。
- 在文档中强调 Cookie/Token **不得**写入版本库。

**非目标：**

- 不实现浏览器自动化登录或 Cookie 自动刷新。
- 不改变除包名及相关引用外的业务逻辑与 MCP 工具协议。
- 不强制修改 `bin` 命令名；若保留 `mastergo-magic-mcp`，仅在文档中说明其与包名的关系（具体在实现阶段二选一，见开放问题）。

## 决策

1. **Cookie 来源与键名**  
   - 采用环境变量 `MG_MCP_COOKIE`（或与现有命名并列支持 `MASTERGO_API_COOKIE`，二选一或同时支持需在实现时统一文档）。  
   - 理由：与 `MG_MCP_TOKEN`、`API_BASE_URL` 并列，便于 Docker/K8s/CI 注入。

2. **合并位置**  
   - 在 `getCommonHeader()` 或紧邻 axios 调用的统一入口增加 `Cookie` 字段，确保 `getMeta`、`getDsl`、`getD2c`、`getComponentStyleJson`、`request` 均生效；`extractIdsFromUrl` 中对外链 `axios.get(url)` 是否带 Cookie：**默认不带**（避免向第三方域误传 Cookie），除非后续规范要求（当前保持仅 API 基址请求带 Cookie）。

3. **包名与破坏性变更**  
   - `name` 设为 `magic-mcp-private`（无 scope），**BREAKING**：所有 `npm install @mastergo/magic-mcp` 需改为 `npm install magic-mcp-private`。  
   - `prepublishOnly: npm run build` 保持不变；发布前仍执行构建产物校验。

4. **替代方案**  
   - 仅文档要求用户改 axios 拦截器：拒绝，因不利于 fork 统一维护。  
   - 使用 `axios.defaults.headers`：不如集中在 `getCommonHeader` 与现有模式一致。

## 风险 / 权衡

| 风险 | 缓解 |
|------|------|
| Cookie 泄露到日志或错误信息 | 禁止在 debug 输出中打印完整 Cookie；文档提示 |
| 包名变更导致下游 CI 失败 | 在 README 与变更说明中明确迁移命令；semver 可 bump minor/major 由维护者决定 |
| 短链跳转请求不带 Cookie 导致行为不一致 | 在设计中明确短链解析请求默认不带 MCP Cookie，与 API 请求区分 |

## 迁移计划

1. 合并变更后，维护者执行 `npm version` 与 `npm publish`（或使用既有 CI）。  
2. 使用者：将依赖从 `@mastergo/magic-mcp` 改为 `magic-mcp-private`，并按文档配置 `MG_MCP_COOKIE`（或最终确定的环境变量名）。  
3. 回滚：恢复 `package.json` 的 `name` 并重新发布（需 registry 策略允许）；配置项可保留为可选，不影响未设置 Cookie 的用户。

## 开放问题

- `bin` 字段是否从 `mastergo-magic-mcp` 改为与包名更一致的命令（例如 `magic-mcp-private`）：需权衡用户脚本兼容性。  
- 环境变量是否同时别名 `MASTERGO_API_COOKIE`：便于与 Token 命名对称。

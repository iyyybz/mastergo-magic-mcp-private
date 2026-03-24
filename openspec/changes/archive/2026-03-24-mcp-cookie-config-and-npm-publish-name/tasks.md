## 1. Cookie 与 HTTP 层

- [x] 1.1 在 `src/utils/args.ts`（或等价位置）增加 `parseCookie()`，支持 `--cookie` / `--cookie=`，并与 `parserArgs()` 导出对齐（若项目统一从该处读取 CLI）。
- [x] 1.2 在 `src/utils/api.ts` 中实现 `getCookieHeader()`：读取 `process.env.MG_MCP_COOKIE`（及设计稿中确定的别名，如 `MASTERGO_API_COOKIE`）与 CLI 解析结果，返回用于合并的 `Cookie` 字符串（无配置时返回空）。
- [x] 1.3 将 Cookie 合并进 `getCommonHeader()` 或 axios 请求头合并逻辑：对 MCP 基址 API 请求附加 `Cookie`；在 `request` 方法中保证显式 `config.headers.Cookie` 优先生效。
- [x] 1.4 确认 `extractIdsFromUrl` 等对外链的请求不附带 MCP Cookie（与设计一致），必要时加注释说明。
- [x] 1.5 在 `README` / `README.zh-CN`（或 MCP 配置说明段）补充环境变量与 CLI 说明，并提示勿将 Cookie 提交到仓库。

## 2. npm 包名与发布流程

- [x] 2.1 将根目录 `package.json` 的 `name` 改为 `magic-mcp-private`，并全局检索替换文档、示例、Smithery/Dockerfile 中对旧包名 `@mastergo/magic-mcp` 的引用（保留必要的上游致谢除外）。
- [x] 2.2 核对 `prepublishOnly`、`files`、`main`、`bin` 与 `npm pack --dry-run` 输出，确认发布 tarball 内容符合预期。
- [x] 2.3 在 README 中写明安装命令 `npm install magic-mcp-private`（或 scoped 的最终形式，若后续调整）及 **BREAKING** 迁移说明。

## 3. 验证

- [x] 3.1 本地执行 `npm run build`，确认无 TypeScript/构建错误。
- [x] 3.2（可选）用最小脚本或手动方式验证设置 `MG_MCP_COOKIE` 后，对 `/mcp/*` 类请求的 mock 可观察到 `Cookie` 头（不记录敏感值）。

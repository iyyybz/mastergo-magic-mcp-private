## 上下文

项目已支持通过 CLI `--cookie` 与环境变量 `MG_MCP_COOKIE` / `MASTERGO_API_COOKIE` 为 MasterGo API 请求附加 `Cookie`（见 `src/utils/api.ts`）。中英文 README 已列出参数与环境变量名称，但缺少独立、可复制的示例块，不利于首次配置与 Code Review 时对照。

## 目标 / 非目标

**目标：**

- 在「命令行选项 / 环境变量」附近或紧随其后，增加 **Cookie 使用示例**（英文 README 与中文 README 各一套，内容对应）。
- 示例必须包含：至少一条 `npx magic-mcp-private ... --cookie=...`（或等价空格形式）、至少一条仅通过 `env` 设置 `MG_MCP_COOKIE` 的 MCP JSON 片段（占位符）、以及一句提醒勿将真实 Cookie 提交到 Git。
- 明确 **优先级**：与实现一致——显式请求头（高级用法，若文档提及）> CLI `--cookie` > 环境变量。

**非目标：**

- 不修改应用代码、不新增依赖。
- 不重复粘贴冗长隐私政策；安全提示保持简短。

## 决策

1. **放置位置**：在「Environment Variables」小节之后新增三级标题 **Cookie usage examples** / **Cookie 使用示例**，避免打乱现有参数表格顺序。
2. **示例格式**：使用 Markdown 围栏代码块（`bash` 与 `json`），Cookie 值使用明显占位符（如 `name=value; other=...` 或 `<YOUR_COOKIE_STRING>`），禁止使用看似真实的随机串。
3. **双语**：`README.md` 与 `README.zh-CN.md` 同步更新；中文标题与说明用简体中文。

## 风险 / 权衡

| 风险 | 缓解 |
|------|------|
| 示例过时（CLI 改名） | 示例中使用与 `package.json` 一致的包名 `magic-mcp-private` |
| 用户复制占位符进生产 | 占位符用尖括号或 `YOUR_*` 命名 |

## 迁移计划

不适用（仅文档）。

## 开放问题

无。

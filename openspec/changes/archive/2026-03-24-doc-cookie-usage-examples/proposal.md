## 为什么

Cookie 相关能力（`--cookie`、`MG_MCP_COOKIE` / `MASTERGO_API_COOKIE`）已在代码中实现，但「使用方法」文档仍以参数列表为主，缺少**可复制、贴近真实场景**的示例（CLI、环境变量、MCP 客户端 `env`）。用户难以快速对照配置，容易漏配或误把敏感信息写入仓库。

## 变更内容

- 在 **README.md** 与 **README.zh-CN.md** 的「使用方法」相关章节中，新增 **Cookie 使用示例**小节。
- 示例覆盖：命令行、`npx` 一行示例、通过 MCP 配置的 `env` 注入（占位符，不含真实 Cookie 值）、以及「勿提交 Cookie」的提示（与现有安全表述一致）。
- **无代码或运行时行为变更**；无 **BREAKING** 变更。

## 功能 (Capabilities)

### 新增功能

- `doc-cookie-examples`: 文档中提供 Cookie 的配置示例与优先级说明（CLI 与环境变量的关系与现有实现一致），便于 fork 用户按图索骥。

### 修改功能

（无）

## 影响

- **文档**：`README.md`、`README.zh-CN.md`。
- **代码 / 依赖**：无。

# MasterGo Magic MCP（fork）

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/mastergo-design/mastergo-magic-mcp)

本仓库是 [mastergo-design/mastergo-magic-mcp](https://github.com/mastergo-design/mastergo-magic-mcp) 的 **fork**，在 npm 上发布为 **`magic-mcp-private`**，并增加可选的 **Cookie** 支持与浏览器**油猴脚本**辅助。其余能力（MCP 功能说明、MasterGo 令牌获取、权限与团队文件要求、Smithery、LINGMA 图文步骤等）与上游一致——**请直接阅读官方 README**，本文不再重复粘贴。

## 官方文档（上游）

完整用法请查看 **官方** 文档（教程、获取 `MG_MCP_TOKEN`、账户/文件权限、Smithery、LINGMA 截图流程、各客户端通用配置等）：

- **中文：** [github.com/mastergo-design/mastergo-magic-mcp — README.zh-CN.md](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.zh-CN.md)
- **English:** [github.com/mastergo-design/mastergo-magic-mcp — README.md](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.md)

对照官方示例时，请把 **`@mastergo/magic-mcp`** 换成 **`magic-mcp-private`**（`npm` / `npx` / MCP `args`），详见下文 [从上游迁移](#从上游迁移)。

**Cursor 官方说明：** [在 Cursor 中使用 MCP](https://docs.cursor.com/context/model-context-protocol#using-mcp-tools-in-agent)

---

## 从上游迁移

若曾使用 **`@mastergo/magic-mcp`**：

| | 上游 | 本 fork |
|---|------|---------|
| npm 包名 | `@mastergo/magic-mcp` | `magic-mcp-private` |
| npx | `npx @mastergo/magic-mcp …` | `npx magic-mcp-private …` |
| MCP `args` | `-y @mastergo/magic-mcp` | `-y magic-mcp-private` |
| 可执行命令（`package.json` → `bin`） | `mastergo-magic-mcp` | `magic-mcp-private` |

---

## 命令行与环境变量（本 fork 增量说明）

在官方参数基础上，本 fork 增加 **`--cookie`** 及 Cookie 相关环境变量，完整示例如下：

```text
npx magic-mcp-private --token=YOUR_TOKEN [--url=API_URL] [--cookie=COOKIE] [--rule=RULE_NAME] [--debug] [--no-rule]
```

| 参数 / 环境变量 | 说明 |
|-----------------|------|
| `--token` | 必填，与上游相同的 MasterGo 令牌（`MG_MCP_TOKEN` / `MASTERGO_API_TOKEN`）。 |
| `--url` | 可选，本地开发常见 `http://localhost:3000`，线上多为 `https://mastergo.com`。 |
| `--cookie` | 可选，发往 MasterGo API 的 `Cookie`。**勿将真实值写入仓库**；生产环境优先环境变量。 |
| `--rule` / `--debug` / `--no-rule` | 与上游含义一致。 |
| `API_BASE_URL` | 与上游一致。 |
| `MG_MCP_COOKIE` / `MASTERGO_API_COOKIE` | 可选；若同时配置 CLI `--cookie`，以 CLI 为准。 |
| `RULES` | 与上游一致（JSON 数组字符串）。 |

### Cookie 使用示例

除 Token 外若还需会话 Cookie，文档与 Git 中请使用占位符。

**优先级：** 若在更底层自行设置请求 `Cookie`，以该值为准；否则 CLI `--cookie` 优先于 `MG_MCP_COOKIE` / `MASTERGO_API_COOKIE`。

**命令行一行示例：**

```bash
npx magic-mcp-private --token=YOUR_TOKEN --url=https://mastergo.com --cookie="session_id=<YOUR_VALUE>; path=/"
```

**仅用 MCP `env` 注入 Cookie：**

```json
{
  "mcpServers": {
    "magic-mcp-private": {
      "command": "npx",
      "args": ["-y", "magic-mcp-private", "--token=<YOUR_TOKEN>", "--url=https://mastergo.com"],
      "env": {
        "MG_MCP_COOKIE": "<YOUR_COOKIE_STRING>"
      }
    }
  }
}
```

可与 `MASTERGO_API_TOKEN` 命名对称，使用 `MASTERGO_API_COOKIE` 代替 `MG_MCP_COOKIE`。

### 浏览器油猴脚本（可选）

从页签复制**非 HttpOnly** Cookie 供 `MG_MCP_COOKIE` 使用，见 **[userscripts/README.md](userscripts/README.md)**。HttpOnly 无法被页面脚本读取。

### Cursor：最小 `mcp.json` 示例

结构与 [上游 README 中的 Cursor 配置示例](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.zh-CN.md) 相同，仅包名替换为 **`magic-mcp-private`**：

```json
{
  "mcpServers": {
    "magic-mcp-private": {
      "command": "npx",
      "args": [
        "-y",
        "magic-mcp-private",
        "--token=<MG_MCP_TOKEN>",
        "--url=https://mastergo.com"
      ],
      "env": {}
    }
  }
}
```

**cline** 等客户端请按上游 README 配置，并将包名改为 **`magic-mcp-private`**。

---

## 本地开发

```bash
npm install
npm run build
```

在 MCP 配置中使用 **`dist/index.js`** 的绝对路径，带上 token、`--url` 等，与上游本地调试方式相同。

---

## 许可证

ISC

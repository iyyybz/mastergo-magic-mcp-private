## 上下文

本仓库为 MasterGo MCP 的 fork，经 `esbuild` 打包后通过 npm 发布。变更前根目录 `package.json` 中 `name` 与 `bin` 键曾为 `magic-mcp-private`，与仓库目录名 `mastergo-magic-mcp-private` 不一致。本变更将**发包名**统一为 `mastergo-magic-mcp-private`，并同步文档与可执行命令名。

## 目标 / 非目标

**目标：**

- 将 `package.json` 的 `name` 设为 `mastergo-magic-mcp-private`。
- `bin` 提供一个与包名一致的全局命令名（推荐键名 `mastergo-magic-mcp-private`，值为 `dist/index.js`），便于 `npx` 与文档叙述一致。
- 更新中英文 README、userscripts 说明及仓库内仍面向用户的示例，使 `npm install`、`npx -y …`、MCP 配置里的包名与新的 `name` 一致。
- 保留 `prepublishOnly` → `npm run build` 与 `files` 发布范围不变。

**非目标：**

- 不修改 MCP 业务逻辑、API 调用或 Cookie/Token 行为。
- 不在本变更中决定 npm registry 上旧包 `magic-mcp-private` 的弃用策略或重定向（仅文档中可提示迁移）。
- 不强制修改已归档 history 中的 OpenSpec 归档文件正文（除非 `/opsx:apply` 阶段明确要求同步活文档）。

## 决策

1. **`name` 采用无 scope 的 `mastergo-magic-mcp-private`**：与仓库命名一致，合法 npm 包名；避免与上游 `@mastergo/magic-mcp` 混用 scope。
2. **`bin` 键与包名对齐**：选用 `mastergo-magic-mcp-private` 作为唯一 bin 键，避免安装后出现「包名与命令名不一致」的二次解释成本。**BREAKING**：依赖旧命令 `magic-mcp-private` 的 shell 脚本需改写。
3. **文档替换策略**：对 README 中迁移表、对比表、`npx` 示例、MCP JSON 中的 `args` 与服务器键名：凡指本 fork 发布包处，一律改为 `mastergo-magic-mcp-private`；与上游 `@mastergo/magic-mcp` 的对比行保留上游原名。
4. **版本号**：实现阶段由维护者决定是否在本次更名同时做 semver 主版本 bump；设计层建议至少以 **minor/major** 明示破坏性（更名+ bin 变更），避免用户无感升级到新包名。

## 风险 / 权衡

| 风险 | 缓解 |
| --- | --- |
| 已安装 `magic-mcp-private` 的用户无法自动迁移到新包名 | README 增加简短 **BREAKING** 迁移段落：`npm uninstall` 旧包、`npm install mastergo-magic-mcp-private`，并更新 MCP 配置与脚本中的命令名 |
| `npx`/CI 缓存仍解析旧包 | 文档与发版说明明确新包名；必要时在旧包 README（若仍维护）指向新包 |
| MCP 配置里 JSON 键名常等同工具名 | 说明可将 `mcpServers` 的 key 改为与新包标识一致或保持本地别名，但 `args` 中 `-y` 后必须是新 `name` |

## 迁移计划

1. 合并实现后本地执行 `npm pack` / `npm publish` 前检查清单：`name`、`bin`、构建产物存在。
2. 发布说明中列出：新包名、旧包名、bin 变更、示例命令差异。
3. 回滚：将 `package.json` 与文档改回旧标识并重新发布（registry 层面通常不可「改名」，回滚意味着继续使用旧包或发补丁说明）。

## 待解决问题

- 是否在 npm 上废弃 `magic-mcp-private` 或由双包并存一段时间：由维护者根据下载量与依赖方决定，本设计不锁定。

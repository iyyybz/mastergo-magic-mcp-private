## 上下文

Fork 已包含 `magic-mcp-private` 包名、Cookie、用户脚本等与上游不同的内容；同时保留了大量与上游 README 相同的教程、权限、多客户端图文步骤。

## 目标 / 非目标

**目标：**

- 每个 README 顶部用简短段落说明：**通用功能与用法见上游**；给出官方链接：
  - 英文：[README.md（上游 main）](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.md)
  - 中文：[README.zh-CN.md（上游 main）](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.zh-CN.md)
- 删除或收缩与上游逐字重复的块（如大段 LINGMA 多图步骤、与上游完全一致的 Cursor JSON 若与 fork 无差异可改为「见官方 Cursor 小节」+ 链接锚点若可用，否则链接到官方 README 对应章节）。
- **保留并突出** fork 专属小节：迁移、`npx magic-mcp-private`、环境变量中的 Cookie、Cookie 示例、油猴、`userscripts/README.md` 链接等。
- 若某节 fork 行为与上游仅差包名/命令，用**简短对照表**或**最小示例**替代重复 upstream 全文。

**非目标：**

- 不修改上游仓库；不强制改用 raw.githubusercontent.com（除非团队偏好，保持用户提供的 blob 链接即可）。
- 不把上游全文镜像进本仓库。

## 决策

1. **结构**：建议顺序 — 标题与 fork 说明 → 官方文档链接 → **Fork 差异**（迁移、安装命令、Cookie、油猴）→ **可选**：极简本地开发（指向本仓库 `package.json`/`build`）→ License。
2. **删除范围**：Tutorial 长链、Permission 全文、Smithery/LINGMA 截图流程等，改为一句「详见官方 README 对应章节」+ 链接。
3. **Cursor/cline JSON**：若保留，须全部为 `magic-mcp-private`；或缩为一例 + 注明其余见官方结构并替换包名。

## 风险 / 权衡

| 风险 | 缓解 |
|------|------|
| 上游移动章节导致锚点失效 | 链接到仓库 README 根路径即可，不过度依赖行内锚点 |
| 用户离线读 fork | 接受度内；可在 fork 说明中写「通用文档需联网查看上游」 |

## 迁移计划

合并后阅读路径：先看 fork 差异，需要通用细节再打开官方 README。

## 开放问题

无。

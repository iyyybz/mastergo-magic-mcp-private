## 为什么

本 fork 的 `README.md` / `README.zh-CN.md` 与上游 [mastergo-design/mastergo-magic-mcp](https://github.com/mastergo-design/mastergo-magic-mcp) 在教程、权限说明、Smithery/LINGMA 图文等章节高度重复，维护成本高且易与上游脱节。将**与上游一致**的通用说明改为**链接到官方 README**，fork 文档只保留**本包差异**（包名 `magic-mcp-private`、Cookie、迁移、油猴脚本等），可显著缩短篇幅、减少重复劳动。

## 变更内容

- 精简 `README.md`：在文首或独立小节说明与上游关系，对「与官方相同」的内容用 **官方英文 README** 链接替代大段复制；保留 fork 特有章节（迁移、Cookie、油猴、`magic-mcp-private` 安装示例等）。
- 精简 `README.zh-CN.md`：同理，链接 **官方中文 README**；中文读者仍可从本仓库直接跳到上游文档。
- **不删除**本 fork 独有信息；对上游链接使用稳定 URL（用户提供的 `blob/main` 路径）。
- **无代码/BREAKING** 变更（仅文档）。

## 功能 (Capabilities)

### 新增功能

- `readme-fork-delta-docs`: fork 的 README 以「增量说明 + 上游链接」为主，避免与官方文档重复粘贴。

### 修改功能

（无）

## 影响

- **文件**：`README.md`、`README.zh-CN.md`。
- **读者体验**：需跳转到 GitHub 阅读通用章节；离线阅读时依赖网络或本地克隆上游（可接受时在 design 中说明）。

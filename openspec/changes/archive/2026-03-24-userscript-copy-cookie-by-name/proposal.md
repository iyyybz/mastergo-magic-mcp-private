## 为什么

在配置 `MG_MCP_COOKIE` 等环境变量时，常需从浏览器当前站点复制某一 Cookie 的值；手动从开发者工具查找易错且慢。通过 **Tampermonkey（油猴）** 脚本在页面上一键按**可配置的 Cookie 名**读取并复制，可缩短操作路径并减少抄错。

## 变更内容

- 在仓库中新增 **用户脚本文件**（`.user.js`），兼容 Tampermonkey / Violentmonkey 等常见管理器。
- 脚本必须支持 **配置目标 Cookie 名称**（通过油猴存储或菜单输入，实现阶段在 design 中定稿）。
- 脚本从 **`document.cookie`** 解析当前页可访问的 Cookie，将匹配项的**值**写入剪贴板（或展示可复制结果）；对 **HttpOnly** Cookie 的不可读性须在文档中说明。
- **无 BREAKING** 变更；不改变现有 MCP npm 包行为。

## 功能 (Capabilities)

### 新增功能

- `tampermonkey-copy-cookie`: 油猴脚本按用户配置的 Cookie 名称，从当前页可读 Cookie 中取出对应值并复制（或提供等价可复制输出）。

### 修改功能

（无）

## 影响

- **新增文件**：用户脚本及可选简短说明（例如放在 `userscripts/` 或 `docs/` 下，由实现阶段确定）。
- **运行时依赖**：用户浏览器需安装用户脚本管理器；与 Node/MCP 发布物无直接依赖。

## 新增需求

### 需求:英文 README 必须以链接替代与上游重复的通用说明

`README.md` 必须在显著位置提供指向上游官方英文文档的链接，并必须将原先与上游重复的通用说明（教程、权限、Smithery/LINGMA 长流程等）缩减为简短引导或删除，使文档以本 fork 的差异说明为主。

#### 场景:存在官方英文入口

- **当** 读者打开本仓库 `README.md`
- **那么** 必须能看到指向 `https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.md` 的链接，且大段与上游重复的内容不得原样保留

#### 场景:保留 fork 差异

- **当** 读者需要安装本 fork 或配置 Cookie、油猴等
- **那么** `README.md` 中必须仍包含针对 `magic-mcp-private` 的说明或指向本仓库内专用文档的链接

### 需求:中文 README 必须以链接替代与上游重复的通用说明

`README.zh-CN.md` 必须在显著位置提供指向上游官方中文文档的链接，并必须将原先与上游重复的通用说明缩减为简短引导或删除，使文档以本 fork 的差异说明为主。

#### 场景:存在官方中文入口

- **当** 读者打开本仓库 `README.zh-CN.md`
- **那么** 必须能看到指向 `https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.zh-CN.md` 的链接，且大段与上游重复的内容不得原样保留

#### 场景:保留 fork 差异

- **当** 读者需要安装本 fork 或配置 Cookie、油猴等
- **那么** `README.zh-CN.md` 中必须仍包含针对 `magic-mcp-private` 的说明或指向本仓库内专用文档的链接

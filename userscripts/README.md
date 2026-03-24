# Userscripts

Helper scripts for browser workflows related to **magic-mcp-private** (not required to run the Node MCP server).

## `copy-cookie-by-name.user.js`

Tampermonkey / Violentmonkey script: copy the **value** of a cookie that appears in `document.cookie`, using a **configurable cookie name**.

### Install

1. Install a userscript manager ([Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)).
2. Create a new script in the manager and paste the contents of `copy-cookie-by-name.user.js`, **or** open the raw file from this repo in the browser and confirm installation when prompted.

### Use

1. Open the site where the cookie is set (e.g. MasterGo in the browser).
2. Use the userscript menu:
   - **Set cookie name** — enter the exact cookie name (case-sensitive).
   - **Copy cookie value** — copies that cookie’s value to the clipboard.
3. Paste the value into `MG_MCP_COOKIE` / `MASTERGO_API_COOKIE` or MCP `env` (do not commit real values to git).

### Limits

- **HttpOnly** cookies are **not** exposed to `document.cookie`, so this script **cannot** copy them. Use devtools Application → Cookies if you need those, or obtain session data another way.
- Only cookies visible on the current origin/path apply; names must match exactly.

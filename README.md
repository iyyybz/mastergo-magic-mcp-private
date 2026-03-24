# MasterGo Magic MCP (fork)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/mastergo-design/mastergo-magic-mcp)

This repository is a **fork** of [mastergo-design/mastergo-magic-mcp](https://github.com/mastergo-design/mastergo-magic-mcp). It publishes to npm as **`magic-mcp-private`** and adds optional **Cookie** support and a small **userscript** helper. Everything else (what the MCP does, MasterGo token, permissions, Smithery, LINGMA walkthroughs, etc.) is the same as upstream—see the links below instead of duplicating them here.

## Upstream documentation

Read the **official** README for full usage (tutorial, how to get `MG_MCP_TOKEN`, team account / file requirements, Smithery, LINGMA with screenshots, and generic client patterns):

- **English:** [github.com/mastergo-design/mastergo-magic-mcp — README.md](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.md)
- **中文:** [github.com/mastergo-design/mastergo-magic-mcp — README.zh-CN.md](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.zh-CN.md)

When you follow upstream examples, replace **`@mastergo/magic-mcp`** with **`magic-mcp-private`** in `npm` / `npx` commands and MCP `args` (see [Migration](#migration-from-upstream)).

**Cursor MCP** (official): [Using MCP in Cursor](https://docs.cursor.com/context/model-context-protocol#using-mcp-tools-in-agent)

---

## Migration from upstream

If you used **`@mastergo/magic-mcp`** before:

| | Upstream | This fork |
|---|----------|-----------|
| npm package | `@mastergo/magic-mcp` | `magic-mcp-private` |
| npx | `npx @mastergo/magic-mcp …` | `npx magic-mcp-private …` |
| MCP `args` | `-y @mastergo/magic-mcp` | `-y magic-mcp-private` |
| Binary (`package.json` → `bin`) | `mastergo-magic-mcp` | `magic-mcp-private` |

---

## CLI & environment (fork-specific)

Full options are listed here because **`--cookie`** and cookie env vars are additions on top of upstream.

```text
npx magic-mcp-private --token=YOUR_TOKEN [--url=API_URL] [--cookie=COOKIE] [--rule=RULE_NAME] [--debug] [--no-rule]
```

| Flag / env | Notes |
|------------|--------|
| `--token` | Required. Same MasterGo token as upstream (`MG_MCP_TOKEN` / `MASTERGO_API_TOKEN`). |
| `--url` | Optional. Default in dev often `http://localhost:3000`; production often `https://mastergo.com`. |
| `--cookie` | Optional. Sent as HTTP `Cookie` on MasterGo API calls. Prefer env vars in CI; **do not commit** real values. |
| `--rule` / `--debug` / `--no-rule` | Same idea as upstream. |
| `API_BASE_URL` | Same as upstream. |
| `MG_MCP_COOKIE` / `MASTERGO_API_COOKIE` | Optional cookie string for API calls. CLI `--cookie` wins if both are set. |
| `RULES` | Same as upstream (JSON array string). |

### Cookie usage examples

Gateways sometimes need a session cookie in addition to the token. Use **placeholders** in docs and git; never commit real cookies.

**Priority:** explicit per-request `Cookie` (if you customize HTTP) overrides CLI `--cookie`, which overrides the env vars above.

**One-line CLI:**

```bash
npx magic-mcp-private --token=YOUR_TOKEN --url=https://mastergo.com --cookie="session_id=<YOUR_VALUE>; path=/"
```

**MCP client via `env` only:**

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

You can use `MASTERGO_API_COOKIE` instead of `MG_MCP_COOKIE` if you prefer symmetry with `MASTERGO_API_TOKEN`.

### Browser userscript (optional)

To copy a **non-HttpOnly** cookie from the current tab for `MG_MCP_COOKIE`, see **[userscripts/README.md](userscripts/README.md)**. HttpOnly cookies are not visible to page scripts.

### Cursor: minimal `mcp.json` example

Same structure as [upstream README — Cursor](https://github.com/mastergo-design/mastergo-magic-mcp/blob/main/README.md) (find the Cursor / `mcp.json` example); only the package name changes:

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

For **cline** and other editors, follow the upstream README and replace the package name with **`magic-mcp-private`**.

---

## Local development

```bash
npm install
npm run build
```

Point your MCP config at **`dist/index.js`** (absolute path), same as upstream local debugging, with your token and `--url` as needed.

---

## License

ISC

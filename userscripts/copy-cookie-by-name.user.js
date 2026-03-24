// ==UserScript==
// @name         Copy cookie by name (MCP helper)
// @namespace    https://github.com/iyyybz/mastergo-magic-mcp-private
// @version      1.0.0
// @description  从当前页 document.cookie 中按可配置名称读取并复制 Cookie 值，便于填入 MG_MCP_COOKIE 等。HttpOnly Cookie 对页面脚本不可见，本脚本无法读取。
// @author       magic-mcp-private
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

/*
 * 限制说明（请务必阅读）：
 * - 仅能访问 document.cookie 中可见的 Cookie；标记为 HttpOnly 的 Cookie 不会出现在 document.cookie 中，因此无法被本脚本复制。
 * - 名称区分大小写，须与浏览器存储中的名称完全一致。
 */

(function () {
  "use strict";

  const STORAGE_KEY = "mgMcp_copyCookieName";

  /**
   * @returns {Record<string, string>}
   */
  function parseDocumentCookies() {
    /** @type {Record<string, string>} */
    const map = Object.create(null);
    if (!document.cookie) return map;
    document.cookie.split(";").forEach((part) => {
      const eq = part.indexOf("=");
      const name = (eq === -1 ? part : part.slice(0, eq)).trim();
      if (!name) return;
      const raw = eq === -1 ? "" : part.slice(eq + 1).trim();
      try {
        map[name] = decodeURIComponent(raw.replace(/\+/g, " "));
      } catch {
        map[name] = raw;
      }
    });
    return map;
  }

  function getConfiguredName() {
    const v = GM_getValue(STORAGE_KEY, "");
    return typeof v === "string" ? v.trim() : "";
  }

  function copyCookieValue() {
    const want = getConfiguredName();
    if (!want) {
      alert(
        "请先用菜单「设置要复制的 Cookie 名」保存名称。\n\nUse the menu «Set cookie name» first."
      );
      return;
    }
    const map = parseDocumentCookies();
    if (Object.prototype.hasOwnProperty.call(map, want)) {
      const val = map[want];
      GM_setClipboard(val, "text");
      alert(
        "已复制到剪贴板（长度 " +
          String(val.length) +
          "）。\n\nCopied to clipboard."
      );
      return;
    }
    alert(
      "未在 document.cookie 中找到「" +
        want +
        "」。\n\n" +
        "可能：拼写/大小写错误、该 Cookie 为 HttpOnly（页面脚本不可读）、或当前站点未下发该 Cookie。\n\n" +
        "Not found. Wrong name, HttpOnly (invisible to scripts), or cookie not set for this page."
    );
  }

  function setCookieName() {
    const cur = getConfiguredName();
    const next = window.prompt(
      "输入要复制的 Cookie 名称（区分大小写）:\nCookie name (case-sensitive):",
      cur
    );
    if (next === null) return;
    GM_setValue(STORAGE_KEY, next.trim());
  }

  GM_registerMenuCommand(
    "设置要复制的 Cookie 名 / Set cookie name",
    setCookieName
  );
  GM_registerMenuCommand(
    "复制该 Cookie 的值 / Copy cookie value",
    copyCookieValue
  );
})();

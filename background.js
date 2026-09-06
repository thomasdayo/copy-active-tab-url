// File: background.js
const api = globalThis.browser ?? globalThis.chrome;

function copyInPage(text) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText =
    "position:fixed;top:0;left:0;opacity:0;pointer-events:none";

  document.documentElement.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy failed");
  }
}

function flash(text, color) {
  api.action.setBadgeText({ text });
  api.action.setBadgeBackgroundColor({ color });

  setTimeout(() => {
    api.action.setBadgeText({ text: "" });
  }, 900);
}

api.action.onClicked.addListener(async (tab) => {
  if (!tab?.id || !tab.url) {
    flash("!", "#d1242f");
    return;
  }

  try {
    await navigator.clipboard.writeText(tab.url);
    flash("OK", "#1a7f37");
    return;
  } catch (_) {
    // ChromeのService Workerなど、Clipboard APIを使えない場合
  }

  try {
    await api.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      func: copyInPage,
      args: [
        tab.url
      ]
    });

    flash("OK", "#1a7f37");
  } catch (_) {
    flash("!", "#d1242f");
  }
});
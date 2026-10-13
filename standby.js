// Shared by the popup and the service worker. A "standby" tab is a Chromium
// discarded tab: it stays in the strip, its renderer is freed, a click reloads it.
// Skipped: the active tab (can't be discarded), tabs playing audio, pinned tabs
// (usually chat/mail you want notifications from) and internal pages.

const SKIP_URL = /^(chrome|helium|devtools|chrome-extension|about):/i;

function canStandby(tab) {
  return !tab.active && !tab.discarded && !tab.audible && !tab.pinned &&
         !SKIP_URL.test(tab.url || tab.pendingUrl || "");
}

async function standbyTabs(tabs) {
  let n = 0;
  for (const tab of tabs) {
    if (!canStandby(tab)) continue;
    try { await chrome.tabs.discard(tab.id); n++; } catch (_) { /* tab closed or refused */ }
  }
  await refreshBadge();
  return n;
}

async function standbyOthers(windowId) {
  return standbyTabs(await chrome.tabs.query({ windowId }));
}

async function standbyAllWindows() {
  return standbyTabs(await chrome.tabs.query({}));
}

// The active tab can't be discarded directly: switch to a neighbour first.
async function standbyCurrent() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab || tab.audible || SKIP_URL.test(tab.url || "")) return 0;
  const siblings = await chrome.tabs.query({ windowId: tab.windowId });
  if (siblings.length < 2) return 0;
  const next = siblings.find(t => t.index === tab.index + 1) || siblings.find(t => t.index === tab.index - 1);
  await chrome.tabs.update(next.id, { active: true });
  try { await chrome.tabs.discard(tab.id); } catch (_) { return 0; }
  await refreshBadge();
  return 1;
}

async function counts() {
  const tabs = await chrome.tabs.query({});
  const asleep = tabs.filter(t => t.discarded).length;
  return { total: tabs.length, asleep, live: tabs.length - asleep };
}

// Badge = number of live tabs, so you can see at a glance how much is awake.
async function refreshBadge() {
  const { live } = await counts();
  await chrome.action.setBadgeText({ text: String(live) });
  await chrome.action.setBadgeBackgroundColor({ color: live > 15 ? "#c2410c" : "#4b5563" });
}

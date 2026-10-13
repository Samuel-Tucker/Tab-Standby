importScripts("standby.js");

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "standby-current", title: "Standby this tab", contexts: ["page", "action"] });
    chrome.contextMenus.create({ id: "standby-others", title: "Standby all other tabs (this window)", contexts: ["page", "action"] });
    chrome.contextMenus.create({ id: "standby-all", title: "Standby tabs in every window", contexts: ["action"] });
  });
  refreshBadge();
});
chrome.runtime.onStartup.addListener(refreshBadge);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "standby-current") standbyCurrent();
  if (info.menuItemId === "standby-others") standbyOthers(tab.windowId);
  if (info.menuItemId === "standby-all") standbyAllWindows();
});

chrome.commands.onCommand.addListener(async (cmd) => {
  if (cmd === "standby-current") return standbyCurrent();
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (cmd === "standby-others" && tab) standbyOthers(tab.windowId);
});

// Keep the live-tab badge current as tabs wake, open and close.
chrome.tabs.onCreated.addListener(refreshBadge);
chrome.tabs.onRemoved.addListener(refreshBadge);
chrome.tabs.onUpdated.addListener((_, change) => {
  if ("discarded" in change || change.status === "loading") refreshBadge();
});

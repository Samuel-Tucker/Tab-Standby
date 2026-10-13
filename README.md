# Tab Standby

Put tabs on standby to free their memory, then wake them with a click.

Tab Standby discards tabs you are not using. A standby tab stays in your tab strip with its title and icon, but the browser frees its memory and CPU; click it and it reloads. One shortcut, a popup or a right-click puts everything else on standby, and the toolbar badge shows how many tabs are still live.

Download, install steps and screenshots: https://sams.help/extensions/tab-standby

## Features

- Standby all other tabs in this window with one shortcut
- Standby just the current tab and jump to its neighbour
- Standby tabs in every window from the popup or the toolbar right-click menu
- Toolbar badge shows the number of live tabs (turns orange above 15)
- Popup shows live and on-standby counts
- Skips the active tab, tabs playing audio, pinned tabs and internal browser pages

## Shortcuts

- `Alt+Shift+S`: Standby all other tabs in this window
- `Alt+Shift+Z`: Standby this tab and move to the next one

## Permissions

- `tabs`: To list your tabs, see which are active, pinned, playing audio or already on standby, and to discard the ones you choose. Tab Standby does not read page content.
- `contextMenus`: To add the right-click entries: Standby this tab, Standby all other tabs, and Standby tabs in every window.

## Privacy

No network access. Nothing leaves your browser. Tab Standby has no servers, no analytics and no accounts.

## Install (Chrome or Helium)

1. Download this repo (Code → Download ZIP) and unzip it, or grab the zip from the link above.
2. Open `chrome://extensions` (Helium: `helium://extensions`) and turn on Developer mode.
3. Click **Load unpacked** and choose the folder that contains `manifest.json`.

## Licence

MIT. See `LICENSE`.

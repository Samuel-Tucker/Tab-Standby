async function show() {
  const c = await counts();
  document.getElementById("live").textContent = c.live;
  document.getElementById("asleep").textContent = c.asleep;
}
async function run(fn) { await fn(); await show(); }

document.getElementById("others").onclick = async () => {
  const win = await chrome.windows.getCurrent();
  run(() => standbyOthers(win.id));
};
document.getElementById("current").onclick = () => run(standbyCurrent);
document.getElementById("all").onclick = () => run(standbyAllWindows);
show();

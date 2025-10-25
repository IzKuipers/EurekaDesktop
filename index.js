import { app, BrowserWindow, dialog } from "electron";

app.commandLine.appendSwitch("disable-http-cache");

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 640,
    minHeight: 480,
    title: "EUREKA",
    backgroundColor: "#fff",
    devTools: true,
  });

  win.removeMenu();
  win.loadURL(`https://eureka.izkuipers.nl/?t=${Date.now()}`, {
    extraHeaders: "pragma: no-cache\n",
  });

  win.addListener("close", (e) => {
    const response = dialog.showMessageBoxSync(win, {
      type: "question",
      title: "Exit Eureka?",
      message: "Are you sure you want to exit?",
      buttons: ["Yes", "No"],
    });

    if (response === 1) e.preventDefault();
  });
});

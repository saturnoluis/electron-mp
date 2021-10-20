const { app, BrowserWindow } = require('electron');
const process = require('process');

const showDevTools = process.argv.includes('--dev');

function createWindow () {
  const win = new BrowserWindow({
    frame: false,
    center: true,
    minWidth: 800,
    minHeight: 600,
    transparent: true,
    width: showDevTools ? 1600 : 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3000');

  if (showDevTools) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
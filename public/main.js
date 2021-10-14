const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    center: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3000');
  // win.webContents.openDevTools();
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
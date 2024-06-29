const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const iconPath = process.platform === 'darwin' ? 'icons/logo.icns' : 'icons/logo.png';
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, iconPath),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
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

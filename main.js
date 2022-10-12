// Author: @ryd3v
// Date: Oct 11, 2022

// use npx electronmon .

const path = require('path');
const { app, BrowserWindow } = require('electron');
const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Image Rezizer',
    width: isDev ? 900 : 500,
    height: 600,
  });

  // Open devtools if in dev env
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

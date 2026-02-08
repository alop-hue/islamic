const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const DEFAULT_HOME = 'https://duckduckgo.com';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 600,
    title: 'Islamic Browser',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: false
    }
  });

  win.loadFile(path.join(__dirname, 'renderer.html'));

  ipcMain.handle('navigate', (_, targetUrl) => {
    return normalizeUrl(targetUrl);
  });
}

function normalizeUrl(input) {
  const trimmed = input.trim();

  if (!trimmed) return DEFAULT_HOME;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

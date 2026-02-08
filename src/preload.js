const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('browserApi', {
  normalizeAndNavigate: (value) => ipcRenderer.invoke('navigate', value)
});

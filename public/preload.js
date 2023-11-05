const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("IS_USING_DIALOGIX_APP", true);

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: {
        sendMessage(channel, args) {
            ipcRenderer.send(channel, args);
        },
        receiveMessage(channel, listener) {
            ipcRenderer.on(channel, (event, ...args) => listener(...args));
        }
    },
});
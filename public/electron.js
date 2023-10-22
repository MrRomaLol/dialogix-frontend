const path = require('path');

const electronLocalShortcut = require('electron-localshortcut');

const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const isDev = require('electron-is-dev');

const iconPath = path.join(__dirname, 'icons', 'DialogiX256.ico');

let mainWindow;
let trayIcon;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        minWidth: 920,
        minHeight: 800,
        show: false,
        frame: false,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.maximize();
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.show();

    if (isDev) {
        mainWindow.webContents.openDevTools({mode: 'detach'});
    }

    //tray
    trayIcon = new Tray(iconPath);
    trayIcon.setToolTip('DialogiX app (beta)');

    trayIcon.on('click', () => {
        mainWindow?.show();
    })

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open app',
            click: function () {
                mainWindow.show();
            }
        }, {
            type: 'separator'
        }, (isDev && {
            label: "Reload page",
            click: function () {
                mainWindow.reload();
            }
        }), (isDev && {
            label: "Open Dev",
            click: function () {
                mainWindow.webContents.openDevTools({mode: 'detach'});
            }
        })
        , {
            label: 'Quit',
            click: function () {
                app.quit();
            }
        }
    ])

    trayIcon.setContextMenu(contextMenu);

    //shortcuts
    electronLocalShortcut.register(mainWindow, 'Ctrl+R', () => {
        mainWindow?.reload();
    });

    //ipc
    ipcMain.on("minimizeApp", () => {
        mainWindow?.minimize();
    });

    ipcMain.on("maximizeApp", () => {
        if (mainWindow?.isMaximized()) {
            mainWindow?.unmaximize();
        } else {
            mainWindow?.maximize();
        }
    });

    ipcMain.on("closeApp", () => {
        mainWindow?.hide();
    });
}

function update() {
    const updaterWindow = new BrowserWindow({
        width: 340,
        height: 400,
        resizable: false,
        frame: false,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    updaterWindow.loadFile(path.join(__dirname, 'update_page.html'));

    setTimeout(() => {
        createWindow();
        updaterWindow.close();
    }, 5000)
}

app.on('ready', isDev ? createWindow : update);

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
const path = require('path');

const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const isDev = require('electron-is-dev');

const iconPath = path.join(__dirname, 'icons', 'DialogiX256.ico');

let mainWindow;
let trayIcon;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        show: false,
        frame: false,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.maximize();
    mainWindow.removeMenu();
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.show();

    if (isDev) {
        mainWindow.webContents.openDevTools({mode: 'detach'});
    }

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
        }, {
            label: 'Quit',
            click: function () {
                app.quit();
            }
        }
    ])

    trayIcon.setContextMenu(contextMenu);

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

app.on('ready', createWindow);

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
const path = require('path');

const electronLocalShortcut = require('electron-localshortcut');
const Store = require('electron-store');

const {app, BrowserWindow, session, ipcMain, Tray, Menu, shell} = require('electron');
const isDev = require('electron-is-dev');

const iconPath = path.join(__dirname, 'icons', 'DialogiX256.ico');

const store = new Store();

const DIALOGIX_APP_URL = 'https://localhost:3000'

let mainWindow;
let trayIcon;

function createWindow() {
    app.commandLine.appendSwitch('ignore-certificate-errors')

    if (process.platform === 'win32') {
        app.setAppUserModelId('DialogiX');
    }

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        minWidth: 920,
        minHeight: 800,
        backgroundColor: "#140a14",
        show: false,
        frame: false,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    //setting cookies
    session.defaultSession.clearStorageData([], (data) => {
    });
    const cookies = store.get('App-Cookies');

    if (cookies)
        for (const cookie of cookies) {
            session.defaultSession.cookies.set({
                url: DIALOGIX_APP_URL,
                ...cookie
            });
        }

    mainWindow.maximize();
    mainWindow.loadURL(
        isDev
            ? DIALOGIX_APP_URL + '/app'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    })

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

    mainWindow.on('minimize', () => {
        mainWindow.webContents.send('app-minimized', true);
    });

    mainWindow.on('restore', () => {
        mainWindow.webContents.send('app-minimized', false);
    });
}

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

ipcMain.on("openLink", (channel, args) => {
    shell.openExternal(args[0]);
});

ipcMain.on("saveCookies", () => {
    session.defaultSession.cookies.get({url: DIALOGIX_APP_URL}).then((cookies) => {
        store.set('App-Cookies', cookies);
    });
});

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

app.on('before-quit', () => {
    session.defaultSession.cookies.get({url: DIALOGIX_APP_URL}).then((cookies) => {
        store.set('App-Cookies', cookies);
    });
})

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
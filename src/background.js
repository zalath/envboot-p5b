'use strict'

import { shell, app, protocol, BrowserWindow, session, Menu, globalShortcut, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const ipc = ipcMain
const init = require('./com/js/api/init.js')
const task = require('./com/js/api/task.js')
const starter = require('./com/js/api/starter.js')
const conf = require('./com/js/api/conf.js')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

var mainwin;
// var initc = new init()
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1800,
    height: 900,
    // transparent: true,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })
  mainwin = win
  //init all listeners
  init.initipc(win,ipc,shell,app)
  starter.listen(ipc)
  task.listen(ipc)
  conf.listen(ipc)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  createMenu()
}
function createMenu() {
  // darwin表示macOS，针对macOS的设�?
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'App Demo',
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }]
      }]
    let menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
      // 新增的：安装vue-devtools
      // const path = require("path")
      // session.defaultSession.loadExtension(
        // path.resolve("C:/Users/Administrator/AppData/Roaming/c2/extensions/nhdogjmejiglipccpnnnanhbledajbpd")  //这个是刚刚build好的插件目录
      // )
      // session.defaultSession.loadExtension("C:/Users/Administrator/AppData/Roaming/c2/extensions/nhdogjmejiglipccpnnnanhbledajbpd")  //这个是刚刚build好的插件目录
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    mainwin.webContents.openDevTools()
  })
  createWindow()
})
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
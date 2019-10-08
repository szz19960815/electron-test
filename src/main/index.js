'use strict'
import { app, BrowserWindow, ipcMain, globalShortcut, Tray, Menu } from 'electron'
import { execFile } from 'child_process'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'
// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
// 托盘对象
let appTray = null
// 阻止主进程多开
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1024,
    height: 800,
    minWidth: 710,
    minHeight: 520,
    alwaysOnTop: false,
    webPreferences: { nodeIntegration: true }
  })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  //系统托盘右键菜单
  var trayMenuTemplate = [
    {
      label: '设置',
      click: function () { } //打开相应页面
    },
    {
      label: '帮助',
      click: function () { }
    },
    {
      label: '关于',
      click: function () { }
    },
    {
      label: '退出',
      click: function () {
        app.quit();
        app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ];
  //系统托盘图标目录
  // let trayIcon = path.join(__dirname, '../../static');//app是选取的目录
  appTray = new Tray(path.join(__static, 'icon.ico'));//app.ico是app目录下的ico文件
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('electronTest');
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click', function () {
    window.show();
  })

  window.on('closed', () => {
    mainWindow = null
    appTray = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
  // 配置窗口图标
  mainWindow.setIcon(path.join(__static, 'icon.ico'))
  // 配置任务栏图标
  mainWindow.setAppDetails({
    appId: 'szz_electron_test',
    appIconPath: path.join(__static, 'icon.ico'),
    appIconIndex: 0,
  })

  // 全局注册截图快捷键
  globalShortcut.register('alt+x', () => {
    // let screen_window = execFile(process.cwd() + '\\build\\PrintScr.exe')
    let screen_window = execFile(path.join(__static, 'capture/PrintScr.exe'))
    screen_window.on('exit', (code) => {
      // 执行成功返回 1，返回 0 没有截图
      mainWindow.restore()
      // if (code) console.log(code)
    })
  })

  // 通过exe调用dll实现截图
  ipcMain.on('capture', (e, val) => {
    if (val.type === 1) {
      mainWindow.minimize()
    } else {
      mainWindow.restore()
    }
    setTimeout(() => {
      // let screen_window = execFile(process.cwd() + '\\build\\PrintScr.exe')
      let screen_window = execFile(path.join(__static, 'capture/PrintScr.exe'))
      screen_window.on('exit', (code) => {
        // 执行成功返回 1，返回 0 没有截图
        mainWindow.restore()
        // if (code) console.log(code)
      })
    }, 200)
  })

  // 监听窗口置顶事件
  // 窗口置顶
  ipcMain.on('isTop', (event, val) => {
    console.log('窗口置顶')
    mainWindow.setAlwaysOnTop(true)
    // console.log(mainWindow.isAlwaysOnTop())
  })
  // 取消窗口置顶
  ipcMain.on('noTop', (evnet, val) => {
    console.log('取消窗口置顶')
    mainWindow.setAlwaysOnTop(false)
  })

  // 开机启动
  ipcMain.on('startUp', (event, val) => {
    if (val) app.setLoginItemSettings({ openAtLogin: true })
    else app.setLoginItemSettings({ openAtLogin: false })
    console.log(app.getLoginItemSettings())
  })

  // 图标闪烁
  ipcMain.on('twinkle', (e, val) => {
    // 判断窗口是否可见
    // mainWindow.isVisible()
    mainWindow.flashFrame(true)
  })

  // 安装vue-devtool
  // nhdogjmejiglipccpnnnanhbledajbpd
  // 本机vue-devtool存放地址：C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Profile 1/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.1.1_0
  // 安装这一段只能在app.on('ready')的回调函数中执行

  // Open the vue-DevTools.
  // if (isDevelopment) {
  //   BrowserWindow.addDevToolsExtension("C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Profile 1/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.1.1_0")
  // }
})

// 监听网络是否连接
ipcMain.on('isOnline', (event, val) => {
  console.log(val ? '网络已连接' : '网络已断开')
  mainWindow.webContents.send('isOnlineRes', val)
})

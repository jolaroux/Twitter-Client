'use strict'
const electron = require('electron')
// var {Menu} = require('')
console.log("NODE ENV")
console.log(process.env.NODE_ENV)

var Menu = electron.Menu
const app = electron.app // this is our app
const BrowserWindow = electron.BrowserWindow // This is a Module that creates windows  

let mainWindow // saves a global reference to mainWindow so it doesn't get garbage collected

//if (pro)
app.on('ready', createWindow) // called when electron has initialized

// This will create our app window, no surprise there
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    'web-preferences': { 'plugins': true }
  });

  // display the index.html file
  mainWindow.loadURL(`file://${__dirname}/src/HTML and CSS/index.html`)


  // open dev tools by default so we can see any console errors
  mainWindow.webContents.openDevTools()


  //BrowserWindow.addDevToolsExtension('/Users/jameslaroux/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.1.9_0')

  //app.commandLine.appendSwitch("--enable-experimental-webkit-features", true)

  var template = [{
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Reload", accelerator: "Command+R", click: function () { app.relaunch(); app.quit(); } },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
    ]
  }, {
    label: "View",
    submenu: [
      { label: "Show/Hide Console", accelerator: "Ctrl+C", click: function () { !mainWindow.webContents.isDevToolsOpened() ? mainWindow.webContents.openDevTools() : mainWindow.webContents.closeDevTools() } }
    ]
  }, {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "Cmd+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

/* Mac Specific things */

// when you close all the windows on a non-mac OS it quits the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

// if there is no mainWindow it creates one (like when you click the dock icon)
app.on('activate', () => {
  if (mainWindow === null) { createWindow() }
})






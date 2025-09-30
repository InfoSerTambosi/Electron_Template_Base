const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const dotenv = require('dotenv')          // gestore file di configurazione .env
const { creaMenuApp } = require('./menu')
const { initIPC, ipcSendToRenderer } = require('./IPC')

//
// caricamento del file di configurazione generale
dotenv.config()

const WinParams = {
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  },
  width: parseInt( process.env.WIN_LARGHEZZA ) || 800,
  height: parseInt( process.env.WIN_ALTEZZA ) || 500,
  minWidth: parseInt( process.env.WIN_LARGHEZZA_MIN ) || 400,
  maxWidth: parseInt( process.env.WIN_LARGHEZZA_MAX ) || 1024,
  minHeight: parseInt( process.env.WIN_ALTEZZA_MIN ) || 0,
  maxHeight: parseInt( process.env.WIN_ALTEZZA_MAX ) || 800,
  resizable: (process.env.WIN_RESIZABLE==='true') || true,
  movable: (process.env.WIN_MOVABLE==='true') || true, 
  alwaysOnTop: (process.env.WIN_SEMPRE_PRIMOPIANO==='true') || false,
  title: process.env.APP_NAME
}

function createWindow(){
  // crea una nuova finestra
  const win = new BrowserWindow( WinParams )
  //
  // creazione del menu personalizzato
  creaMenuApp()
  //
  // inizializza la gestione della comunicazione IPC
  initIPC( win )
  //
  // carica index.html nell'app.
  win.loadFile('index.html')

  // Attiva gli strumenti di debug nella finestra associata a renderer.js
  //win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => { 
  //
  // crea la finestra dell'app
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { Menu, app, BrowserWindow, dialog } = require('electron/main');
const { ipcSendToRenderer } = require('./IPC');
const { contentTracing } = require('electron');

//
// Struttura del menu nell'applicazione
const struttura = [
  {
    label: 'File',
    submenu: [
      { label:"Apri.." , click: apriFile },
      { type: 'separator' },
      { label:'Esci', role: 'close' }
    ]
  },
  {
    label: 'Modifica',
    submenu: [
      { label:'Annulla', role: 'undo' },
      { label:'Ripristina', role: 'redo' },
      { type: 'separator' },
      { label:'Taglia', role: 'cut' },
      { label:'Copia', role: 'copy' },
      { label:'Incolla', role: 'paste' }
    ]
  },
  {
    label: 'Strumenti',
    submenu: [
      { label:'Apri strumenti di sviluppo', click: openDevTools }
    ]
  }
]

function creaMenuApp() {
  const menu = Menu.buildFromTemplate( struttura );
  Menu.setApplicationMenu( menu );
}

module.exports = { creaMenuApp };

//
//
//-------------------- callbacks per le varie voci del menu ---------------------//
//

function openDevTools(){
  // riferimento alla finestra principale
  const win = BrowserWindow.getAllWindows().at(0)
  // attiva i dev tools
  win.webContents.openDevTools()
}

async function apriFile(){
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if(!canceled){
    const NomeFileCompleto = filePaths[0].toString()
    const punto = filePaths[0].lastIndexOf('/')
    const NomeFile = NomeFileCompleto.substring(punto)
    
    console.log( 'File completo: ', NomeFileCompleto )
    console.log( 'File: ', NomeFile )
    //
    // ok, now do something with the file..
    //


    // invia messaggio  main => renderer (unidirezionale)
    ipcSendToRenderer( 'updateWinTitle', 'File: '+ NomeFile )
  }
}







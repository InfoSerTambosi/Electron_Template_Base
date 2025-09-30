const { app, BrowserWindow, dialog, ipcMain } = require('electron')

let window = undefined

//
// inizializzazione e configurazione della comunicazione 
// IPC tra main process e renderer process:
//
function initIPC( clientWin ){
    // riferimento alla finestra che contiene la GUI
    window = clientWin 
    //
    // Aggiungi qui la gestione dei vari messaggi (vedere preload.js):
    // 
    // comunicazione renderer => main (unidirezionale)
    //ipcMain.on('main_FaiQualcosa1', cbk_FaiQualcosa1 )
    //
    // comunicazione renderer <=> main (bidirezionale)
    //ipcMain.handle('main_FaiQualcosa2', cbk_FaiQualcosa2 )
}

//
// invia messaggio  main => renderer (unidirezionale)
function ipcSendToRenderer( message , data ){
  window.webContents.send( message , data )
}

module.exports = { initIPC , ipcSendToRenderer };

//
//------------------------- gestione delle callback-functions ---------------------------------//
//

// function cbk_FaiQualcosa1( event , dati ) {
  
//   console.log( dati )
// }

// async function cbk_FaiQualcosa2 () {
//   return "qui nel Main() stiamo lavorando per voi..."
// }
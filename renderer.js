//
// Gestione riferimenti ai componenti della GUI
//
const Button1 = document.getElementById("btn1")
const Label1 = document.getElementById("lb1")
const TextBox1 = document.getElementById("tx1")
const TextBox2 = document.getElementById("tx2")
const CheckBox1 = document.getElementById("ck1")

//
// Associazione di eventi ad elementi della GUI
//
Button1.addEventListener('click', Button1Click);
//
// codice da eseguire al caricamento della GUI
document.addEventListener('DOMContentLoaded', OnLoad );     

//
// Callbacks associati ai vari eventi della GUI
//

function Button1Click() {
    // Messaggi per le Textbox
    

    const Cognome = TextBox1.value
    const Nome = TextBox2.value
    if( CheckBox1.checked ){
        Label1.innerText = "Benvenuto " + Nome + " " + Cognome
    }
    else{
        Label1.innerText = "Arrivederci " + Nome + " " + Cognome
    }
}

function OnLoad() {
    // Messaggi per le Textbox
    console.log("OnLoad eseguito")
    

    
}




import {Cronometro} from './Cronometro.js'
import {Tables} from './Tables.js';
import { Buttons } from './Buttons.js';

var socket = io()
// socket.emit("start")


var timer = new Cronometro();

var tableControl = new Tables();
tableControl.resetTables();

var buttons = new Buttons(timer, socket, tableControl);
buttons.initButtons();



// Botones que simulan la llegada a meta. Envian un evento falso
// y el servidor te devuelve el evento meta
// Se desactivarán para el día, es solo para pruebas sin raspi
var lapBotones = [document.getElementById("lap1"),
                document.getElementById("lap2"),
                document.getElementById("lap3"),
                document.getElementById("lap4")];

lapBotones.forEach((boton, index) => {
    boton.onclick = () => socket.emit("falsaMeta", (index+1))
});

// Evento cuando llega a meta alguno de los coches
// TODO comprobar que fase del torneo es y actualizar valor de tiempo. 
// TODO seguramente haya que mover de sitio esta función.
socket.on("meta", (index) => {
    var time = timer.getTime();
    var activeTable = tableControl.getActiveTable();

    console.log("Ha llegado a meta el numero " + index + " y la tabla activa es " + activeTable);
    
    if(activeTable != 0) {
        var tableTimeId = "t" + activeTable + "p" + index;
        var tableId = "Table" + activeTable;

        tableControl.insertTable(tableTimeId, time);
        tableControl.sortTable(tableId);
    }
});
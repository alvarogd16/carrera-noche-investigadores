import {Cronometro} from './Cronometro.js'
import {Tables} from './Tables.js';
import { Buttons } from './Buttons.js';

var socket = io()
// socket.emit("start")

var elem = document.getElementById("cronometro");
var timer = new Cronometro(elem);

var tableControl = new Tables();
tableControl.resetTimes();

var startButtons = document.getElementsByClassName("start");
var stopButtons = document.getElementsByClassName("stop");
var resetButton = document.getElementById("reset");
var buttons = new Buttons(startButtons, stopButtons, resetButton, timer, socket);
buttons.initButtons();


// Botones que simulan la llegada a meta. Envian un evento falso
// y el servidor te devuelve el evento meta
// Se desactivarán para el día, es solo para pruebas sin raspi
var lapBotones = [document.getElementById("lap1"),
                document.getElementById("lap2"),
                document.getElementById("lap3"),
                document.getElementById("lap4")];

lapBotones.forEach((boton, index) => {
    boton.onclick = () => socket.emit("falsaMeta", index)
});

// Evento cuando llega a meta alguno de los coches
// TODO comprobar que fase del torneo es y actualizar valor de tiempo. 
// TODO seguramente haya que mover de sitio esta función.
socket.on("meta", (index) => {
    console.log("Ha llegado a meta el numero " + index);
});
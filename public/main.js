import {Cronometro} from './Cronometro.js'
import { Buttons } from './Buttons.js';

var socket = io()
// socket.emit("start")

var elem = document.getElementById("cronometro");
var timer = new Cronometro(elem);

var startButtons = document.getElementsByClassName("start");
var stopButtons = document.getElementsByClassName("stop");
var buttons = new Buttons(startButtons, stopButtons, timer)
buttons.initButtons();
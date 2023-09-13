const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;

const isPi = require("detect-rpi");

/* ****************************************** */
/* Raspberry pi logic                         */
/* ****************************************** */

const PIN_MOTOR = 17;
const PIN_FIN_CARRERA_1 = 26;
const PIN_FIN_CARRERA_2 = 19;
const PIN_FIN_CARRERA_3 = 13;
const PIN_FIN_CARRERA_4 = 6;

if (isPi()) {
	console.log("Running in a Raspberry pi");

	const Gpio = require('pigpio').Gpio;

	// Motor init
	const motor = new Gpio(PIN_MOTOR, { mode: Gpio.OUTPUT });

	const PULSE_WIDTH_READY_POSITION = 500;
	const PULSE_WIDTH_GO_POSITION = 2500;
	const servoPulse = {
		'READY': PULSE_WIDTH_READY_POSITION,
		'GO': PULSE_WIDTH_GO_POSITION
	};

	// Fin de carrera init
	// Estan en orden de izquierda a derecha. Ej. pin4 para el más a la izquierda
	const finCarreraConfig = {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_UP,
		alert: true
	};
	const finCarrera = [
		new Gpio(PIN_FIN_CARRERA_1, finCarreraConfig),
		new Gpio(PIN_FIN_CARRERA_2, finCarreraConfig),
		new Gpio(PIN_FIN_CARRERA_3, finCarreraConfig),
		new Gpio(PIN_FIN_CARRERA_4, finCarreraConfig)
	];

	// Para el debounce de los finales de carrera. Microsegundos que tiene que
	// estar el valor para que se notifique la interrupción con alert.
	const GLITCH_MICRO_SECONDS = 10000;
	finCarrera.forEach(fC => fC.glitchFilter(GLITCH_MICRO_SECONDS));

	// Socket logic
	io.on('connection', (socket) => {
		console.log("Socket establish");

		socket.on("start", () => {
			console.log("Race start. Servo down");

			motor.servoWrite(servoPulse.GO);
		});

		socket.on("reset", () => {
			console.log("Race reset. Servo up");

			motor.servoWrite(servoPulse.READY);
		});

		// Crea los eventos para todos los finales de carrera
		finCarrera.forEach((fC, index) => {
			fC.on('alert', (level, tick) => {
				if (level === 0) {
					console.log("Fin carrera " + index + " con nivel " + level);
					// Sumo uno para que el indice empiece por 1
					socket.emit("meta", (index + 1));
				}
			})
		});

	});

} else {
	console.log("Not running in a Raspberry pi");

	// Para cuando se pruebe en un ordenador que no sea una raspberry
	io.on('connection', (socket) => {
		console.log("Socket establish");

		socket.on("start", () => console.log("Race start. Without servo :("));
		socket.on("reset", () => console.log("Race reset. Without servo :("));

		// Evento para pruebas. El cliente lo envia y responde el servidor como si fuera el 
		// final de carrera.
		socket.on("falsaMeta", (data) => {
			console.log("Falso fin carrera " + data);
			socket.emit("meta", data);
		});
	});
}

/* ****************************************** */
/* Web server                                 */
/* ****************************************** */

// Serves all the contents of the public folder
app.use(express.static('public'));

// Dont needed 
app.get('/', (req, res) => {
	res.send('Hello World!')
})

// Start the server in the indicate port
server.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`)
})

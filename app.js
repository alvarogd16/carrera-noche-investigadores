const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const port = 3000;

const isPi = require("detect-rpi");

/* ****************************************** */
/* Raspberry pi logic                         */
/* ****************************************** */

if(isPi()) {
  console.log("Running in a Raspberry pi");
   
  const Gpio = require('pigpio').Gpio;

	// Motor init
  const motor = new Gpio(17, {mode: Gpio.OUTPUT});
  const servoPulse = { 'RESET': 500, 'START': 2500 };

	// Fin de carrera init
	// Estan en orden de izquierda a derecha. Ej. pin4 para el más a la izquierda
	const finCarreraConfig = { mode: Gpio.INPUT,
															pullUpDown: Gpio.PUD_UP,
															alert: true};
	const finCarrera = [new Gpio(26, finCarreraConfig),
											new Gpio(19, finCarreraConfig),
											new Gpio(13, finCarreraConfig),
											new Gpio(6, finCarreraConfig)];

	// Para el debounce de los finales de carrera. El numero son los microsegundos que tiene que 
	// estar el valor para que se notifique la interrupción con alert.
	finCarrera.forEach(fC => fC.glitchFilter(10000));

	
	// Socket logic
  io.on('connection', (socket) => {
    console.log("Socket establish");
    
    socket.on("start", () => {
      console.log("Race start. Servo down");
			
			motor.servoWrite(servoPulse.START);
		});


		socket.on("reset", () => {
			console.log("Race reset. Servo up");

			motor.servoWrite(servoPulse.RESET);
		});

		// Crea los eventos para todos los finales de carrera
		finCarrera.forEach((fC, index) => {
			fC.on('alert', (level, tick) => {
				if(level === 0) {
					console.log("Fin carrera " + index + " con nivel " + level);
					// Sumo uno para que el indice empiece por 1
					socket.emit("meta", (index+1));
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
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

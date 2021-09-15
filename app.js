const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server);
const port = 3000

// Serves all the contents of the public folder
app.use(express.static('public'));


// Dont needed 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Socket connection. This will provide bidirentional communication to send
// data (for sensor and actuators)
io.on('connection', (socket) => {
  console.log("A user connected");

  socket.on("start", () => {
    console.log("Race start. Servo down.");
  })

  socket.on("reset", () => {
    console.log("Reset race. Servo up.")
  })

  // In the future this event will emit by sensor in the raspberry pi
  socket.on("finish", (id) => {
    console.log(`${id} has finished the race`)

    socket.emit("fin", id)
  })
})

// Start the server in the indicate port
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
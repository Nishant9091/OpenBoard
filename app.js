const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.static("public"));

const server = http.createServer(app);
const io = socketIo(server);

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});

io.on("connection", (socket) => {
    console.log("Made socket connection");

    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data);
    })  

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})

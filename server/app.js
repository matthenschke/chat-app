const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`back-end server is listening on PORT: ${PORT}`);
})

const io = require('socket.io')(server);
const SocketManager = require('./SocketManager.js');

 // socket connection event listener
 io.on('connect', SocketManager);

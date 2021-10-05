require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) =>
{
    socket.on('chat message', (msg) =>
    {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

server.listen(process.env.NODE_PORT, () =>
{
    console.log('listening on *:5000');
});


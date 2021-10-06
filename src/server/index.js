require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/public', express.static(path.join(__dirname, '/../client/public/'), { index: false }));

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '/../client', 'index.html'));
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


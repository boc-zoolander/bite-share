
const express = require('express');
const path = require('path');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const PORT = 8080;
require('dotenv').config();
const users = require('./user_db_routes/user_db_routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

const socketHistory = {};

io.on('connection', socket => {
  socket.on('joinRoom', payload => {
    const room = payload.sessionId.toString();
    socket.room = room;
    socket.join(room);
    console.log('User joined room ', payload.sessionId);
  });

  socket.on('submitOrder', payload => {
    const room = payload.sessionId.toString();
    io.to(room).emit('orderSubmitted', payload);
  });

  socket.on('joinSession', payload => {
    // console.log('joinSession payload: ', payload);
    const room = payload.sessionId.toString();
    socketHistory[room] = socketHistory[room] ? [payload, ...socketHistory[room]] : [payload];
    console.log(socketHistory[room]);
    io.to(room).emit('onDash', socketHistory[room]);
  });

  socket.on('hostJoined', payload => {
    const room = payload.sessionId.toString();
    const guests = socketHistory[room] || [];
    io.to(room).emit('updateDash', guests);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// the router for the users API
app.use('/users', users);

httpServer.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

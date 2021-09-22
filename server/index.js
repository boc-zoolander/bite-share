
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

io.on('connection', socket => {
  socket.on('joinRoom', payload => {
    console.log('User is joining this room', payload.sessionId);
    socket.room = payload.sessionId;
    socket.join(payload.sessionId);
    console.log('User ID joinRoom: ', socket.id);
    console.log('The real user room should be this: ', socket.room);
  });

  socket.on('orderSubmitted', payload => {
    console.log('name and order received on server: ', payload);
    io.to(payload.sessionId).emit('orderSubmitted', payload);
  });

  socket.on('onJoin', payload => {
    console.log('Remote Name received on server: ', payload);
    console.log('User ID join session: ', socket.id);
    console.log('The real user room should be this: ', socket.room);
    io.to(payload.sessionId).emit('onJoin', payload);
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

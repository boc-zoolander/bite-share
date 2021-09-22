
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
    socket.room = payload.sessionId;
    socket.join(payload.sessionId);
  });

  socket.on('orderSubmitted', payload => {
    io.to(payload.sessionId).emit('orderSubmitted', payload);
  });

  socket.on('onJoin', payload => {
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

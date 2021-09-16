const express = require('express');
const path = require('path');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const PORT = 8080;
const users = require('./user_db_routes/user_db_routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

io.on('connection', socket => {
  console.log('connection made yo!');

  socket.on('orderSubmitted', payload => {
    console.log('name and order received on server: ', payload);
    io.emit('orderSubmitted', payload);
  });

  socket.on('onJoin', payload => {
    console.log('Remote Name received on server: ', payload);
    io.emit('onJoin', payload);
  });
});

// the router for the users API
app.use('/users', users);

// OLD LISTEN
// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

httpServer.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

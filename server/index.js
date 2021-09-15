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

  // All of the different event listeners will live here

  // socket.on('message', payload => {
  //   // write to database and do everything helpfuntion
  //   // return the product the functio
  //   console.log('Message recieved on server: ', payload);
  //   const guestStatus = 'returned from helper function';
  //   io.emit('message', guestStatus);
  // });

  socket.on('orderSubmitted', payload => {
    console.log('name and order received on server: ', payload);
    io.emit('orderSubmitted', payload);
  });
});

// the router for the users API

app.use('/users', users);

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

httpServer.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

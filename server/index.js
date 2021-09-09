const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const users = require('./user_db_routes/user_db_routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

// the router for the users API
app.use('/users', users);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});


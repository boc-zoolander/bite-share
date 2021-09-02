const { Pool } = require('pg');

const pool = new Pool({
  user: 'USER NAME',
  host: 'EXAMPLE IP ADDRESS',
  //host: 'localhost',
  database: 'NAME OF DATABASE TO BE ENTERED',
  password: 'password',
  port: 5432,
});

pool.connect();

module.exports = pool;
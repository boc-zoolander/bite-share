const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  // name of the EC2 server IP
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

pool.connect();

module.exports = pool;

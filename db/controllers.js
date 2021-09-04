const pool = require('./models.js');


//DISABLED FOR NOW
// const insertRestaurantRecord = function(obj_param, callback) {

//   //let { restaurant_data } = obj_param;
//   var queryStr = `INSERT INTO "BOC_restaurants" VALUES (2, 2, '${obj_param}')`;
//   pool.query(queryStr, (err, res) => {
//     if (err) {
//       console.log('error occurred');
//       callback(err, null);
//     } else {
//       callback(null, JSON.stringify(res.rows, null, 2));
//     }
//   });

// }

// database interaction to get all the answers for a particular question
const getUsers = function(obj_param, callback) {
  let { page, count, example_query_data } = obj_param;
  var queryStr = `SELECT * FROM "BOC_user"`;
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log('error occurred');
      callback(err, null);
    } else {
      callback(null, JSON.stringify(res.rows, null, 2));
    }
  });
}

const getSessions = function (obj_param, callback) {
  var queryStr = `SELECT * FROM "BOC_Sessions"`;
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log('error occurred');
      callback(err, null);
    } else {
      callback(null, JSON.stringify(res.rows, null, 2));
    }
  });
}



const getUserSession = function (obj_param, callback) {
  let { host_id } = obj_param;
  var queryStr = `SELECT * FROM "BOC_Sessions" WHERE "BOC_Sessions".host_id = ${host_id}`;
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log('error occurred');
      callback(err, null);
    } else {
      // success with pretty print

      callback(null, JSON.stringify(res.rows, null, 2));
    }
  });
}

//this function creates a user session for the user and inserts it into the BOC session db
const createUserSession = function (obj_param, callback) {

  console.log('does it get into createUserSession');

  let { session_name, restaurant_name, host_id } = obj_param;

  var queryStr = `INSERT INTO "BOC_Sessions"(session_name, host_id, participants_id, restaurant_name, order_id, split_method) VALUES ('${session_name}', ${host_id}, 2, '${restaurant_name}', 1, 1)`;

  console.log(queryStr);
  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log('error occurred');
      callback(err, null);
    } else {
      // success with pretty print

      callback(null, JSON.stringify(res.rows, null, 2));
    }
  });
}


module.exports = {
  getUsers,
  getSessions,
  getUserSession,
  createUserSession,
  //insertRestaurantRecord,
};
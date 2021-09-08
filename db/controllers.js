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

// database interaction to get all the users in the users table.
const getUsers = function() {
  var queryStr = `SELECT * FROM "BOC_user"`;
  
  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    })
}

const getAllSessions = function () {
  var queryStr = `SELECT * FROM "BOC_Sessions"`;
  
  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    })
}



const getUserSession = function (obj_param) {
  let { host_id } = obj_param;
  var queryStr = `SELECT * FROM "BOC_Sessions" WHERE "BOC_Sessions".host_id = ${host_id}`;
  
  return pool.query(queryStr)
  .then(res => {
    return JSON.stringify(res.rows, null, 2);
  })
  .catch(err => {
    return err;
  })
}

//this function creates a user session for the user and inserts it into the BOC session db
const createUserSession = function (obj_param) {

  let { session_name, restaurant_name, host_id } = obj_param;

  var queryStr = `INSERT INTO "BOC_Sessions"(session_name, host_id, participants_id, restaurant_name, order_id, split_method) VALUES ('${session_name}', ${host_id}, 2, '${restaurant_name}', 1, 1)`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    })
}


module.exports = {
  getUsers,
  getAllSessions,
  getUserSession,
  createUserSession,
  //insertRestaurantRecord,
};
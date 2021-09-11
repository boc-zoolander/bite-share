const pool = require('./models.js');

// database interaction to get all the users in the users table.
const getUsers = function() {
  let queryStr = `SELECT * FROM "BOC_user"`;
  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

const getAllSessions = function () {
  let queryStr = `SELECT * FROM "BOC_Sessions"`;
  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

const getUserSession = function (obj_param) {
  let { host_id } = obj_param;
  let queryStr = `SELECT * FROM "BOC_Sessions" WHERE "BOC_Sessions".host_id = ${host_id}`;
  
  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// this function creates a user session for the user and inserts it into the BOC session db
const createNewSession = function (obj_param) {
  let { session_name, restaurant_name, host_id } = obj_param;

  let queryStr = `INSERT INTO "BOC_Sessions"(session_name, host_id, participants_id, restaurant_name, order_id, split_method) VALUES ('${session_name}', ${host_id}, 2, '${restaurant_name}', 1, 1) RETURNING "session_pk"`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// adds a guest to a given session UNTESTED
const updateRestaurant = function (obj_param) {
  let {restaurant_id_api, restaurant_name_api, session_id} = obj_param;

  let queryStr = `UPDATE "BOC_Sessions" SET (restaurant_id = '${restaurant_id_api}', 
                  restaurant_name = '${restaurant_name_api}'
                  WHERE (session_pk = '${session_id}');`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// adds a guest to a given session
const addGuest = function (obj_param) {
  let { session_id, user_id } = obj_param;

  let queryStr = `INSERT INTO "BOC_User-Session-jt"(session_id, user_id, user_done_ordering) 
                  VALUES ('${ session_id }', '${ user_id }', '0') `;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// removes a guest from a given session
const removeGuest = function (obj_param) {
  let {session_id, user_id} = obj_param;

  let queryStr = `DELETE FROM "BOC_User-Session-jt" WHERE (session_id = ${session_id} 
                  AND user_id = ${user_id})`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// adds an order for a given session
const addOrder = function (obj_param) {
  let {orderer_id, order_session_id, food_id_api, food_name_api, price, qty, restaurant_id_api, restaurant_name_api} = obj_param;

  let queryStr = `INSERT INTO "BOC_Orders"(orderer_id, order_session_id, food_id_api, 
                  food_name_api, price, qty, restaurant_id_api, restaurant_name_api) VALUES 
                  ('${orderer_id}', '${order_session_id}', '${food_id_api}', '${food_name_api}',
                   '${price}', '${qty}', '${restaurant_id_api}', '${restaurant_name_api}') 
                   RETURNING "order_pk"`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

const removeOrder = function (obj_param) {
  let { order_id } = obj_param;

  let queryStr = `DELETE FROM "BOC_Orders" WHERE (order_pk = ${order_id})`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// updates qty of an order
const updateOrder = function (obj_param) {
  let { qty, order_id } = obj_param;

  let queryStr = `UPDATE "BOC_Orders" SET qty = '${qty}'
  WHERE (order_pk = '${ order_id }');`;

  return pool.query(queryStr)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getUsers,
  getAllSessions,
  getUserSession,
  createNewSession,
  addGuest,
  removeGuest,
  addOrder,
  updateOrder,
  removeOrder,
  updateRestaurant,
};

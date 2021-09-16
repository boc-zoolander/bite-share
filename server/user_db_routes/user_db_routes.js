const express = require('express');
const router = express.Router();
const db = require('../../db/controllers.js');
const axios = require('axios');
const testgetrestaurant_1 = require('./testgetrestaurant_1');
const testmenu_1 = require('./testmenu_1');
const testRestaurantsByZip = require('./testRestaurantsByZip_1');
const testSession = require('./getSession');


// router.get('/getRestaurantData', (req, res) => {
//   axios.get('https://api.documenu.com/v2/restaurant/4072702673999819?key=2b62ef416cee7e4987bb65756c54e031')
//     .then((response) => {
//       res.header("Content-Type",'application/json');
//       res.status(200).send(JSON.stringify(response.data, null, 2));
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     })
// })

// TEST ROUTES FOR PRELIMINARY USAGE

router.get('/getSession', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testSession, null, 2));
});

router.get('/testzip', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testRestaurantsByZip, null, 2));
});

router.get('/testgetRestaurant_1', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testgetrestaurant_1, null, 2));
});

router.get('/testmenu_1', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testmenu_1, null, 2));
});

// FOR INTERNAL USAGE ONLY

router.get('/getUsers', (req, res) => {
  db.getUsers()
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/getAllSessions', (req, res) => {
  db.getAllSessions()
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/getUserSession', (req, res) => {
  db.getUserSession({ host_id: 1 })
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// FOR FRONT END USAGE

router.get('/getSession2', (req, res) => {

  // TO DO:  CREATE an index from "BOC_User-Session-jt"
  // we want to get all the users for a particular session
  // then we want to get all the orders for a particular session.
  // however the order session information contains the relevant users as well.

  // select JOIN session_id on the join table
  // JOIN session and users

  // sort
  // format
  // return data

  // res.header('Content-Type', 'application/json');
  // res.status(200).send(JSON.stringify(stuff, null, 2));
});

// creates a new Session for a given Schema
router.post('/createNewSession', (req, res) => {

  let obj_params = {
    session_name: req.query.session_name,
    restaurant_name: req.query.restaurant_name,
    restaurant_id_api: req.query.restaurant_id_api,
    host_id: req.query.host_id,
  };

  db.createNewSession(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      // the result of this should return the created session id.
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// creates a new Session for a given Schema
router.get('/createNewSession', (req, res) => {

  let obj_params = {
    session_name: req.query.session_name,
    restaurant_name: req.query.restaurant_name,
    restaurant_id_api: req.query.restaurant_id_api,
    host_id: req.query.host_id,
  };

  db.createNewSession(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      // the result of this should return the created session id.
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// updates the restaurant for a particular session
router.put('/updateRestaurant', (req, res) => {
  let obj_params = {
    session_id: req.query.session_id,
    restaurant_name: req.query.restaurant_name,
    restaurant_id_api: req.query.restaurant_id_api,
  };

  db.updateRestaurant(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// updates the restaurant for a particular session
router.get('/createNewUser', (req, res) => {
  let obj_params = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    email: req.query.email,
    password: req.query.password,
  };

  db.createNewUser(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// adds a guest to a particular session
router.post('/addGuest', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: req.query.session_id,
    user_id: req.query.user_id,
  };

  db.addGuest(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// removes a guest from the session
router.post('/removeGuest', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: req.query.session_id,
    user_id: req.query.user_id,
  };

  db.removeGuest(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// adds an order with respect to a guest to a particular session
router.get('/addOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    order_session_id: req.query.session_id,
    orderer_id: req.query.user_id,
    food_id_api: req.query.food_id_api,
    food_name_api: req.query.food_name_api,
    price: req.query.price,
    qty: req.query.qty,
    restaurant_id_api: req.query.restaurant_id_api,
    restaurant_name_api: req.query.restaurant_name_api,
  };

  db.addOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// adds an order with respect to a guest to a particular session
router.post('/addOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    order_session_id: req.query.session_id,
    orderer_id: req.query.user_id,
    food_id_api: req.query.food_id_api,
    food_name_api: req.query.food_name_api,
    price: req.query.price,
    qty: req.query.qty,
    restaurant_id_api: req.query.restaurant_id_api,
    restaurant_name_api: req.query.restaurant_name_api,
  };

  db.addOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// updates an order with respect to a guest to a particular session
router.put('/updateOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    order_id: req.query.order_id,
    qty: req.query.qty,
  };

  db.updateOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// removes an order
router.post('/removeOrder', (req, res) => {
  let obj_params = {
    order_id: req.query.order_id,
  };

  db.removeOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// STRETCH GOAL: changes the current session Host
router.put('/changeHost', (req, res) => {
  // TO DO
});

module.exports = router;

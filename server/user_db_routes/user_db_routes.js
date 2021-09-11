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

// FOR FRONT END UDSAGE

// creates a new Session for a given Schema
router.get('/createNewSession', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_name: 'Session Name #4',
    restaurant_name: 'Restaurant #4',
    host_id: 9
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

// adds a guest to a particular session
router.get('/addGuest', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: 7,
    user_id: 10,
    user_done_ordering: false,
    // first_name: req.params.first_name,
    // last_name: req.params.last_name
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
router.put('/removeGuest', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: req.params.session_id,
    user_id: 9,
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
    session_id: req.params.session_id,
    user_id: req.params.user_id,
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
// to remote an order, change qty to 0.
router.put('/updateOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: req.params.session_id,
    first_name: req.params.first_name,
    last_name: req.params.last_name
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

// STRETCH GOAL: changes the current session Host
router.put('/changeHost', (req, res) => {
  // TO DO
});

module.exports = router;

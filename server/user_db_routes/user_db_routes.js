const express = require('express');
const router = express.Router();
const db = require('../../db/controllers.js');
const axios = require('axios');
const testgetrestaurant_1 = require('./testgetrestaurant_1');
const testmenu_1 = require('./testmenu_1');
const testRestaurantsByZip = require('./testRestaurantsByZip_1');


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

router.get('/testzip', (req, res) => {
  res.header("Content-Type",'application/json');
  res.status(200).send(JSON.stringify(testRestaurantsByZip, null, 2));
})

router.get('/testgetRestaurant_1', (req, res) => {
  res.header("Content-Type",'application/json');
  res.status(200).send(JSON.stringify(testgetrestaurant_1, null, 2));
})

router.get('/testmenu_1', (req, res) => {
  res.header("Content-Type",'application/json');
  res.status(200).send(JSON.stringify(testmenu_1, null, 2));
})



router.get('/getUsers', (req, res) => {

  db.getUsers()
    .then(result => {
      res.header("Content-Type",'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    })

});


router.get('/getAllSessions', (req, res) => {

  db.getAllSessions()
  .then(result => {
    res.header("Content-Type",'application/json');
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(400).send(err);
  })

});

router.get('/getUserSession', (req, res) => {

  db.getUserSession({host_id: 1})
  .then(result => {
    res.header("Content-Type",'application/json');
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(400).send(err);
  })

});

router.get('/createUserSession', (req, res) => {

  let obj_param = {
    session_name: 'Cyclops Treats the group',
    host_id: 1,
    restaurant_name: 'IHOP',
  };

  db.createUserSession(obj_param)
  .then(result => {
    res.header("Content-Type",'application/json');
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(400).send(err);
  })

});


module.exports = router;
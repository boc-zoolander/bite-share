const express = require('express');
const router = express.Router();
const db = require('../../db/controllers.js');
const axios = require('axios');


router.get('/getRestaurantData', (req, res) => {
  axios.get('https://api.documenu.com/v2/restaurant/4072702673999819?key=2b62ef416cee7e4987bb65756c54e031')
    .then((response) => {
      //console.log(response.data);
      res.header("Content-Type",'application/json');
      // db.insertRestaurantRecord(JSON.parse(response.data), (err, res) => {
      //   if (err) {
      //     console.log('error in storing', err)
      //   } else {
      //     console.log('done: ', res);
      //   }
      // });
      res.status(200).send(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      res.header("Content-Type",'application/json');
      res.status(400).send(error);
    })
})


router.get('/getAllUsers', (req, res) => {
  db.getUsers({}, (err, result) => {
    if (err) {
      res.send('error in database get');
    }

    res.header("Content-Type",'application/json');
    res.status(200).send(result);

  });
});


router.get('/getAllSessions', (req, res) => {
  db.getSessions({}, (err, result) => {
    if (err) {
      res.send('error in database get');
    }

    res.header("Content-Type",'application/json');
    res.status(200).send(result);

  });
});

router.get('/getUserSession', (req, res) => {

  db.getUserSession({host_id: 1}, (err, result) => {
    if (err) {
      res.send('error in database get');
    }
    res.header("Content-Type",'application/json');
    res.status(200).send(result);
  });
});

router.get('/createUserSession', (req, res) => {

  let obj_param = {
    session_name: 'Cyclops Treats the group',
    host_id: 1,
    restaurant_name: 'IHOP',
  };

  console.log('does it call');
  db.createUserSession(obj_param, (err, result) => {
    if (err) {
      res.send('error in database get');
    }

    res.header("Content-Type",'application/json');
    res.status(200).send(result);

  });
});






module.exports = router;
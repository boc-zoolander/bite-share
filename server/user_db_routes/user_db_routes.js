const express = require('express');
const router = express.Router();
const db = require('../../db/controllers.js');


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
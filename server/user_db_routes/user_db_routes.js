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



module.exports = router;
const pool = require('./models.js');

// database interaction to get all the answers for a particular question
const getUsers = function(obj_param, callback) {

  let { page, count, example_query_data } = obj_param;

  var queryStr = `SELECT * FROM "BOC_user"`;

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
  getUsers
};
const pool = require('./models.js');

// database interaction to get all the answers for a particular question
const basicGet = function(obj_param, callback) {

  let { page, count, example_query_data } = obj_param;

  var queryStr = `SELECT * FROM "NAME OF DATABASE" WHERE
                  "EXAMPLE FIELD" = ${example_query_data})`;

  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log('error occurred');
      callback(err, null);
    }

    // success
    callback(null, {
      question_id: question_id,
      page: page,
      count: count,
      results: res.data
    });
};

module.exports = {
  basicGet
};


const buildSessionObj = function (rowElement) {

  let newSessionObj = {
    session_id: rowElement.session_id,
    session_name: rowElement.session_name,
    host: {},
    // host will be element zero of this
    guests: []
  };

  return newSessionObj;
};

const buildGuestObj = function (rowElement) {

  let newGuestObj = {
    id: rowElement.user_id,
    first_name: rowElement.first_name,
    last_name: rowElement.last_name,
    order: {}
  };
  return newGuestObj;
};

const buildOrderObj = function (rowElement) {

  let newOrderObj = {
    order_id: rowElement.order_id,
    item_name: rowElement.food_name_api,
    price: rowElement.price,
    qty: rowElement.qty
  };
  return newOrderObj;
};

const parseSession = function (results) {
  if (!results || (results.length === 0)) {
    return {};
  }

  let sessionReturnObj = buildSessionObj(results[0]);

  sessionReturnObj.guests = parseGuests(results);
  sessionReturnObj.host = sessionReturnObj.guests[0];

  return sessionReturnObj;
};

const parseGuests = function (results, lowerbound, upperbound) {
  var resultsArray = [];
  var resultsObj = {};
  let rowCounter = 0;
  let host_id = results[rowCounter].host_id;

  while (rowCounter < results.length) {

    // gets the user_ID and checks if the user ID is in the temp object.
    let user_ID = results[rowCounter].user_id;

    // build an object of object of Guest qualifiers.
    if (!(user_ID in resultsObj)) {
      resultsObj[user_ID] = buildGuestObj(results[rowCounter]);
    };

    let order_ID = results[rowCounter].order_id;
    if (order_ID !== null) {
      
      if (!(order_ID in resultsObj[user_ID].order)) {
        resultsObj[user_ID].order[order_ID] = buildOrderObj(results[rowCounter]);
      }
    }

    rowCounter++;
  }

  // since we know the host id, lets take it out.
  let firstObjInArray = resultsObj[host_id];
  delete resultsObj[host_id];

  // clean up the object by converting the Guest Object into an array
  for (let x in resultsObj) {
    if (resultsObj[x].order) {
      const orderArray = [];
      for (let y in resultsObj[x].order) {
        orderArray.push(resultsObj[x].order[y]);
      }
      resultsObj[x].order = orderArray;
    }
    resultsArray.push(resultsObj[x]);
  }

  // parse the order obj of the host into an array.
  if (firstObjInArray.order) {
    const orderArray = [];
    for (let y in firstObjInArray.order) {
      orderArray.push(firstObjInArray.order[y]);
    }
    firstObjInArray.order = orderArray;
  }

  // once we finish building the array, place the host at the beginning.
  resultsArray.unshift(firstObjInArray);

  return resultsArray;
  // parse based on page and count
  // return resultsArray.slice(lowerbound, upperbound);
};

module.exports = {
  buildSessionObj,
  buildGuestObj,
  buildOrderObj,
  parseSession,
  parseGuests
};

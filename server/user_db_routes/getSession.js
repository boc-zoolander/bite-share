// results of a /getSession
// NOTES:
//  The guest field is an array of Guest Objects
//    This means guests.length === the number of guests
//    The guests can be .map()-ed for components
//  Each guest Object contains an order field, which contains an array of order Objects
//  .guests[0].order.length contains the number of items ordered by the guest
//  the restaurant field is an object.  For our MVP, this record will remain unpopulated.
//  however, for future sessions, it can be re-acquired.

const example_Session = {
  session_id: 12345,
  session_name: "Team Zoolander's Farmer's Market:  The Forbidden Fruit Must Be Tasted!",
	host: {
		id: 67890,
		first_name: 'Jacobim',
    last_name: 'Mugatu',
    order: [
      { order_id: 7777,
        item_name: 'Foamy Latte',
        price: 8.99,
        qty: 1 },
      { order_id: 7778,
        item_name: 'Piano Necktie',
        price: 18.99,
        qty: 1 }
    ]
	},
	guests: [
    {  id: 34556,
		   first_name: 'Tom',
		   last_name: 'Ho',
       order: [
        {  order_id: 7777,
           item_name: 'Foamy Latte',
           price: 8.99,
           qty: 2 },
        {  order_id: 5555,
           item: 'Basic Avocado Toast',
           price: 15.99,
           qty: 1 }
        ]
      },
    {   id: 99999,
        first_name: 'Derek',
        last_name: 'Zoolander',
        //Orders is an array of orders
        order: [
         {  order_id: 8888,
            item_name: 'Orange Mocha Frappucino!!',
            price: 8.99,
            qty: 1 },
         {  order_id: 5555,
            item: 'The Black Lung:  Burnt Biscuits',
            price: 15.99,
            qty: 1 }
         ]
    }],
  restaurant: { //if any.
    restaurant_id: 4071110873949341,
    restaurant_name: "Desy's Clam Bar",
  }
}

module.exports = example_Session;
//result of https://api.documenu.com/v2/restaurant/4072702673999819?key=YOUR KEY HERE

var mockRestaurantMenu = {
  "result": {
    "restaurant_name": "Silver Spurs",
    "restaurant_phone": "(212) 228-2333",
    "restaurant_website": "http://www.grubhub.com/nyc/silver-spurs-on-laguardia-place/",
    "hours": "Daily: 6am-11pm",
    "price_range": "$$",
    "price_range_num": 2,
    "restaurant_id": 4072702673999819,
    "cuisines": [
      "American",
      "Burgers",
      "Diner"
    ],
    "address": {
      "city": "New York",
      "state": "NY",
      "postal_code": "10012",
      "street": "490 Laguardia Pl",
      "formatted": "490 Laguardia Pl New York, NY 10012"
    },
    "geo": {
      "lat": 40.727026,
      "lon": -73.999819
    },
    "menus": [
      {
        "menu_name": "Main",
        "menu_sections": [
          {
            "section_name": "Beverages",
            "description": "",
            "menu_items": [
              {
                "name": "Regular Coffee",
                "description": "",
                "pricing": [
                  {
                    "price": 2.25,
                    "currency": "USD",
                    "priceString": "$2.25"
                  }
                ],
                "price": 2.25
              },
              {
                "name": "Regular Iced Cofee",
                "description": "",
                "pricing": [
                  {
                    "price": 3,
                    "currency": "USD",
                    "priceString": "$3.00"
                  }
                ],
                "price": 3
              },
              {
                "name": "Saratoga Water",
                "description": "",
                "pricing": [
                  {
                    "price": 3.5,
                    "currency": "USD",
                    "priceString": "$3.50"
                  },
                  {
                    "price": 5.5,
                    "currency": "USD",
                    "priceString": "$5.50"
                  }
                ],
                "price": 3.5
              }
            ]
          },
          {
            "section_name": "Catering Sides",
            "description": "",
            "menu_items": [
              {
                "name": "French Fries Tray",
                "description": "",
                "pricing": [
                  {
                    "price": 25,
                    "currency": "USD",
                    "priceString": "$25.00"
                  },
                  {
                    "price": 50,
                    "currency": "USD",
                    "priceString": "$50.00"
                  }
                ],
                "price": 25
              },
              {
                "name": "Sweet Potato Fries Tray",
                "description": "",
                "pricing": [
                  {
                    "price": 35,
                    "currency": "USD",
                    "priceString": "$35.00"
                  },
                  {
                    "price": 60,
                    "currency": "USD",
                    "priceString": "$60.00"
                  }
                ],
                "price": 35
              }
            ]
          }
        ]
      }
    ],
    "last_updated": "2021-01-05T07:47:41.631Z"
  }
}

module.exports = mockRestaurantMenu;
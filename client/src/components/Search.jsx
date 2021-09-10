import React from 'react';
const axios = require('axios');
// Commented out for now due to webpack errors
// require('dotenv').config();

class Search extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: null,
      restaurants: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
  }

  handleChange (e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }

  async getRestaurants (e) {
    e.preventDefault();
    // Code to query API once we sunset use of dummy JS file
    // const config = {
    //   method: 'get',
    //   url: `https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${this.state.searchQuery}`,
    //   headers: {
    //     'X-API-KEY': process.env.DM_API_KEY
    //   }
    // };
    // const response = await axios(config);

    // Temporary response variable while we use dummy JS file
    const response = await axios('http://localhost:8080/users/testzip');
    const restaurants = response.data.data;
    this.setState({ restaurants });
  }

  render () {
    return (
      <div>
        Search
        <form>
          <label htmlFor="searchRestaurants">Search restaurants by name:</label>
          <input type="text" inputMode="search" name="searchRestaurants" value={this.state.searchQuery} onChange={this.handleChange} />
          <input type="submit" value="Search" onClick={this.getRestaurants} />
        </form>

        <div>
          Search Results:
            <ul>
              {this.state.restaurants.map(restaurant =>
                <li key={restaurant.restaurant_id}>
                  {restaurant.restaurant_name}-
                  {restaurant.address.formatted}
                  <button>Select</button>
                </li>
              )}
            </ul>
        </div>
      </div>
    );
  }
}

export default Search;

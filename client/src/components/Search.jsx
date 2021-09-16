import React from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

// Commented out for now due to webpack errors
// require('dotenv').config();

class Search extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: '',
      restaurants: [],
      showSuggested: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.selectRestaurant = this.selectRestaurant.bind(this);
  }

  async componentDidMount () {
    // Code to query API once we sunset use of dummy JS file
    // let url;
    // const hostGeo = this.props.hostGeo;
    // hostGeo
    //   ? url = `https://api.documenu.com/v2/restaurants/search/geo?lat=${hostGeo.lat}&lon=${hostGeo.lon}&distance=5&size=10`
    //   : url = `https://api.documenu.com/v2/restaurants/zip_code/${this.props.hostZipCode}?size=10`;

    // const config = {
    //   method: 'get',
    //   url,
    //   headers: {
    //     'X-API-KEY': process.env.DM_API_KEY
    //   }
    // };
    // const response = await axios(config);

    // Temporary response variable while we use dummy JS file
    const response = await axios('http://localhost:8080/users/testGeo');
    const restaurants = response.data.data;
    this.setState({ restaurants });
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
    this.setState({
      restaurants,
      showSuggested: false
    });
  }

  async selectRestaurant (restaurant) {
    this.props.setTopLevelState('restaurant', restaurant);
    const response = await axios('http://localhost:8080/users/testgetRestaurant_1');
    const menu = response.data.result.menus[0];
    this.props.setTopLevelState('menu', menu);
  };

  render () {
    return (
      <div>
        <h2>Search</h2>
        <form>
          <label htmlFor="searchRestaurants">Search restaurants by name:</label>
          <input type="text" inputMode="search" name="searchRestaurants" value={this.state.searchQuery} onChange={this.handleChange} />
          <input type="submit" value="Search" onClick={this.getRestaurants} />
        </form>

        <div>
          {this.state.showSuggested ? 'Suggested Restaurants Nearby:' : 'Search Results:'}
            <ul>
              {this.state.restaurants.map(restaurant =>
                <li key={restaurant.restaurant_id}>
                  <span>{restaurant.restaurant_name} - {restaurant.address.formatted}</span>
                  <Link to='/add-guests' >
                    <button onClick={() => this.selectRestaurant(restaurant)}>Select</button>
                  </Link>
                </li>
              )}
            </ul>
        </div>
      </div>
    );
  }
}

export default Search;

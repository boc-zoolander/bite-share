import React from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

// Commented out for now due to webpack errors
// require('dotenv').config();

class CreateSession extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: '',
      sessionName: '',
      hostZipCode: '',
      restaurants: [],
      showSuggested: true,
      sessionNameSaved: false,
      geolocationProcessComplete: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.saveSessionName = this.saveSessionName.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.selectRestaurant = this.selectRestaurant.bind(this);
    this.createSession = this.createSession.bind(this);
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

    try {
      this.getUserLocation();
      // Temporary response variable while we use dummy JS file
      const response = await axios.get('http://localhost:8080/users/testGeo');
      const restaurants = response.data.data;
      this.setState({ restaurants });
    } catch (err) {
      console.error(err);
    }
  }

  getPosition (options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getUserLocation () {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    try {
      const pos = await this.getPosition(options);
      const hostGeo = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      this.props.setTopLevelState('hostGeo', hostGeo);
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ geolocationProcessComplete: true });
    }
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  saveSessionName (e) {
    e.preventDefault();
    this.setState({ sessionNameSaved: true });
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

    try {
      // Temporary response variable while we use dummy JS file
      const response = await axios.get('http://localhost:8080/users/testzip');
      const restaurants = response.data.data;
      this.setState({
        restaurants,
        showSuggested: false
      });
    } catch (err) {
      console.error(err);
    }
  }

  async selectRestaurant (restaurant) {
    this.props.setTopLevelState('restaurant', restaurant);
    try {
      const response = await axios.get('http://localhost:8080/users/testgetRestaurant_1');
      const menu = response.data.result.menus[0].menu_sections;
      this.props.setTopLevelState('menu', menu);
      this.createSession();
    } catch (err) {
      console.error(err);
    }
  };

  async createSession () {
    const restaurant = this.props.restaurant;
    try {
      const response = await axios.post('/users/createNewSession', null, {
        params: {
          host_id: 1,
          restaurant_name: restaurant.restaurant_name,
          restaurant_id_api: restaurant.restaurant_id,
          session_name: this.state.sessionName
        }
      });
      const sessionId = response.data[0].session_id;
      this.props.setTopLevelState('sessionId', sessionId);
      this.props.setTopLevelState('sessionName', this.state.sessionName);
    } catch (err) {
      console.error(err);
    }
  }

  render () {
    return (
      <div>
        <h2>Create Session</h2>
        <h4>Name your session and select a restaurant to get started.</h4>
          {!this.state.sessionNameSaved
            ? <form>
                <label htmlFor="sessionName">Session Name:</label>
                <input
                  id="sessionName"
                  type="text"
                  inputMode="text"
                  name="sessionName"
                  value={this.state.sessionName}
                  onChange={this.handleChange}
                  data-testid="session-name-input"
                />
                <input type="submit" value="Save" onClick={this.saveSessionName} />
              </form>

            : <div>
                <span>Session Name: {this.state.sessionName}</span>
                {!this.state.geolocationProcessComplete && <div>Loading...</div>}

                {this.state.geolocationProcessComplete &&
                  <div>
                    <form>
                      <label htmlFor="searchQuery">Restaurant Name:</label>
                      <input
                        id="searchQuery"
                        type="text"
                        inputMode="search"
                        name="searchQuery"
                        value={this.state.searchQuery}
                        onChange={this.handleChange}
                        data-testid="restaurant-search-input"
                      />

                      <label htmlFor="zipCode">Zip Code:</label>
                      {this.props.hostGeo
                        ? <input
                            id="zipCode"
                            type="number"
                            inputMode="numeric"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleChange}
                            data-testid="zip-code-input"
                          />
                        : <input
                            id="zipCode"
                            type="number"
                            inputMode="numeric"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleChange}
                            data-testid="zip-code-input"
                            required="required"
                          />
                      }
                      <input type="submit" value="Search" onClick={this.getRestaurants} />
                    </form>

                    {this.state.showSuggested ? 'Suggested Restaurants Nearby:' : 'Search Results:'}
                    <ul>
                      {this.state.restaurants.map(restaurant =>
                        <li key={restaurant.restaurant_id}>
                          <div className="restaurant__details">
                            <p className="restaurant__name">{restaurant.restaurant_name}</p>
                            <p className="restaurant__address">{restaurant.address.formatted}</p>
                          </div>
                          <Link to='/add-guests' className="button-link">
                            <button onClick={() => this.selectRestaurant(restaurant)}>Select</button>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                }
              </div>
          }
      </div>
    );
  }
}

export default CreateSession;

import React from 'react';
const axios = require('axios');

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
    this.setState({
      searchQuery
    });
  }

  async getRestaurants (e) {
    e.preventDefault();
    const response = await axios('http://localhost:8080/users/testzip');
    const restaurants = response.data.data;
    this.setState({ restaurants });
  }

  render () {
    return (
      <div>
        Search
        <form>
          <label>Search restaurants by name:</label>
          <input type="text" inputMode="search" value={this.state.searchQuery} onChange={this.handleChange} />
          <input type="submit" value="Search" onClick={this.getRestaurants} />
        </form>
      </div>
    );
  }
}

export default Search;

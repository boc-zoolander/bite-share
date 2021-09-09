import React from 'react';

class Search extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const searchQuery = e.target.value;

    this.setState({
      searchQuery
    });
  }

  render () {
    return (
      <div>
        Search
        <form>
          <label>Search restaurants by name:</label>
          <input type="text" value={this.state.searchQuery} onChange={this.handleChange} />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default Search;

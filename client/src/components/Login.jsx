import React from 'react';
import Search from './Search.jsx';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: null,
      zipCode: null,
      // Temporary state to show Search component until routing is implemented
      showSearch: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleSubmit (e) {
    e.preventDefault();
    // Temporary setState to show Search component until routing is implemented
    this.setState({ showSearch: true });
  }

  render () {
    return (
      // Temporary ternary expression to show Search component until routing is implemented
      this.state.showSearch
        ? <Search />
        : <div>
            Login
            <form>
              <label>Host Name:</label>
              <input type="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />

              <label>Zip Code:</label>
              <input type="text" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />

              <input type="submit" value="Next" onClick={this.handlesubmit} />
            </form>
          </div>
    );
  }
};

export default Login;

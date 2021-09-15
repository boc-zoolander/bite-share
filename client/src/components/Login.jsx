import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: null,
      zipCode: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveHost = this.saveHost.bind(this);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  saveHost () {
    const hostDetails = {
      id: 0,
      guestName: this.state.hostName,
      order: []
    };
    this.props.setTopLevelState('guests', [hostDetails]);
    this.props.setTopLevelState('zipCode', this.state.zipCode);
  }

  render () {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <label htmlFor="hostName">Host Name:</label>
          <input type="text" inputMode="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />

          <label htmlFor="zipCode">Zip Code:</label>
          <input type="number" inputMode="numeric" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />

          <Link to="/find-restaurant" onClick={this.saveHost}>
            <input type="submit" value="Next" />
          </Link>
        </form>
      </div>
    );
  }
};

export default Login;

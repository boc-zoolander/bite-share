import React from 'react';
import { Link } from 'react-router-dom';

class LoggedIn extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: '',
      zipCode: '',
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
  }

  render () {
    let username = `${this.props.host_first_name} ${this.props.host_last_name}`;
    return (
      <div>
        <h2>Welcome {username} </h2>
        <form>
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

export default LoggedIn;

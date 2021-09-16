import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: '',
      zipCode: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleSubmit () {
    const hostDetails = {
      id: 0,
      guestName: this.state.hostName,
      order: []
    };
    this.props.setTopLevelState('guests', [hostDetails]);
  }

  render () {
    return (
      <div>
        <h2>Bite Share</h2>
        <form>
          <label htmlFor="hostName">Host Name:</label>
          <input type="text" inputMode="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />

          <label htmlFor="zipCode">Zip Code:</label>
          <input type="number" inputMode="numeric" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />

          <Link to="/find-restaurant" onClick={this.handleSubmit}>
            <button type="button">Start Session</button>
          </Link>
        </form>
      </div>
    );
  }
};

export default Login;

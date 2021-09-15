import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: null,
      zipCode: null,
      hostNameError: false,
      zipCodeError: false,
      formIsValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkFormCompletion = this.checkFormCompletion.bind(this);
    this.saveHost = this.saveHost.bind(this);
  }

  componentDidMount () {
    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    };

    const success = (pos) => {
      const hostLatLon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      this.props.setTopLevelState('hostLatLon', hostLatLon);
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  checkFormCompletion () {
    if (!this.state.hostName) {
      this.setState({ hostNameError: true });
    } else {
      this.setState({ hostNameError: false });
    }

    if (!this.props.hostLatLon && !this.state.zipCode) {
      this.setState({ zipCodeError: true });
    } else {
      this.setState({ zipCodeError: false });
    }

    if (this.state.hostName && (this.props.hostLatLon || this.state.zipCode)) {
      this.setState({ hostNameError: false });
      this.setState({ zipCodeError: false });
      this.saveHost();
    }
  }

  saveHost () {
    const hostDetails = {
      id: 0,
      guestName: this.state.hostName,
      order: []
    };

    if (this.state.zipCode) {
      this.props.setTopLevelState('hostZipCode', this.state.zipCode);
    }

    this.props.setTopLevelState('guests', [hostDetails]);
    this.setState({ formIsValid: true });
  }

  render () {
    if (this.state.formIsValid) {
      return <Redirect to='/find-restaurant' />;
    }

    return (
      <div>
        <h2>Login</h2>
        <form>
          <label htmlFor="hostName">Host Name:</label>
          <input type="text" inputMode="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />
          {this.state.hostNameError && <p className="error">Host Name is required.</p>}

          <label htmlFor="zipCode">Zip Code:</label>
          <input type="number" inputMode="numeric" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
          {this.state.zipCodeError && <p className="error">Zip Code is required.</p>}
        </form>

        <button type="button" onClick={this.checkFormCompletion}>Next</button>
      </div>
    );
  }
};

export default Login;

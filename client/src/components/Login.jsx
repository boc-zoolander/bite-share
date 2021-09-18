import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: '',
      zipCode: '',
      hostNameError: false,
      zipCodeError: false,
      formIsValid: false,
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormCompletion = this.checkFormCompletion.bind(this);
    this.saveHost = this.saveHost.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  validateUser (e) {
    e.preventDefault();
    const validationPath = `http://localhost:8080/users/login?hostname=${this.state.hostName}&password=${this.state.password}`;
    axios.get(validationPath)
      .then(res => {
        // user successfully logged & need to setstate of the user id to the returned id 
        // console.log('logged in: ', res.data[0]);
        const hostDetails = {
          id: res.data[0].user_id,
          guestName: `${res.data[0].first_name} ${res.data[0].last_name}`,
          order: []
        };
        this.props.setTopLevelState('guests', [hostDetails]);
        this.props.setTopLevelState('isLoggedIn', true);
      })
      .catch(err => {
        console.log('failure', err);
      });
  }

  componentDidMount () {
    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    };

    const success = (pos) => {
      const hostGeo = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      this.props.setTopLevelState('hostGeo', hostGeo);
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

  handleSubmit () {
    if (!this.state.hostName) {
      this.setState({ hostNameError: true });
    } else {
      this.setState({ hostNameError: false });
    }

    if (!this.props.hostGeo && !this.state.zipCode) {
      this.setState({ zipCodeError: true });
    } else {
      this.setState({ zipCodeError: false });
    }

    if (this.state.hostName && (this.props.hostGeo || this.state.zipCode)) {
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
      return <Redirect to='/session' />;
    }

    if (this.props.isLoggedIn) {
      return <Redirect to='/user-logged-in' />;
    }

    return (
      <div>
        <h2>Bite Share</h2>
        <form>

          <label htmlFor="hostName">User Name:</label>
          <input type="text" inputMode="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="text" inputMode="text" name="password" value={this.state.password} onChange={this.handleChange} />
          <button onClick={this.validateUser}>Login</button>
          <Link to="/register-new-user">
            <p>New to Bite Share?  Register Here!</p>
          </Link>

          {/* <label htmlFor="hostName">Host Name:</label>
          <input type="text" inputMode="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} /> */}
          {/* {this.state.hostNameError && <p className="error">Host Name is required.</p>}
          <label htmlFor="zipCode">Zip Code:</label>
          <input type="number" inputMode="numeric" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
          {this.state.zipCodeError && <p className="error">Zip Code is required.</p>}
          <button type="button" onClick={this.checkFormCompletion}>Next</button> */}
          {/* <button type="button">Start Session</button> */}
        </form>

      </div>
    );
  }
};

export default Login;

import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hostName: '',
      password: '',
      loginFailure: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  validateUser(e) {
    e.preventDefault();
    const validationPath = `http://localhost:8080/users/login?hostname=${this.state.hostName}&password=${this.state.password}`;
    axios.get(validationPath)
      .then(res => {

        const hostDetails = {
          id: res.data[0].user_id,
          guestName: `${res.data[0].first_name} ${res.data[0].last_name}`,
          email: res.data[0].email,
          order: []
        };
        this.props.setTopLevelState('guests', [hostDetails]);
        this.props.setTopLevelState('isLoggedIn', true);
      })
      .catch(err => {

        this.setState({ loginFailure: true });
      });
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/session' />;
    }

    let loginFailureMessage = <p id="login-failure">  Login Failure: your credentials could not be validated </p>;

    if (!this.state.loginFailure) {
      loginFailureMessage = <br></br>;
    }

    return (
      <div>
        <h2>Bite Share</h2>
        <form>
          <label htmlFor="hostName" id="email-label">User Name:</label>
          <input aria-labelledby="email-label" type="text" inputMode="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />
          <label htmlFor="password" id="password-label">Password:</label>
          <input aria-labelledby="password-label" type="password" inputMode="text" name="password" value={this.state.password} onChange={this.handleChange} />
          <button onClick={this.validateUser}>Login</button>
          <Link to="/register-new-user">
            <p>New to Bite Share?  Register Here!</p>
          </Link>
        </form>
        {loginFailureMessage}
      </div>
    );
  }
};

export default Login;

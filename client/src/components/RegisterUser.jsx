import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegisterUser extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.registerNewUser = this.registerNewUser.bind(this);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  registerNewUser (e) {
    const validationPath = `http://localhost:8080/users/createNewUser?first_name=${this.state.first_name}\
                            &last_name=${this.state.last_name}&email=${this.state.email}&password=${this.state.password}`;
    console.log('path:', validationPath);
    axios.get(validationPath)
      .then(res => {
        console.log(`new user registered with these data: ${this.state.first_name},  ${this.state.last_name},  ${this.state.email},  ${this.state.password}`);
      })
      .catch(err => {
        console.log('user registration failed: ', err);
      });
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
    return (
      <div>
        <h2>Register a new User</h2>
        <form>

          <label htmlFor="first_name">New First Name:</label>
          <input type="text" inputMode="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />

          <label htmlFor="last_name">New Last Name</label>
          <input type="text" inputMode="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />

          <label htmlFor="email">New email</label>
          <input type="text" inputMode="text" name="email" value={this.state.email} onChange={this.handleChange} />

          <label htmlFor="password">New password:</label>
          <input type="text" inputMode="text" name="password" value={this.state.password} onChange={this.handleChange} />


          <button onClick={this.registerNewUser}>
            Register
          </button>

        </form>
      </div>
    );
  }
};

export default RegisterUser;

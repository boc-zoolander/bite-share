import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from 'react-router-dom';
import Search from './Search.jsx';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hostName: null,
      zipCode: null,
      showSearch: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({
      showSearch: true
    });
  }

  render () {
    return (
    // <Router>
    //   <Switch>
    //     <Route path="/search">
    //       <Search />
    //     </Route>

    //     <Route path="/">
      this.state.showSearch
        ? <Search />
        : <div>
            Login
            <form>
              <label>Host Name:</label>
              <input type="text" name="hostName" value={this.state.hostName} onChange={this.handleChange} />

              <label>Zip Code:</label>
              <input type="text" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />

              {/* <Link to="/search"> */}
              <input type="submit" value="Next" onClick={this.handlesubmit} />
            </form>
          </div>
    // {/* <button>Next</button> */}
    //           {/* </Link>
    //         </form>
    //       </div>
    //     </Route>
    //   </Switch>
    // </Router> */}
    );
  }
};

export default Login;

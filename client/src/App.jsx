import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      restaurant: {},
      menu: [],
      guests: [],
      totalCost: 0,
      sessionComplete: false,
      splitMechanism: ''
    };
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path="/find-restaurant">
            <Search />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

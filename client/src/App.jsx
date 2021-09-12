import React from 'react';
import AddGuests from './components/AddGuests.jsx';
import SelectFood from './components/SelectFood.jsx';
// Example menu data
import Menu from '../../server/user_db_routes/testgetrestaurant_1.js';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      restaurant: {},
      menu: Menu.result.menus[0],
      guests: [],
      totalCost: 0,
      sessionComplete: false,
      splitMechanism: '',
      host: { name: 'host', order: [] }
    };
    this.setTopLevelState = this.setTopLevelState.bind(this);
  }

  setTopLevelState (name, value) {
    this.setState({ [name]: value });
  }

  render () {
    return (
      <div>
      <Router>
        <Switch>
          <Route path="/find-restaurant">
            <Search setTopLevelState={this.setTopLevelState} />
          </Route>
          <Route path="/add-guests">
            <AddGuests setTopLevelState={this.setTopLevelState} guests={this.state.guests} />
          </Route>
          <Route path="/select-food">
            <SelectFood setTopLevelState={this.setTopLevelState} guests={this.state.guests} menu={this.state.menu} />
          </Route>
          <Route path="/">
            <Login setTopLevelState={this.setTopLevelState} />
          </Route>
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;

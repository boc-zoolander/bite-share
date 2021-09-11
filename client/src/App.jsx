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
      page: 'add',
      host: { name: 'host', order: [] }
    };
    this.addGuest = this.addGuest.bind(this);
    this.deleteGuest = this.deleteGuest.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  addGuest (guestName) {
    const guestArray = [...this.state.guests];
    if (guestArray.find(element => element.guestName === guestName)) {
      alert('This guest is already present in your list.');
      return;
    }
    guestArray.push({ guestName, order: [] });
    this.setState({
      guests: guestArray
    });
  }

  deleteGuest (guestName) {
    const guestArray = [...this.state.guests];
    const updated = guestArray.filter(guest => guest.guestName !== guestName);
    this.setState({ guests: updated });
  }

  addToOrder (guestName, item) {
    const guestArray = [...this.state.guests];
    for (let i = 0; i < guestArray.length; i++) {
      if (guestArray[i].guestName === guestName) {
        guestArray[i].order.push(item);
        this.setState({
          guests: guestArray
        });
        return;
      }
    }

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
          <Route path="/">
            <Login setTopLevelState={this.setTopLevelState} />
          </Route>
        </Switch>
      </Router>
      Bite Share Nom Nom
      <AddGuests addGuest={this.addGuest} guests={this.state.guests} deleteGuest={this.deleteGuest} />
      <SelectFood guests={this.state.guests} host={this.state.host} menu={this.state.menu} addToOrder={this.addToOrder}/>
    </div>
    );
  }
}

export default App;

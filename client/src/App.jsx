import React from 'react';
import AddGuests from './components/AddGuests.jsx';
// import SelectGuest from './components/SelectGuest.jsx';
import SelectFood from './components/SelectFood.jsx';
import _ from 'lodash';
import Menu from '../../server/user_db_routes/testgetrestaurant_1.js';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

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
    this.changeGuestPage = this.changeGuestPage.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  addGuest (guestName) {
    const guestArray = [...this.state.guests];
    let guestExists = false;
    guestArray.forEach(guestObj => {
      if (guestObj.guestName === guestName) {
        guestExists = true;
      }
    });
    if (!guestExists) {
      guestArray.push({ guestName, order: [] });
      this.setState({
        guests: guestArray
      });
    } else {
      alert('This guest is already present in your list.');
    }
  }

  deleteGuest (guestName) {
    const guestArray = [...this.state.guests];
    const updated = _.remove(guestArray, (obj) => {
      return obj.guestName !== guestName;
    });
    this.setState({ guests: updated });
  }

  addToOrder (guestName, item) {
    // loop over guests property
    let guestArray = [...this.state.guests];
    // iterate over guestorders array
    for (let i = 0; i < guestArray.length; i++) {
      // if current name equals guestName from function
      if (guestArray[i].guestName === guestName) {
        // set guestsOrder array to input order
        guestArray[i].order.push(item);
        // setState with guestOrders
        this.setState({
          guests: guestArray
        }, () => { console.log('this is the guest state after order: ', this.state.guests); });
        // return
        return;
      }
    }
  }

  // ADDING A TEMPORARY EVENT HANDLER TO CHANGE PAGE
  changeGuestPage (page) {
    this.setState({ page });
  }

  render () {
    return (
      <div>

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      Bite Share Nom Nom
      <AddGuests addGuest={this.addGuest} guests={this.state.guests} changeGuestPage={this.changeGuestPage} deleteGuest={this.deleteGuest} />
      <SelectFood guests={this.state.guests} host={this.state.host} menu={this.state.menu} addToOrder={this.addToOrder}/>
    </div>
    );
  }
}

const Home = () => {
  return <h2>Home</h2>;
};

const About = () => {
  return <h2>About</h2>;
};

const Users = () => {
  return <h2>Users</h2>;
};

export default App;

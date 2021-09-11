import React from 'react';
import AddGuests from './components/AddGuests.jsx';
import SelectFood from './components/SelectFood.jsx';
import BillSummaryPage from './components/billSummaryPage.jsx';
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
      splitMechanism: '',
      host: { name: 'host', order: [] }
    };
    this.addGuest = this.addGuest.bind(this);
    this.deleteGuest = this.deleteGuest.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.setTopLevelState = this.setTopLevelState.bind(this);
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
            <AddGuests setTopLevelState={this.setTopLevelState} addGuest={this.addGuest} guests={this.state.guests} deleteGuest={this.deleteGuest} />
          </Route>
          <Route path="/select-food">
            <SelectFood setTopLevelState={this.setTopLevelState} guests={this.state.guests} host={this.state.host} menu={this.state.menu} addToOrder={this.addToOrder}/>
          </Route>
          <Route path="/split-bill">
            <BillSummaryPage setTopLevelState={this.setTopLevelState} guests={this.state.guests} />
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

import React from 'react';
import AddGuests from './components/AddGuests.jsx';
import SelectFood from './components/SelectFood.jsx';
import BillSummaryPage from './components/BillSummaryPage.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';
import Join from './components/Join.jsx';
import GuestMenu from './components/GuestMenu.jsx';
import HostMenu from './components/HostMenu.jsx';
import Session from './components/Session.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      restaurant: {},
      menu: [],
      guests: [],
      joinName: '',
      totalCost: 0,
      sessionComplete: false,
      splitMechanism: '',
      hostZipCode: null,
      hostGeo: null
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
          <Route path="/add-guests">
            <AddGuests setTopLevelState={this.setTopLevelState} guests={this.state.guests} />
          </Route>
          <Route path="/find-restaurant">
            <Search setTopLevelState={this.setTopLevelState} hostGeo={this.state.hostGeo} hostZipCode={this.state.hostZipCode} />
          </Route>
          <Route path="/guest-menu">
            <GuestMenu joinName={this.state.joinName}/>
          </Route>
          <Route path="/join">
            <Join setTopLevelState={this.setTopLevelState}/>
          </Route>
          <Route path="/host-menu">
            <HostMenu setTopLevelState={this.setTopLevelState} guests={this.state.guests} menu={this.state.menu} />
          </Route>
          <Route path="/select-food">
            <SelectFood setTopLevelState={this.setTopLevelState} guests={this.state.guests} menu={this.state.menu} />
          </Route>
          <Route path="/session">
            <Session setTopLevelState={this.setTopLevelState} />
          </Route>
          <Route path="/split-bill">
            <BillSummaryPage setTopLevelState={this.setTopLevelState} guests={this.state.guests} zipCode= {this.state.restaurantZipCode} />
          </Route>
          <Route path="/">
            <Login setTopLevelState={this.setTopLevelState} hostGeo={this.state.hostGeo} />
          </Route>
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;

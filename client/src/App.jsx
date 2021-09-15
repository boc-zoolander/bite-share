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
      hostZipCode: null,
      hostLatLon: null
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
          <Route path="/split-bill">
            <BillSummaryPage setTopLevelState={this.setTopLevelState} guests={this.state.guests} />
          </Route>
          <Route path="/">
            <Login setTopLevelState={this.setTopLevelState} hostLatLon={this.state.hostLatLon} />
          </Route>
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;

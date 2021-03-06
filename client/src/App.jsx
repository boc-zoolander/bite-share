import React from 'react';
import BillSummaryPage from './components/BillSummaryPage.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import CreateSession from './components/CreateSession.jsx';
import GuestMenu from './components/GuestMenu.jsx';
import HostMenu from './components/HostMenu.jsx';
import RegisterUser from './components/RegisterUser.jsx';
import Session from './components/Session.jsx';
import PayBill from './components/PayBill.jsx';
import InviteGuests from './components/InviteGuests.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: {},
      menu: [],
      guests: [],
      joinName: '',
      totalCost: 0,
      sessionId: null,
      sessionName: '',
      sessionComplete: false,
      finalTotals: {
        paymentsOwed: {},
        preliminaryTotal: 0.00,
        tipAmount: 0.00,
        tax: 0.00,
        finalTotal: 0.00
      },
      hostZipCode: null,
      hostGeo: null,
      isLoggedIn: false
    };

    this.setTopLevelState = this.setTopLevelState.bind(this);
  }

  setTopLevelState(name, value) {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/register-new-user">
              <RegisterUser setTopLevelState={this.setTopLevelState} isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <Route path="/find-restaurant">
              <CreateSession setTopLevelState={this.setTopLevelState} hostGeo={this.state.hostGeo} hostZipCode={this.state.hostZipCode} restaurant={this.state.restaurant} guests={this.state.guests} />
            </Route>
            <Route path="/add-guests">
              <InviteGuests sessionId={this.state.sessionId} />
            </Route>
            <Route path="/guest-menu">
              <GuestMenu joinName={this.state.joinName} sessionId={this.state.sessionId} guests={this.state.guests} menu={this.state.menu} />
            </Route>
            <Route path="/host-menu">
              <HostMenu setTopLevelState={this.setTopLevelState} guests={this.state.guests} menu={this.state.menu} sessionId={this.state.sessionId} />
            </Route>
            <Route path="/session">
              <Session setTopLevelState={this.setTopLevelState} />
            </Route>
            <Route path="/split-bill">
              <BillSummaryPage setTopLevelState={this.setTopLevelState} guests={this.state.guests} restaurantInfo={this.state.restaurant} finalTotals={this.state.finalTotals} />
            </Route>
            <Route path="/pay-bill">
              <PayBill finalTotals={this.state.finalTotals} guests={this.state.guests} />
            </Route>
            <Route exact path="/">
              <Login setTopLevelState={this.setTopLevelState} isLoggedIn={this.state.isLoggedIn} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

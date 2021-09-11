import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';
import BillSummaryPage from './components/billSummaryPage.jsx';

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

    this.setTopLevelState = this.setTopLevelState.bind(this);
  }

  setTopLevelState (name, value) {
    this.setState({ [name]: value });
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path="/find-restaurant">
            <Search setTopLevelState={this.setTopLevelState} />
          </Route>
          <Route path="/">
            <Login setTopLevelState={this.setTopLevelState} />
          </Route>
        </Switch>
        <BillSummaryPage />
      </Router>
    );
  }
}

export default App;

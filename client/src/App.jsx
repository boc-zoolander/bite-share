import React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Example from './components/Example.jsx';

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
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <Link to="/example">
            <button type="button">Example</button>
          </Link>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/example">
              <Example number = {this.state.guests.length} />
            </Route>
            <Route exact path="/">
              <h2>Home</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

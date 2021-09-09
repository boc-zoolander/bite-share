import React from 'react';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <div>
        Bite Share Nom Nom
        <Login />
      </div>
    );
  }
}

export default App;

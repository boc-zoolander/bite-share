import React from 'react';
import AddGuests from './components/AddGuests.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      guests: []
    };
    this.addGuest = this.addGuest.bind(this);
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

  render () {
    return (
      <div>
        Bite Share Nom Nom
        <AddGuests addGuest={this.addGuest} guests={this.state.guests} />
      </div>
    );
  }
}

export default App;

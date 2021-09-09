import React from 'react';
import AddGuests from './components/AddGuests.jsx';
import SelectGuest from './components/SelectGuest.jsx';
import Menu from './components/Menu.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      guests: [],
      page: 'add'
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

  // ADDING A TEMPORARY EVENT HANDLER TO CHANGE PAGE
  changeGuestPage (page) {

  }

  render () {
    return (
      <div>
        Bite Share Nom Nom
        {this.state.page === 'add' ? <AddGuests addGuest={this.addGuest} guests={this.state.guests} /> :
                  this.state.page === 'selectGuest' ? <}
      </div>
    );
  }
}

export default App;

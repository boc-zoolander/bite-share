import React from 'react';
import AddGuests from './components/AddGuests.jsx';
import SelectGuest from './components/SelectGuest.jsx';
import Menu from './components/Menu.jsx';
import _ from 'lodash';

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
      page: 'add'
    };
    this.addGuest = this.addGuest.bind(this);
    this.deleteGuest = this.deleteGuest.bind(this);
    this.changeGuestPage = this.changeGuestPage.bind(this);
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

  // ADDING A TEMPORARY EVENT HANDLER TO CHANGE PAGE
  changeGuestPage (page) {
    this.setState({ page });
  }

  render () {
    return (
      <div>
        Bite Share Nom Nom
        {this.state.page === 'add' ? <AddGuests addGuest={this.addGuest} guests={this.state.guests} changeGuestPage={this.changeGuestPage} deleteGuest={this.deleteGuest} /> : this.state.page === 'selectGuest' ? <SelectGuest /> : this.state.page === 'menu' ? <Menu /> : ''}
      </div>
    );
  }
}

export default App;

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

  addGuest(guestName) {
    console.log('this is name passed ', guestName);
    const guestArray = [...this.state.guests];
    guestArray.push(guestName);
    console.log('thsi is the guestArray after Push: ', guestArray);
    this.setState({
      guests: guestArray
    }, () => {console.log('Guest name lifted state', this.state.guests)});

  }

  render () {
    return (
      <div>
        Bite Share Nom Nom
        <AddGuests addGuest={this.addGuest}/>
      </div>
    );
  }
}

export default App;

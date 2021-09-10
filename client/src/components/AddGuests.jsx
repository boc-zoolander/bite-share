import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GuestList from './GuestList.jsx';

const AddGuests = ({ addGuest, guests, changeGuestPage, deleteGuest }) => {
  const [name, setName] = useState('');

  // handleChange
  const onChange = (event) => {
    setName(event.target.value);
  };

  // handle submit to add guest to list
  const onSubmit = (event) => {
    if (!name) {
      alert('Please enter a guest name');
      return;
    }
    // passed down function
    addGuest(name);
    setName('');
    event.preventDefault();
  };

  const changePage = (event) => {
    if (guests.length === 0) {
      alert('Please add a guest');
      return;
    }
    changeGuestPage('selectGuest');
    event.preventDefault();
  };

  return (
    <div>
      <h3> Create your guest list </h3>
      <p> Type the names of your guests below and press the plus icon to add them to the guest list. </p>
      <form onSubmit={onSubmit}>
        <label htmlFor='guest' > Add Guests </label>
        <input name='guest' type='text' value={name} onChange={onChange}/>
        <input type='submit' value='Submit'/>
      </form>
      <GuestList guests={guests} deleteGuest={deleteGuest} />
      <button type='button' onClick={changePage}> Next Page </button>
    </div>
  );
};

AddGuests.propTypes = {
  addGuest: PropTypes.func.isRequired,
  guests: PropTypes.array.isRequired,
  changeGuestPage: PropTypes.func.isRequired,
  deleteGuest: PropTypes.func.isRequired
};

export default AddGuests;
// Adding guests to a session

// Description:
// As a host, I want to add guests to my session, so I can track what everyone orders.

// Acceptance Criteria:
// - Should be a field allowing text
// - Should be an 'add' button.
// - Should add guest to guest list upon filled field and pressed button
// - Should do nothing if field is empty and button is pressed
// - Should have a button to take user to guest selection page (to add menu items for that guest)
// - Should alert user if next page button is pressed but no guests have been added.
// - (Stretch Goal?) Should start a timer for X minutes to allow user to add

// bottom of page "next" button

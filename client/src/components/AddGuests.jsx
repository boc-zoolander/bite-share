import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GuestList from './GuestList.jsx';

const AddGuests = ({ addGuest, guests }) => {
  const [name, setName] = useState('');

  // handleChange
  const onChange = (event) => {
    setName(event.target.value);
  };

  // hanldeSubmit
  const onSubmit = (event) => {
    // passed down function
    addGuest(name);
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit = {onSubmit}>
        <label> Add Guests </label>
        <input type="text" value={name} onChange={onChange}/>
        <input type="submit" value="Submit"/>
      </form>
      <GuestList guests={guests}/>
    </div>
  );
};

AddGuests.propTypes = {
  addGuest: PropTypes.func.isRequired,
  guests: PropTypes.array.isRequired
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
// - (Stretch Goal?) Should start a timer for X minutes to allow user to add

// Should be stateful

// need a title for the page
// instructions for the user
// text entry form + button to submit the guest
// render guest list

// bottom of page "next" button

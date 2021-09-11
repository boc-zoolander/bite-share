import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GuestList from './GuestList.jsx';

const AddGuests = ({ addGuest, guests, changeGuestPage, deleteGuest }) => {
  const [name, setName] = useState('');

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    if (!name) {
      alert('Please enter a guest name');
      return;
    }
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

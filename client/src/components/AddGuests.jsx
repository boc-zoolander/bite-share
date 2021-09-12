import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GuestList from './GuestList.jsx';

const AddGuests = ({ setTopLevelState, guests, deleteGuest }) => {
  const [name, setName] = useState('');

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    if (!name) {
      alert('Please enter a guest name');
      return;
    }
    const guestArray = [...guests];
    if (guestArray.find(element => element.guestName === name)) {
      alert('This guest is already present in your list.');
      return;
    }
    guestArray.push({ guestName: name, order: [] });
    setTopLevelState('guests', guestArray);
    setName('');
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
      <GuestList guests={guests} setTopLevelState={setTopLevelState} />
      <Link to='/select-food' >
        <button type='button'> Next Page </button>
      </Link>
    </div>
  );
};

AddGuests.propTypes = {
  setTopLevelState: PropTypes.func.isRequired,
  guests: PropTypes.array.isRequired
};

export default AddGuests;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GuestList from './GuestList.jsx';

const AddGuests = ({ setTopLevelState, guests, deleteGuest }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    const guestArray = [...guests];

    if (!name) {
      setNameError('Please enter a guest name.');
    } else if (guestArray.find(element => element.guestName === name)) {
      setNameError('This guest is already present in your list.');
    } else {
      guestArray.push({ guestName: name, order: [] });
      setTopLevelState('guests', guestArray);
      setName('');
      setNameError('');
    }

    event.preventDefault();
  };

  return (
    <div>
      <h2>Create your guest list</h2>
      <p>Type the names of your guests below and press the plus icon to add them to the guest list.</p>
      <form onSubmit={onSubmit}>
        <label htmlFor='guest' > Add Guests </label>
        <input name='guest' type='text' value={name} onChange={onChange}/>
        {nameError && <p className='error'>{nameError}</p>}
        <input type='submit' value='Submit'/>
      </form>
      <GuestList guests={guests} setTopLevelState={setTopLevelState} />
      <Link to='/host-menu' >
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

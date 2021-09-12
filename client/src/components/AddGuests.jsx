import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GuestList from './GuestList.jsx';

const AddGuests = ({ setTopLevelState, guests, changeGuestPage, deleteGuest }) => {
  const [name, setName] = useState('');

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    if (!name) {
      alert('Please enter a guest name');
      return;
    }
    // addGuest(name);
    // store prop guests array in local var
    const guestArray = [...guests];
    // if hook name is present in any of the guests object
    if (guestArray.find(element => element.guestName === name)) {
      //    throw some kind of error
      alert('This guest is already present in your list.');
      //    return
      return;
    }
    // construct new guest object
    // push new guest object to  local var
    guestArray.push({ guestName: name, order: [] });
    // call setTopState to reset guests with local var
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
      <GuestList guests={guests} deleteGuest={deleteGuest} />
      <Link to='/select-food' >
        <button type='button'> Next Page </button>
      </Link>
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

import React from 'react';
import PropTypes from 'prop-types';

const GuestList = ({ guests, deleteGuest }) => {
  const deleteName = (name) => {
    deleteGuest(name);
    event.preventDefault();
  };

  const list = guests.map((item, i) => {
    return (
      <li key={i}>
        <span>{item.guestName}</span>
        <input type='submit' value='Delete' onClick={() => deleteName(item.guestName)} />
      </li>
    );
  });
  return (
    <ul>
      {list}
    </ul>
  );
};

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  deleteGuest: PropTypes.func.isRequired
};

export default GuestList;

import React from 'react';
import PropTypes from 'prop-types';

const GuestList = ({ guests, setTopLevelState }) => {
  const deleteName = (name) => {
    const guestArray = [...guests];
    const updated = guestArray.filter(guest => guest.guestName !== name);
    setTopLevelState('guests', updated);
    event.preventDefault();
  };

  const list = guests.map((item, i) => {
    return (
      <li className="guest-list__guest" key={i}>
        <span className="guest__name">{item.guestName}</span>
        <button type='button' onClick={() => deleteName(item.guestName)}>Delete</button>
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
  setTopLevelState: PropTypes.func.isRequired
};

export default GuestList;

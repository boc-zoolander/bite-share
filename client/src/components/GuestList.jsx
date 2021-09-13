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
  setTopLevelState: PropTypes.func.isRequired
};

export default GuestList;

import React from 'react';
import PropTypes from 'prop-types';

const GuestList = ({ guests, deleteGuest }) => {
  const deleteName = (name) => {
    deleteGuest(name);
    event.preventDefault();
  };

  const list = guests.map((item, i) => {
    return (
      <tr key={i}>
        <th>
        {item.guestName}
        <input type='submit' value='Delete' onClick={() => deleteName(item.guestName)} />
        </th>
      </tr>
    );
  });
  return (
    <table>
      {list}
    </table>
  );
};

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  deleteGuest: PropTypes.func.isRequired
};

export default GuestList;

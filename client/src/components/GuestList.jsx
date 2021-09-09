import React from 'react';
import PropTypes from 'prop-types';

// stateless component to be included in AddGuests
// pass in  props/context from App.
// create variable to store props/context with guest objects
// map variable to li items or tr/td

const GuestList = ({ guests, deleteGuest }) => {
  const deleteName = (name) => {
    deleteGuest(name);
    event.preventDefault();
  };

  const list = guests.map((item, i) => {
    return (
      <div key={i}>
        {item.guestName}
        <input type='submit' value='Delete' onClick={() => deleteName(item.guestName)} />
      </div>
      // <tr key={i}>
      //   <th>
      //   {item.guestName}
      //   </th>
      // </tr>
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

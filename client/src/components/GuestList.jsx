import React from 'react';
import PropTypes from 'prop-types';

// stateless component to be included in AddGuests
// pass in  props/context from App.
// create variable to store props/context with guest objects
// map variable to li items or tr/td

const GuestList = ({ guests }) => {
  const list = guests.map((item, i) => {
    return (<tr key={i}>
      <th>
        {item.guestName}
      </th>
    </tr>);
  });
  return (
    <table>
      {list}
    </table>
  );
};

GuestList.propTypes = {
  guests: PropTypes.object.isRequired
};

export default GuestList;

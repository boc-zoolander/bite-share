import React from 'react';

const IndividualOwes = (props) => {
  return (
    <li className = 'guestListRow'>
      {props.guestName}    ${props.paymentOwed}
    </li>
  );
};

export default IndividualOwes;

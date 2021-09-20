import React from 'react';

const IndividualOwes = (props) => {
  return (
    <li className = 'guestListRow'>
      {props.guestName}    ${props.paymentOwed || 'Loading ...'}
    </li>
  );
};

export default IndividualOwes;

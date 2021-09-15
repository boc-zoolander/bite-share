import React from 'react';

const IndividualOwes = (props) => {
  return (
    <li className = 'guestListRow'>
      {props.firstName} {props.lastName}    ${props.paymentOwed.toFixed(2)}
    </li>
  );
};

export default IndividualOwes;

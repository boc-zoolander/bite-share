import React from 'react';

const IndividualOwes = (props) => {
  return (
    <li className = 'guestListRow'>
      {props.first_name} {props.last_name}    {props.paymentOwed}
    </li>
  );
};

export default IndividualOwes;

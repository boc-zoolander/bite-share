import React from 'react';

const IndividualOwes = (props) => {
  // console.log(props);
  return (
    <li className = 'guestListRow'>
      {props.firstName} {props.lastName}    {props.paymentOwed}
    </li>
  );
};

export default IndividualOwes;

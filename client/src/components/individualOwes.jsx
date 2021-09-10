import React from 'react';

const IndividualOwes = (props) => {
  return (
    <div className = 'guestListRow'>
      {props.first_name} {props.last_name}    {props.paymentOwed}
    </div>
  );
};

export default IndividualOwes;

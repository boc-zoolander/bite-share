import React from 'react';

const IndividualOwes = (props) => {
  console.log(props);
  return (
    <div className = 'guestListRow'>
      {props.first_name} {props.last_name}    {props.paymentOwed}
    </div>
  );
};

export default IndividualOwes;

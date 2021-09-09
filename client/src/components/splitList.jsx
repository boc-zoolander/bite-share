import React from 'react';
import individualOwes from './individualOwes.jsx'

const splitList = (props) => {
  const numberOfGuests = props.guests.length;
  const billTotal = props.totalCost;

  if (props.split === 'byItem') {
    let paymentOwed = "????"
  } else {
    let paymentOwed = (billTotal/numberOfGuests).toFixed(2); //cut to two decimal places
  }
  return (
  <div>
    {props.split === 'byItem'
     ? {props.guests.map(guest =>
         <individualOwes key = {guest.guest_id} firstName = {guest.first_name} lastName = {guest.last_name}  />
       }
     : <individualOwes />
    }
  </div>
  )
};

export default splitList;


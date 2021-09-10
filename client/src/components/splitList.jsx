import React from 'react';
import IndividualOwes from './IndividualOwes.jsx';

const SplitList = (props) => {
  console.log(props);
  const numberOfGuests = props.guests.length;
  const billTotal = props.totalCost;

  let paymentOwed;

  const getGuestTotal = (guestArray) => {
    let total = 0;
    for (let i = 0; i <= guestArray.length; i++) {
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j <= currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = currentGuestOrders[j].qty;
        total += (orderItemCost * howManyOrdered);
      }
    };
    return total;
  };

  if (props.split === 'byItem') {
    paymentOwed = getGuestTotal(props);
  } else {
    paymentOwed = (billTotal / numberOfGuests).toFixed(2); // cut to two decimal places
  }

  return (
  <div>
    {props.guests.map(guest =>
      <IndividualOwes key = {guest.guest_id} firstName = {guest.first_name} lastName = {guest.last_name} paymentOwed = {paymentOwed} />
    )}
    Total: {billTotal}
  </div>
  );
};

export default SplitList;

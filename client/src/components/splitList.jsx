import React from 'react';
import IndividualOwes from './individualOwes.jsx';

const SplitList = (props) => {
  const numberOfGuests = props.guests.length;
  const billTotal = props.totalCost;

  let paymentsOwed;

  const getGuestTotals = (guestObj) => {
    const totals = {};
    const guestArray = guestObj.guests;
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestID = guestArray[i].guest_id;
      totals[currentGuestID] = 0;
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = currentGuestOrders[j].qty;
        totals[currentGuestID] += (orderItemCost * howManyOrdered);
      }
    };
    return totals;
  };

  const getEvenTotals = (guestObj) => {
    const totals = {};
    const guestArray = guestObj.guests;
    const guestIDs = [];
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestID = guestArray[i].guest_id;
      guestIDs.push(currentGuestID);
      const evenTotal = Math.floor((billTotal / numberOfGuests) * 100) / 100;
      totals[currentGuestID] = evenTotal;
    };
    let splitEvenTotal = 0;
    for (const guestID in totals) {
      splitEvenTotal += totals[guestID];
    }
    let remainder = Math.floor((billTotal - splitEvenTotal) * 100) / 100;
    while (remainder > 0) {
      const thisGuest = guestIDs.splice(Math.floor(Math.random() * guestIDs.length), 1)[0];
      totals[thisGuest] += 0.01;
      remainder -= 0.01;
    }
    return totals;
  };

  if (props.split === 'byItem') {
    paymentsOwed = getGuestTotals(props);
  } else {
    paymentsOwed = getEvenTotals(props);
  }

  return (
  <ul>
    {props.guests.map(guest =>
      <IndividualOwes key = {guest.guest_id} firstName = {guest.first_name} lastName = {guest.last_name} paymentOwed = {paymentsOwed[guest.guest_id]} />
    )}
    Total: {billTotal}
  </ul>
  );
};

export default SplitList;

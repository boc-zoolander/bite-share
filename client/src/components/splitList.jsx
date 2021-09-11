import React from 'react';
import IndividualOwes from './individualOwes.jsx';

const SplitList = (props) => {
  const numberOfGuests = props.guests.length;
  const billTotal = props.totalCost;

  let paymentsOwed;
  console.log('splitlist props', props);

  const getGuestTotals = (guests) => {
    const totals = {};
    const guestArray = guests;
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestID = guestArray[i].guestName;
      // const currentGuestID = guestArray[i].guest_id;
      totals[currentGuestID] = 0;
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = 1;
        // const howManyOrdered = currentGuestOrders[j].qty;
        const itemTotal = Math.round(orderItemCost * howManyOrdered * 100) / 100;
        totals[currentGuestID] += Math.round(itemTotal * 100) / 100;
      }
    };

    for (const guestID in totals) {
      totals[guestID] = Math.round(totals[guestID] * 100) / 100;
    }

    return totals;
  };

  const getEvenTotals = (guests) => {
    const totals = {};
    const guestArray = guests;
    const guestIDs = [];
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestID = guestArray[i].guestName;
      // const currentGuestID = guestArray[i].guest_id;
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

  if (props.split === 'by Item') {
    paymentsOwed = getGuestTotals(props.guests);
  } else {
    paymentsOwed = getEvenTotals(props.guests);
  }

  return (
  <ul>
    {props.guests.map((guest, i) =>
      <IndividualOwes key = {i} firstName = {guest.guestName} paymentOwed = {paymentsOwed[guest.guestName]} />
    )}
    Total: {billTotal}
  </ul>
  );
};

export default SplitList;

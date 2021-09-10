import React from 'react';
import IndividualOwes from './IndividualOwes.jsx';

const SplitList = (props) => {
  // console.log(props)
  const numberOfGuests = props.guests.length;
  const billTotal = props.totalCost;

  let paymentsOwed;

  const getGuestTotals = (guestObj) => {
    const totals = {};
    const guestArray = guestObj.guests;
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestFirstName = guestArray[i].first_name;
      totals[currentGuestFirstName] = 0;
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = currentGuestOrders[j].qty;
        totals[currentGuestFirstName] += (orderItemCost * howManyOrdered);
      }
    };
    return totals;
  };

  const getEvenTotals = (guestObj) => {
    const totals = {};
    const guestArray = guestObj.guests;
    const guestNames = [];
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestFirstName = guestArray[i].first_name;
      guestNames.push(currentGuestFirstName);
      const evenTotal = Math.floor((billTotal / numberOfGuests) * 100) / 100;
      totals[currentGuestFirstName] = evenTotal;
    };
    let splitEvenTotal = 0;
    for (const guestName in totals) {
      splitEvenTotal += totals[guestName];
    }
    let remainder = Math.floor((billTotal - splitEvenTotal) * 100) / 100;
    while (remainder > 0) {
      // splice random guest from guestNames (this will remove them from array and output the selected name as return)
      const thisGuest = guestNames.splice(Math.floor(Math.random() * guestNames.length), 1)[0];
      // add one penny to their bill in the *actual* guests array
      totals[thisGuest] += 0.01;
      // reduce difference by .01
      remainder -= 0.01;
    }
    return totals;
  };

  if (props.split === 'byItem') {
    // console.log('byitem');
    // console.log('inside props', props)
    paymentsOwed = getGuestTotals(props); // object with individual numbers owed
  } else {
    // console.log('evenly');
    // paymentOwed = (billTotal / numberOfGuests).toFixed(2); // cut to two decimal places
    paymentsOwed = getEvenTotals(props);
  }

  console.log('PAYMENT OWED', paymentsOwed);

  return (
  <div>
    {props.guests.map(guest =>
      <IndividualOwes key = {guest.guest_id} firstName = {guest.first_name} lastName = {guest.last_name} paymentOwed = {paymentsOwed[guest.first_name]} />
    )}
    Total: {billTotal}
  </div>
  );
};

export default SplitList;

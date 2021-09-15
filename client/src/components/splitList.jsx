import React from 'react';
import IndividualOwes from './individualOwes.jsx';

const SplitList = (props) => {
  const numberOfGuests = props.guests.length;
  const billTotalWithoutTipOrTax = props.totalCost;
  const tipPercentage = props.tipPercentage;
  const tipAmount = billTotalWithoutTipOrTax * tipPercentage / 100;
  const billWithTip = billTotalWithoutTipOrTax + tipAmount;
  // API CALL FOR TIP PERCENTAGE
  const taxPercentage = 7;

  const taxAmount = billTotalWithoutTipOrTax * taxPercentage / 100;
  const billWithTipAndTax = billWithTip + taxAmount;

  let paymentsOwed;

  const getGuestTotals = (guests) => {
    const totals = {};
    const guestArray = guests;
    const guestIDs = [];
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestID = guestArray[i].guestName;
      // const currentGuestID = guestArray[i].guest_id;
      guestIDs.push(currentGuestID);
      totals[currentGuestID] = 0;
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = 1;
        // const howManyOrdered = currentGuestOrders[j].qty;
        const itemTotal = orderItemCost * howManyOrdered;
        totals[currentGuestID] += itemTotal;
      }
    };

    for (const guestID in totals) {
      const tip = totals[guestID] * (tipPercentage / 100);
      const tax = totals[guestID] * (taxPercentage / 100);
      totals[guestID] = (totals[guestID] + tip + tax).toFixed(2);
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
      const evenTotal = (billWithTipAndTax / numberOfGuests).toFixed(2);
      totals[currentGuestID] = evenTotal;
    };
    let splitEvenTotal = 0;
    for (const guestID in totals) {
      splitEvenTotal += Number(totals[guestID]);
    }
    console.log('splitEvenTotal', splitEvenTotal);
    let remainder = Math.floor((billWithTipAndTax - splitEvenTotal) * 100) / 100;
    console.log('remainder', remainder);
    if (remainder > 0) {
      while (remainder > 0) {
        const thisGuest = guestIDs.splice(Math.floor(Math.random() * guestIDs.length), 1)[0];
        totals[thisGuest] = (Number(totals[thisGuest]) + 0.01).toFixed(2);
        remainder -= 0.01;
      }
    } else if (remainder < 0) {
      while (remainder < 0) {
        const thisGuest = guestIDs.splice(Math.floor(Math.random() * guestIDs.length), 1)[0];
        totals[thisGuest] = (Number(totals[thisGuest]) - 0.01).toFixed(2);
        remainder += 0.01;
      }
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
      <IndividualOwes key = {i} guestName = {guest.guestName} paymentOwed = {paymentsOwed[guest.guestName]} />
    )}
    <div>
      <hr />
      </div> Preliminary Total: ${billTotalWithoutTipOrTax.toFixed(2)} <div>
      <div> Tip Amount: ${tipAmount.toFixed(2)} </div>
      <div> Tax: ${taxAmount.toFixed(2)} </div>
      <div> Final Total: ${billWithTipAndTax.toFixed(2)} </div>
      <hr />
    </div>
  </ul>
  );
};

export default SplitList;

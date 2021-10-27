import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery';
import ThankYou from './ThankYou.jsx';

// const payeeEmail = 'sb-dmus17722352@personal.example.com';
// const hostName = 'Milo';
// const billInfo = [
//   {
//     name: 'Milo',
//     order: [
//       { reference_id: 1, description: 'Milo"s order', amount: { currency_code: 'USD', value: 135.3 } }]
//   },
//   {
//     name: 'Sara',
//     order: [
//       { reference_id: 4, description: 'Sara"s order', amount: { currency_code: 'USD', value: 25.3 } }]
//   },
//   {
//     name: 'Tom',
//     order: [
//       { reference_id: 6, description: 'Tom"s order', amount: { currency_code: 'USD', value: 52.3 } }]
//   },
//   {
//     name: 'Jorge',
//     order: [
//       { reference_id: 5, description: 'Jorge"s order', amount: { currency_code: 'USD', value: 15.3 } }]
//   }
// ];

const billInfoGenerator = (paymentsOwed) => {
  let billInfo = [];
  let i = 0;
  for (let key in paymentsOwed) {
    let result = {};
    let order = {
      reference_id: i + Date.now(),
      description: key + '"s order',
      amount: { currency_code: 'USD', value: Number(paymentsOwed[key]) }
    };
    result.name = key;
    result.order = [];
    result.order.push(order);
    billInfo.push(result);
    i++;
  }
  return billInfo;
}

const BillCard = (props) => (
  <div className='card bill-card' >
    <input type="checkbox" className="btn-check" id={'btncheck' + props.index} autoComplete="off" onClick={props.onClick} />
    <label className="btn btn-outline-danger" htmlFor={'btncheck' + props.index}>{props.info.name + ' $' + props.info.bill}</label>
  </div>
);

const PayBill = (props) => {
  const hostInfo = props.guests[0];
  const hostName = hostInfo.guestName;
  const payeeEmail = hostInfo.email;
  const paymentsList = {};
  for (const key in props.finalTotals.paymentsOwed) {
    let name = props.guests.find(item => item.id.toString() === key).guestName;
    paymentsList[name] = props.finalTotals.paymentsOwed[key];
  }
  console.log(paymentsList);
  const billInfo = billInfoGenerator(paymentsList);
  const [submit, setSubmit] = useState(false);
  const billInfoPay = billInfo.filter(info => info.name !== hostName);

  const paypal = useRef();

  const orderEnabledList = new Array(billInfoPay.length).fill(false);
  console.log(orderEnabledList);
  const onChange = (e) => {
    const index = Number(e.target.id.split('btncheck')[1]);
    orderEnabledList[index] = $('#' + e.target.id).is(':checked');
  };
  let orderToPay = [];
  useEffect(() => {
    window.paypal.Buttons(
      {
        createOrder: (data, actions, error) => {
          for (let i = 0; i < orderEnabledList.length; i++) {
            if (orderEnabledList[i]) {
              orderToPay = orderToPay.concat(billInfoPay[i].order);
            }
          }
          console.log(orderToPay);
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: orderToPay
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          $.ajax({
            type: 'POST',
            url: '/paypal',
            data: { orderToPay: orderToPay, payeeEmail: payeeEmail },
            success: (data) => {
              console.log('success:' + data);
            }
          });
          setSubmit(true);
        },
        onError: (error) => {
          console.log(error);
        }
      }
    ).render(paypal.current);
  }, []);

  return (
    <div>
      <h1>Bite Share</h1>
      {!submit &&
        <div>
          <div className="btn-group-vertical bill-card" role="group" aria-label="Basic checkbox toggle button group">
            {billInfoPay.map((info, index) => {
              let total = 0;
              info.order.forEach((order) => {
                total += order.amount.value;
              });
              info.bill = total;
              return (<BillCard info={info} index={index} onClick={onChange} />);
            })}
          </div>
          <div ref={paypal} id="paypal-btn" />
        </div>
      }
      {submit && <ThankYou />}
    </div>
  );
};

export default PayBill;

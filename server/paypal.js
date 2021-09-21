// Example:

// url: https://api-m.sandbox.paypal.com/v1/payments/payouts

// Authorization: "Bearer {token}"

// {
//   "sender_batch_header": {
//     "sender_batch_id": "Payouts_2018_100007",
//     "email_subject": "You have a payout!",
//     "email_message": "You have received a payout! Thanks for using our service!"
//   },
//   "items": [
//     {
//       "recipient_type": "EMAIL",
//       "amount": {
//         "value": "1.1",
//         "currency": "USD"
//       },
//       "note": "Thanks for your patronage!",
//       "receiver": "sb-dmus17722352@personal.example.com"
//     }
//   ]
// }
const axios = require('axios');

const paypal = async (orderToTransfer, payeeEmail, cb) => {
  // Prepare the transacation order

  const orderToTransferWithPayee = [];
  orderToTransfer.forEach(order => {
    const result = {};
    result.recipient_type = 'EMAIL';
    result.amount = {};
    result.amount.value = order.amount.value;
    result.amount.currency = order.amount.currency_code;
    result.receiver = payeeEmail;
    orderToTransferWithPayee.push(result);
  });

  console.log(orderToTransferWithPayee);

  const orderRequestBody = {
    sender_batch_header: {
      sender_batch_id: 'Payouts' + Date.now(),
      email_subject: 'You have a payout!',
      email_message: 'You have recieved a payout! Thanks for using our service!'
    },
    items: orderToTransferWithPayee
  };
  console.log('orderRequestBody:', orderRequestBody);

  // Call PayPal to get the token for transacation

  const username = process.env.PAYPAL_ID;
  const password = process.env.PAYPAL_SECRET;
  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const getTokenUrl = 'https://api-m.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials';
  const payoutUrl = 'https://api-m.sandbox.paypal.com/v1/payments/payouts';

  return axios({
    method: 'POST',
    url: getTokenUrl,
    headers: {
      Authorization: 'Basic ' + encodedToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    // Call payout url to get the payment processed
    const bearerToken = response.data.access_token;
    return axios({
      method: 'POST',
      url: payoutUrl,
      headers: {
        Authorization: 'Bearer ' + bearerToken
      },
      data: orderRequestBody
    });
  }).then(response => {
    console.log('Successfully payout,', response.data);
    cb(null);
  })
    .catch(err => {
      cb(err.response.data.details);
    });
};

module.exports = paypal;

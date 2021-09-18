
// eslint-disable-next-line no-unused-vars
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { configure, shallow, mount } from 'enzyme';
// eslint-disable-next-line no-unused-vars
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BillSummaryPage from '../client/src/components/BillSummaryPage.jsx';
// import SplitList from '../client/src/components/SplitList.jsx';
// import IndividualOwes from '../client/src/components/individualOwes.jsx';

describe('Unit Test Section: <BillSummaryPage />', () => {
  // set up for each test
  beforeEach(() => {
  });

  // clean up for each test
  afterEach(() => {
  });

  test('Unit Test 1:  Does the component <BillSummaryPage /> render?', () => {
    const guestsProps = [
      {
        id: 0,
        guestName: 'Sara',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      },
      {
        guestName: 'Milo',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      },
      {
        guestName: 'Mike',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      }
    ];

    const restaurantProps = { restaurant_name: 'Bakeri', restaurant_phone: '(718) 388-8037', restaurant_website: '', hours: 'Daily: 8am-7pm', price_range: '$', price_range_num: 1, restaurant_id: 4072005273960112, cuisines: ['Bakery & Pastries', 'Coffee & Tea', 'Sandwiches'], address: { city: 'Brooklyn', state: 'NY', postal_code: '11211', street: '150 Wythe Ave', formatted: '150 Wythe Ave Brooklyn, NY 11211' }, geo: { lat: 40.720052, lon: -73.960112 }, menus: [], last_updated: '2021-01-05T07:36:14.169Z' };

    const finalTotalsProps = { paymentsOwed: { Sara: '33.19', Milo: '33.19', Mike: '33.19' }, preliminaryTotal: '77.25', tipAmount: '15.45', tax: '6.86', finalTotal: '99.56' };

    const tipPercentageProps = 20;

    const splitMethodProps = 'by Item';

    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} tipPercentage = {tipPercentageProps} splitMethod = {splitMethodProps}/>
      </BrowserRouter>
    );
  });

  test('Unit Test 2:  Does the component <BillSummaryPage /> contain the header Final Bill?', () => {
    const guestsProps = [
      {
        id: 0,
        guestName: 'Sara',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      },
      {
        guestName: 'Milo',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      },
      {
        guestName: 'Mike',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      }
    ];

    const restaurantProps = { restaurant_name: 'Bakeri', restaurant_phone: '(718) 388-8037', restaurant_website: '', hours: 'Daily: 8am-7pm', price_range: '$', price_range_num: 1, restaurant_id: 4072005273960112, cuisines: ['Bakery & Pastries', 'Coffee & Tea', 'Sandwiches'], address: { city: 'Brooklyn', state: 'NY', postal_code: '11211', street: '150 Wythe Ave', formatted: '150 Wythe Ave Brooklyn, NY 11211' }, geo: { lat: 40.720052, lon: -73.960112 }, menus: [], last_updated: '2021-01-05T07:36:14.169Z' };

    const finalTotalsProps = { paymentsOwed: { Sara: '33.19', Milo: '33.19', Mike: '33.19' }, preliminaryTotal: '77.25', tipAmount: '15.45', tax: '6.86', finalTotal: '99.56' };

    const tipPercentageProps = 20;

    const splitMethodProps = 'by Item';

    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} tipPercentage = {tipPercentageProps} splitMethod = {splitMethodProps}/>
      </BrowserRouter>
    );
    expect(screen.getByText(/Final Bill/)).toBeInTheDocument();
  });

  test('Unit Test 3:  Does the component <BillSummaryPage /> contain the Preliminary Total, Tip Amount, Tax, and Final Total', () => {
    const guestsProps = [
      {
        id: 0,
        guestName: 'Sara',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      },
      {
        guestName: 'Milo',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      },
      {
        guestName: 'Mike',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75 }
        ]
      }
    ];

    const restaurantProps = { restaurant_name: 'Bakeri', restaurant_phone: '(718) 388-8037', restaurant_website: '', hours: 'Daily: 8am-7pm', price_range: '$', price_range_num: 1, restaurant_id: 4072005273960112, cuisines: ['Bakery & Pastries', 'Coffee & Tea', 'Sandwiches'], address: { city: 'Brooklyn', state: 'NY', postal_code: '11211', street: '150 Wythe Ave', formatted: '150 Wythe Ave Brooklyn, NY 11211' }, geo: { lat: 40.720052, lon: -73.960112 }, menus: [], last_updated: '2021-01-05T07:36:14.169Z' };

    const finalTotalsProps = { paymentsOwed: { Sara: '33.19', Milo: '33.19', Mike: '33.19' }, preliminaryTotal: '77.25', tipAmount: '15.45', tax: '6.86', finalTotal: '99.56' };

    const tipPercentageProps = 20;

    const splitMethodProps = 'by Item';

    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} tipPercentage = {tipPercentageProps} splitMethod = {splitMethodProps}/>
      </BrowserRouter>
    );
    expect(screen.getByText(/Preliminary Total/)).toBeInTheDocument();
    expect(screen.getByText(/Tip Amount/)).toBeInTheDocument();
    expect(screen.getByText(/Tax/)).toBeInTheDocument();
    expect(screen.getByText(/Final Total/)).toBeInTheDocument();
  });
});

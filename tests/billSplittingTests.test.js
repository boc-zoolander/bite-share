
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
import SplitList from '../client/src/components/SplitList.jsx';
import IndividualOwes from '../client/src/components/IndividualOwes.jsx';

describe('Unit Test Section: <BillSummaryPage /> and children', () => {
  let guestsProps;
  let restaurantProps;
  let finalTotalsProps;
  let tipPercentageProps;
  let splitMethodProps;
  let setTopLevelStateProps;

  beforeEach(() => {
    guestsProps = [
      {
        id: 0,
        guestName: 'Sara',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25, qty: 1 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75, qty: 1 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75, qty: 1 }
        ]
      },
      { id: 1,
        guestName: 'Milo',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.2, qty: 1 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.7, qty: 1 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.7, qty: 1 }
        ]
      },
      { id: 2,
        guestName: 'Mike',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.2, qty: 1 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.7, qty: 1 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.7, qty: 1 }
        ]
      }
    ];

    restaurantProps = { restaurant_name: 'Bakeri', restaurant_phone: '(718) 388-8037', restaurant_website: '', hours: 'Daily: 8am-7pm', price_range: '$', price_range_num: 1, restaurant_id: 4072005273960112, cuisines: ['Bakery & Pastries', 'Coffee & Tea', 'Sandwiches'], address: { city: 'Brooklyn', state: 'NY', postal_code: '11211', street: '150 Wythe Ave', formatted: '150 Wythe Ave Brooklyn, NY 11211' }, geo: { lat: 40.720052, lon: -73.960112 }, menus: [], last_updated: '2021-01-05T07:36:14.169Z' };

    finalTotalsProps = { paymentsOwed: { 0: 33.19, 1: 33.19, 2: 33.19 }, preliminaryTotal: 77.25, tipAmount: 15.45, tax: 6.86, finalTotal: 99.56 };

    setTopLevelStateProps = (a, b) => {
      return (a, b);
    };
  });

  test('Does the component <BillSummaryPage /> render?', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} setTopLevelState={setTopLevelStateProps}/>
      </BrowserRouter>
    );
  });

  test('Does the component <BillSummaryPage /> contain the header Final Bill?', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} setTopLevelState = {setTopLevelStateProps}/>
      </BrowserRouter>
    );
    expect(screen.getByText(/Final Bill/)).toBeInTheDocument();
  });

  test('Does the component <BillSummaryPage /> allow user to enter tip?', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} setTopLevelState = {setTopLevelStateProps}/>
      </BrowserRouter>
    );
    const input = screen.getByTestId('tip-percentage-input');
    fireEvent.change(input, { target: { value: 50 } });
    expect(input.value).toBe('50');
  });

  test('Does the component <BillSummaryPage /> contain the split options when there is more than one guest?', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} setTopLevelState = {setTopLevelStateProps}/>
      </BrowserRouter>
    );
    const splitByItemButton = screen.getByRole('button', {
      name: /Split by Item/i
    });
    const splitEvenlyButton = screen.getByRole('button', {
      name: /Split Evenly/i
    });
    expect(splitByItemButton).toBeInTheDocument();
    expect(splitEvenlyButton).toBeInTheDocument();
  });

  test('Does the component <BillSummaryPage /> change on click of Split Evenly and Split by Item?', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} setTopLevelState = {setTopLevelStateProps}/>
      </BrowserRouter>
    );

    const splitEvenlyButton = screen.getByRole('button', {
      name: /Split Evenly/i
    });
    const leftClick = { button: 0 };
    fireEvent.click(splitEvenlyButton, leftClick);
    expect(screen.getByText(/Final Bill Split Evenly/)).toBeInTheDocument();

    const splitByItemButton = screen.getByRole('button', {
      name: /Split by Item/i
    });
    fireEvent.click(splitByItemButton, leftClick);
    expect(screen.getByText(/Final Bill Split by Item/)).toBeInTheDocument();
  });

  test('Does the component <BillSummaryPage /> NOT contain the split options when there is only one guest?', () => {
    guestsProps = [
      {
        id: 0,
        guestName: 'Sara',
        order: [
          { name: 'Regular Coffee', description: '', pricing: [{ price: 2.25, currency: 'USD', priceString: '$2.25' }], price: 2.25, qty: 1 },
          { name: 'Flap Jacks', description: '', pricing: [{ price: 7.75, currency: 'USD', priceString: '$7.75' }], price: 7.75, qty: 1 },
          { name: 'El Cuban Reuben Panini', description: 'Roast pork, Swiss cheese, braised red cabbage and mustard on ciabatta.', pricing: [{ price: 14.75, currency: 'USD', priceString: '$14.75' }], price: 14.75, qty: 1 }
        ]
      }
    ];
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} setTopLevelState = {setTopLevelStateProps}/>
      </BrowserRouter>
    );
    const splitByItemButton = screen.queryByRole('button', {
      name: /Split by Item/i
    });
    const splitEvenlyButton = screen.queryByRole('button', {
      name: /Split Evenly/i
    });
    expect(splitByItemButton).not.toBeInTheDocument();
    expect(splitEvenlyButton).not.toBeInTheDocument();
  });

  test('Does the component <SplitList /> render?', () => {
    render(
      <BrowserRouter>
        <SplitList guests={guestsProps} totalCost={finalTotalsProps.preliminaryTotal} tipPercentage = {0} split={'by Item'} zipCode = {restaurantProps.address.postal_code} setTopLevelState = {setTopLevelStateProps} finalTotals= {finalTotalsProps}/>
      </BrowserRouter>
    );
  });

  test('Does the component <SplitList /> contain the Preliminary Total, Tip Amount, Tax, and Final Total', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} tipPercentage = {tipPercentageProps} splitMethod = {splitMethodProps} setTopLevelState={setTopLevelStateProps}/>
      </BrowserRouter>
    );
    expect(screen.getByText(/Preliminary Total/)).toBeInTheDocument();
    expect(screen.getByText(/Tip Amount/)).toBeInTheDocument();
    expect(screen.getByText(/Tax/)).toBeInTheDocument();
    expect(screen.getByText(/Final Total/)).toBeInTheDocument();
  });

  test('Does the component <SplitList /> properly split the total evenly?', () => {
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps} restaurantInfo = {restaurantProps} finalTotals = {finalTotalsProps} tipPercentage = {tipPercentageProps} splitMethod = {'Evenly'} setTopLevelState={setTopLevelStateProps}/>
      </BrowserRouter>
    );
    const saraTotal = screen.getByText(/Sara \$/);
    const miloTotal = screen.getByText(/Milo \$/);
    const mikeTotal = screen.getByText(/Mike \$/);
    expect(saraTotal).toHaveTextContent(/33\.19/);
    expect(miloTotal).toHaveTextContent(/33\.19/);
    expect(mikeTotal).toHaveTextContent(/33\.19/);
  });

  test('Does the component <IndividualOwes/> properly render all guests?', () => {
    render(
      <BrowserRouter>
        {guestsProps.map((guest, i) =>
          <IndividualOwes key = {i} guestName = {guest.guestName} paymentOwed = {finalTotalsProps.paymentsOwed[guest.guestName]} />
        )}
      </BrowserRouter>
    );
    expect(screen.getByText(/Sara/)).toBeInTheDocument();
    expect(screen.getByText(/Milo/)).toBeInTheDocument();
    expect(screen.getByText(/Mike/)).toBeInTheDocument();
  });

  test('Does the component <IndividualOwes/> properly render all individual totals?', () => {
    render(
      <BrowserRouter>
        {guestsProps.map((guest, i) =>
          <IndividualOwes key = {i} guestName = {guest.guestName} paymentOwed = {finalTotalsProps.paymentsOwed[guest.id]} />
        )}
      </BrowserRouter>
    );
    expect(screen.getByText(/Sara \$33\.19/)).toBeInTheDocument();
    expect(screen.getByText(/Milo \$33\.19/)).toBeInTheDocument();
    expect(screen.getByText(/Mike \$33\.19/)).toBeInTheDocument();
  });

  test('Does the component <IndividualOwes/> display Loading ... when user total abscent?', () => {
    render(
      <BrowserRouter>
        <IndividualOwes key = {0} guestName = {'Suzie Queue'} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading .../)).toBeInTheDocument();
  });
});

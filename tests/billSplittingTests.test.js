
// eslint-disable-next-line no-unused-vars
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { configure, shallow, mount } from 'enzyme';
// eslint-disable-next-line no-unused-vars
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BillSummaryPage from '../client/src/components/billSummaryPage.jsx';
// import SplitList from '../client/src/components/splitList.jsx';
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
    render(
      <BrowserRouter>
        <BillSummaryPage guests = {guestsProps}/>
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
    render(<BrowserRouter><BillSummaryPage guests = {guestsProps}/></BrowserRouter>);
    expect(screen.getByText(/Final Bill/)).toBeInTheDocument();
  });

  test('Unit Test 3:  Does the component <BillSummaryPage /> contain the Total', () => {
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
    render(<BrowserRouter><BillSummaryPage guests = {guestsProps}/></BrowserRouter>);
    expect(screen.getByText(/Total/)).toBeInTheDocument();
  });
});

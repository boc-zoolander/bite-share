
// eslint-disable-next-line no-unused-vars
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
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

  // test('Unit Test 1:  Does the component <BillSummaryPage /> render?', () => {
  //   render(<BillSummaryPage />);
  // });

  // test('Unit Test 2:  Does the component <BillSummaryPage /> contain the header Final Bill?', () => {
  //   render(<BillSummaryPage />);
  //   expect(screen.getByText(/Final Bill/)).toBeInTheDocument();
  // });

  // test('Unit Test 3:  Does the component <BillSummaryPage /> contain the Total', () => {
  //   render(<BillSummaryPage />);
  //   expect(screen.getByText(/Total/)).toBeInTheDocument();
  // });

  // test('Unit Test 4:  Does the component <BillSummaryPage /> allow user to change split method to Split evenly', () => {
  //   render(<BillSummaryPage />);
  //   const btnSplitEvenly = screen.getByT
  //   expect(screen.getByText(/Total/)).toBeInTheDocument();
  // });
});

// describe('Unit Test Section: <SplitList />', () => {
//   // set up for each test
//   beforeEach(() => {
//   });

//   // clean up for each test
//   afterEach(() => {
//   });

//   // test('Unit Test 1:  Does the component <SplitList /> properly computes byItem totals?', () => {
//   //   const { getGuestTotals } = render(<SplitList />);
//   //   const SplitLis
//   // });

// test('Unit Test 2:  Does the component <SplitList /> properly computes even split totals?', () => {
//   const { getEvenTotals }
//   // expect(screen.getByText(/Final Bill/)).toBeInTheDocument();
//   // expect(screen.getByText(/Total/)).toBeInTheDocument();
// });
// });

// describe('Unit Test Section: <IndividualOwes />', () => {
//   // set up for each test
//   beforeEach(() => {
//   });

//   // clean up for each test
//   afterEach(() => {
//   });

//   test('Unit Test 1:  Does the component <IndividualOwes /> render?', () => {
//     render(<IndividualOwes />);
//   });
// });


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

  test('Unit Test 1:  Does the component <BillSummaryPage /> render?', () => {
    render(<BillSummaryPage />);
  });
});

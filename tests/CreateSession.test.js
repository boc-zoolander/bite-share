import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { configure, shallow, mount } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateSession from '../client/src/components/CreateSession.jsx';

describe('Unit Test Section: <CreateSession />', () => {
  test('Unit Test 1:  Does the component <CreateSession /> render?', () => {
    render(
      <CreateSession />
    );
  });
});

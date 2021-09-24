import axios from 'axios';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import App from '../client/src/App.jsx';

jest.mock('axios');

describe('<App />', () => {
  beforeAll(() => {});

  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {});

  it('should render header element in <Login />', () => {
    // Starts off by rendering Login
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});

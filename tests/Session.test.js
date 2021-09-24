import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import Session from '../client/src/components/Session.jsx';

jest.mock('axios');

// Used to handle setTopLevelState function with no App.js
const setTopLevelState = (a, b) => {
  // console.log(a, b);
};

describe('Session', () => {
  beforeAll(() => {
  });

  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Route path="/find-restaurant">
          <p>New Session Test</p>
        </Route>
        <Route path="/guest-menu">
          <p>Existing Session Test</p>
        </Route>
        <Route exact path="/">
          <Session setTopLevelState={setTopLevelState} />
        </Route>
      </Router>
    );
  });

  afterEach(() => {});

  it('should render header element', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('should render a button to start a new session', () => {
    const startSessionButton = screen.getByText('Start a New Session');
    expect(startSessionButton).toBeInTheDocument();
  });

  it('should render a form to join a new session', () => {
    const label = screen.getByLabelText('Join an Existing Session');
    expect(label).toBeInTheDocument();
    const input = screen.getByTestId('session-id-input');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });

  it('should go to "/find-restaurant" on starting new session', () => {
    const startSessionButton = screen.getByText('Start a New Session');
    const leftClick = { button: 0 };
    fireEvent.click(startSessionButton, leftClick);
    expect(screen.getByText('New Session Test')).toBeInTheDocument();
  });

  it('should load data on entering existing session', async () => {
    axios.get.mockImplementation(() => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            // Dummy session info
            host: {},
            guests: [{}],
            // Dummy restaurant info
            data: [0, 1],
            // Dummy menu info
            result: {
              menus: [0]
            }
          }
        });
      }, 100);
    }));

    const input = screen.getByTestId('session-id-input');
    fireEvent.change(input, { target: { value: '123' } });
    const submitButton = screen.getByText('Submit');
    const leftClick = { button: 0 };
    fireEvent.click(submitButton, leftClick);
    const loading = await screen.findByText('Loading session...');
    expect(loading).toBeInTheDocument();
    const nextPage = await screen.findByText('Existing Session Test');
    expect(nextPage).toBeInTheDocument();
  });
});

import axios from 'axios';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import Session from '../client/src/components/Session.jsx';
import MockAdapter from 'axios-mock-adapter';

const setTopLevelState = (a, b) => {
  console.log(a, b);
};

describe('Session', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Route path="*" >
          <Session setTopLevelState={setTopLevelState} />
        </Route>
        <Route path="/find-restaurant" >
          <p>New Session Test</p>
        </Route>
        <Route path="/select-food" >
          <p>Existing Session Test</p>
        </Route>
      </Router>
    );
  });

  afterEach(() => {
    mock.reset();
  });
  it('should render header element', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('should render a button to start a new session', () => {
    const startSessionButton = screen.getByText('Start a New Session');
    expect(startSessionButton).toBeInTheDocument();
  });

  it('should render a form to join a new session', () => {
    const label = screen.getByLabelText('Enter an Existing Session');
    expect(label).toBeInTheDocument();
    const input = screen.getByTestId('session-id-input');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });

  it('should go to "/find-restaurant" on starting new session', () => {
    const startSessionButton = screen.getByText('Start a New Session');
    const leftClick = { button: 0 }
    fireEvent.click(startSessionButton, leftClick);
    expect(screen.getByText('New Session Test')).toBeInTheDocument();
  });
});

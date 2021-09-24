import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../client/src/App.jsx';
import axios from 'axios';
import Login from '../client/src/components/Login.jsx';
import RegisterUser from '../client/src/components/RegisterUser.jsx';
import { BrowserRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";

// ********************  TEST INITIALIZATION BEGIN  ********************

const setTopLevelState = (a, b) => {};

describe('Unit Test Section: <App />', () => {
  // set up for each test
  beforeEach(() => {
  });

  // clean up for each test
  afterEach(() => {
  });

  test('Login.jsx Test 1/2, Unit Test', () => {
    render(
      <BrowserRouter>
        <Login setTopLevelState={setTopLevelState} isLoggedIn={true} />
      </BrowserRouter>
    );
  });

  test('Login.jsx Test 2/2, Integration Test', async () => {
    let state = {
      guest: [],
      isLoggedIn: false
    };

    let setTopLevelState = function (name, value) {
      state[name] = value;
    };

    act (() => {
      render(
        <BrowserRouter>
          <Login setTopLevelState={setTopLevelState} isLoggedIn={state.isLoggedIn} />
        </BrowserRouter>
      );
    });

    let link = screen.getByText(/New to Bite Share/);

    expect(screen.getByText(/Email Address:/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    let pass = screen.getByLabelText('Password:');
    let email = screen.getByLabelText('Email Address:');
    let button = screen.getByRole('button', {value:'Log In'});

    expect(email).toBeInTheDocument();
    expect(pass).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await waitFor (() => {
      fireEvent.click(email);
      fireEvent.change(email, { target: { value: 'iheartcharlesxavier@gmail.com' } });
      fireEvent.click(pass);
      fireEvent.change(pass, { target: { value: '1111' } });
      fireEvent.click(button);
    });

  });

  test('RegisterUser.jsx Test 1/2, Unit Test', () => {
    render(<BrowserRouter>
      <RegisterUser setTopLevelState={setTopLevelState} isLoggedIn={true} />
    </BrowserRouter>);
  });

  test('RegisterUser.jsx Test 2/2, Integration Test', async () => {
    act(() => {
      render(<BrowserRouter>
        <RegisterUser setTopLevelState={setTopLevelState} isLoggedIn={false} />
      </BrowserRouter>);
    });

    let newFirstName = screen.getByLabelText('First Name:');
    let newLastName = screen.getByLabelText('Last Name:');
    let newEmail = screen.getByLabelText('Email Address:');
    let newPassword = screen.getByLabelText('Password:');
    let button = screen.getByRole('button', {value:'Register New User'});

    expect(newFirstName).toBeInTheDocument();
    expect(newLastName).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
    expect(newPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(newFirstName);
    fireEvent.change(newFirstName, { target: { value: 'Warren' } });
    fireEvent.click(newLastName);
    fireEvent.change(newLastName, { target: { value: 'Worthington' } });
    fireEvent.click(newEmail);
    fireEvent.change(newEmail, { target: { value: 'IalsoheartjeangreyandamArchangel@gmail.com' } });
    fireEvent.click(newPassword);
    fireEvent.change(newPassword, { target: { value: '33333' } });
    fireEvent.click(button);
  });
});
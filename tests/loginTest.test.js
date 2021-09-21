import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../client/src/App.jsx';
import axios from 'axios';

import Login from '../client/src/components/Login.jsx';
import RegisterUser from '../client/src/components/RegisterUser.jsx';
import LoggedIn from '../client/src/components/LoggedIn.jsx';
import { BrowserRouter } from 'react-router-dom';

import { act } from "react-dom/test-utils";
import { debug } from 'webpack';
import e from 'cors';

// ********************  TEST INITIALIZATION BEGIN  ********************

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
        <Login isLoggedIn={true} />
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

    expect(screen.getByText(/User Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    let pass = screen.getByLabelText('Password:');
    let email = screen.getByLabelText('User Name:');
    let button = screen.getByRole('button', {value:'Login'});

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
      <RegisterUser isLoggedIn={true} />
    </BrowserRouter>);
  });

  test('RegisterUser.jsx Test 2/2, Integration Test', async () => {
    act(() => {
      render(<BrowserRouter>
        <RegisterUser isLoggedIn={false} />
      </BrowserRouter>);
    });

    let newFirstName = screen.getByLabelText('New First Name:');
    let newLastName = screen.getByLabelText('New Last Name:');
    let newEmail = screen.getByLabelText('New email:');
    let newPassword = screen.getByLabelText('New password:');
    let button = screen.getByRole('button', {value:'Register New User'});

    expect(newFirstName).toBeInTheDocument();
    expect(newLastName).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
    expect(newPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    //await waitFor (() => {
    await fireEvent.click(newFirstName);
    await fireEvent.change(newFirstName, { target: { value: 'Warren' } });
    await fireEvent.click(newLastName);
    await fireEvent.change(newLastName, { target: { value: 'Worthington' } });
    await fireEvent.click(newEmail);
    await fireEvent.change(newEmail, { target: { value: 'IalsoheartjeangreyandamArchangel@gmail.com' } });
    await fireEvent.click(newPassword);
    await fireEvent.change(newPassword, { target: { value: '33333' } });
    await fireEvent.click(button);
    //});
  });

  test('LoggedIn.jsx Test 1/2, Unit Test', () => {
    let mockedLoggedIn = [{ 
      id: 3,
      guestName: 'Charles Xavier'
    }];

    render(<BrowserRouter>
      <LoggedIn guests={mockedLoggedIn}/>
    </BrowserRouter>
    );

    expect(screen.getByText(/Welcome Charles Xavier/)).toBeInTheDocument();
  });

  test('LoggedIn.jsx Test 2/2, Unit Test', async () => {
    let mockedLoggedIn = [{ 
      id: 3,
      guestName: 'Charles Xavier'
    }];

    render(<BrowserRouter>
      <LoggedIn guests={mockedLoggedIn}/>
    </BrowserRouter>
    );

    let zipCode = screen.getByLabelText('Zip Code:');

    await fireEvent.change(zipCode, { target: { value: '11111' } });
  });
});
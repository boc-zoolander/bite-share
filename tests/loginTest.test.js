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

  test('Unit Test 0: Does the Login Component Render?', async () => {
    let state = {
      guest: [],
      isLoggedIn: false
    }

    let setTopLevelState = function (name, value) {
      state[name] = value;
    }

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

    console.log(button);
});

test ('unit test 0', () => {
  render(
    <BrowserRouter>
      <Login isLoggedIn={true} />
    </BrowserRouter>
  );
});

  test('Unit Test 1: Does the RegisterUser Component Render? ', async () => {

    act (() => {
      render(<BrowserRouter>
        <RegisterUser isLoggedIn={false} />
      </BrowserRouter>);
    });

    let newFirstName = screen.getByLabelText('New First Name:');
    let newLastName = screen.getByLabelText('New Last Name:');
    let newEmail = screen.getByLabelText('New email:');
    let newPassword = screen.getByLabelText('New password:');
    let button = screen.getByRole('button', {value:'Register New User'});

    console.log(newFirstName);

    expect(newFirstName).toBeInTheDocument();
    expect(newLastName).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
    expect(newPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    //await waitFor (() => {
    fireEvent.click(newFirstName);
    fireEvent.change(newFirstName, { target: { value: 'Warren' } });
    fireEvent.click(newLastName);
    fireEvent.change(newLastName, { target: { value: 'Worthington' } });
    fireEvent.click(newEmail);
    fireEvent.change(newEmail, { target: { value: 'IalsoheartjeangreyandamArchangel@gmail.com' } });
    fireEvent.click(newPassword);
    fireEvent.change(newPassword, { target: { value: '33333' } });
    fireEvent.click(button);
    //});
  });

  test('Unit Test 1: Does the RegisterUser Component Render? true', () => {
    render(<BrowserRouter>
      <RegisterUser isLoggedIn={true} />
    </BrowserRouter>);
  });


  test('Unit Test 2: Does the LoggedIn Component Render?', () => {
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
});
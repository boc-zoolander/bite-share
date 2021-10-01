import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../client/src/App.jsx';
import axios from 'axios';
import Login from '../client/src/components/Login.jsx';
import RegisterUser from '../client/src/components/RegisterUser.jsx';
import { BrowserRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";

import Dashboard from '../client/src/components/Dashboard.jsx';
import GuestList from '../client/src/components/GuestList.jsx';
import GuestMenu from '../client/src/components/GuestMenu.jsx';
import HostMenu from '../client/src/components/HostMenu.jsx';
import PayBill from '../client/src/components/PayBill.jsx';
import testSessionData from '../server/user_db_routes/getSession.js';
import mockRestaurantMenu from '../server/user_db_routes/testgetrestaurant_1.js';

// ********************  TEST INITIALIZATION BEGIN  ********************

const setTopLevelState = (a, b) => {};

describe('Unit Test Section: <App />', () => {
  // set up for each test
  beforeEach(() => {
  });

  // clean up for each test
  afterEach(() => {
  });

  // test('App.jsx Test 1/1, Unit Test', () => {
  //   render(
  //     <App/>
  //   );
  // });

  // test('AddGuests.jsx Unit Test 1/1, Unit Test', () => {

  //   let state = {
  //     guest: testSessionData.guests,
  //     isLoggedIn: false
  //   };

  //   let setTopLevelState = function (name, value) {
  //     state[name] = value;
  //   };

  //   render(
  //     <BrowserRouter>
  //       <AddGuests guests={state.guest} setTopLevelState={setTopLevelState} sessionId={12345}/>
  //     </BrowserRouter>
  //   );
  // });


  // test('Dashboard.jsx Unit Test 1/1, Unit Test', () => {
  //   render(
  //     <BrowserRouter>
  //       <Dashboard />
  //     </BrowserRouter>
  //   );
  // });

  // test('GuestList.jsx Unit Test 1/1, Unit Test', () => {
  //   render(
  //     <BrowserRouter>
  //       <GuestList guests={testSessionData.guests} setTopLevelState={() => {}}/>
  //     </BrowserRouter>
  //   );
  // });

  // test('GuestMenu.jsx Unit Test 1/1, Unit Test', () => {
  //   render(
  //     <BrowserRouter>
  //       <GuestMenu guests={testSessionData.guests} sessionId={12345} menu={mockRestaurantMenu.result.menus}/>
  //     </BrowserRouter>
  //   );
  // });

  // test('HostMenu.jsx Unit Test 1/1, Unit Test', () => {
  //   render(
  //     <BrowserRouter>
  //       <HostMenu guests={testSessionData.guests} sessionId={12345} menu={testMenuData} />
  //     </BrowserRouter>
  //   );
  // });

  // test('Paybill.jsx Unit Test 1/1, Unit Test', () => {
  //   render(
  //     <BrowserRouter>
  //       <PayBill />
  //     </BrowserRouter>
  //   );
  // });

  // test('Join.jsx Unit Test 1/1, Unit Test', () => {
  //   let state = {
  //     guest: [],
  //     isLoggedIn: false
  //   };

  //   let setTopLevelState = function (name, value) {
  //     state[name] = value;
  //   };

  //   render(
  //       <Join setTopLevelState={setTopLevelState}/>
  //   );
  // });

  // test('ThankYou.jsx Unit Test 1/1, Unit Test', () => {
  //   render(
  //       <ThankYou />
  //   );
  // });

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

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// import { cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import { act } from "react-dom/test-utils";
import Dashboard from '../client/src/components/Dashboard.jsx'
import HostMenu from '../client/src/components/HostMenu.jsx'
import GuestMenu from '../client/src/components/GuestMenu.jsx'

const host = {
  id: 1,
  guestName: 'Mugatu',
  order: []
};
const guests = [host];
const menu = [];
const sessionId = '123';
const setTopLevelState = jest.fn();

describe('Dashboard', () => {
  test('Should render Dashboard component', () => {
    render(
      <BrowserRouter>
        <Dashboard  guests={guests} setTopLevelState={setTopLevelState} sessionId={sessionId}/>
      </BrowserRouter>
    );
  })
});

describe('HostMenu', () => {
  test('Should render HostMenu component', () => {
    render(
      <BrowserRouter>
        <HostMenu  guests={guests} menu={menu} setTopLevelState={setTopLevelState} sessionId={sessionId}/>
      </BrowserRouter>
    );
  })
});

describe('GuestMenu', () => {
  test('Should render GuestMenu component', () => {
    render(
      <BrowserRouter>
        <GuestMenu  guests={guests} menu={menu} sessionId={sessionId}/>
      </BrowserRouter>
    );
  })
});

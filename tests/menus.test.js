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

const Routed = ({children}) => <BrowserRouter> {children} </BrowserRouter>;
const dashboard = <Dashboard  guests={guests} setTopLevelState={setTopLevelState} sessionId={sessionId}/>;
const hostmenu = <HostMenu  guests={guests} menu={menu} setTopLevelState={setTopLevelState} sessionId={sessionId}/>;
const guestmenu = <GuestMenu  guests={guests} menu={menu} sessionId={sessionId}/>;
// const menus = [dashboard, hostmenu, guestmenu]

describe('Dashboard', () => {
  test('Should render Dashboard component', () => {
    render(
      <Routed children={dashboard}/>
    );
  })
});

describe('HostMenu', () => {
  test('Should render HostMenu component', () => {
    render(
      <Routed children={hostmenu}/>
    );
  })
});

describe('GuestMenu', () => {
  test('Should render GuestMenu component', () => {
    render(
      <Routed children={guestmenu}/>
    );
  })
});

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// import { cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import { act } from "react-dom/test-utils";
import Dashboard from '../client/src/components/Dashboard.jsx'
import HostMenu from '../client/src/components/HostMenu.jsx'
import GuestMenu from '../client/src/components/GuestMenu.jsx'
import mockRestaurantMenu from '../server/user_db_routes/testgetrestaurant_2.js';

const host = {
  id: 1,
  guestName: 'Mugatu',
  order: []
};
const guests = [host];
const menu = mockRestaurantMenu.result.menus[0].menu_sections;
const sessionId = '123';
const setTopLevelState = jest.fn();

const Routed = ({children}) => <BrowserRouter> {children} </BrowserRouter>;
const dashboard = <Dashboard  guests={guests} setTopLevelState={setTopLevelState} sessionId={sessionId}/>;
const hostmenu = <HostMenu  guests={guests} menu={menu} setTopLevelState={setTopLevelState} sessionId={sessionId}/>;
const guestmenu = <GuestMenu  guests={guests} menu={menu} sessionId={sessionId}/>;
const menus = [dashboard, hostmenu, guestmenu];
const menuNames = ['dashboard', 'hostmenu', 'guestmenu'];

menus.forEach((menu, i) => {
  describe(`${menuNames[i]}`, () => {
    test('component should render', () => {
      render(
        <Routed children={menu}/>
      );
    })
  });
})

describe('GuestMenu', () => {

  beforeEach(() => {
    render(<Routed children={guestmenu} /> );
  });

  it('should have buttons to add/delete items', async () => {
    let addButtons = screen.getAllByRole('button');
    addButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    })
    await fireEvent.click(addButtons[0]);
    await fireEvent.click(addButtons[0]);
    addButtons = screen.getAllByRole('button');
    await fireEvent.click(addButtons[0]);
    await fireEvent.click(addButtons[0]);
  })

})


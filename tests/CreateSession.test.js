import axios from 'axios';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import { configure, shallow, mount } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateSession from '../client/src/components/CreateSession.jsx';
const testRestaurantsByGeo = require('../server/user_db_routes/testRestaurantsByGeo');
const testRestaurantsByZip = require('../server/user_db_routes/testRestaurantsByZip_1');

jest.mock('axios');

describe('<CreateSession />', () => {
  const restaurantData = testRestaurantsByGeo;
  axios.get.mockImplementation(() => new Promise((resolve, reject) => {
    resolve({
      data: restaurantData
    });
  }));

  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Route path="/add-guests">
          <p>Create your guest list</p>
        </Route>
        <Route exact path="/">
          <CreateSession />
        </Route>
      </Router>
    );
  });

  it('should render header elements', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    const h4 = screen.getByRole('heading', { level: 4 });
    expect(h4).toBeInTheDocument();
  });

  it('should render a form to name the session', () => {
    const sessionNameInputLabel = screen.getByText('Session Name:');
    expect(sessionNameInputLabel).toBeInTheDocument();
    const sessionNameInput = screen.getByTestId('session-name-input');
    expect(sessionNameInput).toBeInTheDocument();
    const saveSessionNameButton = screen.getByText('Save');
    expect(saveSessionNameButton).toBeInTheDocument();
  });

  it('should save the session name', async () => {
    const input = screen.getByTestId('session-name-input');
    fireEvent.change(input, { target: { value: 'Portland Dinner' } });
    const saveSessionNameButton = screen.getByText('Save');
    fireEvent.click(saveSessionNameButton, { button: 0 });
    const sessionName = await screen.getByText('Session Name: Portland Dinner');
    expect(sessionName).toBeInTheDocument();
  });

  it('should load suggested restaurants after saving session name', async () => {
    expect(axios.get).toHaveBeenCalled();

    const sessionNameInput = screen.getByTestId('session-name-input');
    fireEvent.change(sessionNameInput, { target: { value: 'Portland Dinner' } });
    const saveSessionNameButton = screen.getByText('Save');
    fireEvent.click(saveSessionNameButton, { button: 0 });
    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
    const restaurant = await screen.findByText('Overlook Family Restaurant - 1332 N Skidmore St Portland, OR 97217');
    expect(restaurant).toBeInTheDocument();
  });

  it('should load new restaurants after clicking Search', async () => {
    const restaurantDataZip = testRestaurantsByZip;
    axios.get.mockImplementation(() => new Promise((resolve, reject) => {
      resolve({
        data: restaurantDataZip
      });
    }));

    const sessionNameInput = screen.getByTestId('session-name-input');
    fireEvent.change(sessionNameInput, { target: { value: 'Portland Dinner' } });
    const saveSessionNameButton = screen.getByText('Save');
    fireEvent.click(saveSessionNameButton, { button: 0 });
    const searchInput = screen.getByTestId('restaurant-search-input');
    fireEvent.change(searchInput, { target: { value: 'Bakeri' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton, { button: 0 });
    expect(axios.get).toHaveBeenCalled();
    const restaurant = await screen.findByText('Bakeri - 150 Wythe Ave Brooklyn, NY 11211');
    expect(restaurant).toBeInTheDocument();
  });

  it('should load the next component after selecting a restaurant', async () => {
    const restaurantDataZip = testRestaurantsByZip;
    axios.get.mockImplementation(() => new Promise((resolve, reject) => {
      resolve({
        data: restaurantDataZip
      });
    }));

    const sessionNameInput = screen.getByTestId('session-name-input');
    fireEvent.change(sessionNameInput, { target: { value: 'Portland Dinner' } });
    const saveSessionNameButton = screen.getByText('Save');
    fireEvent.click(saveSessionNameButton, { button: 0 });
    const searchInput = screen.getByTestId('restaurant-search-input');
    fireEvent.change(searchInput, { target: { value: 'Bakeri' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton, { button: 0 });
    expect(axios.get).toHaveBeenCalled();

    const selectButtonsArray = screen.getAllByText('Select');
    const selectButton = selectButtonsArray[0];
    fireEvent.click(selectButton, { button: 0 });
    const text = screen.getByText('Create your guest list');
    expect(text).toBeInTheDocument();
  });
});

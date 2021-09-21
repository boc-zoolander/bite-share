
import '@testing-library/jest-dom';
import axios from 'axios';

/* --- Use this mock adapter if you want to make mock server calls --- */
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)

let mockCreateNewSessionResult = [{ session_id: 1 }];

// mock for unit test 1
mock.onPost("/createNewSession").reply(200, mockCreateNewSessionResult);

// // mock for unit test 2
// mock.onGet("/updateRestaurant").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

// // mock for unit test 3
// mock.onGet("/createNewUser").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

// // mock for unit test 4
// mock.onGet("/addGuest").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

// // mock for unit test 5
// mock.onGet("/removeGuest").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

// // mock for unit test 6
// mock.onGet(" /addOrder").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

// // mock for unit test 7
// mock.onGet(" /updateOrder").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

// // mock for unit test 8
// mock.onGet("/ removeOrder").reply(200, {
//   users: [{ id: 1, name: "John Smith" }],
// });

describe('Unit Test Section: <App />', () => {
  test('Unit Test 1: Route /createNewSession:', async () => {
    //let testRoute = '/createNewSession?host_id=1&restaurant_name=TEST_RESTAURANT_1&restaurant_id_api=8289152022&session_name=TEST_SESSION_1';
    let result = await axios.post('/createNewSession');
    expect(result.data[0].session_id).toBeTruthy();
  });
  
  // test('Unit Test 2: Route /updateRestaurant:', () => {
    
  // });

  // test('Unit Test 3: Route /createNewUser:', () => {
 
  // });

  // test('Unit Test 4 for route /addGuest:', () => {

  // });

  // test('Unit Test 5 for route /removeGuest:', () => {
    
  // });

  // test('Unit Test 6 for route /addOrder:', () => {
   
  // });

  // test('Unit Test 7 for route /updateOrder:', () => {

  // });

  // test('Unit Test 8 for route /removeOrder:', () => {
  
  // });
});

/*
https://testing-library.com/docs/react-testing-library/example-intro/
// copied example from website, shows how to simulate events in the UI
// functions are async

// __tests__/fetch.test.js
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../fetch'

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})

*/

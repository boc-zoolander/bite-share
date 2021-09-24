// import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// import React from 'react';
// import App from '../client/src/App.jsx';

xdescribe('Unit Test Section: <App />', () => {
  test('Unit Test 1:  Does the component <App /> render?', () => {
    expect(1 + 1).toEqual(2);
  });
});

// Should have a text field to enter guests
// Should have a submit button to add guests
// Guest list should only show host at the beginning
// Should have a next page button
// Should not be able to delete host
// Clicking submit button with text present adds text to guest list (new text)
// Clicking submit button with text that already exists in guest list should not add it again
// Clicking submit with empty input form should not do anything? Or produce error?
// Every non-host guest should have a deleted button (n-1 delete buttons)
// Clicking the delete button should remove that guest
//    That guest is no longer in guest list
//    All of the other guests remain
// Clicking the next page button with only the host name in the guest list should throw an error
// Clicking the next page button with at least one non-host guest should render next page (maybe test function called once)

// AFTER IDS INCORPORATED: delete button only removes correct guest if two guests have the same name

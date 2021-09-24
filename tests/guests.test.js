import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// import { cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import { act } from "react-dom/test-utils";
import InviteGuests from '../client/src/components/InviteGuests.jsx'
import ThankYou from '../client/src/components/ThankYou.jsx'

describe('InviteGuests', () => {
  test('Should render InviteGuests component', () => {
    const sessionId = '123';
    render(
      <BrowserRouter>
        <InviteGuests  sessionId={sessionId}/>
      </BrowserRouter>
    );
  })
});

describe('ThankYou', () => {
  test('Should render ThankYou component', () => {
    render(
      <BrowserRouter>
        <ThankYou />
      </BrowserRouter>
    );
  })
});
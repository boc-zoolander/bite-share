import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { configure, shallow, mount } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateSession from '../client/src/components/CreateSession.jsx';

describe('<CreateSession />', () => {
  beforeEach(() => {
    render(
      <CreateSession />
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
    // const leftClick = { button: 0 };
    fireEvent.click(saveSessionNameButton, { button: 0 });
    const sessionName = await screen.getByText('Session Name: Portland Dinner');
    expect(sessionName).toBeInTheDocument();
  });
});

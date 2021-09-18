import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Session from '../client/src/components/Session.jsx';

describe('Session', () => {
  it('should render', () => {
    render(<Session />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});

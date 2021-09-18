import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Session () {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h2>Session</h2>
      {/* Will eventually go to "Host a Session" component */}
      <Link to="/find-restaurant">
        <button type="button">Start a New Session</button>
      </Link>
      {message && <p>{message}</p>}
      <form>
        <label htmlFor="session-id">Enter an Existing Session</label>
        <input type="number" name="session-id" />
        <button type="button" onClick={() => setMessage('Test complete')}>Submit</button>
      </form>
    </div>
  );
}

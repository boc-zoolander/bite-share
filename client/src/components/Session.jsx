import React, { useState } from 'react';

export default function Session () {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h2>Session</h2>
      <button type="button">Start a New Session</button>
      {message && <p>{message}</p>}
      <form>
        <label htmlFor="session-id">Enter an Existing Session</label>
        <input type="number" name="session-id" />
        <button type="button" onClick={() => setMessage('Test complete')}>Submit</button>
      </form>
    </div>
  );
}

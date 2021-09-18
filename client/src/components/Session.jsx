import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Session ({ setTopLevelState }) {
  const history = useHistory();
  const [sessionId, setSessionId] = useState('');
  const [loadingSession, setLoadingSession] = useState(false);

  const handleSessionIdChange = (e) => {
    setSessionId(e.target.value);
  };

  const handleJoinSession = async () => {
    // set loading to true
    setLoadingSession(true);
    // make axios call for session object
    const sessionResponse = await axios('/users/getSession');
    // update host in state
    // update guests in state
    const allGuests = [
      sessionResponse.data.host,
      ...sessionResponse.data.guests
    ];
    setTopLevelState('guests', allGuests);
    // load restaurant data via restaurant api
    // update restaurant in state
    // set loading to false
    setLoadingSession(false);
    // redirect to next page
    history.push('/select-food');
  };

  const content = () => {
    if (loadingSession) {
      return (
        <p>Loading session...</p>
      );
    } else {
      return (
        <>
          {/* Will eventually go to "Host a Session" component */}
          <Link to="/find-restaurant">
            <button type="button">Start a New Session</button>
          </Link>
          <form>
            <label htmlFor="session-id">Enter an Existing Session</label>
            <input
              type="number"
              name="session-id"
              value={sessionId}
              onChange={handleSessionIdChange}
            />
            <button type="button" onClick={handleJoinSession}>Submit</button>
          </form>
        </>
      );
    }
  };

  return (
    <div>
      <h2>Session</h2>
      {content()}
    </div>
  );
}

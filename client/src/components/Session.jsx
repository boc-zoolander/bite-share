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
    setLoadingSession(true);

    setTopLevelState('sessionId', sessionId);

    // load restaurant data via restaurant api
    // In the future, will be a query that only returns a single restaurant by search query
    // Search query will use session data from the db
    const restaurantResponse = await axios.get('/users/testzip');
    setTopLevelState('restaurant', restaurantResponse.data.data[1]);

    // load restaurant menu via restaurant api
    // In the future, will be a query that only returns a single restaurant's menu by search query
    // Search query will use session data from the db
    const menuResponse = await axios.get('users/testgetRestaurant_1');
    setTopLevelState('menu', menuResponse.data.result.menus[0].menu_sections);

    setLoadingSession(false);
    history.push('/guest-menu');
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
          <Link to="/find-restaurant" className="button-link">
            <button id="start-new-session-button" type="button">Start a New Session</button>
          </Link>
          <form>
            <label htmlFor="session-id">Join an Existing Session</label>
            <input
              type="number"
              id="session-id"
              name="session-id"
              value={sessionId}
              onChange={handleSessionIdChange}
              data-testid="session-id-input"
            />
            <button type="button" onClick={handleJoinSession}>Submit</button>
          </form>
        </>
      );
    }
  };

  return (
    <div>
      <h1>Bite Share</h1>
      <h2>Session</h2>
      {content()}
    </div>
  );
}

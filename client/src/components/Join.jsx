import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
  const [userName, setuserName] = useState('');

  const onChange = (event) => {
    // console.log('my name: ', event.target.value);
    setuserName(event.target.value);
  };

  // Event handlers would need to ..
  const joinSesson = () => {
    //    Send name (userName) to server to store in DB for that session data
    //    Reroute guest to menu component (using react router, maybe in callback included in successful server response)
  };

  return (
    <form>
      <label forHtml='login'>Add your name</label>
      <input type='text' name='login' value={userName} onChange={onChange}/>
      <Link to='/guest-menu' >
        <button type='submit'> Join [host]s session </button>
      </Link>
    </form>
  );
};

export default Join;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

const Join = ({ setTopLevelState }) => {
  const [name, setName] = useState('');

  const onChange = (event) => {
    setName(event.target.value);
  };

  // Event handlers would need to ..
  const joinSesson = () => {
    setTopLevelState('joinName', name);
    // Communicates to host & DB that this guest is part of this session
    socket.emit('onJoin', { name, submitted: false });
    //    Send name (userName) to server to store in DB for that session data
  };

  return (
    <form>
      <label forHtml='login'>Add your name</label>
      <input type='text' name='login' value={name} onChange={onChange}/>
      <Link to='/guest-menu' >
        <button type='submit' onClick={joinSesson}> Join [host]s session </button>
      </Link>
    </form>
  );
};

export default Join;

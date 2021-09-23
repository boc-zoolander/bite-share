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

  const joinSesson = () => {
    setTopLevelState('joinName', name);
    socket.emit('onJoin', { name, submitted: false });
  };

  return (
    <form>
      <label forHtml='login'>Add your name</label>
      <input type='text' name='login' value={name} onChange={onChange}/>
      <Link to='/guest-menu' className="button-link">
        <button type='submit' onClick={joinSesson}> Join session </button>
      </Link>
    </form>
  );
};

export default Join;

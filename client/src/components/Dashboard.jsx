import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

const Dashboard = ({ sessionId }) => {
  const [joinedNames, setjoinedNames] = useState([]);

  useEffect(() => {
    socket.on('onJoin', payload => {
      setjoinedNames([...joinedNames, payload]);
    });
  });

  useEffect(() => {
    socket.emit('joinRoom', { sessionId });
  });

  useEffect(() => {
    socket.on('updateDash', payload => {
      setjoinedNames(payload);
    });
  });

  useEffect(() => {
    socket.on('orderSubmitted', payload => {
      const names = [...joinedNames];
      for (let i = 0; i < names.length; i++) {
        if (names[i].guestName === payload.guestName) {
          names[i].submitted = true;
          setjoinedNames(names);
        }
      }
    });
  });

  const whoJoined = joinedNames.map((item, index) => {
    return (
      item.submitted ? <li key={index}>{item.guestName} Completed Order </li> : <li key={index}>{item.guestName} joined the session and is ordering food </li>
    );
  });

  return (
    <div>
      <h1>This is a dashboard</h1>
      <ul>
        {whoJoined}
      </ul>
    </div>
  );
};

export default Dashboard;

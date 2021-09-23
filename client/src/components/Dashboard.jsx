import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

const Dashboard = ({ guests, sessionId, setTopLevelState }) => {
  const [joinedNames, setjoinedNames] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { sessionId });
  }, []);

  useEffect(() => {
    socket.on('updateDash', payload => {
      setjoinedNames(payload);
    });
  }, []);

  useEffect(() => {
    socket.on('onDash', payload => {
      setjoinedNames(payload);
    });
  }, []);

  useEffect(() => {
    socket.on('orderSubmitted', payload => {
      setTopLevelState('guests', [...guests, payload]);
      const names = [...joinedNames];
      for (let i = 0; i < names.length; i++) {
        if (names[i].id === payload.id) {
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
      <ul>
        {whoJoined}
      </ul>
    </div>
  );
};

export default Dashboard;

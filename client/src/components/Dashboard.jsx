import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

const Dashboard = ({ sessionId }) => {
  const [joinedNames, setjoinedNames] = useState([]);

  useEffect(() => {
    console.log('Dashboard useEffect for joinRoom fired');
    socket.emit('joinRoom', { sessionId });
  });

  useEffect(() => {
    console.log('Dashboard useEffect for updateDash fired');
    socket.on('updateDash', payload => {
      setjoinedNames(payload);
    });
  }, []);

  useEffect(() => {
    console.log('Dashboard 2nd useEffect (on join outside the socket) fired');
    socket.on('onDash', payload => {
      console.log('Dashboard (onDash inside the socket.on) fired', payload);
      console.log('joinedNames', joinedNames);
      setjoinedNames(payload);
    });
  }, []);

  useEffect(() => {
    console.log('Dashboard useEffect for orderSubmitted fired');
    socket.on('orderSubmitted', payload => {
      console.log('Dashboard orderSubmitted listener fired', payload);
      const names = [...joinedNames];
      console.log('Current joined names: ', names);
      for (let i = 0; i < names.length; i++) {
        if (names[i].id === payload.id) {
          console.log('match in loop');
          names[i].submitted = true;
          setjoinedNames(names);
        }
      }
    });
  });

  const whoJoined = joinedNames.map((item, index) => {
    console.log('whoJoined mapping: ', item.submitted);
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

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

// state to hold the linked guests

const Dashboard = () => {
  const [joinedNames, setjoinedNames] = useState([]);

  useEffect(() => {
    socket.on('onJoin', payload => {
      console.log('name: ', payload);
      setjoinedNames([...joinedNames, payload]);
    });
  });

  useEffect(() => {
    socket.on('orderSubmitted', payload => {
      console.log('name submitted: ', payload);
      const names = [...joinedNames];
      for (let i = 0; i < names.length; i++) {
        if (names[i].name === payload.guestName) {
          names[i].submitted = true;
          setjoinedNames(names);
        }
      }
    });
  });

  // maping function
  const whoJoined = joinedNames.map((item, index) => {
    return (
      item.submitted ? <li key={index}>{item.name} Completed Order </li> : <li key={index}>{item.name} joined the session and is ordering food </li>
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

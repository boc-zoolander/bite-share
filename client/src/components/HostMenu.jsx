import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

const HostMenu = ({ guests, menu, setTopLevelState }) => {
  const [currentName, setCurrentName] = useState('');

  // functions here

  useEffect(() => {
    socket.on('orderSubmitted', payload => {
      console.log('Orders: ', payload);
      // define current guests as var
      // Add guest object with order and name from payload to variable (use same duplicate check as below)
      // set top level guests state
    });
  });

  const sendPaid = (event) => {
    event.preventDefault();
    // this is where we will send on socket
    socket.emit('paid', { ready });
    setMessage('');
  };

  // EVENT HANDLERS
  const onChange = (event) => {
    setCurrentName(event.target.value);
    onCloseClick();
    event.preventDefault();
  };

  const addItem = (item) => {
    const guestArray = [...guests];
    for (let i = 0; i < guestArray.length; i++) {
      if (guestArray[i].guestName === currentName) {
        if (guestArray[i].order.find(menuItem => menuItem.name === item.name)) {
          alert('Item already added');
          return;
        }
        guestArray[i].order.push(item);
        setTopLevelState('guests', guestArray);
        return;
      }
    }
  };

  const menuItems = menu.menu_sections.map((section, i) => {
    return (
      <details key={i}>
        <summary> {section.section_name} </summary>
        <ul>
        {section.menu_items.map((item, j) => {
          return (
            <li key={j}>
              {item.name} ${item.price}
              <button type='button' onClick={() => { addItem(item); }}> + </button>
            </li>
          );
        })}
        </ul>
      </details>
    );
  });

  const currentObj = guests.find(element => element.guestName === currentName) || { order: [] };
  const currentItems = currentObj.order.map((item, i) => {
    return <span key={i}> {item.name} </span>;
  }) || '';

  const guestNames = guests.map((item, i) => {
    return (
      <button key={i} type='button' className='link' value={item.guestName} onClick={onChange}> {item.guestName} </button>
    );
  });

  return (
    <div>

      <h2> Dashboard </h2>
      {/* RENDER GUESTS WHO HAVE JOINED AND STATUS */}

      <h2>Current Items for {currentName}</h2>
        {currentItems}
      <div>
        {menuItems}
      </div>
      <Link to="/split-bill">
        <input type="submit" value="Next" />
      </Link>
    </div>
  );
};

HostMenu.propTypes = {
  setTopLevelState: PropTypes.func.isRequired,
  guests: PropTypes.array.isRequired,
  menu: PropTypes.array.isRequired
};

export default HostMenu;

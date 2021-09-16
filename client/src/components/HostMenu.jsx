import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Dashboard from './Dashboard.jsx';

const url = 'http://localhost:8080';
const socket = io(url);

const HostMenu = ({ guests, menu, setTopLevelState }) => {
  const [currentName, setCurrentName] = useState('');

  // functions here

  useEffect(() => {
    socket.on('orderSubmitted', payload => {
      console.log('Orders: ', payload);
      // define current guests as var
      // Add guest object with order and name from payload to variable (check for duplicates once ID is part of this)
      const guestArray = [...guests, payload];
      // set top level guests state
      setTopLevelState('guests', guestArray);
    });
  });

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

  const onModalClick = (event) => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    event.preventDefault();
  };

  const onCloseClick = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  };

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
      <button id='selectGuestButton' onClick={onModalClick}> Select a guest and add item </button>
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={onCloseClick}>&times;</span>
          {guestNames}
        </div>
      </div>
      <h2> Dashboard </h2>
      {/* RENDER GUESTS WHO HAVE JOINED AND STATUS */}
      <Dashboard />

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

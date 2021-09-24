import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Dashboard from './Dashboard.jsx';

const url = 'http://localhost:8080';
const socket = io(url);

const HostMenu = ({ guests, menu, setTopLevelState, sessionId }) => {
  const [currentName, setCurrentName] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { sessionId });
  }, []);

  useEffect(() => {
    socket.emit('hostJoined', { sessionId });
  }, []);

  useEffect(() => {
    setCurrentName(guests[0].guestName);
  }, []);

  const onChange = (event) => {
    setCurrentName(event.target.value);
    onCloseClick();
    event.preventDefault();
  };

  const addItem = (item) => {
    const guestArray = [...guests];
    for (let i = 0; i < guestArray.length; i++) {
      if (guestArray[i].guestName === currentName) {
        const guestOrder = guestArray[i].order;
        for (let j = 0; j < guestOrder.length; j++) {
          if (guestOrder[j].name === item.name) {
            guestOrder[j].qty += 1;
            setTopLevelState('guests', guestArray);
            return;
          }
        }
        item.qty = 1;
        guestOrder.push(item);
        setTopLevelState('guests', guestArray);
        return;
      }
    }
  };

  const menuItems = menu.map((section, i) => {
    return (
      <details key={i}>
        <summary> {section.section_name} </summary>
        <ul>
        {section.menu_items.map((item, j) => {
          return (
            <li className="menu-item" key={j}>
              <div className="menu-item__details">
                <p className="menu-item__name">{item.name}</p>
                <p className="menu-item__price">${item.price}</p>
              </div>
              <button type='button' className="menu-item__add" onClick={() => { addItem(item); }}> + </button>
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
  const currentItems = currentObj.order.map((item, i) => <span key={i}> {item.name} {item.qty} </span>);

  const guestNames = guests.map((item, i) => <button key={i} type='button' className='link' value={item.guestName} onClick={onChange}> {item.guestName} </button>);

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
        <Dashboard guests={guests} sessionId={sessionId} setTopLevelState={setTopLevelState} />
      <h2>Current Items for {currentName}</h2>
        {currentItems}
      <div>
        {menuItems}
      </div>
      <Link to="/split-bill" className="button-link">
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

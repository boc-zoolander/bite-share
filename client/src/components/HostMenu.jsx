import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Dashboard from './Dashboard.jsx';

const url = 'http://localhost:8080';
const socket = io(url);

const HostMenu = ({ guests, menu, setTopLevelState, sessionId }) => {
  const [currentName, setCurrentName] = useState('');
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    socket.emit('joinRoom', { sessionId });
  }, []);

  useEffect(() => {
    socket.emit('hostJoined', { sessionId });
  }, []);

  useEffect(() => {
    setCurrentName(guests[0].guestName);
    setCurrentId(guests[0].id);
  }, []);

  const onChange = (event) => {
    setCurrentName(event.target.textContent);
    setCurrentId(Number(event.target.value));
    onCloseClick();
    event.preventDefault();
  };

  const onModalClick = (event) => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    event.preventDefault();
  };

  const onCloseClick = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  };

  const addItem = (item) => {
    const guestArray = [...guests];
    for (let i = 0; i < guestArray.length; i++) {
      if (guestArray[i].id === currentId) {
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

  const deleteItem = (item) => {
    const guestArray = [...guests]; // entire guest array (array of objs)
    for (let i = 0; i < guestArray.length; i++) {
      if (guestArray[i].id === currentId) {
        const guestOrder = guestArray[i].order; // order array for selected person
        for (let j = 0; j < guestOrder.length; j++) {
          if (guestOrder[j].name === item.name) {
            if (guestOrder[j].qty === 1) {
              guestOrder.splice(j, 1);
            } else {
              guestOrder[j].qty -= 1;
            }
            guestArray[i].order = guestOrder;
            setTopLevelState('guests', guestArray);
          }
        }
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
              <button type='button' className='menu-item__add' onClick={() => { addItem(item); }}> + </button>
            </li>
          );
        })}
        </ul>
      </details>
    );
  });

  const currentObj = guests.find(element => element.id === currentId) || { order: [] };
  const currentItems = currentObj.order.map((item, i) => <li key={i}> {item.name} ({item.qty}) <button type='button' className='menu-item__minus' onClick={() => { deleteItem(item); }}> − </button></li>);
  const guestNames = guests.map((item, i) => <button key={i} type='button' className='link' value={item.id} onClick={onChange}> {item.guestName} </button>);

  return (
    <div>
      <h1>Bite Share</h1>
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={onCloseClick}>&times;</span>
          {guestNames}
        </div>
      </div>
      <h2> Active Guests </h2>
        <Dashboard guests={guests} sessionId={sessionId} setTopLevelState={setTopLevelState} />
      <button id='selectGuestButton' onClick={onModalClick}> Modify Submitted Orders </button>
      <h2>Current Items for {currentName}</h2>
      <div className='user-order'><ul>{currentItems}</ul></div>
      <div>
        {menuItems}
      </div>
      <Link to="/split-bill" className="button-link">
        <input id="summary-split-button" type="submit" value="See Summary and Split Bill" />
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

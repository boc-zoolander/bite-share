import React, { useState, useEffect } from 'react';
import ThankYou from './ThankYou.jsx';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);

const GuestMenu = ({ guests, menu, sessionId }) => {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    socket.emit('joinRoom', { sessionId });
  }, []);

  useEffect(() => {
    socket.emit('joinSession', { id: guests[0].id, guestName: guests[0].guestName, submitted: false, sessionId });
  }, []);

  const menuItems = menu.map((section, i) => {
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

  const currentItems = currentOrder.map((item, i) => {
    return <li key={i}> {item.name} ({item.qty}) <button type='button' onClick={() => { deleteItem(item); }}> − </button> </li>;
  }) || null;

  const addItem = (item) => {
    const order = [...currentOrder];
    for (let i = 0; i < order.length; i++) {
      if (order[i].name === item.name) {
        order[i].qty += 1;
        setCurrentOrder(order);
        return;
      }
    }
    item.qty = 1;
    order.push(item);
    setCurrentOrder(order);
  };

  const deleteItem = (item) => {
    const order = [...currentOrder]
    //loop over the oder
    for (let i = 0; i < order.length; i++) {
     //if the currernt order item === the item
     if (order[i].name === item.name) {
       //if the order item quanity === 1
       if (order[i].qty === 1) {
         //splice at i
         order.splice(i, 1);
         //otherwise
        } else {
           // order item quanity - 1
           order[i].qty -= 1
        }
          //set the state again
          setCurrentOrder(order);
     }

    }

  };

  const submitOrder = () => {
    socket.emit('submitOrder', { id: guests[0].id, guestName: guests[0].guestName, order: currentOrder, sessionId: sessionId });
    setSubmitted(true);
  };

  return (
    submitted
      ? <ThankYou />
      : <div>
      <h2>Current Items for {guests[0].guestName}</h2>
        <div className='user-order'>
          <ul>
           {currentItems}
          </ul>
        </div>
      <div>
        {menuItems}
      </div>
      <button type='submit' onClick={submitOrder}> Submit final order </button>
    </div>
  );
};

export default GuestMenu;

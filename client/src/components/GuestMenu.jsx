import React, { useState, useEffect } from 'react';
import ThankYou from './ThankYou.jsx';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);
// Needs to get menu from server
// Needs to render menu
// Local hook for this guest's order
// submit button to send order to server
//    Should inform host using socket.io
// For now just pass menu in as prop

const GuestMenu = ({ guests, joinName, menu, sessionId }) => {
  // state declare here
  const [currentOrder, setCurrentOrder] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    socket.emit('joinRoom', { sessionId });
  });

  useEffect(() => {
    console.log('GuestMenu useEffect for joinSession: ', { guestName: guests[0].guestName, submitted: false, sessionId });
    socket.emit('joinSession', { guestName: guests[0].guestName, submitted: false, sessionId });
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
    return <span key={i}> {item.name} {item.qty}</span>;
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

  const submitOrder = () => {
    console.log('Guest submitted order');
    socket.emit('submitOrder', { id: guests[0].id, guestName: guests[0].guestName, order: currentOrder, sessionId: sessionId });
    setSubmitted(true);
  };

  return (
    submitted
      ? <ThankYou />
      : <div>
      <h2>Current Items for {guests[0].guestName}</h2>
        {currentItems}
      <div>
        {menuItems}
      </div>
      <button type='submit' onClick={submitOrder}> Submit final order </button>
    </div>
  );
};

export default GuestMenu;

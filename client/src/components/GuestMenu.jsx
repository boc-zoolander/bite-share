import React, { useState } from 'react';
import ThankYou from './ThankYou.jsx';
import Menu from '../../../server/user_db_routes/testgetrestaurant_1.js';
import io from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = io(url);
// Needs to get menu from server
// Needs to render menu
// Local hook for this guest's order
// submit button to send order to server
//    Should inform host using socket.io
// For now just pass menu in as prop

const GuestMenu = ({ joinName }) => {
  // state declare here
  const [currentOrder, setCurrentOrder] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Map Menu (prop or import for now) items
  const menuItems = Menu.result.menus[0].menu_sections.map((section, i) => {
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

  // Map currentOrder
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
    socket.emit('orderSubmitted', { guestName: joinName, order: currentOrder });
    setSubmitted(true);
  };

  return (
    submitted
      ? <ThankYou />
      : <div>
      <h2>Current Items for {joinName}</h2>
        {currentItems}
      <div>
        {menuItems}
      </div>
      <button type='submit' onClick={submitOrder}> Submit final order </button>
    </div>
  );
};

export default GuestMenu;

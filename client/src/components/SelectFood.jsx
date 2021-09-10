import React, { useState } from 'react';
// import PropTypes from 'prop-types';

/**
 * Props: guests (array of guest object and current orders)
 *          {
 *            guestName: 'Person',
 *          }
 *        host
 *        menu
 *
 * Drop-down with guest names (and host name) from guests and host prop (mapping function). Select tags.
 * onChange handler  to set hook/state name
 */

const SelectFood = ({ guests, host, menu }) => {
  const [currentName, setCurrentName] = useState('');
  const [currentOrder, setCurrentOrder] = useState([]);

  // ADD USEEFFECT TO DISPLAY CURRENT ORDER (IN CASE USER RETURNS TO PERSON)

  // MAP guest names, menu, and current order
  const guestNames = guests.map((item, i) => {
    return (
      <option key={i} value={item.guestName} > {item.guestName} </option>
    );
  });

  const menuItems = menu.menu_sections.map((section, i) => {
    return (
      <details key={i}>
        <summary> {section.section_name} </summary>
        {section.menu_items.map((item, j) => {
          return (
            <div key={j}>
              {item.name}
              {item.price}
              <button type='button' onClick={() => { addItem(item); }}> + </button>
            </div>
            // price
            // add to order button
          );
        })}
      </details>
    );
  });

  const currentItems = currentOrder.map((item, i) => {
    return <span key={i}> {item.name} </span>;
  });

  // EVENT HANDLERS
  const onChange = (event) => {
    setCurrentName(event.target.value);
    event.preventDefault();
  };

  const addItem = (item) => {
    const order = [...currentOrder];
    order.push(item);
    setCurrentOrder(order);
  };

  const addOrder = () => {
    //pass down function from APP

  };

  return (
    <div>
      <label htmlFor='guestName' > Add items for </label>
      <select name='guestName' onChange={onChange}>
        <option value='' selected disabled hidden > Choose Guest </option>
        <option value={host.name}> {host.name} </option>
        {guestNames}
      </select>
      {/* PLACEHOLDER FOR SELECTED ITEMS BEFORE PUSHING TO APP STATE (LOCAL HOOK) */}
      <h4> Current Items for {currentName} </h4>
        {currentItems}
      <div>
        {menuItems}
      </div>
    </div>
  );
};

export default SelectFood;

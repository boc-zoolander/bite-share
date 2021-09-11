import React, { useState } from 'react';
// import PropTypes from 'prop-types';

const SelectFood = ({ guests, host, menu, addToOrder }) => {
  const [currentName, setCurrentName] = useState('');

  const guestNames = guests.map((item, i) => {
    return (
      <option key={i} value={item.guestName} > {item.guestName} </option>
    );
  });

  const menuItems = menu.menu_sections.map((section, i) => {
    return (
      <details key={i}>
        <summary> {section.section_name} </summary>
        <ul>
        {section.menu_items.map((item, j) => {
          return (
            <li key={j}>
              {item.name}
              {item.price}
              <button type='button' onClick={() => { addItem(item); }}> + </button>
            </li>
          );
        })}
        </ul>
      </details>
    );
  });

  // USE ID!
  const currentObj = guests.find(element => element.guestName === currentName) || { order: [] };
  const currentItems = currentObj.order.map((item, i) => {
    return <span key={i}> {item.name} </span>;
  }) || '';

  // EVENT HANDLERS
  const onChange = (event) => {
    setCurrentName(event.target.value);
    event.preventDefault();
  };

  const addItem = (item) => {
    addToOrder(currentName, item);
  };

  return (
    <div>
      <label htmlFor='guestName' > Add items for </label>
      <select name='guestName' onChange={onChange}>
        <option value='' selected disabled hidden > Choose Guest </option>
        <option value={host.name}> {host.name} </option>
        {guestNames}
      </select>
      <h4> Current Items for {currentName} </h4>
        {currentItems}
      <div>
        {menuItems}
      </div>
    </div>
  );
};

export default SelectFood;

import React, { useState } from 'react';
// import PropTypes from 'prop-types';

const SelectFood = ({ guests, host, menu, addToOrder }) => {
  const [currentName, setCurrentName] = useState('');

  // EVENT HANDLERS
  const onChange = (event) => {
    setCurrentName(event.target.value);
    onCloseClick();
    event.preventDefault();
  };

  const addItem = (item) => {
    addToOrder(currentName, item);
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
      <h4> Current Items for {currentName} </h4>
        {currentItems}
      <div>
        {menuItems}
      </div>
    </div>
  );
};

export default SelectFood;

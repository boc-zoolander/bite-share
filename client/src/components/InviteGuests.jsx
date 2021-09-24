import React from 'react';
import { Link } from 'react-router-dom';



const InviteGuests = ({ sessionId }) => {
  return (
    <div>
      <h2>Invite your friends</h2>
        {sessionId}
      <Link to='/host-menu' className="button-link">
        <button type='button'>Make Your Order</button>
      </Link>
    </div>
  );
};


export default InviteGuests;
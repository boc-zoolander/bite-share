import React from 'react';
import { Link } from 'react-router-dom';



const InviteGuests = ({ sessionId }) => {
  return (
    <div>
      <h1>Bite Share</h1>
      <h2>Invite Your Friends</h2>
        <h4>Your guests can join your session using this code:</h4>
        <h5>{sessionId}</h5>
      <Link to='/host-menu' className="button-link">
        <button type='button'>Start Your Order</button>
      </Link>
    </div>
  );
};


export default InviteGuests;
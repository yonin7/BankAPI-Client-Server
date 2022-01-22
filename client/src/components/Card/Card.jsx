import React from 'react';

const Card = ({ user }) => {
  return (
    <div className="container">
      <h5> user.name</h5> <h5> user.cash</h5>
      <h5> user.credit</h5>{' '}
    </div>
  );
};

export default Card;

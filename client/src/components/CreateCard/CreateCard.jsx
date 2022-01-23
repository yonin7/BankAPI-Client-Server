import React from 'react';

const CreateCard = () => {
  return (
    <div className="inputcontainer">
      <h5>passportID</h5>
      <input type="text" onChange={(e) => handleUpdate(e.target.value)} />
      <h5> name</h5>{' '}
      <input type="text" onChange={(e) => handleUpdate(e.target.value)} />
      <h5> cash</h5>
      <input type="text" onChange={(e) => handleUpdate(e.target.value)} />
      <h5> credit</h5>{' '}
      <input type="text" onChange={(e) => handleUpdate(e.target.value)} />
    </div>
  );
};

export default CreateCard;


import React from 'react';

import './button.css';
const ButtonGroup = () => {
  return (
    <div className="buttonContainer">
      <button className="year">This Year</button>
      <button className="year">This Month</button>
      <button className="year">This Week</button>
      <button className="year">Today</button>
    </div>
  );
};

export default ButtonGroup;
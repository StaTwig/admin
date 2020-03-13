
import React from 'react';

import './button.scss';
const ButtonGroup = () => {
  return (
    <div className="buttonContainer">
      <button class="year">This Year</button>
      <button class="year">This Month</button>
      <button class="year">This Week</button>
      <button class="year">Today</button>

    </div>
  );
};

export default ButtonGroup;
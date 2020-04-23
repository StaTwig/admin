import React from "react";

import './style.scss';

const Tabs = props => {
  return (
    <div className="tabs">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active" href="#">Recent Shipments</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Purchase Orders</a>
        </li>
      </ul>
    </div>
  );
};



export default Tabs;


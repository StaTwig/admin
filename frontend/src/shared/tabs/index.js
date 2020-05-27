import React, { useState } from "react";
import './style.scss';

const Tabs = props => {
 return (
    <div className="tabs">
      <ul className="nav nav-pills">
        <li className="nav-item " onClick = {() => props.setvisible(false)}>
          <a className="nav-link">Recent Shipments</a>
        </li>
        <li className="nav-item" onClick = {() => props.setvisible(true)}>
          <a className="nav-link">Purchase Orders</a>
        </li>
      </ul>
    </div>
  );
};



export default Tabs;


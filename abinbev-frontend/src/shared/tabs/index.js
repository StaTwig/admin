import React, { useState } from "react";
import './style.scss';

const Tabs = props => {
 return (
    <div className="tabs">
      <ul className="nav nav-pills">
        <li className={ props.visible ? "nav-item" : "nav-item-active"} onClick = {() => props.setvisible(false)}>
          <a className="nav-link">Recent Shipments</a>
        </li>
        <li className= { props.visible ? "nav-item-active " : "nav-item"} onClick = {() => props.setvisible(true)}>
          <a className="nav-link">Purchase Orders</a>
        </li>
      </ul>
    </div>
  );
};



export default Tabs;


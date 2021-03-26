import React, { useState } from "react";
import './style.scss';

const Tabs = props => {
 return (
    <div className="tabs">
      <ul className="nav nav-pills">
        <li className={ props.visible === "one" ? "nav-item-active":"nav-item"} onClick = {() => props.setvisible('one')}>
          <a className={props.visible === "one" ?  "nav-link":"nav-link text-secondary"}>Orders Sent</a>
        </li>
        <li className= { props.visible === "two"? "nav-item-active " : "nav-item"} onClick = {() => props.setvisible('two')}>
          <a className={props.visible === "two"? "nav-link" : "nav-link text-secondary"}>Orders Received</a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
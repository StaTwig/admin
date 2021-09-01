import React, { useState } from "react";
import './style.scss';

const Tabs = props => {
  return (
    <div className="tabs">
      <ul className="nav nav-pills">
        {props.isAuthenticated('inboundShipments') &&
          <li className={props.visible === "one" ? "nav-item-active" : "nav-item"} onClick={() => { props.setvisible('one'); props.setShowExportFilter(false) }}>
            <a className={props.visible === "one" ? "nav-link" : "nav-link text-secondary"}>Inbound</a>
          </li>
        }
        {props.isAuthenticated('outboundShipments') && 
          <li className={props.visible === "two" ? "nav-item-active " : "nav-item"} onClick={() => { props.setvisible('two'); props.setShowExportFilter(false) }}>
            <a className={props.visible === "two" ? "nav-link" : "nav-link text-secondary"}>Outbound</a>
          </li>
        }
      </ul>
    </div>
  );
};



export default Tabs;


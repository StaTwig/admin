import React, { useState } from "react";
import searchingIcon from '../../../assets/icons/searching@2x.png';
import './style.scss';

const Tabs = props => {
  const onSeach = () => {
   props.setDashVisible(true);
   props.setContent(true);
  };

 return (
    <div className="dashboardtabs">
      <ul className="nav nav-pills mb-2">
        <li className={ props.visible ? "nav-item" : "nav-item-active"} onClick = {() => props.setVisible(false)}>
          <a className="nav-link">Warehouse</a>
        </li>
        <li className= { props.visible ? "nav-item-active " : "nav-item"} onClick = {() => props.setVisible(true)}>
          <a className="nav-link">Shipment In-Transit</a>
        </li>
        <li>
          <div className="search-form">
          <input
            type="text"
            // value={search}
            //onChange={onSearchChange}
            placeholder="Enter Warehouse ID"
            className="form-control search-field"
          />
          <img src={searchingIcon} onClick = {onSeach} alt="searching" />
        </div>

        </li>
        <li>
        <button className=" btn-primary btn warehouse" onClick = {()=>{
          props.setContent(false)
          props.setDashVisible(true);
        }} >Search Warehouse</button>
        </li>

      </ul>
    </div>
  );
};



export default Tabs;


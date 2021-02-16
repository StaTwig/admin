import React, { useState } from "react";
import searchingIcon from '../../../assets/icons/searching@2x.png';
import './style.scss';

const Tabs = props => {
 return (
    <div className="dashboardtabs">
      <ul className="nav nav-pills mb-2">
        <li className={ props.visible ? "nav-item" : "nav-item-active"} onClick = {() => props.setVisible(false)}>
          <a className={props.visible ? "nav-link text-secondary" : "nav-link"}>Storage Location</a>
        </li>
        <li className= { props.visible ? "nav-item-active " : "nav-item"} onClick = {() => props.setVisible(true)}>
          <a className={props.visible ? "nav-link" : "nav-link text-secondary"}>Shipment In-Transit</a>
        </li>
        <li>
          <div className="search-form">
          <input
            type="text"
            value={props.warehouseText}
            onChange={props.onWarehouseChange}
            placeholder={props.visible?"Enter Shipment ID":"Enter Warehouse ID"}
            className="form-control search-field"
          />
          <img src={searchingIcon} onClick = {props.onSearchClick} alt="searching" />
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


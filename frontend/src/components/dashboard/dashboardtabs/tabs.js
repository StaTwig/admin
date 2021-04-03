import React, { useState } from "react";
import searchingIcon from '../../../assets/icons/searching@2x.png';
import './style.scss';

const Tabs = props => {
  const { filteredWareHouses, visible, setVisible, warehouseText, onWarehouseChange, onSearchClick, setContent, setDashVisible } = props;
  const [isClicked, setIsClicked] = useState(false);

 return (
    <div className="dashboardtabs">
      <ul className="nav nav-pills mb-2">
        <li className={ visible ? "nav-item" : "nav-item-active"} onClick = {() => setVisible(false)}>
          <a className={visible ? "nav-link text-secondary" : "nav-link"}>Storage Location</a>
        </li>
        <li className= { visible ? "nav-item-active " : "nav-item"} onClick = {() => setVisible(true)}>
          <a className={visible ? "nav-link" : "nav-link text-secondary"}>Shipment</a>
        </li>
        <li>
          <div className="search-form">
          <input
            type="text"
            value={warehouseText}
            onChange={(e) => { if(isClicked) setIsClicked(false); onWarehouseChange(e.target.value); }}
            placeholder={visible?"Enter Shipment ID":"Enter Location ID"}
            className="form-control search-field"
          />
          <img src={searchingIcon} onClick = {() => onSearchClick(warehouseText)} alt="searching" />
           {warehouseText != '' && !isClicked && 
             <div className="bg-white m-1 p-2 position-absolute rounded" style={{width:250}}>
               {filteredWareHouses?.map((warehouse, index) => (
                 <p key={index} className="p-1 m-0 cursorP" onClick={() => { setIsClicked(true); onWarehouseChange(warehouse.title); onSearchClick(warehouse.id); }}>{warehouse.title}</p>
               ))}
             </div>
           }
        </div>

        </li>
        <li>
        <button className=" btn-primary btn warehouse" onClick = {()=>{
          setContent(false)
          setDashVisible(true);
        }} >Search Location</button>
        </li>

      </ul>
    </div>
  );
};



export default Tabs;

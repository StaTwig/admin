import React, { useState,useEffect} from 'react';
import DropdownButton from '../../../shared/dropdownButtonGroup';
//import calenderBlue from '/../../assets/icons/calendar-blue.svg';
//import downArrow from '/../../assets/icons/up-and-down-dark.svg';
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {getProducts,getManufacturers} from '../../../actions/poActions';

import './style.scss';

const EditRow = props => {

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts();
      const manufacturerResult = await getManufacturers();
      setProducts(result);
      setManufacturers(manufacturerResult);
    }
    fetchData();
  },[]);

  const onChange = date => setManufacturingDate(date)
  const onChange1 = date=> setExpiryDate(date)
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const {
    manufacturerName,
    setManufacturerName,
    productName,
    setProductName,
    quantity,
    setQuantity,
    manufacturingDate,
    setManufacturingDate,
    expiryDate,
    setExpiryDate,
    storageConditionmin,
    setStorageConditionmin,
    storageConditionmax,
    setStorageConditionmax,
    batchNumber,
    setBatchNumber,
    serialNumber,
    setSerialNumber,
    
  } = props;

  

  return (
          <div className="rTableRow">
            <div className="rTableCell">
              <div className="square-box" />
              <DropdownButton
                name={productName}
                onSelect={item => setProductName(item)}
                groups={products}
                
              />
            </div>
            <div className="rTableCell">
              <DropdownButton
                name={manufacturerName}
                onSelect={item => setManufacturerName(item.replace( '<small>Qty: 2148</small>', ''))}
                groups={manufacturers}
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                type="number" 
                min="0"
                onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190||e.keyCode === 189
                  ||e.keyCode === 187||e.keyCode === 40||e.keyCode === 38) && e.preventDefault() }
                className="form-field"
                placeholder="Enter Quantity"
                value = {quantity}
                onChange={e => setQuantity(e.target.value)}
                />
              </div>
            </div>
           {/* <div className="rTableCell">
              <div className="input-group">

              <DatePicker
              className="form-field"
              onChange = {onChange}
              selected = {manufacturingDate ? new Date(Date.parse(manufacturingDate)) : manufacturingDate}
              dateFormat="MM/yyyy"
              placeholderText="Enter Mfg Date"
              showMonthYearPicker
              showFullMonthYearPicker
               isClearable
              />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
               <DatePicker
              className="form-field"
              isClearable
              placeholderText="Enter Exp Date"
              dateFormat="MM/yyyy"
              onChange = {onChange1}
              selected = {expiryDate ? new Date(Date.parse(expiryDate)) : expiryDate}
              showMonthYearPicker
              showFullMonthYearPicker
              />
              <div>{console.log("expiry date", expiryDate , new Date(Date.parse(expiryDate)))}</div> 
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="number"
                  className="form-field1"
                  placeholder="Min"
                  min="0"
                  value={storageConditionmin}
                  onChange={e => setStorageConditionmin(e.target.value)}
                
                />
                  <div className="divider mr-auto">°C</div>
                 <input
                  type="number"
                  className="form-field1"
                  placeholder="Max"
                  min="0"
                  value={storageConditionmax}
                  onChange={e => setStorageConditionmax(e.target.value)}
                />
                   <div className="divider mr-auto">°C</div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="text"
                  className="form-field"
                  placeholder="Enter Batch Number"
                  value={batchNumber}
                  onChange={e => setBatchNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input
                  type="text"
                  className="form-field"
                  placeholder="Enter Serial Numbers"
                  value={serialNumber}
                  onChange={e => setSerialNumber(e.target.value)}
                />
               
              </div>
            </div>*/}
          </div>
        
    
  );
};

export default EditRow;



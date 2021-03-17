import React, { useState, useEffect } from 'react';
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from '../../assets/icons/calendar-blue.svg';
import downArrow from '../../assets/icons/up-and-down-dark.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './style.scss';

const EditRow = props => {
  const {
    manufacturer,
    productName,
    quantity,
    manufacturingDate,
    expiryDate,
    batchNumber,
    serialNumber,
    products,
    handleInventoryChange,
    idx,
  } = props;

  const numbersOnly = (e) => {
    // Handle paste
    if (e.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = e.keyCode || e.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      e.returnValue = false;
      if(e.preventDefault) e.preventDefault();
    }
  }

  return (
    <div className="d-flex inp-grp justify-content-between mb-3 flex-row bg-white">
      <div className="w-15 pt-3 pb-3 border-right">
        <div className="square-box" />
        <DropdownButton
          name={productName}
          onSelect={item => handleInventoryChange(idx, 'productName', item)}
          groups={products}
        />
      </div>
      <div className="w-15 pt-3 pb-3 border-right">
        <div className="">
          <input
            type="text"
            className="form-control"
            placeholder="Manufacturer"
            value={manufacturer}
            disabled
          />
        </div>
      </div>
      <div className="w-10 pt-3 pb-3 border-right">
        <div className="">
          <input
            type="text"
            onKeyPress={numbersOnly}
            className="form-control"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={e =>
              handleInventoryChange(idx, 'quantity', e.target.value)
            }
          />
        </div>
      </div>
      <div className="w-10 pt-3 pb-3 border-right">
        <div className="">
          <DatePicker
            className="form-control"
            onChange={date =>
              handleInventoryChange(idx, 'manufacturingDate', date)
            }
            selected={
              manufacturingDate
                ? new Date(Date.parse(manufacturingDate))
                : manufacturingDate
            }
            onKeyDown={e =>
              (e.keyCode != 8) &&
               e.preventDefault()
             }
            dateFormat="MM/yyyy"
            placeholderText="Enter Mfg Date"
            showMonthYearPicker
            showFullMonthYearPicker
          />
        </div>
      </div>
      <div className="w-10 pt-3 pb-3 border-right">
        <div className="">
          <DatePicker
            className="form-control"
            placeholderText="Enter Exp Date"
            dateFormat="MM/yyyy"
            onChange={date => handleInventoryChange(idx, 'expiryDate', date)}
            selected={
              expiryDate ? new Date(Date.parse(expiryDate)) : expiryDate
            }
            onKeyDown={e =>
              (e.keyCode != 8) &&
               e.preventDefault()
             }
            showMonthYearPicker
            showFullMonthYearPicker
          />
        </div>
      </div>
      <div className="w-10 pt-3 pb-3 border-right">
        <div className="">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Batch Number"
            value={batchNumber}
            onChange={e =>
              handleInventoryChange(idx, 'batchNumber', e.target.value)
            }
          />
        </div>
      </div>
      <div className="w-15 pt-3 pb-3 ">
        <div className="">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Serial Numbers"
            value={serialNumber}
            onChange={e =>
              handleInventoryChange(idx, 'serialNumber', e.target.value)
            }
          />
        </div>
      </div>
      <div className="pl-1 pt-4 bg-light">
        <span className=" border cursorP border-danger text-danger pl-2 pr-2 pt-1 pb-1 rounded-circle" onClick={() => props.onRemoveRow(idx)}>x</span>
      </div>
    </div>
  );
};

export default EditRow;

import React, { useState, useEffect } from 'react';
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from '../../assets/icons/calendar-blue.svg';
import downArrow from '../../assets/icons/up-and-down-dark.svg';
import Delete from '../../assets/icons/Delete.png';
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

  const [addMore, setAddMore] = useState(false);

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
    <div className="d-flex inp-grp  mb-3 flex-row">
      <div className={`${addMore ? `w-15` : `w-20`} pt-1 pb-1 border-right bg-white`}>
        <div className="square-box" />
        <DropdownButton
          name={productName}
          onSelect={item => handleInventoryChange(idx, 'productName', item)}
          groups={products}
        />
      </div>
      <div className={`${addMore ? `w-15` : `w-20`} mt-1 mb-1 border-right`}>
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
      <div className={`${addMore ? `w-10` : `w-20`} mt-1 mb-1 border-right`}>
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
      {addMore && (
        <>
        <div className="w-10 mt-1 mb-1 border-right">
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
        <div className="w-10 mt-1 mb-1 border-right">
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
        <div className="w-10 mt-1 mb-1 border-right">
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
        <div className="w-15 mt-1 mb-1 ">
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
        </>
      )}
      <div className="ml-2 bg-light align-self-center">
        <span onClick={() => props.onRemoveRow(idx)}><img className="border-none cursorP shadow p-1 rounded-circle" height="25" src={Delete} /></span>
      </div>
      {!addMore && 
        <div className="ml-2 mt-1 mb-1 ">
        <button type="button" onClick={() => { setAddMore(true); props.setVisible(true);}} className="btn text-white btn-warning ">
            <i
              className="fa fa-plus txt pr-2"
              aria-hidden="true"
            ></i>
            <span className="txt">Add More Details</span>
          </button>
        </div>
      }
    </div>
  );
};

export default EditRow;

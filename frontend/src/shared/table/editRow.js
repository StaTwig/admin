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

  return (
    <div className="rTableRow">
      <div className="rTableCell">
        <div className="square-box" />
        <DropdownButton
          name={productName}
          onSelect={item => handleInventoryChange(idx, 'productName', item)}
          groups={products}
        />
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            type="text"
            className="form-field"
            placeholder="Manufacturer"
            value={manufacturer}
            disabled
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            type="number"
            min="0"
            onKeyDown={e =>
              (e.keyCode === 69 ||
                e.keyCode === 190 ||
                e.keyCode === 189 ||
                e.keyCode === 187 ||
                e.keyCode === 40 ||
                e.keyCode === 38) &&
              e.preventDefault()
            }
            className="form-field"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={e =>
              handleInventoryChange(idx, 'quantity', e.target.value)
            }
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="input-group">
          <DatePicker
            className="form-field"
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
      <div className="rTableCell">
        <div className="input-group">
          <DatePicker
            className="form-field"
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
      <div className="rTableCell">
        <div className="form-group">
          <input
            type="text"
            className="form-field"
            placeholder="Enter Batch Number"
            value={batchNumber}
            onChange={e =>
              handleInventoryChange(idx, 'batchNumber', e.target.value)
            }
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
            onChange={e =>
              handleInventoryChange(idx, 'serialNumber', e.target.value)
            }
          />
        </div>
      </div><div className="rTableCell">
       <button onClick={() => props.onRemoveRow(idx)}>X</button>
      </div>
    </div>
  );
};

export default EditRow;

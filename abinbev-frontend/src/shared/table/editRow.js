import React, { useState, useEffect } from 'react';
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from '../../assets/icons/calendar-blue.svg';
import downArrow from '../../assets/icons/up-and-down-dark.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './style.scss';

const EditRow = props => {
  const {
    manufacturerName,
    productName,
    quantity,
    manufacturingDate,
    expiryDate,
    storageConditionmin,
    storageConditionmax,
    batchNumber,
    serialNumber,
    products,
    manufacturers,
    handleInventoryChange,
    idx,
  } = props;

  return (
    <div className="rTableRow" key={idx}>
      <div className="rTableCell">
        <div className="square-box" />
        <DropdownButton
          name={productName}
          onSelect={item => handleInventoryChange(idx, 'productName', item)}
          groups={products}
        />
      </div>
      <div className="rTableCell">
        <DropdownButton
          name={manufacturerName}
          onSelect={item =>
            handleInventoryChange(idx, 'manufacturerName', item)
          }
          groups={manufacturers}
        />
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
            showMonthYearPicker
            showFullMonthYearPicker
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            type="number"
            className="form-field1"
            placeholder="Min"
            onKeyDown={e =>
              (e.keyCode === 69 ||
                e.keyCode === 189 ||
                e.keyCode === 187 ||
                e.keyCode === 40 ||
                e.keyCode === 38) &&
              e.preventDefault()
            }
            value={storageConditionmin}
            onChange={e =>
              handleInventoryChange(idx, 'storageConditionmin', e.target.value)
            }
          />
          <div className="divider mr-auto">°C</div>
          <input
            type="number"
            className="form-field1"
            placeholder="Max"
            onKeyDown={e =>
              (e.keyCode === 69 ||
                e.keyCode === 189 ||
                e.keyCode === 187 ||
                e.keyCode === 40 ||
                e.keyCode === 38) &&
              e.preventDefault()
            }
            value={storageConditionmax}
            onChange={e =>
              handleInventoryChange(idx, 'storageConditionmax', e.target.value)
            }
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
      </div>
    </div>
  );
};

export default EditRow;

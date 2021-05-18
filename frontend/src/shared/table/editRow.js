import React, { useState, useEffect } from 'react';
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from '../../assets/icons/calendar-blue.svg';
import downArrow from '../../assets/icons/up-and-down-dark.svg';
import Delete from '../../assets/icons/Delete.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mon from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import qty from '../../assets/icons/TotalInventoryAdded_2.png';
import sdate from "../../assets/icons/ShippingDate.svg";
import Batch from '../../assets/icons/Batch.png';
import Serial from '../../assets/icons/Serial.png';

import './style.scss';

const EditRow = props => {
  const {
    manufacturer,
    productName,
    quantity,
    categories,
    manufacturingDate,
    expiryDate,
    batchNumber,
    serialNumber,
    products,
    handleInventoryChange,
    idx,
    prods,
    category,
    handleCategoryChange,
    productId,
    inventories
  } = props;

  const [addMore, setAddMore] = useState(manufacturingDate || expiryDate || batchNumber || serialNumber ? true : false);

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
    <div className={`${idx > 0 ? `borderTop` : ``}`}>
    <h6 className="ml-3 text-primary font-weight-bold">Product {idx+1}</h6>
    <div className="d-flex flex-column ml-5 itable">
      <div className="row mb-3">
        <div className={`row ${!addMore ? `col-10` : `col-12`}`}>
         <div className="col theader text-center pro"><img src={Package} width="16" height="16" /><span className="pl-3 text-muted">Product Category*</span></div>
         <div className="col-4 theader text-center pro"><img src={Package} width="16" height="16" /><span className="pl-3 text-muted">Product*</span></div>
         <div className="col theader text-center pro"><img src={mon} width="16" height="16" /><span className="pl-3 text-muted">Manufacturer</span></div>
         <div className="col theader text-center pro"><img src={qty} width="25" height="16" /><span className="pl-3 text-muted">Quantity*</span></div>
        </div> 
        </div>
        <div className="row rTable">
        <div className="rTableRow inp-grp mb-3 col row bg-white">
          <div className="col-3 align-self-center pt-1 pb-1 border-right bg-white">
            <div className="square-box" />
             <DropdownButton
                name={categories}
                onSelect={item => { handleCategoryChange(idx, item) }}
                groups={category}
              />
          </div>
          <div className="col-4 align-self-center pt-1 pb-1 border-right bg-white">
            <div className="d-flex pt-1 flex-row justify-content-between">
              <div className="title col-8 recived-text">
                <DropdownButton
                  name={productName}
                  onSelect={item => handleInventoryChange(idx, 'productName', item.name)}
                  groups={prods}
                />
              </div>
              <div className="title recived-text">{productId}</div>
            </div>
          </div>
          <div className="col mt-1 mb-1 border-right">
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
          <div className="col mt-1 mb-1 border-right">
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
        </div>
          {inventories.length > 1 &&
            <div className="m-2 pl-3 pt-1">
              <span className="del-pad shadow border-none rounded-circle mr-1" onClick={() => props.onRemoveRow(idx)}><img className="cursorP p-1" height="30" src={Delete} /></span>
            </div>
          }
        {!addMore && 
          <div className="ml-2 mt-1 pl-3 mb-1 ">
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
      </div>
      {addMore && (
      <div className="d-flex ml-4 pl-2 itable w-100">
        <div className=" rTable row col-12">
          <div className="row col-12 mb-2">
            <div className="col theader text-center pro"><img src={sdate} width="16" height="16" /><span className="pl-3 text-muted">Mfg Date</span></div>
            <div className="col theader text-center pro"><img src={sdate} width="16" height="16" /><span className="pl-3 text-muted">Exp Date</span></div>
            <div className="col theader text-center pro"><img src={Batch} width="16" height="16" /><span className="pl-3 text-muted">Batch Number</span></div>
            <div className="col theader text-center pro"><img src={Serial} width="16" height="16" /><span className="pl-3 text-muted">Serial Numbers</span></div>
          </div> 
          <div className="rTableRow inp-grp mb-3 row bg-white col-12">
            <div className="col mt-1 mb-1 border-right">
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
            <div className="col mt-1 mb-1 border-right">
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
            <div className="col mt-1 mb-1 border-right">
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
            <div className="col mt-1 mb-1 ">
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
          </div>
          
        </div>
        <div className="mt-4 pt-4">
          <span className="del-pad shadow border-none rounded-circle mr-1" onClick={() => setAddMore(false)}><img className="cursorP p-1" height="30" src={Delete} /></span>
        </div>
      </div>
      )}
    </div>  
  );
};

export default EditRow;

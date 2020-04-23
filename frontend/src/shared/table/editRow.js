import React, { useState } from 'react';
import DropdownButton from '../dropdownButtonGroup';
import calenderBlue from '../../assets/icons/calendar-blue.svg';
import downArrow from '../../assets/icons/up-and-down-dark.svg';

import './style.scss';

const EditRow = props => {

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
    storageCondition,
    setStorageCondition,
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
                groups={['bOPV', 'MMR', 'PVC', 'BCG','RV','Hep B']}
              />
            </div>
            <div className="rTableCell">
              <DropdownButton
                name={manufacturerName}
                onSelect={item => setManufacturerName(item.replace( '<small>Qty: 2148</small>', ''))}
                groups={[
                  'Bharat Biotech',
                  'Aroma Biotech',
                  'Chronly industries',
                  'GH Pharmas',
                ]}
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="number"
                  className="form-field"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input
                  type="text"
                  className="form-field"
                  placeholder="Mm/dd/yyyy"
                  value={manufacturingDate}
                  onChange={e => setManufacturingDate(e.target.value)}
                />
                <div className="input-group-append">
                  <img
                    src={calenderBlue}
                    alt="downarrow"
                    width="9"
                    height="9"
                  />
                </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="input-group">
                <input
                  type="text"
                  className="form-field"
                  placeholder="Mm/dd/yyyy"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                />
                <div className="input-group-append">
                  <img
                    src={calenderBlue}
                    alt="downarrow"
                    width="9"
                    height="9"
                  />
                </div>
              </div>
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="text"
                  className="form-field"
                  placeholder="Enter Storage Conditions"
                  value={storageCondition}
                  onChange={e => setStorageCondition(e.target.value)}
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
            </div>
          </div>
        
    
  );
};

export default EditRow;



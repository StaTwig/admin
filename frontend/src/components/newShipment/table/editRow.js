import React, { useState, useEffect } from 'react';
import './style.scss';

const EditRow = props => {

  const {
    productId,
    setProductId,
    productName,
    setProductName,
    manufacturer,
    setManufacturer,
    quantity,
    setQuantity,
    labelId,
    setLabelId


  } = props;



  return (
    <div className="rTableRow">
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Product ID"
            value={productId}
            onChange={e => setProductId(e.target.value)}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Product Name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Manufacturer"
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Quantity"
            value={labelId}
            onChange={e => setLabelId(e.target.value)}
          />
        </div>
      </div>
    </div>


  );
};

export default EditRow;



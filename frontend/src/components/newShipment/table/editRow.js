import React, { useState, useEffect } from 'react';
import './style.scss';

const EditRow = props => {

  const {
    product,
    handleQuantityChange,
    handleLabelIdChange,
    index
  } = props;



  return (
    <div className="rTableRow">
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Product ID"
            value={product.productID}
            disabled={true}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Product Name"
            value={product.productName}
            disabled={true}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Manufacturer"
            value={product.manufacturer}
            disabled={true}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Quantity"
            value={product.productQuantity}
            onChange={e => handleQuantityChange(e.target.value, index)}
          />
        </div>
      </div>
      <div className="rTableCell">
        <div className="form-group">
          <input
            className="form-field"
            placeholder="Label Id"
            value={product.labelId}
            onChange={e => handleLabelIdChange(e.target.value, index)}

          />
        </div>
      </div>
    </div>


  );
};

export default EditRow;



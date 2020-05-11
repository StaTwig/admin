import React from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss';

const ProductsTable = props => {

  const isNumberKey = (event) => {
  
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      event.preventDefault(); 
  }
  const {
    tableHeader,
    products,
    manufacturers,
    onProductSelect,
    onManufacturerSelect,
    product,
    manufacturer,
    quantity,
    onQuantityChange,
  } = props;
  return (
    <div className="table productTable">
      <div className="rTable">
        <div className="rTableHeading">
          {tableHeader &&
            tableHeader.map((item, index) => {
              return (
                <div key={index} className="rTableHead">
                  {item}
                </div>
              );
            })}
        </div>
        <div>
          <div className="rTableRow">
            <div className="rTableCell">
              <div className="square-box" />
              <DropdownButton
                groups={products}
                onSelect={onProductSelect}
                name={product}
              />
            </div>
            <div className="rTableCell">
              <DropdownButton
                groups={manufacturers}
                onSelect={onManufacturerSelect}
                name={manufacturer}
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="number"
                  onKeyPress={isNumberKey}
                  className="form-field"
                  placeholder="Enter Qunatity"
                  value={quantity}
                  onChange={onQuantityChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

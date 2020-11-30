import React from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss';

const ProductsTable = props => {

  const {
    tableHeader,
    materialId,
    onMaterialSelect,
    onProductSelect,
    onManufacturerSelect,
    product,
    products,
    manufacturer,
    manufacturers,
    quantity,
    onQuantityChange,
  } = props;
  return (
    <div className="table productTable mt-2">
      <div className="rTable">
        <div className="rTableHeading">
          {tableHeader &&
            tableHeader.map((item, index) => {
              return (
                <div key={index} className="rTableHead pro">
                  {item}
                </div>
              );
            })}
        </div>
        <div>
          <div className="rTableRow">
          <div className="rTableCell">
                <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Material Id"
              onChange={onMaterialSelect}
              value={materialId}
            />

            </div>
            <div className="rTableCell">
            <DropdownButton
                groups={products}
                onSelect={onProductSelect}
                name={product}
                className="text"
              />
            </div>
            <div className="rTableCell">
            <DropdownButton
                groups={manufacturers}
                onSelect={onManufacturerSelect}
                name={manufacturer}
                className="text"
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="number"
                  min="0"
                  onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190||e.keyCode === 189
                  ||e.keyCode === 187||e.keyCode === 40||e.keyCode === 38) && e.preventDefault() }
                  className="form-control"
                  placeholder="Enter Quantity"
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

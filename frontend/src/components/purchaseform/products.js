import React from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss';

const tableHeader = ['Product ID', 'Product Name', 'Manufacturer', 'Quantity'];

const ProductsTable = props => {
  const {
    onProductSelect,
    product,
    products,
    quantity,
    onQuantityChange,
    index
  } = props;
  const productIds = products.map(product => product.id);
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
              <DropdownButton
                groups={productIds}
                onSelect={ item => onProductSelect(item, index)}
                name={product.productId}
                className="text"
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <label>{product.productName} </label>
              </div>
            </div>

            <div className="rTableCell">
              <div className="form-group">
                <label>{product.manufacturer} </label>
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
                  className="form-control"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={item => onQuantityChange(item, index)}
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

import React from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss';
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
    
          <div className="rTableRow">
            <div className="rTableCell">
              <DropdownButton
                groups={productIds}
                onSelect={item => onProductSelect(item, index)}
                name={product.productId}
                className="text"
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="Product Name"
                  placeholder="Product Name"
                  value={product.productName}
                />
              </div>
            </div>

            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="Product Name"
                  placeholder="Manufacturer"
                  value={product.manufacturer}
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
                  className="form-control"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={item => onQuantityChange(item, index)}
                />
              </div>
            </div>
          </div>
  );
};

export default ProductsTable;

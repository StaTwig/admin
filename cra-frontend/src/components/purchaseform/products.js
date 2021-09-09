import React from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import './style.scss';
const ProductsTable = props => {
  const {
    onProductSelect,
    product,
    products,
    quantity,
    orderAmount,
    setOrderAmount,
    onQuantityChange,
    index
  } = props;
  const productIds = products.map(product => product.externalId);
  return (
    
          <div className="rTableRow">
            <div className="rTableCell">
              <DropdownButton
                groups={productIds}
                onSelect={item => onProductSelect(item, index)}
                name={product.externalId}
                placeholder="Select ProductId"
                className="text"
              />
            </div>
            <div className="rTableCell">
                <input
                  type="text"
                  className="form-control"
                  name="Product Name"
                  placeholder="Product Name"
                  value={product.name}
                />
            </div>

            <div className="rTableCell">
                <input
                  type="text"
                  className="form-control"
                  name="Product Name"
                  placeholder="Manufacturer"
                  value={product.manufacturer}
                />
            </div>
            <div className="rTableCell">
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
                  placeholder="Quantity"
                  value={quantity}
                  onChange={item => onQuantityChange(item, index)}
                />
            </div>
            <div className="rTableCell">
            <input
              type="text"
              className="form-control"
              name="Amount"
              placeholder="Price"
              disabled={true}
              onChange={e => setOrderAmount(e.target.value)}
              value={orderAmount}
            />
          </div>

          </div>
  );
};

export default ProductsTable;

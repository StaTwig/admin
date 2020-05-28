import React from 'react';
import './style.scss';

const ProductsTableReview = props => {

  const {
    tableHeader,
    
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
              <input
              disabled
               type="text"
               className="form-control"
               placeholder="Select Supplier"
               value={props.product}
              />
            </div>
            <div className="rTableCell">
              <input
              disabled
               type="text"
               className="form-control"
               placeholder="Select Supplier"
               value={props.manufacturer}
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                disabled
                  type="number"
                  className="form-control"
                  placeholder="Enter Qunatity"
                  value={props.quantity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTableReview;

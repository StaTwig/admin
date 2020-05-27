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
               type="text"
               className="form-control"
               placeholder="Select Supplier"
               value="harsha"
              />
            </div>
            <div className="rTableCell">
              <input
               type="text"
               className="form-control"
               placeholder="Select Supplier"
               value="harsha"
              />
            </div>
            <div className="rTableCell">
              <div className="form-group">
                <input
                  type="number"
                  className="form-field"
                  placeholder="Enter Qunatity"
                  value="harsha"
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

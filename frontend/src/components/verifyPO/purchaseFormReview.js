import React from 'react';
import ProductsTableReview from './productsReview';

import './style.scss';

const tableHeader = ['Product Name', 'Manufacturer', 'Quantity'];

const PurchaseFormReview = props => {
  const month = new Date().getMonth()+1;
  const todayDate = new Date().getDate() + '/' + month + '/'  +new Date().getFullYear();

  return (
    <div className="purchaseform">
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Supplier</label>
          <input
        
            type="text"
            className="form-control"
            placeholder="Select Supplier"
            value="harsha"
          />
         
        </div>
        <p>Date: {todayDate}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group">
          <label htmlFor="shipmentId">Delivery To</label>
        
          <input
           type="text"
           className="form-control"
           placeholder="Select Supplier"
           value="harsha"
           
          />
      
        </div>
        <div className="input-group">
          <label htmlFor="shipmentId">Delivery Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Delivery Location"
            value="harsha"
    
          />
         
        </div>
      </div>
      <hr />
      <ProductsTableReview
        tableHeader={tableHeader}
      />
      {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}
      
     <button className="btn btn-orange review" >
        REVIEW
      </button>
 
        
    
      
      </div>

      
  );
};

export default PurchaseFormReview;

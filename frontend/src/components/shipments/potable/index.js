import React from 'react';

import './style.scss';

const PoTable = props => {
  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Client</div>
          <div className="rTableHead">Order ID</div>
          <div className="rTableHead">Product Name</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span>Order Date</span>
          </div>
          <div className="rTableHead">
            <span>Delivery To</span>
          </div>
          <div className="rTableHead">
            <span>Delivery Location</span>
          </div>
          <div className="rTableHead">
            <span>Status</span>
          </div>
          
        </div>
        <div className="overflow">
          
        {props.shipments.map((shipment, index) => (
            <div className="rTableRow" key={index}>
       <div className="rTableCell">
                <div className="combine-data">
            client
                  
                </div>
              </div>
        <div className="rTableCell"></div>
             
              <div className="rTableCell">hot</div>
              <div className="rTableCell">cool</div>
              <div className="rTableCell">cool</div>

              <div className="rTableCell">coo</div>
        <div className="rTableCell"></div>
             
              <div className="rTableCell">dsvcv</div>
            </div>
          ))}
       </div>
      </div>
    </div>
  );
};

export default PoTable;
import React,{useEffect } from 'react';

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
            {shipment.client}
                  
                </div>
              </div>
        <div className="rTableCell">SHI567</div>
             
              <div className="rTableCell">ShI563</div>
              <div className="rTableCell">bOPV</div>
              <div className="rTableCell">12/12/2020</div>

              <div className="rTableCell">Victor</div>
        <div className="rTableCell">Sydney</div>
             
              <div className="rTableCell">Shipped</div>
            </div>
          ))}
       </div>
      </div>
    </div>
  );
};

export default PoTable;
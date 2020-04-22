import React from 'react';

import './style.scss';

const Table = props => {
  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Client</div>
          <div className="rTableHead">Shipment ID</div>
          <div className="rTableHead">Supplier</div>
          <div className="rTableHead">
            <span>Supplier Location</span>
          </div>
          <div className="rTableHead">
            <span>Shipment Date</span>
          </div>
          <div className="rTableHead">
            <span>Delivery To</span>
          </div>
          <div className="rTableHead">
            <span>Delivery Location</span>
          </div>
          <div className="rTableHead">
            <span>Estimate Delivery Date</span>
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
              <div className="rTableCell">{shipment.shipmentId}</div>
             
              <div className="rTableCell">{shipment.supplier}</div>
              <div className="rTableCell">{shipment.supplierLocation}</div>
              <div className="rTableCell">{shipment.shipmentDate}</div>

              <div className="rTableCell">{shipment.deliveryTo}</div>
              <div className="rTableCell">{shipment.deliveryLocation}</div>
             
              <div className="rTableCell">{shipment.estimateDeliveryDate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
import React from 'react';

import './style.scss';

const Table = props => {
  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Client</div>
          <div className="rTableHead">Shipment ID</div>
          <div className="rTableHead">
            <span>Alert</span>
          </div>
          <div className="rTableHead">Product Name</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span>Shipment Date</span>
          </div>
          <div className="rTableHead">
            <span>Delivery To</span>
          </div>
          <div className="rTableHead">
            <span>Delivery Date</span>
          </div>
          <div className="rTableHead">
            <span>Delivery Location</span>
          </div>
          <div className="rTableHead">
            <span>Status</span>
          </div>
          
        </div>
        <div className="overflow">
          {props.inventories.map(inventory => (
            <div className="rTableRow">
              <div className="rTableCell">
                <div className="combine-data">
                  <div className="round-sign">{inventory.productName}</div>
                  <a href="#">{inventory.productName}</a>
                </div>
              </div>
              <div className="rTableCell">{inventory.manufacturerName}</div>
              <div className="rTableCell">{inventory.batchNumber}</div>
              <div className="rTableCell">{inventory.quantity}</div>
              <div className="rTableCell">{inventory.serialNumber}</div>

              <div className="rTableCell">{inventory.manufacturingDate}</div>
              <div className="rTableCell">{inventory.expiryDate}</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
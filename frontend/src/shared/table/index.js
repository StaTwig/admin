import React from "react";

import './style.scss';

const Table = (props) => {
  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Product Name</div>
          <div className="rTableHead">Manufacturer</div>
          <div className="rTableHead"><span>Batch Number</span></div>
          <div className="rTableHead">Qunatity</div>
          <div className="rTableHead"><span>Date Added</span></div>
          <div className="rTableHead"><span>Mfg Date</span></div>
          <div className="rTableHead"><span>Exp Date</span></div>
        </div>
        <div className="overflow">
          {props.inventories.map(inventory =>  <div className="rTableRow">
            <div className="rTableCell">
              <div className="combine-data">
                <div className="round-sign">{inventory.productName}</div>
                <a href="#">{inventory.productName}</a>
              </div>
            </div>
            <div className="rTableCell">{inventory.quantity}</div>
            <div className="rTableCell">{inventory.manufacturingDate}</div>
            <div className="rTableCell">{inventory.expiryDate}</div>
            <div className="rTableCell"><b>{inventory.storageCondition}</b></div>
            <div className="rTableCell">{inventory.batchNumber}</div>

            <div className="rTableCell">{inventory.serialNumber}</div>
          </div>)}
        </div>

      </div>
    </div>
  );
};



export default Table;


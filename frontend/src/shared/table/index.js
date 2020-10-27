import React from 'react';

import './style.scss';

const Table = props => {
  const { loadMore, onLoadMore } = props;
  return (
    <div className="table">
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">{props.data.coloumn1}</div>
          <div className="rTableHead">{props.data.coloumn2}</div>
          <div className="rTableHead">
            <span>{props.data.coloumn3}</span>
          </div>
          <div className="rTableHead">{props.data.coloumn4}</div>
           <div className="rTableHead">{props.data.coloumn5}</div>
          <div className="rTableHead">
            <span>{props.data.coloumn6}</span>
          </div>
          <div className="rTableHead">
            <span>{props.data.coloumn7}</span>
          </div>
          
        </div>
        <div className="overflow">
       
          {props.inventories.map(inventory => (
            <div className="rTableRow">
              <div className="rTableCell">
                <div className="combine-data">
                 {inventory.productName}
                 
                </div>
              </div>
              <div className="rTableCell">{inventory.manufacturerName}</div>
              <div className="rTableCell">{inventory.batchNumber}</div>
              <div className="rTableCell">{inventory.quantity}</div>
               <div className="rTableCell">{inventory.serialNumber}</div>
            <div className="rTableCell">{inventory.manufacturingDate.length >7  ? `0${new Date(Date.parse(inventory.manufacturingDate)).getMonth()+1}`.slice(-2)+"/"+new Date(Date.parse(inventory.manufacturingDate)).getFullYear() : inventory.manufacturingDate}</div>
              <div className="rTableCell">{inventory.expiryDate.length >7  ? `0${new Date(Date.parse(inventory.expiryDate)).getMonth()+1}`.slice(-2)+"/"+new Date(Date.parse(inventory.expiryDate)).getFullYear() : inventory.expiryDate}</div>
             <div className="rTableCell"> <span class="badge badge-warning">ADDED</span></div>
            </div>
          ))}
        </div>
        {loadMore && (
          <button className="btn btn-success" onClick={onLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;


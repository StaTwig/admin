import React from 'react';
import './style.scss'
const Table = props => {
  return (
    <div className="producttable">
      <div className="rTable">
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
              <div className="rTableCell font-weight-bold">{inventory.quantity}</div>
              <div className="rTableCell">20/12/2017</div>
            <div className="rTableCell">{inventory.manufacturingDate.length >7  ? `0${new Date(Date.parse(inventory.manufacturingDate)).getMonth()+1}`.slice(-2)+"/"+new Date(Date.parse(inventory.manufacturingDate)).getFullYear() : inventory.manufacturingDate}</div>
              <div className="rTableCell">{inventory.expiryDate.length >7  ? `0${new Date(Date.parse(inventory.expiryDate)).getMonth()+1}`.slice(-2)+"/"+new Date(Date.parse(inventory.expiryDate)).getFullYear() : inventory.expiryDate}</div>
              <div className="rTableCell"><button className="btn btn-outline-info fontSize200 show">SHOW MORE</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;

/*   <button type="button" class="btn btn-outline-primary">SHOW MORE</button>*/

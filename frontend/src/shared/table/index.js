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
          <div className="rTableHead">
            <span></span>
          </div>

        </div>
        <div className="overflow">

          {props.inventoryDetails.map((inventory, index) => (
            <div className="rTableRow" key={index}>
              <div className="rTableCell">
                <div className="combine-data">
                 {inventory.productName}

                </div>
              </div>
              <div className="rTableCell">{inventory.manufacturer}</div>
             <div className="rTableCell">{inventory.quantity}</div>
          <div className="rTableCell"><button className="btn btn-outline-info fontSize200 expand"
              onClick = {()=>{
                        props.history.push(
                        `/productlist/${inventory.batchNumber}`)
                
                  }}
            >SHOW MORE</button>
             </div>
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

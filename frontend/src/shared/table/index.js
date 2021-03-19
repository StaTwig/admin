import React from 'react';

import './style.scss';

const Table = props => {
  const { loadMore, onLoadMore, colors } = props;
  return (
    <div className="table">
      <div className="rTable">
        {/* <div className="rTableHeading">
          <div className="rTableHead">Product</div>
          <div className="rTableHead">Manufacturer</div>
          <div className="rTableHead">
            <span>Quantity</span>
          </div>
          <div className="rTableHead">
            <span></span>
          </div>

        </div> */}
        <div className="overflow">

          {props.inventoryDetails.map((inventory, index) => (
            <div className="rTableRow" key={index}>
                <div className="rTableCell">
                    <div className="d-flex flex-column txtBlue ">
                      <div>{inventory.productName}</div>
                      {/* <div className="sub">
                        {inventory.productId}
                      </div> */}
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
        </div>
        {/* {loadMore && (
           <button className=" btn-primary btn mr-2 float-left" onClick={onLoadMore}>Load More</button>
        )} */}
    </div>
  );
};

export default Table;

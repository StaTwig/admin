import React from 'react';
import previous from '../../assets/icons/previous.png';
import next from '../../assets/icons/next.png';
import './style.scss';

const Table = props => {
  const { loadMore, onLoadMore, inventoryDetails, colors, skip } = props;
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
        <div className="">
          {inventoryDetails.map((inventory, index) => (
            <div className="rTableRow" key={index}>
              <div className="rTableCell">
                <div className="d-flex flex-column txtBlue ">
                  <div>{inventory.products.name}</div>
                    {/* <div className="sub">
                      {inventory.productId}
                    </div> */}
                </div>
              </div>
              <div className="rTableCell" style={{position:"relative",left:'7%'}}>{inventory.products.manufacturer}</div>
              <div className="rTableCell" style={{position:"relative",left:'12%',fontWeight:700}}>{inventory.inventoryDetails.quantity}</div>
              <div className="rTableCell" style={{position:"relative",left:'12%'}}>
                <button
                  className="btn btn-outline-info fontSize200 expand"
                  onClick={() => {
                    props.history.push(`/productlist/${inventory.inventoryDetails.batchNumber}`)
                  }}
                >SHOW MORE</button>
             </div>
            </div>
          ))}
        </div>
          <div className="d-flex flex-row-reverse">
            <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => inventoryDetails.length > 4 && onLoadMore(true)} src={next} />
            <img style={{ padding: 1, height: 30, cursor: 'pointer' }} onClick={() => skip > 0 && onLoadMore(false)} src={previous} />
          </div>
        </div>
        {/* {loadMore && (
           <button className=" btn-primary btn mr-2 float-left" onClick={onLoadMore}>Load More</button>
        )} */}
    </div>
  );
};

export default Table;

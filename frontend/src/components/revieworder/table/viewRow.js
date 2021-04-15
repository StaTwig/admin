import React from 'react';
import './style.scss';

const ViewRow = props => {
  const {
    prod
  } = props;

  return (
      <div className=" row ml-4 text-center text-dark col">
        <div className="col pl-5 tcell p-2">
          <div className=" p-0">
            <div className="d-flex pl-3 text-center flex-column">
              <div className="col" style={{color:"black"}}>
                {prod.type}
              </div>
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center p-2">
          <div className=" p-0 text-center">
            <div className="d-flex text-center flex-column justify-content-between">
              <div className="col ml-5 text-left" style={{color:"black"}} >
                {prod.name}
                </div>
              <div className="col ml-5 text-left" style={{color:"black"}}>{prod.productId}</div>
            </div>
          </div>
        </div>
        <div className="col cell text-center justify-content-center p-2"><div className="col ml-5" style={{color:"black"}}>{prod.manufacturer}&nbsp;</div></div>
        <div className="col pl-4 tcell text-center justify-content-center p-2">
          <div className=" mr-5" style={{color:"black"}}>
            {prod.quantity}
          </div>
        </div>
      </div>
  );
};

export default ViewRow;
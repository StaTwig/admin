import React from 'react';
import './style.scss';

const ViewRow = props => {
  const {
    prod
  } = props;

  return (
      <div className=" row ml-3 text-dark col">
        <div className="col pl-4 tcell p-2">
          <div className=" p-0">
            <div className="d-flex pl-3 text-left flex-column">
              <div className="title recived-text">
                {prod.type}
              </div>
            </div>
          </div>
        </div>
        <div className="col tcell text-left justify-content-center p-2">
          <div className=" p-0">
            <div className="d-flex pt-1 pl-4 flex-column justify-content-between">
              <div className="title recived-text">
                {prod.name}
              </div>
              <div className="title recived-text">{prod.productId}</div>
            </div>
          </div>
        </div>
        <div className="col tcell text-left justify-content-center p-2"><div className="pl-4 ml-3 recived-text">{prod.manufacturer}&nbsp;</div></div>
        <div className="col tcell text-left justify-content-center p-2">
          <div className="pl-3 ml-5">
            {prod.quantity}
          </div>
        </div>
      </div>
  );
};

export default ViewRow;
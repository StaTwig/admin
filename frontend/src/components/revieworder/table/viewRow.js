import React from 'react';
import './style.scss';

const ViewRow = props => {
  const {
    prod
  } = props;

  return (
    <div className="row ml-3">
      <div class=" row text-dark col">
        <div class="col pl-4 tcell p-2">
          <div class=" p-0">
            <div class="d-flex flex-column">
              <div class="title recived-text">
                {prod.type}
              </div>
            </div>
          </div>
        </div>
        <div class="col tcell text-center justify-content-center p-2">
          <div class=" p-0">
            <div class="d-flex pt-1 flex-column justify-content-between">
              <div class="title recived-text">
                {prod.name}
              </div>
              <div class="title recived-text">{prod.productId}</div>
            </div>
          </div>
        </div>
        <div class="col tcell text-center justify-content-center p-2">{prod.manufacturer}&nbsp;</div>
        <div class="col tcell text-center justify-content-center p-2">
          <div className="">
            {prod.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRow;
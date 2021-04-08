import React from 'react';
import './style.scss';

const ViewRow = props => {
  const {
    prod
  } = props;

  return (
      <div class=" row ml-3 text-dark col">
        <div class="col pl-4 tcell p-2">
          <div class=" p-0">
            <div class="d-flex pl-3 text-left flex-column">
              <div class="title recived-text">
                {prod.type}
              </div>
            </div>
          </div>
        </div>
        <div class="col tcell text-left justify-content-center p-2">
          <div class=" p-0">
            <div class="d-flex pt-1 pl-4 flex-column justify-content-between">
              <div class="title recived-text">
                {prod.name}
              </div>
              <div class="title recived-text">{prod.productId}</div>
            </div>
          </div>
        </div>
        <div class="col tcell text-left justify-content-center p-2"><div class="pl-4 ml-3 recived-text">{prod.manufacturer}&nbsp;</div></div>
        <div class="col tcell text-left justify-content-center p-2">
          <div className="pl-3 ml-5">
            {prod.quantity}
          </div>
        </div>
      </div>
  );
};

export default ViewRow;
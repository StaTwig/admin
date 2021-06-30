import React from 'react';
import './style.scss';
const ViewRow = props => {
  const {
    prod
  } = props;
//console.log("prodUnitofmeasure+++",prod);
  return (
      <div className="row text-center text-dark col ml-5">
        <div className="col tcell p-2 ">
          <div className="row ml-1 mb-3 p-0">
            <div className="col pr-5 tcell text-center justify-content-center">
              <div className="mr-5" style={{color:"black",fontSize:"14px",position:"relative", bottom:"8px"}}>
                {prod.type}
              </div>
            </div>
          </div>
        </div>
        <div className="col pl-4 tcell text-center justify-content-center">
              <div className="mr-5" style={{color:"black",fontSize:"14px"}} >
                {prod.name + " "} / {prod.productId}
                </div>
              <div className="col ml-5 text-left" style={{color:"black",fontSize:"14px"}}>
          </div>
        </div>
        <div className="col pl-4  tcell text-center justify-content-center">
        <div className="mr-4" style={{color:"black",fontSize:"14px"}}>
        {prod.manufacturer}
        </div>
        </div>
        <div className="col pl-4 tcell text-center justify-content-center">
          <div className="mr-4" style={{color:"black",fontSize:"14px"}}>
            {prod.productQuantity} <span>{"("}</span> { prod.unitofMeasure ?<span>{ prod.unitofMeasure==undefined ? null: prod.unitofMeasure.name}</span>:
          <span className="placeholder_id">Unit</span>}<span>{")"}</span>
          </div>
        </div>
      </div>
  );
};
export default ViewRow;
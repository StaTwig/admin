import React from 'react';
import './style.scss';

const ViewRow = props => {
  const {
    prod
  } = props;
//console.log("prodUnitofmeasure+++",prod);
  return (
      <div className=" row text-center text-dark col ml-5" >
        <div className="col pl-5 tcell p-2" >
          <div className="row ml-1 mb-3 p-0">
            <div className="d-flex pl-3 text-center flex-column">
              <div className="col" style={{color:"black",fontSize:"14px"}}>
                {prod.type}
              </div>
            </div>
          </div>
        </div>
        <div className="col tcell text-center justify-content-center">
          <div className=" p-0 text-center mb-4">
            <div className="d-flex text-center flex-column justify-content-between">
              <div className="col ml-5 text-left" style={{color:"black",fontSize:"14px"}} >
                {prod.name + " "} / {prod.productId}
                </div>
              <div className="col ml-5 text-left" style={{color:"black",fontSize:"14px"}}>
              
              </div>
            </div>
          </div>
        </div>
        <div className="col cell text-center justify-content-center ml-3 ">
        <div className="col ml-5" style={{color:"black",fontSize:"14px"}}>
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
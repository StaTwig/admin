import React, { useState } from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';

const ChainOfCustody = (props) => {
  const[op, setOp] = useState('');
  let index=1;
  return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
  <div className="row  mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">ACCEPTED</div>
          <div className="col panel  chain chainpanle series">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>Shipment Received</strong></div>
                <div>By: <strong>Bharat</strong></div>
                <div>From: Bharat</div>

              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Unicef Po ID : <strong>PO1234</strong></div>
                <div >Shipment ID : <strong>SH1234</strong></div>
              </div>
              <div className="d-flex flex-column mr-5">
                <div className="emp"></div>
                <div >26/02/2021</div>
                <div></div>
              </div>
            </div>
            { op === index ? <div className="d-flex flex-row mt-4">
              <button className="btn btn-main-blue dir mr-2"
                onClick={() => {
                  props.setHighLight(true)
                  props.setMenuShip(true)
                }}>View Shipment</button>
              <button className="btn btn-orange dir"
                onClick={() => {
                  props.setProductHighLight(true)
                  props.setMenuProduct(true)
                }}>View Product List</button>
            </div> : null}
            { op === index ? <div className="arrow float-right" 
            onClick={() => {
              setOp('')}
          }>
              <img src={Down} alt="actions" height="7" width="12"  /></div>
          :
          <div className="arrow float-right" 
            onClick={() => {
              setOp(index)}
          }>
              <img src={traceDrop} alt="actions" height="7" width="12"  /></div>
          }
      </div>
        </div>
      </div>
      

  )
}


export default ChainOfCustody;

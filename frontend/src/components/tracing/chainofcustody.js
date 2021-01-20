import React, { useState } from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';

const ChainOfCustody = (props) => {
  const[op, setOp] = useState('');
  return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
      props.shipments.shipmentTxns.map((txn, index) => <div className="row  mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{txn.status}</div>
          <div className="col panel  chain chainpanle series">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>Shipment {txn.status}</strong></div>
                <div>By: <strong>{txn.supplier}</strong></div>
                <div>From: {txn.supplierLocation}</div>

              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Unicef Po ID : <strong>{txn.poNumber}</strong></div>
                <div >Shipment ID : <strong>{txn.shipmentId}</strong></div>
              </div>
              <div className="d-flex flex-column mr-5">
                <div className="emp"></div>
                <div >{txn.shipmentDate}</div>
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

  )
}


export default ChainOfCustody;

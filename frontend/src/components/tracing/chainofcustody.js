import React from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';

const ChainOfCustody = (props) => {
    return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        props.shipments.shipmentTxns.map((txn, index) => <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
        <div className="color mb-3">{txn.status}</div>
          <div className="col panel chain chainPad">
         <div className="row">
           <div><strong>Shipment {txn.status}</strong></div>
           </div>
             <div className="row justify-content-between">
              <div>By: <strong>{txn.supplier}</strong></div>
              <div>Unicef Po ID : <strong>{txn.poNumber}</strong></div>
              <div>{txn.shipmentDate}</div>
              </div>
              <div className="row justify-content-between">
              <div>From: {txn.supplierLocation}</div>
              <div className="ml-4">Shipment ID : <strong>{txn.shipmentId}</strong></div>
              <div></div>
            </div>
            {props.chain==true ?<div className="d-flex flex-row mt-4">
           <button className="btn btn-main-blue dir mr-2" 
            onClick={() =>{props.setHighLight(true)
             props.setMenuShip(true)}}>View Shipment</button>
             <button className="btn btn-orange dir" 
             onClick = {()=> {props.setProductHighLight(true)
             props.setMenuProduct(true)}}>View Product List</button>
            </div>:null}
          </div>
          <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12"  onClick={() =>props.setChain(!props.chain) }/></div>
      </div>
      </div>)

    )
}


export default ChainOfCustody;
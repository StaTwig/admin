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
            <div className="row justify-content-between">
           <div><strong>Purchase order {props.shipments.poStatus}</strong></div>
              <div className="mr-4">{props.shipments.poTxns[props.shipments.poTxns.length-1].date}</div>
            </div>
            <div className="row justify-content-between">
              <div>By: <strong>{props.shipments.poTxns[props.shipments.poTxns.length-1].vendorName}</strong></div>
              <div>Unicef Po ID : <strong>{props.shipments.poTxns[props.shipments.poTxns.length-1].orderID}</strong></div>
              <div>Shipment ID : <strong>{props.shipments.shipmentTxns[props.shipments.shipmentTxns.length-1].shipmentId}</strong></div>
            </div>
            {props.chain==true ?<div className="d-flex flex-row mt-4">
            <button className="btn btn-yellow dir" onClick = {()=> props.setOpenPurchase(true)}>View Purchase Order</button>
            <button className="btn btn-main-blue dir ml-2" 
            onClick={() =>{props.setHighLight(true)
                props.setMenuShip(true)}
            }>View Shipment</button>
            </div>:null}
          </div>
          <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12"  onClick={() =>props.setChain(!props.chain) }/></div>
      </div>
      </div>)

    )
}


export default ChainOfCustody;
import React from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';

const PoChainOfCustody = (props) => {
    return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
        <div className="color mb-3">{ props.shipments.poStatus}</div>
          <div className="col panel chain chainPad">
            <div className="row justify-content-between">
           <div><strong>Purchase order {props.shipments.poStatus}</strong></div>
              <div>{props.shipments.poTxns[0].date}</div>
            </div>
            <div className="row justify-content-between">
              <div>By: <strong>{props.shipments.poTxns[0].vendorName}</strong></div>
              <div>Unicef Po ID : <strong>{props.shipments.poTxns[0].orderID}</strong></div>
            </div>
            {props.poChain==true ?
            <button className="btn btn-yellow dir mt-4" onClick = {()=> props.setOpenPurchase(true)}>View Purchase Order</button>
            :null}
          </div>
          <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12"  onClick={() =>props.setPoChain(!props.poChain) }/></div>
      </div>
      </div>

    )
}


export default PoChainOfCustody;
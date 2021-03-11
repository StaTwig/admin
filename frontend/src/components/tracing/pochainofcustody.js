import React from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';


const PoChainOfCustody = (props) => {
  return (
    Object.keys(props.shipments).length === 0 || (!props.shipments.poChainOfCustody)? <div className="row panel justify-content-between">N/A</div> :
    <div>
    {props.shipments.poChainOfCustody.map((custody,index) =>(
      <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">{custody.status}</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>{`Purchase Order ${custody.status}`}</strong></div>
              <div>By: <strong>{props.shipments.supplierOrgName}</strong></div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Unicef Po ID : <strong>{props.shipments.poDetails[0].externalId}</strong></div>
                <div></div>
              </div>
              <div className="d-flex flex-column mr-5">
                <div>{custody.dateTime.split('T')[0].split('-')[2]+"/"+custody.dateTime.split('T')[0].split('-')[1]+"/"+custody.dateTime.split('T')[0].split('-')[0]}</div>
                <div></div>
                <div></div>
              </div>
            </div>
            {props.poChain == true ?
         <div className="d-flex flex-row"><button className="btn btn-yellow dir mt-4" onClick={() => props.setOpenPurchase(true)}>View Purchase Order</button></div>
              : null}
            <div className="arrow float-right" onClick={() => props.setPoChain(!props.poChain)}><img src={props.poChain ? Down : traceDrop} alt="actions" height="7" width="12" /></div>
          </div>

        </div>
      </div>
    ))}</div>
  )
         
}


export default PoChainOfCustody;

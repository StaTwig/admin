import React from 'react';
import './style.scss';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';


const PoChainOfCustody = (props) => {
  return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
      <div className="row mb-3">
        <div></div>
        <div className="big-dot bg-info ml-4"></div>
        <div className="col">
          <div className="color mb-3">ACCEPTED</div>
          <div className="col panel chain chainpanle">
            <div className="row justify-content-between">
              <div className="col">
                <div><strong>Purchase order ACCEPTED</strong></div>
                <div>By: <strong>PO1234</strong></div>
              </div>
              <div className="col">
                <div className="emp"></div>
                <div>Unicef Po ID : <strong>PO1234</strong></div>
                <div></div>
              </div>
              <div className="d-flex flex-column mr-5">
                <div>12/12/2022</div>
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

  )
}


export default PoChainOfCustody;

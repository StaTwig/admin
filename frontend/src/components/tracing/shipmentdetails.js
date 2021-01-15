import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import './style.scss'

const ShipmentDetails = (props) => {
    return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className=  { props.highLight ? "col panel commonpanle highlight" : "col panel commonpanle"}>
          <div className="d-flex flex-row  ">
          <ul className="mr-3 elemens">
            <li className="mb-1 text-secondary">Shipment ID</li>
            <li className="mb-1 text-secondary">Vendor Name</li>
           {props.menuShip== true ? <li className="mb-1 text-secondary">Date</li> : null}
           {props.menuShip== true ? <li className="mb-1 text-secondary">Expected Delivery</li> : null}
           {props.menuShip== true ? <li className="mb-1 text-secondary">Shipped From</li> : null}
           {props.menuShip== true ? <li className="mb-1 text-secondary">To Location ID</li> : null}
           {props.menuShip== true ? <li className="mb-1 text-secondary">To Location</li> : null}
           {props.menuShip== true ? <li className=" text-secondary">Transaction ID</li> : null}
          </ul>
           <ul className="elemens">
            <li  className="mb-1">{props.shipments.shipmentTxns[0].shipmentId}</li>
            <li  className="mb-1">{props.shipments.poTxns[0].vendorName}</li>
            {props.menuShip== true ? <li  className="mb-1">{props.shipments.shipmentTxns[0].shipmentDate}</li> : null}
           {props.menuShip== true ? <li  className="mb-1">{props.shipments.shipmentTxns[0].estimateDeliveryDate}</li> : null}
           {props.menuShip== true ? <li  className="mb-1">{props.shipments.shipmentTxns[0].supplierLocation}</li> : null}
           {props.menuShip== true ? <li  className="mb-1">5678</li> : null}
           {props.menuShip== true ? <li  className="mb-1">{props.shipments.shipmentTxns[0].deliveryLocation}</li> : null}
           {props.menuShip== true ? <li className="txn">{props.poCard.txnId}</li> : null}
           </ul>
           <div>
           
           </div>
          </div>
          <div className="arrow float-right" onClick={() => {
           props.setMenuShip(!props.menuShip)
            props.setHighLight(false); 
          } }><img src={props.menuShip?Down:traceDrop} alt="actions" height="7" width ="12" 
          
          /></div>
          </div>

    )
}


export default ShipmentDetails;

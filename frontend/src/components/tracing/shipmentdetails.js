import React from 'react';
import './style.scss'

const ShipmentDetails = (props) => {
    return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className=  { props.highLight ? "row panel highlight justify-content-between" : "row panel justify-content-between"}>
          <ul >
            <li>Shipment ID</li>
            <li>Vendor Name</li>
           {props.menuShip== true ? <li>Date</li> : null}
           {props.menuShip== true ? <li>Expected Delivery</li> : null}
           {props.menuShip== true ? <li>Shipped From</li> : null}
           {props.menuShip== true ? <li>To Location ID</li> : null}
           {props.menuShip== true ? <li>To Location</li> : null}
           {props.menuShip== true ? <li>Transaction ID</li> : null}
          </ul>
           <ul className="bold">
            <li>{props.shipments.shipmentTxns[0].shipmentId}</li>
            <li className= "vendor">{props.shipments.poTxns[0].vendorName}</li>
            {props.menuShip== true ? <li>{props.shipments.shipmentTxns[0].shipmentDate}</li> : null}
           {props.menuShip== true ? <li>{props.shipments.shipmentTxns[0].estimateDeliveryDate}</li> : null}
           {props.menuShip== true ? <li>{props.shipments.shipmentTxns[0].supplierLocation}</li> : null}
           {props.menuShip== true ? <li>5678</li> : null}
           {props.menuShip== true ? <li>{props.shipments.shipmentTxns[0].deliveryLocation}</li> : null}
           {props.menuShip== true ? <li className="txn">{props.poCard.txnId}</li> : null}
           </ul>
           <div></div>
          </div>

    )
}


export default ShipmentDetails;
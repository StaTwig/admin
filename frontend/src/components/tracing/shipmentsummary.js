import React from 'react';
import './style.scss'

const ShipmentSummary = (props) => {
  
    return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="row panel justify-content-between">
          <ul >
            <li>Shipment ID</li>
            <li>Unicef PO ID</li>
            <li>Shipped From</li>
            <li>Shipped To</li>
            <li>Shipment Date</li>
            <li>Quantity</li>
            <li>Vendor ID</li>
            <li>Vendor Name</li>
            <li>Transaction ID</li>
            </ul>
            <ul className="bold">
            <li>{props.shipments.shipmentTxns[0].shipmentId}</li>
            <li>{props.shipments.poTxns[0].orderID}</li>
            <li>{props.shipments.shipmentTxns[0].supplierLocation}</li>
            <li>{props.shipments.shipmentTxns[0].deliveryLocation}</li>
            <li>{props.shipments.shipmentTxns[0].shipmentDate}</li>
            <li>{props.shipments.shipmentTxns[0].quantity}</li>
            <li>{props.shipments.poTxns[0].vendor}</li>
            <li className="vendor">{props.shipments.poTxns[0].vendorName}</li>
            <li className="txn">{props.poCard.txnId}</li>
            </ul>
            <div className="font-weight-bold">
                <span className="badge badge-pill badge-warning">
                {props.shipments.shipmentTxns[0].status}
                </span>
              </div>
        </div> 
    ) 
}

export default ShipmentSummary;
import React from 'react';
import './style.scss'

const ShipmentSummary = (props) => {
   return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="panel commonpanle">
          <div className="d-flex flex-row  ">
          <ul className="mr-3 elemens">
            <li className="mb-1 text-secondary">Shipment ID</li>
            <li className="mb-1 text-secondary">Unicef PO ID</li>
            <li className="mb-1 text-secondary">Shipped From</li>
            <li className="mb-1 text-secondary">Shipped To</li>
            <li className="mb-1 text-secondary">Shipment Date</li>
            <li className="mb-1 text-secondary">Quantity</li>
            <li className="mb-1 text-secondary">Vendor ID</li>
            <li className="mb-1 text-secondary">Vendor Name</li>
            <li className="text-secondary">Transaction ID</li>
            </ul>
            <ul className="elemens">
            <li className="mb-1">{props.shipments.shipmentTxns[0].shipmentId}</li>
            <li className="mb-1">{props.shipments.poTxns[0].orderID}</li>
            <li className="mb-1">{props.shipments.shipmentTxns[0].supplierLocation}</li>
            <li className="mb-1">{props.shipments.shipmentTxns[0].deliveryLocation}</li>
            <li className="mb-1">{props.shipments.shipmentTxns[0].shipmentDate}</li>
            <li className="mb-1">lll</li>
            <li className="mb-1">{props.shipments.poTxns[0].vendor}</li>
            <li className="txn mb-1">{props.shipments.poTxns[0].vendorName}</li>
            <li className="txn">{props.poCard.txnId}</li>
            </ul>
            <div>
                <span className="badge badge-pill badge-warning text-white">
                {props.shipments.shipmentTxns[0].status}
                </span>
              </div>
        </div> 
        </div> 
    ) 
}

export default ShipmentSummary;

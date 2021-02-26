import React from 'react';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import './style.scss'

const ShipmentSummary = (props) => {
   return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="panel commonpanle">
          <div className="d-flex flex-row  ">
          <ul className="mr-3 elemens">
            <li className="mb-1 text-secondary">Shipment ID</li>
            <li className="mb-1 text-secondary">PO ID</li>
            <li className="mb-1 text-secondary">Shipped From</li>
            <li className="mb-1 text-secondary">Shipped To</li>
            <li className="mb-1 text-secondary">Shipment Date</li>
            <li className="text-secondary">Transaction ID</li>
            </ul>
            <ul className="elemens">
           <li className="mb-1">{props.shipments.shipmentDetails[0].id}</li>
            <li className="mb-1">{props.shipments.shipmentDetails[0].poId}</li>
            <li className="mb-1">{props.shipments.shipmentDetails[0].supplier.locationId}</li>
            <li className="mb-1">N/A</li>
            <li className="mb-1">  {props.shipments.shipmentDetails[0].shippingDate.split('T')[0].split('-')[2]+"/"+props.shipments.shipmentDetails[0].shippingDate.split('T')[0].split('-')[1]+"/"+props.shipments.shipmentDetails[0].shippingDate.split('T')[0].split('-')[0]} </li>
        <a className="d-flex flex-row"><li className="txn">
          {props.shipments.shipmentDetails[0].txnIds[0]?props.shipments.shipmentDetails[0].txnIds[0]:"N/A"}
            </li><img src={Verifiedpic} className="mt-1" width="10" height="10"/></a>
            </ul>
            <div>
                <span className="badge badge-pill badge-warning text-white">
               <small>{props.shipments.shipmentDetails[0].status}</small>
                </span>
              </div>
        </div> 
        </div> 
    ) 
}

export default ShipmentSummary;

import React from 'react';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import './style.scss'

const ShipmentSummary = (props) => {
   return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="panel commonpanle">
          <div className="d-flex flex-row  ">
          <ul className="mr-1 elemens w-50">
            <li className="mb-1 text-secondary">Shipment ID</li>
            <li className="mb-1 text-secondary">Shipment</li>
            <li className="mb-1 text-secondary">From</li>
            <li className="mb-1 text-secondary">To</li>
            </ul>
            <ul className="elemens">
           <li className="mb-1">{props.shipments.id}</li>
             <li className="mb-1">  {props.shipments.shippingDate.split('T')[0].split('-')[2]+"/"+props.shipments.shippingDate.split('T')[0].split('-')[1]+"/"+props.shipments.shippingDate.split('T')[0].split('-')[0]} </li>
            <li className="mb-1">{props.shipments.supplier.org.name}</li>
            <li className="mb-1">{props.shipments.receiver.org.name}</li>
            </ul>
            <div>
                <span className="badge badge-pill badge-warning text-white">
               <small>{props.shipments.status}</small>
                </span>
              </div>
        </div>
        </div>
    )
}

export default ShipmentSummary;

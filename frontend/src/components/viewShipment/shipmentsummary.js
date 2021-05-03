import React from 'react';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import './style.scss'

const ShipmentSummary = (props) => {
  let statusStyle = 'bg-primary';
  let status = 'Shipped';
  if (props.shipments.status === 'RECEIVED') {
    statusStyle = 'bg-success';
    status = 'Delivered';
  }
   return(
        Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className="panel commonpanle">
          <div className="d-flex flex-row  ">
          <ul className="mr-1 elemens w-50">
            <li className="mb-1 text-secondary">Shipment ID</li>
            <li className="mb-1 text-secondary">Shipment Date</li>
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
                <span className={`badge-warning text-white badge badge-pill status secondary-bg ${statusStyle}`}>
               <small>{status}</small>
                </span>
              </div>
        </div>
        </div>
    )
}

export default ShipmentSummary;

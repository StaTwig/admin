import React from 'react';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import { formatDate } from '../../utils/dateHelper';
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
             {props.shipments.poId && 
            <li className="mb-1 text-secondary">PO ID</li>}
            <li className="mb-1 text-secondary">Shipment Date</li>
            <li className="mb-1 text-secondary">From</li>
            <li className="mb-1 text-secondary">To</li>
            </ul>
           <ul className="elemens">
            <li className="mb-1">{props.shipments.id}</li>
             {props.shipments.poId &&
               <li className="mb-1">{props.shipments.poId}</li>}
             <li className="mb-1"> {props.shipments.shippingDate.length == 10 ? props.shipments.shippingDate : formatDate(props.shipments.shippingDate)} </li>
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

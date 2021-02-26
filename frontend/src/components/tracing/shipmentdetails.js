import React from 'react';
import traceDrop from '../../assets/icons/traceDrop.png';
import Down from '../../assets/icons/up.png';
import Verifiedpic from '../../assets/icons/Verifiedpic.png';
import './style.scss'

const ShipmentDetails = (props) => {
    return (
    Object.keys(props.shipments).length === 0 ? <div className="row panel justify-content-between">N/A</div> :
        <div className=  { props.highLight ? "col panel commonpanle highlight" : "col panel commonpanle"}>
          <div className="d-flex flex-row  ">
          <ul className="mr-3 elemens">
            <li className="mb-1 text-secondary">Shipment ID</li>
           <li className="mb-1 text-secondary">Label Type</li>
           <h6 className="poheads potext mt-3 mb-3">Delivery Details:</h6>
           <li className="mb-1 text-secondary">Air Way Bill</li>
           <li className="mb-1 text-secondary">Label Code</li>
           <li className="mb-1 text-secondary">Shipment Date</li> 
           <li className="mb-1 text-secondary">Estimate Delivery Date</li>
          </ul>
           <ul className="elemens">
            <li  className="mb-1">{props.shipments.shipmentDetails[0].id}</li>
            <li  className="mb-1">{props.shipments.shipmentDetails[0].label.labelType}</li>
            <h6 className="poheads potext mt-3 mb-3 text-white">Delivery Details:</h6>
            <li  className="mb-1">{props.shipments.shipmentDetails[0].airWayBillNo}</li>
            <li  className="mb-1">{props.shipments.shipmentDetails[0].label.labelId}</li>
            <li  className="mb-1">{props.shipments.shipmentDetails[0].shippingDate.split('T')[0].split('-')[2]+"/"+props.shipments.shipmentDetails[0].shippingDate.split('T')[0].split('-')[1]+"/"+props.shipments.shipmentDetails[0].shippingDate.split('T')[0].split('-')[0]} </li>
            <li  className="mb-1">{props.shipments.shipmentDetails[0].expectedDeliveryDate.split('T')[0].split('-')[2]+"/"+props.shipments.shipmentDetails[0].expectedDeliveryDate.split('T')[0].split('-')[1]+"/"+props.shipments.shipmentDetails[0].expectedDeliveryDate.split('T')[0].split('-')[0]}</li>
           
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

import React from "react";
import "./style.scss";

const ShipmentSummary = (props) => {
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div className='panel commonpanle'>
      <div className='d-flex flex-row  '>
        <ul className='mr-3 elemens'>
          <li className='mb-1 text-secondary'>Shipment ID</li>
          <li className='mb-1 text-secondary'>Shipment Date</li>
          <li className='mb-1 text-secondary'>From</li>
          <li className='mb-1 text-secondary'>To</li>
        </ul>
        <ul className='elemens'>
          <li className='mb-1'>{props.shipments.shipmentDetails[0].id}</li>
          <li className='mb-1'>
            {" "}
            {props.shipments.shipmentDetails[0].shippingDate
              .split("T")[0]
              .split("-")[2] +
              "/" +
              props.shipments.shipmentDetails[0].shippingDate
                .split("T")[0]
                .split("-")[1] +
              "/" +
              props.shipments.shipmentDetails[0].shippingDate
                .split("T")[0]
                .split("-")[0]}{" "}
          </li>
          <li className='mb-1'>
            {props.shipments.supplierOrgName}.,{props.shipments.fromLocation}
          </li>
          <li className='mb-1'>
            {props.shipments.customerOrgName}.,{props.shipments.toLocation}
          </li>
        </ul>
        <div>
          <span className='badge badge-pill badge-warning text-white'>
            <small>{props.shipments.shipmentDetails[0].status}</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentSummary;

import React from "react";
import { formatDate } from "../../utils/dateHelper";
import "./style.scss";

const ShipmentDetails = (props) => {
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <div
      className={
        props.highLight
          ? "col panel commonpanle highlight"
          : "col panel commonpanle"
      }
    >
      <div className='d-flex flex-row'>
        <ul className='mr-1 w-50 elemens'>
          <h6 className='poheads potext mt-3 mb-3'>From</h6>
          <li className='mb-1 text-secondary'>Organisation Name</li>
          <li className='mb-1 text-secondary'>Organisation Location</li>
          <h6 className='poheads potext mt-3 mb-3'>To</h6>
          <li className='mb-1 text-secondary'>Organisation Name</li>
          <li className='mb-1 text-secondary'>Organisation Location</li>
          <h6 className='poheads potext mt-3 mb-3'>Delivery Details</h6>
          <li className='mb-1 text-secondary'>Transit Number</li>
          <li className='mb-1 text-secondary'>Label Code</li>
          <li className='mb-1 text-secondary'>Shipment Date</li>
          <li className='mb-1 text-secondary'>Estimate Delivery Date</li>
        </ul>
        {/* <li  className="mb-1">{props.shipments.supplier.org.postalAddress.split(',')[0]}</li> */}
        <ul className='w-50 elemens'>
          <h6
            className='poheads potext mt-3 mb-3 text-white'
            style={{ visibility: "hidden" }}
          >
            From
          </h6>
          <li className='mb-1'>{props.shipments.supplier?.id}</li>
          <li className='mb-1'>{props.shipments.supplier?.locationId}</li>
          <h6
            className='poheads potext mt-3 mb-3  text-white'
            style={{ visibility: "hidden" }}
          >
            To{" "}
          </h6>
          <li className='mb-1'>{props.shipments.receiver?.id}</li>
          <li className='mb-1'>{props.shipments.receiver?.locationId}</li>
          <h6
            className='poheads potext mt-3 mb-3 text-white'
            style={{ visibility: "hidden" }}
          >
            Delivery Details
          </h6>
          <li className='mb-1'>{props.shipments.airWayBillNo}</li>
          <li className='mb-1'>{props.shipments.label?.labelId}</li>
          <li className='mb-1'>
            {props.shipments.shippingDate?.length === 10
              ? props.shipments.shippingDate
              : formatDate(props.shipments.shippingDate)}{" "}
          </li>

          <li className='mb-1'>
            {props.shipments.expectedDeliveryDate?.length === 0
              ? "-"
              : props.shipments.expectedDeliveryDate?.length === 10
              ? props.shipments.expectedDeliveryDate
              : formatDate(props.shipments.expectedDeliveryDate)}
          </li>
        </ul>
        <div></div>
      </div>
    </div>
  );
};

export default ShipmentDetails;

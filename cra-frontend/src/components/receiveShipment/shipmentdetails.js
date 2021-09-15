import React from "react";
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
      style={{ height: "45%" }}
    >
      {
        //   <div className="d-flex flex-row  ">
        // <ul className="mr-3 elemens w-50">
        // <li className="mb-1 text-secondary">Shipment Date</li>
        // <h6 className="poheads potext mt-3 mb-3 ml-2">From</h6>
        //   <li className="mb-1 text-secondary">Organisation Name</li>
        //  <li className="mb-1 text-secondary">Organisation Location</li>
        //  <h6 className="poheads potext mt-3 mb-3 ml-2">To</h6>
        //  <li className="mb-1 text-secondary">Organisation Name</li>
        //  <li className="mb-1 text-secondary">Organisation Location</li>
        // </ul>
        //  <ul className="elemens">
        //  <li  className="mb-1">{props.shipments.shippingDate.split('T')[0].split('-')[2]+"/"+props.shipments.shippingDate.split('T')[0].split('-')[1]+"/"+props.shipments.shippingDate.split('T')[0].split('-')[0]} </li>
        //  <h6 className="poheads potext mt-3 mb-3" style={{visibility:'hidden'}}>From</h6>
        //   <li  className="mb-1">{props.shipments.supplier.org.name}</li>
        //   <li  className="mb-1">{props.shipments.supplier.org.postalAddress.split(',')[0]}</li>
        //   <h6 className="poheads potext mt-3 mb-3  text-white" style={{visibility:'hidden'}}>To </h6>
        //   <li  className="mb-1">{props.shipments.receiver.org.name}</li>
        //   <li  className="mb-1">{props.shipments.receiver.org.postalAddress.split(',')[0]}</li>
        //  </ul>
      }
      <div className='container'>
        <div class='row'>
          <div class='col-sm mb-1 text-secondary styler'>Shipment Date</div>
          <div class='col-sm mb-1 styler'>
            {props.shipments.shippingDate.split("T")[0].split("-")[2] +
              "/" +
              props.shipments.shippingDate.split("T")[0].split("-")[1] +
              "/" +
              props.shipments.shippingDate.split("T")[0].split("-")[0]}
          </div>
        </div>
        <div class='row'>
          <div class='col-sm' style={{ padding: 0 }}>
            <h6 className='poheads potext mt-3 mb-3 ml-2 styler_header'>
              From
            </h6>
          </div>
          <div class='col-sm'></div>
        </div>
        <div class='row'>
          <div class='col-sm mb-1 text-secondary styler'>Organisation Name</div>
          <div class='col-sm mb-1 styler'>
            {props.shipments.supplier.org.name}
          </div>
        </div>
        <div class='row'>
          <div class='col-sm mb-1 text-secondary styler'>
            Organisation Location
          </div>
          <div class='col-sm mb-1 styler'>
            {props.shipments.supplier.warehouse.title}
          </div>
        </div>
        <div class='row'>
          <div class='col-sm' style={{ padding: 0 }}>
            <h6 className='poheads potext mt-3 mb-3 ml-2'>To</h6>
          </div>
          <div class='col-sm'></div>
        </div>
        <div class='row'>
          <div class='col-sm mb-1 text-secondary styler'>Organisation Name</div>
          <div class='col-sm mb-1 styler'>
            {props.shipments.receiver.org.name}
          </div>
        </div>
        <div class='row'>
          <div class='col-sm mb-1 text-secondary styler'>
            Organisation Location
          </div>
          <div class='col-sm mb-1 styler'>
            {/* {props.shipments.receiver.org.postalAddress.split(',')[0]} */}
            {props.shipments.receiver.warehouse.title}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default ShipmentDetails;

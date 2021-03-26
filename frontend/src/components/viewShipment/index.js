
import React from 'react';
import { Link } from 'react-router-dom';
import location from '../../assets/icons/CurrentLocationWhite.svg';
import './style.scss';

const ViewShipment = props => {
  const { shipment, id } = props;

  let statusStyle = 'bg-primary';
  let status = 'Shipped';
  if (shipment?.status === 'RECEIVED') {
    statusStyle = 'bg-success';
    status = 'Delivered';
  }

  const shipmentDate = 
    shipment?.shippingDate?.split('T')[0].split('-')[2] + "/" + shipment?.shippingDate?.split('T')[0].split('-')[1] + "/" + shipment?.shippingDate?.split('T')[0].split('-')[0];
  
  const deliveryDate = 
    shipment?.actualDeliveryDate?.split('T')[0].split('-')[2] + "/" + shipment?.actualDeliveryDate?.split('T')[0].split('-')[1] + "/" + shipment?.actualDeliveryDate?.split('T')[0].split('-')[0];

  return (
    <div className="viewshipment text-muted">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">VIEW SHIPMENT</h1>
        <div className="d-flex">
          <Link to={`/shipments`}>
           <button className="btn btn-outline-primary mr-2" >Back to shipments</button>
          </Link>
          <Link to={`/tracing/${id}`}>
            <button
              class="button btn-primary text-light trackBtn"
              onClick={() => {
                // const data = shipments[index];
                // dispatch(setTracingShipments(data));
                // props.history.push(`/tracing/${id}`);
              }}>
              
               <img style={{ padding: 1, height: 15}} src={location} />
              <span className="pl-1">Track</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row bg-white shadow  p-3 m-3">
          <div className="w-50 flex-row d-flex pl-4">
            <span className="w-50">Shipment ID</span>
            <div className="w-50">
              <span className="font-weight-bold text-dark">{shipment.id}</span>
              <span className={`ml-2 p-1 status pl-2 plr-2 rounded text-white secondary-bg ${statusStyle}`}>
                {status}
                </span>
              </div>
          </div>
          <div className="w-50 flex-row d-flex pl-4">
            <span className="w-50">Shipment Date</span>
            <span className="w-50 font-weight-bold text-dark">{shipmentDate}</span>
          </div>
        </div>
        <div className="d-flex flex-row bg-white shadow  p-3 m-3">
          <div className="w-50 flex-column d-flex pl-4">
            <span className="p-1 font-weight-bold text-primary">FROM</span>
            <div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Organisation Name</span>
                <span className="w-50 font-weight-bold text-dark">{shipment.supplier?.org.name}</span>
              </div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Organisation Location</span>
                <span className="w-50 font-weight-bold text-dark">{shipment.supplier?.warehouse?.warehouseAddress?.city+", "+shipment.supplier?.warehouse?.warehouseAddress?.country}</span>
              </div>
            </div>
          </div>
          <div className="w-50 flex-column d-flex pl-4">
            <span className="p-1 font-weight-bold text-primary">TO</span>
            <div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Organisation Name</span>
                <span className="w-50 font-weight-bold text-dark">{shipment.receiver?.org.name}</span>
              </div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Organisation Location</span>
                <span className="w-50 font-weight-bold text-dark">{shipment.receiver?.warehouse?.warehouseAddress?.city+", "+shipment.receiver?.warehouse?.warehouseAddress?.country}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row bg-white shadow   p-3 m-3">
          <div className="w-50 flex-column d-flex pl-4">
            <span className="p-1 font-weight-bold text-primary">Delivery details</span>
            <div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Airway Bill</span>
                <span className="w-50 font-weight-bold text-dark">{shipment.airWayBillNo}</span>
              </div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Label Code</span>
                <span className="w-50 font-weight-bold text-dark">{shipment?.label?.labelId}</span>
              </div>
            </div>
          </div>
          <div className="w-50 flex-column d-flex pl-4">
            <span className="p-1 font-weight-bold text-primary">&nbsp;</span>
            <div >
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Shipment Date</span>
                <span className="w-50 font-weight-bold text-dark">{shipmentDate}</span>
              </div>
              <div className=" d-flex flex-row p-1">
                <span className="w-50">Estimated Delivery Date</span>
                <span className="w-50 font-weight-bold text-dark">{deliveryDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-3 m-3">
          <span className="p-1 font-weight-bold text-info">Product details</span>
          <div className="row">
            {shipment?.products?.map((product, index) => 
              <div key={index} className={`bg-white ${index > 0 ? 'ml-4' : ''} shadow  p-3 w-25`}>
                <span className="p-1 font-weight-normal text-primary">{product.productName}</span>
                {/* <div className="d-flex mt-2 flex-row p-1">
                  <span className="w-50">Product name</span>
                  <span className="w-50 font-weight-bold text-dark">{product.productName}</span>
                </div> */}
                <div className="d-flex flex-row  p-1">
                  <span className="w-50">Manufacturer</span>
                  <span className="w-50 font-weight-bold text-dark">{product.manufacturer}</span>
                </div>
                <div className="d-flex flex-row  p-1">
                  <span className="w-50">Quantity</span>
                  <span className="w-50 font-weight-bold text-dark">{product.productQuantity}</span>
                </div>
                <div className="d-flex flex-row  p-1">
                  <span className="w-50">Label ID</span>
                  <span className="w-50 font-weight-bold text-dark">{product?.labelCode}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShipment;

import React, { useState } from 'react';
import EditTable from '../../shared/table/editTable';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import calenderDark from '../../assets/icons/calendar-grey.svg';
import './style.scss';
import { createShipment } from '../../actions/shipmentActions';

const NewShipment = () => {

  const [shipmentId, setShipmentId] = useState('');
  const [client, setClient] = useState('');
  const [supplier, setSupplier] = useState('');
  const [supplierLocation, setSupplierLocation] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [deliveryTo, setDeliveryTo] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [estimateDeliveryDate, setEstimateDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productName, setProductName] = useState('Select Product');
  const [manufacturerName, setManufacturerName] = useState(
    'Select Manufacturer',
  );
  const [quantity, setQuantity] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [storageCondition, setStorageCondition] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const editTableProps = {
    manufacturerName,
    setManufacturerName,
    productName,
    setProductName,
    quantity,
    setQuantity,
    manufacturingDate,
    setManufacturingDate,
    expiryDate,
    setExpiryDate,
    storageCondition,
    setStorageCondition,
    batchNumber,
    setBatchNumber,
    serialNumber,
    setSerialNumber,
  };
  const onAssign = async () => {
    const data = {
      shipmentId,
      client,
      supplier,
      supplierLocation,
      shipmentDate,
      deliveryTo,
      deliveryLocation,
      estimateDeliveryDate,
    };

    const result = await createShipment({ data });
    if (result.status != 400) {
      setMessage('Assigned Shipment Success');
      setErrorMessage('');
    }
    else
    {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  };
  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE SHIPMENTS</h1>
      <div className="row">
        <div className="col mr-3">
          <div className="form-group">
            <label htmlFor="shipmentId">Shipment ID</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Shipment ID"
              onChange={e => setShipmentId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="client">Client</label>
            <input
              type="text"
              className="form-control"
              name="client"
              placeholder="Enter Client"
              onChange={e => setClient(e.target.value)}
            />
          </div>
        </div>
        <div className="col mr-3">
          <div className="form-group">
            <label htmlFor="shipmentId">Supplier</label>
            <input
              type="text"
              className="form-control"
              name="shipmentId"
              placeholder="Enter Supplier"
              onChange={e => setSupplier(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Supplier Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Location"
              onChange={e => setSupplierLocation(e.target.value)}
            />
           
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Shipment Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mm/dd/yyyy"
              onChange={e => setShipmentDate(e.target.value)}
            />
            <div className="input-group-append">
              <img src={calenderDark} alt="downarrow" width="13" height="13" />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery To</label>
            <input
              type="text"
              className="form-control"
              placeholder=" Enter Receiver"
              onChange={e => setDeliveryTo(e.target.value)}
            />
            
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Location"
              onChange={e => setDeliveryLocation(e.target.value)}
            />
           
          </div>

          <div className="input-group">
            <label htmlFor="shipmentId"> Estimate Delivery Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mm/dd/yyyy"
              onChange={e => setEstimateDeliveryDate(e.target.value)}
            />
            <div className="input-group-append">
              <img src={calenderDark} alt="downarrow" width="13" height="13" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <EditTable {...editTableProps }/>
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>
      <hr />

      <div className="d-flex justify-content-between">
        <div className="total">Grand Total</div>
        <div className="value">0</div>
        <div className="d-flex ">
          <button className="btn btn-outline-info mr-2" onClick={onAssign}>
            Assign Shipmnet Order
          </button>
          <button className="btn-primary btn">Proceed To Review</button>
        </div>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default NewShipment;

/* <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="13" height="13" />
            </div> */
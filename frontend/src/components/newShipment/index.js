import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";

import EditTable from '../../shared/table/editTable';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import calenderDark from '../../assets/icons/calendar-grey.svg';
import './style.scss';
import { createShipment } from '../../actions/shipmentActions';
import { getPOs, getPO } from '../../actions/poActions';
import DropdownButton from '../../shared/dropdownButtonGroup';
import {getAllUsers} from "../../actions/userActions";
import DatePicker from 'react-date-picker';

const NewShipment = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const result = await getPOs();
      setPos(result.data.data);
    }
    fetchData();
    dispatch(getAllUsers());
  },[]);

  useEffect(() => {
    setSupplier(user.name);
  }, [user]);
  const users = useSelector(state => {
    return state.users;
  });
  const user = useSelector(state => {
    return state.user;
  });
  const userNames = users.map(usr => usr.name);
  const [pos, setPos] = useState([]);
  const [po, setPo] = useState('Select PO');
  const [shipmentId, setShipmentId] = useState('');
  const [client, setClient] = useState('');
  const [supplier, setSupplier] = useState(user.username);
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

  const onChange = date => setShipmentDate({ date })
  const onChange1 = date1 => setEstimateDeliveryDate({ date1 })
  const onAssign = async () => {
    const receiver = users.find(usr => usr.name === deliveryTo);
    const data = {
      shipmentId,
      client,
      receiver: receiver.address,
      supplier,
      supplierLocation,
      shipmentDate: shipmentDate.date.toDateString(),
      deliveryTo,
      deliveryLocation,
      estimateDeliveryDate: estimateDeliveryDate.date1.toDateString(),
      status: 'Shipped',
      products:[{
        productName,
        quantity,
        manufacturerName,
        storageCondition,
        manufacturingDate,
        expiryDate,
        batchNumber,
        serialNumber
      }]
    };

    console.log('new shipment data', data);
    const result = await createShipment({ data });
    if (result.status != 400) {
      setMessage('Assigned Shipment Success');
      setErrorMessage('');
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  };

  const onSelectPO = async (item) => {
    setPo(item);
    const result = await getPO(item);
    const poDetail = JSON.parse(result[result.length -1].data);
    const { products } = poDetail;
    const product = Object.keys(products[0])[0];
    setQuantity(products[0][product]);
    setProductName(product.split('-')[0]);
    setManufacturerName(product.split('-')[1]);
  }

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
              value={supplier}
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

            <DatePicker
               className="form-control"
              placeholder="Enter Shipment Date"
              onChange = {onChange}
              value = {shipmentDate.date}
              />
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery To</label>
            <DropdownButton
              name={deliveryTo}
              onSelect={item => setDeliveryTo(item)}
              groups={userNames}
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
            <DatePicker
               className="form-control"
              placeholder="Enter Shipment Date"
              onChange = {onChange1}
              value = {estimateDeliveryDate.date1}
              />
          </div>
        </div>
      </div>
      <hr />
      <EditTable {...editTableProps} />
     {/* <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>*/}

      <DropdownButton
        name={po}
        onSelect={onSelectPO}
        groups={pos}
      />
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

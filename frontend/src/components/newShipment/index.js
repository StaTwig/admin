import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EditTable from './table/editTable';
import './style.scss';
import { createShipment } from '../../actions/shipmentActions';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import {
  getShippingOrderIds,
  getShippingOrderById,
} from '../../actions/shippingOrderAction';
import DropdownButton from '../../shared/dropdownButtonGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShipmentPopUp from './shipmentPopUp';
import ShipmentFailPopUp from './shipmentFailPopUp';
import Modal from '../../shared/modal';

const NewShipment = props => {
  const [shippingOrderIds, setShippingOrderIds] = useState([]);
  const dispatch = useDispatch();
  const [shippingOrderId, setShippingOrderId] = useState(
    'Select Shipping Order ID',
  );
  const user = useSelector(state => state.user);
  const [shippingOrderDetails, setShippingOrderDetails] = useState({});
  const [po, setPo] = useState('');
  const [airWayBillNo, setAirWayBillNo] = useState('');
  const [labelCode, setLabelCode] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [estimateDeliveryDate, setEstimateDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const result = await getShippingOrderIds();
      const ids = result.map(so => so.id);
      setShippingOrderIds(ids);
    }
    fetchData();
  }, []);
  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push('/shipments');
  };
  const closeModalFail = () => {
    setOpenShipmentFail(false);
  };

  const onChange = date => setShipmentDate(date);
  const onChange1 = date => setEstimateDeliveryDate(date);

  const profile = useSelector(state => {
    return state.user;
  });

  const dates = ['shipmentDate', 'estimateDeliveryDate'];
  const dateValidation = date => {
    try {
      let error = false;
      let a = eval(date[0]);
      let b = eval(date[1]);
      if (a > b) {
        setShipmentError('Check deliveryDate');
        setOpenShipmentFail(true);
        error = true;
      }
      return error;
    } catch (err) {
      setOpenShipmentFail(true);
    }
    let error = false;
    let a = eval(date[0]);
    let b = eval(date[1]);
    if (a > b) {
      setShipmentError('Check deliveryDate');
      setOpenShipmentFail(true);
      error = true;
    }
    return error;
  };

  const onAssign = async () => {
    let error = false;
    // dates.forEach(date => { if(!error) dateValidation(date) }); TODO Add validations
    if (!error) {
      const data = {
        airWayBillNo,
        shippingOrderId,
        label: {
          labelId: labelCode,
          labelType: 'QR_2DBAR',
        },
        externalShipmentId: '',
        supplier: {
          id: user.id,
          locationId: shippingOrderDetails.supplierDetails.locationId,
        },
        receiver: {
          id:
            shippingOrderDetails.customerDetails.shippingAddress
              .shipmentReceiverId,
          locationId:
            shippingOrderDetails.customerDetails.shippingAddress
              .shippingAddressId,
        },
        shippingDate: shipmentDate.toISOString(),
        expectedDeliveryDate: estimateDeliveryDate.toISOString(),
        actualDeliveryDate: estimateDeliveryDate.toISOString(),
        status: 'CREATED',
        products: shippingOrderDetails.products,
        poId: shippingOrderDetails.purchaseOrderId,
      };

      const result = await createShipment(data);
      console.log('data', result);
      if (result?.id) {
        setMessage('Created Shipment Success');
      } else {
        setErrorMessage('Create Shipment Failed');
      }
    }
  };

  const handleSOChange = async item => {
    setShippingOrderId(item);
    dispatch(turnOn());
    const result = await getShippingOrderById(item);
    setShippingOrderDetails(result);
    dispatch(turnOff());
  };
  const handleQuantityChange = (value, i) => {
    const soDetailsClone = { ...shippingOrderDetails };
    soDetailsClone.products[i].quantity = value;
    setShippingOrderDetails(soDetailsClone);
  };

  const handleLabelIdChange = (value, i) => {
    const soDetailsClone = { ...shippingOrderDetails };
    soDetailsClone.products[i]['labelId'] = value;
    setShippingOrderDetails(soDetailsClone);
  };
  return (
    <div className="NewShipment">
      <h1 className="breadcrumb">CREATE SHIPMENTS</h1>
      <div className="row mb-3">
      <div className="col bg-white low mr-3">
          <div className="form-group">
            <label htmlFor="shipmentId">Shipping Order ID</label>
            <div className="form-control">
              <DropdownButton
                name={shippingOrderId}
                onSelect={handleSOChange}
                groups={shippingOrderIds}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="client">Purchase Order ID</label>
            <input
              type="text"
              className="form-control"
              name="po"
              placeholder="Purchase Order ID"
              value={shippingOrderDetails.purchaseOrderId}
              disabled={true}
            />
          </div>
            <label htmlFor="client" className="headsup">
              Supplier Details:
            </label>
            <div className="form-group">
              <label htmlFor="client">Organisation ID</label>
              <input
                type="text"
                className="form-control"
                name="organisation ID"
                placeholder="Organisation ID"
                value={
                  shippingOrderDetails?.supplierDetails?.supplierOrganisation
                }
                disabled={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="client">Organisation Name</label>
              <input
                type="text"
                className="form-control"
                name="organisation Name"
                placeholder="Organisation Name"
                disabled={true}
                value={shippingOrderDetails?.supplierDetails?.supplierOrgName}
              />
            </div>
          </div>
        <div className="col mr-3 bg-white">
          <label htmlFor="client" className="headsup">
            Customer Details:
          </label>
          <div className="form-group">
            <label htmlFor="client">Organisation ID</label>
            <input
              type="text"
              className="form-control"
              name="Organsiation ID"
              placeholder="Organisation ID"
              disabled={true}
              value={
                shippingOrderDetails?.customerDetails?.customerOrganisation
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Organisation Name</label>
            <input
              type="text"
              className="form-control"
              name="Organisation Name"
              placeholder="Organisation Name"
              value={shippingOrderDetails?.customerDetails?.customerOrgName}
            />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Delivery Location ID"
              disabled={true}
              value={
                shippingOrderDetails?.customerDetails?.shippingAddress
                  ?.shippingAddressId
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Delivery Location"
              disabled={true}
              value={shippingOrderDetails?.customerDetails?.deliveryLocation}
            />
          </div>
        </div>
        <div className="col bg-white">
          <label htmlFor="client " className="headsup">
            Delivery Details:
          </label>
          <div className="form-group">
            <label htmlFor="client">Air Way Bill No.</label>
            <input
              type="text"
              className="form-control"
              name="airWayBillNo"
              placeholder="Enter Air Way Bill No"
              onChange={e => setAirWayBillNo(e.target.value)}
              value={airWayBillNo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="client">Label Code</label>
            <input
              type="text"
              className="form-control"
              name="Label code"
              placeholder="Enter Label ID"
              onChange={e => setLabelCode(e.target.value)}
              value={labelCode}
            />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Shipment Date</label>
            <div className="form-control">
              <DatePicker
                className="date"
                selected={
                  shipmentDate
                    ? new Date(Date.parse(shipmentDate))
                    : shipmentDate
                }
                onKeyDown={e =>
                  (e.keyCode != 8) &&
                   e.preventDefault()
                 }
                placeholderText="Enter Shipment Date"
                onChange={onChange}
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
            </div>
          </div>

          <div className="input-group ">
            <label htmlFor="shipmentId "> Estimate Delivery Date</label>
            <div className="form-control">
              <DatePicker
                className="date"
                placeholderText="Enter Delivery Date"
                onChange={onChange1}
                selected={
                  estimateDeliveryDate
                    ? new Date(Date.parse(estimateDeliveryDate))
                    : estimateDeliveryDate
                }
                onKeyDown={e =>
                 (e.keyCode != 8) &&
                  e.preventDefault()
                }
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
              <div />
            </div>
          </div>
        </div>
      </div>
      {shippingOrderDetails?.products?.map((product, i) => (
        <EditTable
          product={product}
          handleQuantityChange={handleQuantityChange}
          handleLabelIdChange={handleLabelIdChange}
          index={i}
        />
      ))}
      <hr />

      <div className="d-flex justify-content-between">
        <div className="total">Grand Total</div>
        <div className="value">{quantity}</div>
        <div className="d-flex ">
          <button className="btn btn-primary mr-2 " onClick={onAssign}>
            {' '}
            Create Shipment
          </button>
        </div>
      </div>
      {openCreatedInventory && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentPopUp
            onHide={closeModal} //FailurePopUp
          />
        </Modal>
      )}
      {openShipmentFail && (
        <Modal
          close={() => closeModalFail()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <ShipmentFailPopUp
            onHide={closeModalFail} //FailurePopUp
            shipmentError={shipmentError}
          />
        </Modal>
      )}
      {message && <div className="alert alert-success">{message}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default NewShipment;

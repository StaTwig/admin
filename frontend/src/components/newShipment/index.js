import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EditTable from './table/editTable';
import updownArrow from '../../assets/icons/up-and-down-dark.svg';
import calenderDark from '../../assets/icons/calendar-grey.svg';
import './style.scss';
import {
  createShipment,
  setReviewShipments,
} from '../../actions/shipmentActions';
import { getPOs, getPO } from '../../actions/poActions';
import DropdownButton from '../../shared/dropdownButtonGroup';
import { getAllUsers } from '../../actions/userActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShipmentPopUp from './shipmentPopUp';
import ShipmentFailPopUp from './shipmentFailPopUp';
import Modal from '../../shared/modal';
import ReactTooltip from 'react-tooltip';

const NewShipment = props => {
  const dispatch = useDispatch();

  const editShipment = useSelector(state => {
    return state.editShipment;
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getPOs();
      setPos(result.data.data);
    }
    fetchData();
    dispatch(getAllUsers());
  }, []);

  useEffect(
    () => {
      setSupplier(user.name);
    },
    [user],
  );
  const users = useSelector(state => {
    return state.users;
  });
  const user = useSelector(state => {
    return state.user;
  });
  const userNames = users.map(usr => usr.name);
  const [pos, setPos] = useState([]);
  const [po, setPo] = useState('Select PO');
  const [shipmentId, setShipmentId] = useState(editShipment.shipmentId);
  const [client, setClient] = useState(editShipment.client);
  const [supplier, setSupplier] = useState(user.username);
  const [supplierLocation, setSupplierLocation] = useState(
    editShipment.supplierLocation,
  );
  const [shipmentDate, setShipmentDate] = useState(editShipment.shipmentDate);
  const [deliveryTo, setDeliveryTo] = useState(editShipment.deliveryTo);
  const [deliveryLocation, setDeliveryLocation] = useState(
    editShipment.deliveryLocation,
  );
  const [estimateDeliveryDate, setEstimateDeliveryDate] = useState(
    editShipment.estimateDeliveryDate,
  );
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productName, setProductName] = useState(
    editShipment.products[0].productName,
  );
  const [manufacturerName, setManufacturerName] = useState(
    editShipment.products[0].manufacturerName,
  );
  const [quantity, setQuantity] = useState(editShipment.products[0].quantity);
  const [manufacturingDate, setManufacturingDate] = useState(
    editShipment.products[0].manufacturingDate,
  );
  const [expiryDate, setExpiryDate] = useState(
    editShipment.products[0].expiryDate,
  );
  const [storageConditionmin, setStorageConditionmin] = useState(
    editShipment.products[0].storageConditionmin,
  );
  const [storageConditionmax, setStorageConditionmax] = useState(
    editShipment.products[0].storageConditionmax,
  );
  const [batchNumber, setBatchNumber] = useState(
    editShipment.products[0].batchNumber,
  );
  const [serialNumber, setSerialNumber] = useState(
    editShipment.products[0].serialNumber,
  );
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [openShipmentFail, setOpenShipmentFail] = useState(false);
  const [shipmentError, setShipmentError] = useState('');

  const closeModal = () => {
    setOpenCreatedInventory(false);
    props.history.push('/shipments');
  };
  const closeModalFail = () => {
    setOpenShipmentFail(false);
    // props.history.push('/shipments');
  };

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
    storageConditionmin,
    setStorageConditionmin,
    storageConditionmax,
    setStorageConditionmax,
    batchNumber,
    setBatchNumber,
    serialNumber,
    setSerialNumber,
  };

  const onChange = date => setShipmentDate(date);
  const onChange1 = date => setEstimateDeliveryDate(date);

  const shipmentFields = [
    'shipmentId',
    'client',
    'deliveryTo',
    'supplierLocation',
    'deliveryLocation',
    'shipmentDate',
    'estimateDeliveryDate',
    'productName',
    'quantity',
    'manufacturerName',
    'storageConditionmin',
    'storageConditionmax',
    'manufacturingDate',
    'expiryDate',
    'batchNumber',
    'serialNumber',
  ];

  const assignShipmentFields = [
    'shipmentId',
    'client',
    'deliveryTo',
    'supplierLocation',
    'deliveryLocation',
    'shipmentDate',
    'estimateDeliveryDate',
    'productName',
    'quantity',
    'manufacturerName',
  ];

  const profile = useSelector(state => {
    return state.user;
  });

  const dates = ['shipmentDate', 'estimateDeliveryDate'];
  const dateValidation = date => {
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

  const checkValidationErrors = validations => {
    let error = false;
    for (let i = 0; i < validations.length; i++) {
      let validationVariable = eval(validations[i]);
      if (
        validationVariable.length < 1 ||
        validationVariable == 'Select Product' ||
        validationVariable == 'Select Manufacturer' ||
        validationVariable == 'Select receiver'
      ) {
        setShipmentError(validations[i]);
        setOpenShipmentFail(true);
        error = true;
        break;
      }
    }

    return error;
  };
  const onProceedToReview = () => {
    if (checkValidationErrors(shipmentFields)) {
      return;
    }
    const receiver = users.find(usr => usr.name === deliveryTo);
    const data = {
      shipmentId,
      client,
      receiver: receiver.address,
      supplier,
      supplierAddress: profile.address,
      supplierLocation,
      shipmentDate:
        typeof shipmentDate == 'string'
          ? shipmentDate
          : shipmentDate.toLocaleDateString(),
      deliveryTo,
      deliveryLocation,
      estimateDeliveryDate:
        typeof estimateDeliveryDate == 'string'
          ? estimateDeliveryDate
          : estimateDeliveryDate.toLocaleDateString(),
      status: 'In Transit',
      products: [
        {
          productName,
          quantity,
          manufacturerName,
          storageConditionmin,
          storageConditionmax,
          manufacturingDate:
            typeof manufacturingDate == 'string'
              ? manufacturingDate
              : manufacturingDate.toLocaleDateString(),
          expiryDate:
            typeof expiryDate == 'string'
              ? expiryDate
              : expiryDate.toLocaleDateString(),
          batchNumber,
          serialNumber,
        },
      ],
    };

    //Store in reducer
    dispatch(setReviewShipments(data));

    //Redirect to review page.
    props.history.push('/reviewshipment');

    console.log('new shipment data', data);
  };
  const onAssign = async () => {
    if (checkValidationErrors(assignShipmentFields)) {
      return;
    }
    if (dateValidation(dates)) {
      return;
    }
    const receiver = users.find(usr => usr.name === deliveryTo);
    const data = {
      shipmentId,
      poNumber: po,
      client,
      receiver: receiver.address,
      supplier,
      supplierLocation,
      shipmentDate: shipmentDate.toLocaleDateString(),
      deliveryTo,
      deliveryLocation,
      estimateDeliveryDate: estimateDeliveryDate.toLocaleDateString(),
      status: 'Shipped',
      products: [
        {
          productName,
          quantity,
          manufacturerName,
          storageConditionmin,
          storageConditionmax,
          manufacturingDate,
          expiryDate,
          batchNumber,
          serialNumber,
        },
      ],
    };

    console.log('new shipment data', data);
    const result = await createShipment({ data });
    debugger;
    if (result.status == 1) {
      setOpenCreatedInventory(true);
    } else if (result.status === 500) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  };

  const onSelectPO = async item => {
    setPo(item);
    const result = await getPO(item);
    const poDetail = JSON.parse(result[result.length - 1].data);
    const { products } = poDetail;
    const product = Object.keys(products[0])[0];
    setQuantity(products[0][product]);
    setProductName(product.split('-')[0]);
    setManufacturerName(product.split('-')[1]);
    setDeliveryTo(poDetail.receiver.name);
    setDeliveryLocation(poDetail.destination);
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
              value={shipmentId}
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
              value={client}
            />
          </div>
          <div className="form-group">
            <label htmlFor="client">Purchase Order</label>
            <div className="form-control">
              <DropdownButton name={po} onSelect={onSelectPO} groups={pos} />
            </div>
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
              value={supplierLocation}
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
                placeholderText="Enter Shipment Date"
                onChange={onChange}
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery To</label>
            <div className="form-control">
              <DropdownButton
                name={deliveryTo}
                onSelect={item => setDeliveryTo(item)}
                groups={userNames}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Location"
              onChange={e => setDeliveryLocation(e.target.value)}
              value={deliveryLocation}
            />
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
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
              <div>
                {console.log(
                  'expiry date',
                  estimateDeliveryDate,
                  new Date(Date.parse(estimateDeliveryDate)),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <EditTable {...editTableProps} />
      <button className="btn btn-white shadow-radius font-bold">
        +<span> Add Another Product</span>
      </button>

      <hr />

      <div className="d-flex justify-content-between">
        <div className="total">Grand Total</div>
        <div className="value">{quantity}</div>
        <div className="d-flex ">
          <button
            className="btn btn-outline-info mr-2 "
            data-tip="Assigning to scan Batch number and Serial numbers"
            onClick={onAssign}
          >
            {' '}
            Assign Shipment Order
          </button>
          <ReactTooltip backgroundColor="#0093E9" />

          {/*<button className="btn-primary btn"  onClick={onProceedToReview}>Proceed To Review</button> */}
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

/* <div className="input-group-append">
              <img src={updownArrow} alt="downarrow" width="13" height="13" />
        
         <button className="btn btn-outline-info mr-2" onClick={onAssign}>
            Assign Shipment Order
          </button>      </div> */

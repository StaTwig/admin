import React,{useState} from 'react';
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

  const[shippings]=useState(["123"])
  
  const [shippingOrderId, setShippingOrderId] = useState ('Select Shipping Order ID');
  const [po, setPo] = useState('');
  const [supplierOrganisationId,setSupplierOrganisationId] = useState('');
  const [supplierOrganisationName, setSupplierOrganisationName] = useState('');
  const [customerOrganisationId,setCustomerOrganisationId] = useState('');
  const [customerOrganisationName, setCustomerOrganisationName] = useState('');
  const [deliveryLocationId, setDeliveryLocationId] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [airWayBillNo, setAirWayBillNo] = useState('');
  const [labelCode, setLabelCode] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [estimateDeliveryDate, setEstimateDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [labelId, setLabelId] = useState('');
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
    manufacturer,
    setManufacturer,
    productId,
    setProductId,
    productName,
    setProductName,
    quantity,
    setQuantity,
    labelId,
    setLabelId,
  };

  const onChange = date => setShipmentDate(date);
  const onChange1 = date => setEstimateDeliveryDate(date);

  const shipmentFields = [
    
  ];

  const assignShipmentFields = [
    
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
 
  const onAssign = async () => {
   /* if (checkValidationErrors(assignShipmentFields)) {
      return;
    }
    if (dateValidation(dates)) {
      return;
    }
    const receiver = users.find(usr => usr.name === deliveryTo); */
    const data = {
      shipment:{
      shippingOrderId,
      po, 
      supplierDetails:{
      supplierOrganisationId,
      supplierOrganisationName
      },
      customerDetails:{
      customerOrganisationId,
      customerOrganisationName,
      deliveryLocationId,
      deliveryLocation
      },
      deliveryDetails:{
      airWayBillNo,
      labelCode,
      shipmentDate: shipmentDate.toLocaleDateString(),
      estimateDeliveryDate: estimateDeliveryDate.toLocaleDateString()
      },
     
      products: [
        {
          productId,
          productName,
          manufacturer,
          quantity,
          labelId
        },
      ],
    }
    };

    console.log('new shipment data', data);
    const result = await createShipment(data );
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
      <div className="row mb-3">
        <div className="col mr-3">
          <div className="form-group">
            <label htmlFor="shipmentId">Shipping Order ID</label>
            <div className="form-control">
              <DropdownButton
               name={shippingOrderId} 
                onSelect={item => setShippingOrderId(item)}
               groups={shippings} 
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
              onChange={e => setPo(e.target.value)}
              value={po}
            />
          </div>
          <div className="col bg-white low">
          <label htmlFor="client" className="headsup">Supplier Details:</label>
          <div className="form-group">
            <label htmlFor="client">Organisation ID</label>
            <input
              type="text"
              className="form-control"
              name="organisation ID"
              placeholder="organisation ID"
              onChange={e => setSupplierOrganisationId(e.target.value)}
              value={supplierOrganisationId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="client">organisation Name</label>
            <input
              type="text"
              className="form-control"
              name="organisation Name"
              placeholder="organisation Name"
              onChange={e => setSupplierOrganisationName(e.target.value)}
              value={supplierOrganisationName}
            />
          </div>
          </div>
        </div>
        <div className="col mr-3 bg-white">
        <label htmlFor="client" className="headsup">Customer Details:</label>
        <div className="form-group">
            <label htmlFor="client">Organisation ID</label>
            <input
              type="text"
              className="form-control"
              name="Organsiation ID"
              placeholder="Organisation ID"
              onChange={e => setCustomerOrganisationId(e.target.value)}
              value={customerOrganisationId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shipmentId">Organisation Name</label>
            <input
              type="text"
              className="form-control"
              name="Organisation Name"
              placeholder="Organisation Name"
              onChange={e => setCustomerOrganisationName(e.target.value)}
              value={customerOrganisationName}
            />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Delivery Location ID"
              onChange={e => setDeliveryLocationId(e.target.value)}
              value={deliveryLocationId}
            />
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Delivery Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Delivery Location"
              onChange={e => setDeliveryLocation(e.target.value)}
              value={deliveryLocation}
            />
          </div>
        </div>
        <div className="col bg-white">
        <label htmlFor="client " className="headsup">Delivery Details:</label>
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
      <EditTable {...editTableProps} />
      <hr />

      <div className="d-flex justify-content-between">
        <div className="total">Grand Total</div>
        <div className="value">{quantity}</div>
        <div className="d-flex ">
          <button
            className="btn btn-primary mr-2 "
       
            onClick={onAssign}
          >
            {' '}
          Create Shipment
          </button>
        

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

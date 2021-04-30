import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pen from '../../assets/icons/pen1.svg';
import {
  addProductsToInventory,
  resetReviewInventories
} from '../../actions/inventoryActions';
import { turnOff, turnOn } from "../../actions/spinnerActions";
import Modal from '../../shared/modal';
import InventoryPopUp from './inventorypopup';
import Product from '../../assets/icons/CurrentInventory.png';
import Manufacturer from '../../assets/icons/brand.svg';
import Quantity from '../../assets/icons/TotalInventoryAdded_2.png';
import Mfg_date from '../../assets/icons/ship_date.png';
import Expire from '../../assets/icons/ship_date.png';
import Batch from '../../assets/icons/Batch.png';
import Serial from '../../assets/icons/Serial.png';
import './style.scss';

const VerifyInventory = props => {
  const dispatch = useDispatch();
  const reviewInventories = useSelector(state => {
    return state.reviewInventory;
  });

  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const closeModal = () => {
    props.history.push('/inventory');
  };
  const onAssign = async () => {
    dispatch(turnOn());

    const postData = reviewInventories.map(inventory => {
      return {
        productId: inventory.productId,
        batchNumber: inventory.batchNumber,
        mfgDate: inventory.manufacturingDate,
        expDate: inventory.expiryDate,
        quantity: parseInt(inventory.quantity),
        serialNumbersRange: inventory.serialNumber,
        productName: inventory.productName,
        manufacturerName: inventory.manufacturer
      }
    });
    const result = await addProductsToInventory({
      products: postData,
    });
    setOpenCreatedInventory(true);
    if (result.status === 1) {
      setSuccessMessage(result.message)
    }else {
      setErrorMessage(result.data.message);
    }
    dispatch(turnOff());
    dispatch(resetReviewInventories());
  };

  const onEdit = () => {
    props.history.push('/newinventory');
  };

  return (
    <div className="verifyinventory">
      <div className="d-flex flex-row justify-content-between">
        <h1 className="breadcrumb">REVIEW INVENTORY</h1>
        {/* <button type="button" className="btn btn-outline-info">
          Export
        </button> */}
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="head ml-3">Description Of Goods </h5>
          <div className="row  mt-4 pl-2">
            <span className="col-2 text-left"><img src={Product} width="16" height="16" /><span className="pl-1 text-muted">Product Name</span></span>
            <span className="col-2 text-left"><img src={Manufacturer} width="16" height="16" /><span className="pl-1 text-muted">Manufacturer</span></span>
            <span className="col pl-3 text-left"><img src={Quantity} width="25" height="16" /><span className="pl-1 text-muted">Quantity</span></span>
            <span className="col  text-center text-muted"><img src={Mfg_date} width="16" height="16" /><span className="pl-1 text-muted">Mfg Date </span></span>
            <span className="col  text-right text-muted"><img src={Expire} width="16" height="16" /><span className="pl-1 text-muted">Expiry Date</span></span>
            <span className="col pl-5 text-right text-muted"><img src={Batch} width="16" height="16" /><span className="pl-1 text-muted">Batch Number</span></span>
            <span className="col-2 pl-5 text-left text-muted"><img src={Serial} width="16" height="16" /><span className="pl-1 text-muted">Serial Numbers</span></span>
          </div>
          {reviewInventories.map(reviewInventory => (
            <div className="row pl-4 p-3">
              <span className="col-2 pl-4 text-left">{reviewInventory.productName}</span>
              <span className="col-2 pl-4 text-left">{reviewInventory.manufacturer}</span>
              <span className="col pl-5 text-left">{reviewInventory.quantity}</span>
              <span className="col pl-4 text-left">{reviewInventory.manufacturingDate ? `0${new Date(
                Date.parse(reviewInventory.manufacturingDate),
              ).getMonth() + 1}`.slice(-2) +
                '/' +
                new Date(
                  Date.parse(reviewInventory.manufacturingDate),
                ).getFullYear() : ''}
              </span>
              <span className="col pl-3 text-center">{reviewInventory.expiryDate ? `0${new Date(
                Date.parse(reviewInventory.expiryDate),
              ).getMonth() + 1}`.slice(-2) +
                '/' +
                new Date(
                  Date.parse(reviewInventory.expiryDate),
                ).getFullYear() : ''}
               </span>
              <span className="col pl-5 text-center">{reviewInventory.batchNumber}</span>
              <span className="col-2 pl-5 text-center">{reviewInventory.serialNumber}</span>
            </div>
          ))}
          <hr />
          <div className="">
            <div className="d-flex flex-row-reverse">
              <button className="btn-primary btn" onClick={onAssign}>
                <b>SAVE</b>
              </button>
              <button className="btn-outline-dark btn mr-2" onClick={onEdit}>
                <img src={Pen} width="15" height="15" className="mr-3" />
                <span><b>EDIT</b></span>
              </button>

              {openCreatedInventory && (
                <Modal
                  close={() => closeModal()}
                  size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
                >
                  <InventoryPopUp
                    onHide={closeModal} //FailurePopUp
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyInventory;

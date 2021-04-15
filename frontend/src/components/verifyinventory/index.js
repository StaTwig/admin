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
import mon from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import qty from '../../assets/icons/TotalInventoryAddedcopy.svg';
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
        serialNumbersRange: inventory.serialNumber
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
          <div className="row  mt-3">
            <span className="col-2 text-left"><img src={Package} width="16" height="16" /><span className="pl-1 text-muted">Product Name</span></span>
            <span className="col-2 text-left"><img src={mon} width="16" height="16" /><span className="pl-1 text-muted">Manufacturer</span></span>
            <span className="col text-left"><img src={qty} width="16" height="16" /><span className="pl-1 text-muted">Quantity</span></span>
            <span className="col-2 text-left text-muted">Manufacturer Date</span>
            <span className="col text-left text-muted">Expiry Date</span>
            <span className="col text-left text-muted">Batch Number</span>
            <span className="col-2 text-left text-muted">Serial Numbers Range</span>
          </div>
          {reviewInventories.map(reviewInventory => (
            <div className="row p-2">
              <span className="col-2 text-left">{reviewInventory.productName}</span>
              <span className="col-2 text-left">{reviewInventory.manufacturer}</span>
              <span className="col text-left">{reviewInventory.quantity}</span>
              <span className="col-2 text-left">{reviewInventory.manufacturingDate ? `0${new Date(
                Date.parse(reviewInventory.manufacturingDate),
              ).getMonth() + 1}`.slice(-2) +
                '/' +
                new Date(
                  Date.parse(reviewInventory.manufacturingDate),
                ).getFullYear() : ''}
              </span>
              <span className="col text-left">{reviewInventory.expiryDate ? `0${new Date(
                Date.parse(reviewInventory.expiryDate),
              ).getMonth() + 1}`.slice(-2) +
                '/' +
                new Date(
                  Date.parse(reviewInventory.expiryDate),
                ).getFullYear() : ''}
               </span>
              <span className="col text-left">{reviewInventory.batchNumber}</span>
              <span className="col-2 text-left">{reviewInventory.serialNumber}</span>
            </div>
          ))}
          <hr />
          <div className="">
            <div className="d-flex flex-row-reverse">
              <button className="btn-primary btn" onClick={onAssign}>
                ADD INVENTORY
              </button>
              <button className="btn-outline-dark btn mr-2" onClick={onEdit}>
                <img src={Pen} width="15" height="15" className="mr-3" />
                <span>EDIT</span>
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

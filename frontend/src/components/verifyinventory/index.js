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
    debugger;
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
          {reviewInventories.map(reviewInventory => (
            <div className="d-flex text-muted flex-row justify-content-between">
              <ul>
                <li className="opacityHalf">Product Name</li>
                <li>{reviewInventory.productName}</li>
              </ul>
              <ul>
                <li className="opacityHalf">Manufacturer</li>
                <li>{reviewInventory.manufacturer}</li>
              </ul>
              <ul>
                <li className="opacityHalf">Quantity</li>
                <li>{reviewInventory.quantity}</li>
              </ul>
              <ul>
                <li className="opacityHalf">Manufacturer Date</li>
                <li>
                  {reviewInventory.manufacturingDate ? `0${new Date(
                    Date.parse(reviewInventory.manufacturingDate),
                  ).getMonth() + 1}`.slice(-2) +
                    '/' +
                    new Date(
                      Date.parse(reviewInventory.manufacturingDate),
                    ).getFullYear() : ''}
                </li>
              </ul>
              <ul>
                <li className="opacityHalf">Expiry Date</li>
                <li>
                  {reviewInventory.expiryDate ? `0${new Date(
                    Date.parse(reviewInventory.expiryDate),
                  ).getMonth() + 1}`.slice(-2) +
                    '/' +
                    new Date(
                      Date.parse(reviewInventory.expiryDate),
                    ).getFullYear() : ''}
                </li>
              </ul>
              <ul>
                <li className="opacityHalf">Batch Number</li>
                <li>{reviewInventory.batchNumber}</li>
              </ul>
              <ul>
                <li className="opacityHalf"> Serial Numbers Range</li>
                <li>{reviewInventory.serialNumber}</li>
              </ul>
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

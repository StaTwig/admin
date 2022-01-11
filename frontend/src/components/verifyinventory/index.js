import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pen from "../../assets/icons/pen1.svg";
import {
  addProductsToInventory,
  resetReviewInventories,
} from "../../actions/inventoryActions";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import Modal from "../../shared/modal";
import InventoryPopUp from "./inventorypopup";
import Product from "../../assets/icons/CurrentInventory.png";
import Manufacturer from "../../assets/icons/brand.svg";
import Quantity from "../../assets/icons/TotalInventoryAdded_2.png";
import Mfg_date from "../../assets/icons/ship_date.png";
import Expire from "../../assets/icons/ship_date.png";
import Batch from "../../assets/icons/batch.png";
import Serial from "../../assets/icons/serial.png";
import "./style.scss";

const VerifyInventory = (props) => {
  const { t } = props;
  const dispatch = useDispatch();
  const reviewInventories = useSelector((state) => {
    return state.reviewInventory;
  });
  console.log("reviewInventories",reviewInventories);
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const closeModal = () => {
    props.history.push("/inventory");
  };
  const onAssign = async () => {
    dispatch(turnOn());

    const postData = reviewInventories.map((inventory) => {
      console.log('Inventory details', inventory);
      return {
        productId: inventory.productId,
        batchNumber: inventory.batchNumber,
        mfgDate: inventory.manufacturingDate,
        expDate: inventory.expiryDate,
        quantity: parseInt(inventory.quantity),
        serialNumbersRange: inventory.serialNumber,
        unitOfMeasure:inventory.unitofMeasure.name
      };
    });

    // console.log('PostData', postData);
    const result = await addProductsToInventory({
      products: postData,
    });
    console.log(result)
    setOpenCreatedInventory(true);
    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
    dispatch(turnOff());
    dispatch(resetReviewInventories());
  };

  const onEdit = () => {
    props.history.push("/newinventory");
  };

  return (
    <div className='verifyinventory'>
      <div className='d-flex flex-row justify-content-between'>
        <h1 className='breadcrumb mt-2'>{t('review_inventory')}</h1>
        {/* <button type="button" className="btn btn-outline-info">
          Export
        </button> */}
      </div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='head ml-1'>{t('description_of_goods')}</h5>
          <div>
            <div className='row p1-1 mt-4'>
              <span className='col-3'>
                <img src={Product} width='15' height='15' alt='Product' />
                <span className='ml-1 text-muted'>{t('product_name')}</span>
              </span>
              <span className='col-2'>
                <img
                  src={Manufacturer}
                  width='15'
                  height='15'
                  alt={t('manufacturer')}
                />
                <span className='ml-1 text-muted'>{t('manufacturer')}</span>
              </span>
              <span
                className='col-1'
                style={{ position: "relative", left: "-40px" }}
              >
                <img src={Quantity} width='24' height='15' alt='Quantity' />
                <span className='ml-1 text-muted'>{t('quantity')}</span>
              </span>
              <span className='col-1'>
                <img src={Mfg_date} width='15' height='15' alt='Date' />
                <span className='ml-1 text-muted'>{t('mfg_date')}</span>
              </span>
              <span className='col-1'>
                <img src={Expire} width='15' height='15' alt='Expiry Date' />
                <span className='ml-1 text-muted'>{t('exp_date')}</span>
              </span>
              <span className='col-2'>
                <img src={Batch} width='15' height='15' alt='Batch' />
                <span className='ml-1 text-muted'>{t('batch_no')}</span>
              </span>
              <span
                className='col-2'
                style={{ position: "relative", left: "-60px" }}
              >
                <img src={Serial} width='15' height='15' alt='Serial' />
                <span className='ml-1 text-muted'>{t('serial_numbers')}</span>
              </span>
            </div>
            {reviewInventories.map((reviewInventory) => {
              console.log('Individual Details', reviewInventory);
              return (
              <div className='row p-1 mt-4'>
                <span className='col-3'>{reviewInventory.productName}</span>
                <span className='col-2'>
                  {reviewInventory.manufacturer
                    ? reviewInventory.manufacturer
                    : reviewInventory.manufacturerName}
                </span>
                <span
                  className='col-1 text-right'
                  style={{ position: "relative", left: "-50px" }}
                >
                  {reviewInventory['quantity']}
                  <span>{"("}</span>
                  {reviewInventory.unitofMeasure.name}
                  <span>{")"}</span>
                </span>
                <span className='col-1'>
                  {reviewInventory.manufacturingDate
                    ? `0${
                        new Date(
                          Date.parse(reviewInventory.manufacturingDate)
                        ).getMonth() + 1
                      }`.slice(-2) +
                      "/" +
                      new Date(
                        Date.parse(reviewInventory.manufacturingDate)
                      ).getFullYear()
                    : ""}
                </span>
                <span className='col-1'>
                  {reviewInventory.expiryDate
                    ? `0${
                        new Date(
                          Date.parse(reviewInventory.expiryDate)
                        ).getMonth() + 1
                      }`.slice(-2) +
                      "/" +
                      new Date(
                        Date.parse(reviewInventory.expiryDate)
                      ).getFullYear()
                    : ""}
                </span>
                <span className='col-2'>{reviewInventory.batchNumber}</span>
                <span
                  className='col-2'
                  style={{ position: "relative", left: "-55px" }}
                >
                  {reviewInventory.serialNumber}
                </span>
              </div>
            );
          })}
          </div>

          <hr />
          <div className=''>
            <div className='d-flex flex-row-reverse'>
              <button className='btn-primary btn' onClick={onAssign}>
                <b>{t('save')}</b>
              </button>
              {reviewInventories.length > 0 &&
                reviewInventories[0].manufacturer && (
                  <button
                    className='btn-outline-dark btn mr-2'
                    onClick={onEdit}
                  >
                    <img
                      src={Pen}
                      width='15'
                      height='15'
                      className='mr-3'
                      alt={t('edit')}
                    />
                    <span>
                    <b>{t('edit')}</b>
                    </span>
                  </button>
                )}
              {openCreatedInventory && (
                <Modal
                  close={() => closeModal()}
                  size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
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

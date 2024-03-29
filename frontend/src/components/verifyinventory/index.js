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
  const { t, i18n } = props;
  const dispatch = useDispatch();
  const reviewInventories = useSelector((state) => {
    return state.reviewInventory;
  });
  const [openCreatedInventory, setOpenCreatedInventory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const closeModal = () => {
    props.history.push("/inventory");
  };
  const onAssign = async () => {
    dispatch(turnOn());

    const postData = reviewInventories.map((inventory) => {
      return {
        productId: inventory.productId,
        batchNumber: inventory.batchNumber,
        mfgDate: inventory.manufacturingDate,
        expDate: inventory.expiryDate,
        quantity: parseInt(inventory.quantity),
        serialNumbersRange: inventory.serialNumber,
        unitOfMeasure: inventory?.unitofMeasure?.name,
      };
    });

    const result = await addProductsToInventory({
      products: postData,
    });
    setOpenCreatedInventory(true);
    if (result.data.success) {
      setSuccessMessage(result.data.message);
    } else {
      setErrorMessage(result.data.message);
    }
    dispatch(turnOff());
    dispatch(resetReviewInventories());
  };

  const onEdit = () => {
    props.history.push("/newinventory");
  };

  const schemaClass = "ml-1 text-muted text-review-column";

  return (
    <div className='verifyinventory'>
      <div className='d-flex flex-row justify-content-between'>
        <h1 className='breadcrumb mt-2'>{t("review_inventory")}</h1>
      </div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='head ml-1'>{t("description_of_goods")}</h5>
          <div>
            <div className='row p1-1 mt-4'>
              <span className='col-3' style={{ flex: "0 0 20%" }}>
                <img src={Product} width='15' height='15' alt='Product' />
                <span className={schemaClass}>{t("product_name")}</span>
              </span>
              <span className='col-2' style={{ flex: "0 0 14.666667%" }}>
                <img
                  src={Manufacturer}
                  width='15'
                  height='15'
                  alt={t("manufacturer")}
                />
                <span className={schemaClass}>{t("manufacturer")}</span>
              </span>
              <span
                className='col-1'
                style={{
                  position: "relative",
                  left: "-16px",
                  flex: "0 0 11.333333%",
                  maxWidth: "11.333333%",
                }}
              >
                <img src={Quantity} width='15' height='15' alt='Quantity' />
                <span className={schemaClass}>{t("quantity")}</span>
              </span>
              <span
                className='col-1'
                style={{ flex: "0 0 11.333333%", maxWidth: "11.333333%" }}
              >
                <img src={Mfg_date} width='15' height='15' alt='Date' />
                <span className={schemaClass}>{t("mfg_date")}</span>
              </span>
              <span
                className='col-1'
                style={{ flex: "0 0 11.333333%", maxWidth: "11.333333%" }}
              >
                <img src={Expire} width='15' height='15' alt='Expiry Date' />
                <span className={schemaClass}>{t("exp_date")}</span>
              </span>
              <span
                className='col-2'
                style={{ flex: "0 0 15.666667%", maxWidth: "15.666667%" }}
              >
                <img src={Batch} width='15' height='15' alt='Batch' />
                <span className={schemaClass}>{t("batch_no")}</span>
              </span>
              <span
                className='col-2'
                style={{
                  position: "relative",
                  left: "-60px",
                  flex: "0 0 15.666667%",
                  maxWidth: "15.666667%",
                }}
              >
                <img src={Serial} width='15' height='15' alt='Serial' />
                <span className={schemaClass}>{t("serial_numbers")}</span>
              </span>
            </div>
            {reviewInventories.map((reviewInventory) => {
              var expiryMonth;
              var manufMonth;
              if (typeof reviewInventory.expiryDate == "object") {
                manufMonth = `${new Date(reviewInventory.manufacturingDate).getMonth() + 1
                  }`;
                expiryMonth = `${new Date(reviewInventory.expiryDate).getMonth() + 1
                  }`;
              } else if (reviewInventory.expiryDate.length === 24) {
                manufMonth = `${new Date(
                  Date.parse(reviewInventory.manufacturingDate)
                ).getMonth() + 1
                  }`;
                expiryMonth = `${new Date(Date.parse(reviewInventory.expiryDate)).getMonth() +
                  1
                  }`;
              } else {
                manufMonth = `${new Date(
                  Date.parse(reviewInventory.manufacturingDate)
                ).getDate()}`;
                expiryMonth = `${new Date(
                  Date.parse(reviewInventory.expiryDate)
                ).getDate()}`;
              }
              return (
                <div className='row p-1 mt-4' key={reviewInventory.productId}>
                  <span className='col-3' style={{ flex: "0 0 20%" }}>
                    {reviewInventory.productName}
                  </span>
                  <span className='col-2' style={{ flex: "0 0 14.666667%" }}>
                    {reviewInventory.manufacturer
                      ? reviewInventory.manufacturer
                      : reviewInventory.manufacturerName}
                  </span>
                  <span
                    className='col-1'
                    style={{
                      position: "relative",
                      left: "-16px",
                      flex: "0 0 11.333333%",
                      maxWidth: "11.333333%",
                      textAlign: "left!important",
                    }}
                  >
                    {reviewInventory["quantity"]}
                    <span>{"("}</span>
                    {typeof reviewInventory.unitofMeasure === "object" &&
                      reviewInventory.unitofMeasure != null
                      ? reviewInventory.unitofMeasure.name
                      : reviewInventory["unitOfMeasure.name"]}
                    <span>{")"}</span>
                  </span>
                  <span
                    className='col-1'
                    style={{ flex: "0 0 11.333333%", maxWidth: "11.333333%" }}
                  >
                    {reviewInventory?.manufacturingDate
                      ? `0${manufMonth}`.slice(-2) +
                      "/" +
                      new Date(
                        Date.parse(reviewInventory?.manufacturingDate)
                      ).getFullYear()
                      : ""}
                  </span>
                  <span
                    className='col-1'
                    style={{ flex: "0 0 11.333333%", maxWidth: "11.333333%" }}
                  >
                    {reviewInventory?.expiryDate
                      ? `0${new Date(expiryMonth).getMonth() + 1}`.slice(-2) +
                      "/" +
                      new Date(
                        Date.parse(reviewInventory.expiryDate)
                      ).getFullYear()
                      : ""}
                  </span>
                  <span className={i18n.language === "en" ? "col-2" : "col-1"}>
                    {reviewInventory?.batchNumber}
                  </span>
                  <span
                    className='col-2'
                    style={{
                      position: "relative",
                      left: "64px",
                      flex: "0 0 13.666667%",
                      maxWidth: "15.666667%",
                    }}
                  >
                    {reviewInventory?.serialNumber}
                  </span>
                </div>
              );
            })}
          </div>

          <hr />
          <div className='d-flex flex-row-reverse'>
            <button className='btn-primary btn' onClick={onAssign}>
              <b>{t("save")}</b>
            </button>
            {reviewInventories.length > 0 && reviewInventories[0].manufacturer && (
              <button className='btn-outline-dark btn mr-2' onClick={onEdit}>
                <img
                  src={Pen}
                  width='15'
                  height='15'
                  className='mr-3'
                  alt={t("edit")}
                />
                <span>
                  <b>{t("edit")}</b>
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
                  t={t}
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyInventory;

import React, { useState, useEffect } from "react";
import { receiveApi, uploadImage } from "../../actions/shipmentActions";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { useDispatch } from "react-redux";
import Modal from "../../shared/modal";
import returnShipment from "../../assets/icons/returnShipment.svg";
import crossIcon from "../../assets/icons/crossRed.svg";
import "./style.scss";
import ProductList from "./productlist";
import ShipmentDetails from "./shipmentdetails";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import SuccessPopup from "./successPopup";
import FailedPopup from "./failPopup";
import { fetchairwayBillNumber } from "../../actions/shipmentActions";
import { Alert, AlertTitle } from "@material-ui/lab";
import ModalImage from "react-modal-image";

const ReceiveShipment = (props) => {
  const { t } = props;
  const id = props.match.params.id;
  const tracking = props.trackData;
  const dispatch = useDispatch();
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [delivered, setDelivered] = useState(0);
  const [files, setFiles] = useState([]);
  const [qtyArr, setQtyArr] = useState([
    ...Array(props.trackData?.products?.length).keys(),
  ]);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [count, setCount] = useState("");
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [FailPopUp, setFailPopUp] = useState(false);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const [openUpdatedStatus, setOpenUpdatedStatus] = useState(false);
  const [receiveShipmentModal, setreceiveShipmentModal] = useState(false);
  const [transitNumberArray, settransitNumberArray] = useState([]);

  useEffect(() => {
    async function fetchairwayBill() {
      let temp_arr = await fetchairwayBillNumber();
      settransitNumberArray(temp_arr.data);
    }
    fetchairwayBill();
  }, []);

  const setFile = (evt) => {
    setFiles(evt.target.files);
    setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
    setPhoto(evt.target.files[0]);
  };

  const clearImage = () => {
    setPhoto("");
    setPhotoUrl(undefined);
  };

  const receiveShipment = async () => {
    let data = tracking;
    for (const [index, value] of qtyArr.entries()) {
      data.products[index].productQuantity =
        data.products[index].productQuantity <= parseInt(value)
          ? data.products[index].productQuantity
          : parseInt(value);
    }
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo, photo.name);
    }
    formData.append("supplier", JSON.stringify(data.supplier));
    formData.append("receiver", JSON.stringify(data.receiver));
    formData.append("status", "RECEIVED");
    formData.append("comment", comment);
    formData.append("products", JSON.stringify(data.products));
    formData.append("poId", data.poId);
    formData.append("id", data.id);
    dispatch(turnOn());
    const result = await receiveApi(formData);
    if (result.status === 200) {
      setreceiveShipmentModal(true);
    } else {
      setErrorMsg(result.data);
      setFailPopUp(true);
    }
    dispatch(turnOff());
  };

  const qtyChange = (index, value) => {
    let newArr = [...qtyArr];
    newArr[index] = parseInt(value);
    setQtyArr(newArr);
    if (
      newArr.filter((a) => a !== undefined && a > 0).length ===
      tracking.products.length
    )
      setIsDisabled(false);
    else setIsDisabled(true);
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photo", files[i], files[i].name);
      const result = await uploadImage(id, formData);
      if (result.status === 200) {
        setMessage("Image Uploaded");
      }
    }
  };
  const closeModal = () => {
    setOpenUpdatedStatus(false);
    props.history.push("/viewshipment/" + id);
  };

  const closeModalShipment = () => {
    setreceiveShipmentModal(false);
    props.history.push("/viewshipment/" + id);
  };

  return (
    <div className='receiveShipment'>
      <div className='d-flex flex-column justify-content-between'>
        <div className='d-flex flex-row justify-content-between'>
          <h1 className='breadcrumb mt-3'>{t("receive_shipment")}</h1>
          <div className='d-flex flex-row justify-content-between'>
            <div>
              <button
                className='btn btn-outline-primary mr-4 mt-3'
                onClick={() => props.history.push(`/viewshipment/${id}`)}
              >
                {t("cancel")}
              </button>
            </div>
            <div>
              <button
                className='btn-primary btn fontSize20 font-bold mr-2 mt-3'
                onClick={receiveShipment}
                disabled={isDisabled}
              >
                <img
                  src={returnShipment}
                  width='16'
                  height='16'
                  className='mr-2 mb-1'
                  alt='Return Shipment'
                />
                <span>{t("receive_shipment")}</span>
              </button>
            </div>

            {FailPopUp && (
              <Modal close={() => closeModalShipment()} size='modal-sm'>
                <FailedPopup
                  onHide={closeModalShipment}
                  ErrorMsg={ErrorMsg}
                  t={t}
                />
              </Modal>
            )}
            {openUpdatedStatus && (
              <Modal close={() => closeModal()} size='modal-sm'></Modal>
            )}
          </div>
        </div>
        <div className='w-75 row row-cols'>
          <div className='col'>
            <div className='panel commonpanle'>
              <div className='form-group justify-content-around'>
                <label className='mt-2 text-secondary'>
                  {t("shipment_id")}:
                </label>
                <input
                  disabled={true}
                  name='id'
                  type='text'
                  className='form-control'
                  value={id || ""}
                />
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='panel commonpanle'>
              <div className='form-group justify-content-around'>
                <label className='mt-2 text-secondary'>
                  {t("transit_no")}:
                </label>
                <input
                  disabled={true}
                  type='text'
                  className='form-control'
                  name='billNo'
                  value={props.trackData.airWayBillNo || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <h6 className='heading mt-3 mb-3 ml-3'>{t("shipment_details")}</h6>
          <ShipmentDetails
            shipments={tracking}
            setMenuShip={setMenuShip}
            menuShip={menuShip}
            highLight={highLight}
            setHighLight={setHighLight}
            t={t}
          />
        </div>
        <div className='col-sm-4'>
          <h6 className='heading mt-3 mb-3 ml-3'>{t("comment")}</h6>
          <div className='col panel commonpanle'>
            <div className='pt-2 pb-2 d-flex row'>
              <span
                onClick={() => {
                  setCount("r1");
                  setCommentEnabled(false);
                  setComment("Damaged in transit");
                }}
                className={`txt-outline ${count === "r1" && "comment-active"}`}
              >
                {t("damaged_in_transit")}
              </span>
              <span
                onClick={() => {
                  setCount("r2");
                  setCommentEnabled(false);
                  setComment("Miscount");
                }}
                className={`txt-outline ${count === "r2" && "comment-active"}`}
              >
                {t("miscount")}
              </span>
              <span
                onClick={() => {
                  setCount("r3");
                  setCommentEnabled(false);
                  setComment("Shipment Stolen");
                }}
                className={`txt-outline ${count === "r3" && "comment-active"}`}
              >
                {t("shipment_stolen")}
              </span>
              <span
                onClick={() => {
                  setCount("r4");
                  setCommentEnabled(false);
                  setComment("Wrong Shipment");
                }}
                className={`txt-outline ${count === "r4" && "comment-active"}`}
              >
                {t("wrong_shipment")}
              </span>
              <span
                onClick={() => {
                  setCount("r5");
                  setCommentEnabled(true);
                  setComment("");
                }}
                className={`txt-outline ${count === "r5" && "comment-active"}`}
              >
                {t("other")}
              </span>
            </div>
            {commentEnabled && (
              <textarea
                disabled={!commentEnabled}
                type='text'
                className='w-100 form-control'
                name='Comment'
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("enter") + " " + t("comment")}
                value={comment}
              />
            )}
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='row justify-content-between'>
            <h6 className='heading mt-3 mb-3 ml-4'> {t("uploaded_image")}</h6>
            <button
              className='btn btn-orange font-weight-bold mr-4 pl-4 pr-4'
              onClick={uploadPhoto}
              style={{ position: "relative", bottom: "10px" }}
            >
              <span style={{ fontSize: "15px" }}> {t("upload")}</span>
            </button>
          </div>
          <div className='upload bg-white panel commonpanle mt-0'>
            {photo ? (
              <div>
                <div
                  className='images-preview'
                  style={{
                    margin: "auto",
                    display: "table",
                    cursor: "pointer",
                  }}
                >
                  <img
                    onClick={clearImage}
                    width='20'
                    height='20'
                    src={crossIcon}
                    className='cross-img shadow rounded-circle'
                    alt='Clear'
                  />
                  <ModalImage
                    large={photoUrl}
                    small={photoUrl}
                    showRotate={true}
                    name='photo'
                    className='mt-1 modal-image'
                  />
                </div>
                {/* <button type='button' className='btn btn-link float-right'>
                  {t("view_all")}
                </button> */}
              </div>
            ) : (
              <>
                <div
                  className='row '
                  style={{ margin: "auto", display: "table" }}
                >
                  <img
                    src={uploadBlue}
                    name='photo'
                    width='50'
                    height='50'
                    className='mt-1'
                    style={{ margin: "auto", display: "table" }}
                    alt='Upload'
                  />
                  <label className='mt-3'>
                    {t("drag_drop") + " " + t("files_here")}{" "}
                    <input type='file' className='select' onChange={setFile} />{" "}
                  </label>
                </div>
                <div
                  className='row mb-3'
                  style={{ margin: "auto", display: "table" }}
                >
                  {t("or")}
                </div>
                <div
                  className='row'
                  style={{
                    margin: "auto",
                    display: "table",
                  }}
                >
                  <label
                    className='btn btn-primary'
                    style={{ margin: 0, height: "max-content" }}
                  >
                    {t("browse_files")}
                    <input
                      type='file'
                      multiple={true}
                      className='select'
                      onChange={setFile}
                    />{" "}
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <h6 className='heading mt-3 mb-3 ml-3'> {t("product_details")}</h6>
        </div>
      </div>
      <div className='row'>
        <ProductList
          shipments={tracking}
          productHighLight={productHighLight}
          setProductHighLight={setProductHighLight}
          menuProduct={menuProduct}
          setMenuProduct={setMenuProduct}
          setDelivered={setDelivered}
          setIndex={setIndex}
          onQuantityChange={(index, value) => qtyChange(index, value)}
          t={t}
        />
      </div>
      {receiveShipmentModal && (
        <Modal close={() => closeModalShipment()} size='modal-sm'>
          <SuccessPopup onHide={closeModalShipment} t={t} />
        </Modal>
      )}
      {message && (
        <div className='d-flex flex-column align-items-center mt-3' style={{"position":"absolute", "top":"55vh", "right":"10vw"}}>
          <Alert severity='success' onClick={()=>{setMessage(false)}}>
            <div className='d-flex flex-column align-items-center'>
            <AlertTitle>{t("success")}</AlertTitle>
            {message}
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};
export default ReceiveShipment;

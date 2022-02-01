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
import ShipmentFailPopUp from "../newShipment/shipmentFailPopUp";

const ReceiveShipment = (props) => {
  const { t } = props;
  // let shipmentDetails = props.trackData.shipmentDetails;
  const tracking = props.trackData;
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [delivered, setDelivered] = useState(0);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  // const [shipmentId, setShipmentId] = useState([]);
  const [qtyArr, setQtyArr] = useState([
    ...Array(props.trackData?.products?.length).keys(),
  ]);
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [photo2, setPhoto2] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState(undefined);
  const [count, setCount] = useState("");
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [FailPopUp, setFailPopUp] = useState(false);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const id = props.match.params.id;
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
  const defaultProps = {
    options: transitNumberArray,
    getOptionLabel: (option) => option.airWayBillNo,
  };
  const flatProps = {
    options: transitNumberArray.map((option) => option.airWayBillNo),
  };

  const setFile = (evt) => {
    setFiles(evt.target.files);
    setPhotoUrl(URL.createObjectURL(evt.target.files[0]));
    setPhoto(evt.target.files[0]);
    // setPhotoUrl2(URL.createObjectURL(evt.target.files[1]));
    // setPhoto2(evt.target.files[1]);
  };

  const clearImage = () => {
    setPhoto("");
    setPhotoUrl(undefined);
  };

  const clearImage2 = () => {
    setPhoto2("");
    setPhotoUrl2(undefined);
  };
  const defaultData = {
    label: {
      labelType: "QR_2DBAR",
      labelId: "123445",
    },
    supplier: {
      id: "emp-1jpv5xx3kmkkck4e",
      locationId: "AP001",
    },
    receiver: {
      id: "emp-18gpp20egkkf54n59",
      locationId: "AP002",
    },
    transactionIds: [],
    _id: "60588f346570743b5f9ebbf7",
    airWayBillNo: "7464840",
    shippingOrderId: "so-1jpv8pdklqnvl7g",
    externalShipmentId: "",
    shippingDate: "2021-03-30T00:00:00.000Z",
    expectedDeliveryDate: "2021-04-03T00:00:00.000Z",
    actualDeliveryDate: "2021-04-03T00:00:00.000Z",
    status: "UPDATED",
    products: [
      {
        _id: "60588f346570743b5f9ebbf8",
        productID: "prod-9bhkk6yiutx",
        productQuantity: 100,
        productName: "Biohib",
        manufacturer: "Bharath Biotech",
      },
    ],
    poId: "po-g7kn51ef6klnqk02v",
    id: "SHjXsVBDOmTz",
    createdAt: "2021-03-22T12:36:04.250Z",
    updatedAt: "2021-03-22T12:36:04.250Z",
    __v: 0,
    comment: "",
    imagesDetails: [],
  };

  const receiveShipment = async () => {
    let data = tracking ? tracking : defaultData;
    // let formData = new FormData();

    // formData.append(shipmentDetails[0]);
    // formData.append("billNo", billNo);
    data.comment = comment;
    //data.imagesDetails = [];
    qtyArr.map((value, index) => {
      // data.products[index]["productId"] = data.products[index].productID;
      data.products[index].productQuantity =
        data.products[index].productQuantity <= parseInt(value)
          ? data.products[index].productQuantity
          : parseInt(value);
    });

    //data.products[0].productQuantity = parseInt(delivered);
    dispatch(turnOn());
    const result = await receiveApi(data);
    if (result.status === 200) {
      //setOpenUpdatedStatus(true);
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
                disabled={isDisabled || comment === ""}
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
              <Modal
                close={() => closeModalShipment()}
                size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
              >
                <FailedPopup onHide={closeModalShipment} ErrorMsg={ErrorMsg} t={t} />
              </Modal>
            )}
            {openUpdatedStatus && (
              <Modal
                close={() => closeModal()}
                size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
              ></Modal>
            )}
          </div>
        </div>
        <div className='d-flex  flex-auto'>
          <div className='panel commonpanle mr-4' style={{ width: "32%" }}>
            <div className='form-group pt-2'>
              <label className='mb-1 text-secondary pt-2'>
                {t("shipment_id")}:
              </label>
              <input
                name='id'
                type='text'
                className='form-control ml-5 '
                //onChange={(e) => setshipmentId(e.target.value)}
                size='35'
                value={id}
              />
            </div>
          </div>
          <div
            className='panel commonpanle'
            style={{ width: "32%", height: "100px" }}
          >
            <div className='form-group pt-2'>
              <label className='text-secondary pt-2'>{t("transit_no")}.</label>
              {/* <div className="mb-2" style={{width: 300 }}>
                        <Autocomplete 
                          {...defaultProps}
                          id="billNo"
                          style={{position:"relative",top:"-20px"}}
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          billNo={billNo}
                          onInputChange={(event, newInputValue) => {
                            setBillNo(newInputValue);
                          }}
                          debug
                          renderInput={(params) => <TextField {...params} name="billNo" label="Transit No." margin="normal" />}
                        />
                        </div> */}
              <input
                type='text'
                className='form-control ml-5'
                name='billNo'
                //onChange={(e) => setBillNo(e.target.value)}
                size='35'
                value={props.trackData.airWayBillNo}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          {/* <h6 className="heading mb-3">SHIPMENT SUMMARY</h6> */}
          {/* <ShipmentSummary shipments={tracking} /> */}
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
            <div className=' pt-2 pb-2 d-flex row'>
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
            <div
              className='form-group'
              style={{ width: "150%", height: "60px" }}
            >
              {commentEnabled && (
                <input
                  disabled={!commentEnabled}
                  style={{
                    fontSize: "14px",
                    resize: "none",
                    //borderBottom: "none",
                    marginTop: "40px",
                    //marginBottom:"10px"
                  }}
                  type='text'
                  className='form-control'
                  name='Comment'
                  onChange={(e) => setComment(e.target.value)}
                  size='40'
                  cols='120'
                  rows='7'
                  placeholder={t("enter") + " " + t("comment")}
                  value={comment}
                />
              )}
            </div>
          </div>
          {/* <button type="button" className="btn btn-primary float-right" style={{position:"relative", bottom:"70px"}}>Submit</button> */}
        </div>
        <div className='col-sm-4'>
          <div className='row justify-content-between'>
            <h6 className='heading mt-3 mb-3 ml-4'> {t("upload_image")}e</h6>
            <button
              className='btn btn-orange font-weight-bold mr-4 pl-4 pr-4'
              onClick={uploadPhoto}
              style={{ position: "relative", bottom: "10px" }}
            >
              {/* <img
                    src={uploadWhite}
                    width="35"
                    height="17"
                  /> */}
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
                    // style={{ margin: "auto", display: "table" }}
                  />
                </div>
                <button type='button' className='btn btn-link float-right'>
                  {t("view_all")}
                </button>
                {/* <div className="row">
                                {photoUrl >
                                  0 && (
                                  <ModalImage
                                    small={photo}
                                    className=""
                                    large={image}
                                    showRotate={true}
                                    hideZoom={false}
                                    alt="Upload Image"
                                  />
                                )}
                              </div> */}
              </div>
            ) : (
              <div>
                <div
                  className='row '
                  style={{ margin: "auto", display: "table" }}
                >
                  {/* <label>{photo.name?photo.name:""}</label> */}
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
                    //position: "relative",
                    //top: "0%",
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
              </div>
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
        <Modal
          close={() => closeModalShipment()}
          size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModalShipment}
            t={t} //FailurePopUp
          />
        </Modal>
      )}
      {/* {openShipmentFail && (
          <Modal
            close={() => closeModalFail()}
            size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          >
            <FailPopup
              onHide={closeModalFail} //FailurePopUp
            />
          </Modal>
        )}   */}
      {message && (
        <div className='d-flex justify-content-center mt-3'>
          {" "}
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            {message}
          </Alert>
        </div>
      )}
    </div>
  );
};
export default ReceiveShipment;

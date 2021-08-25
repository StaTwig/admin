import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { receiveApi, uploadImage } from "../../actions/shipmentActions";
import { turnOn , turnOff } from '../../actions/spinnerActions';
import { useDispatch } from 'react-redux';
import Modal from "../../shared/modal";
import returnShipment from "../../assets/icons/returnShipment.svg";
import crossIcon from "../../assets/icons/crossRed.svg";
import "./style.scss";
import ProductList from "./productlist";
import ShipmentDetails from "./shipmentdetails";
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import uploadWhite from "../../assets/icons/UploadWhite.svg";
import { LOCAL_SERVER_URL_SHIPPINGORDER } from "../../config";
import SuccessPopup from "./successPopup";
import FailPopup from "./failPopup";
import {fetchairwayBillNumber} from '../../actions/shipmentActions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert, AlertTitle } from '@material-ui/lab';
import ModalImage from 'react-modal-image';

const ReceiveShipment = (props) => {
  let shipmentDetails = props.trackData.shipmentDetails;
  const tracking = props.trackData;
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [delivered, setDelivered] = useState(0);
  const dispatch = useDispatch();

  const [shipmentId, setShipmentId] = useState([]);
  const [qtyArr, setQtyArr] = useState([...Array(props.trackData?.products?.length).keys()]);
  const [billNo, setBillNo] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState('');
  const id = props.match.params.id;
  const [inputValue, setInputValue] = React.useState('');
  const [openUpdatedStatus, setOpenUpdatedStatus] = useState(false);
  const [receiveShipmentModal, setreceiveShipmentModal] = useState(false);
  const [transitNumberArray,settransitNumberArray] = useState([]);
  useEffect(()=>{
    async function fetchairwayBill(){
      let temp_arr = await fetchairwayBillNumber();
      settransitNumberArray(temp_arr.data);
      console.log(temp_arr.data);
    }
    fetchairwayBill();
  },[]);
  const defaultProps = {
    options: transitNumberArray,
    getOptionLabel: (option) => option.airWayBillNo,
  };
  const flatProps = {
    options: transitNumberArray.map((option) => option.airWayBillNo),
  };
  const [value, setValue] = React.useState(null);
  
  const setFile = (evt) => {
    setPhotoUrl(URL.createObjectURL(event.target.files[0]));
    setPhoto(evt.target.files[0]);
  };

  const clearImage = () => {
    setPhoto("");
    setPhotoUrl(undefined);
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
      data.products[index].productQuantity = data.products[index].productQuantity <= parseInt(value) ? data.products[index].productQuantity : parseInt(value);
    });
    
    //data.products[0].productQuantity = parseInt(delivered);
    dispatch(turnOn());
    const result = await receiveApi(data);
    if (result.status == 200) {
      //setOpenUpdatedStatus(true);
      setreceiveShipmentModal(true);
    } else {
      console.log(result);
    }
    dispatch(turnOff());
  };

  const qtyChange = (index, value) => {
    let newArr = [...qtyArr];
    newArr[index] = parseInt(value);
    setQtyArr(newArr);
    if(newArr.filter(a => a != undefined && a > 0).length === tracking.products.length)
      setIsDisabled(false);
    else
      setIsDisabled(true);
  }
  
  const getImageURL = async (imageId) => {
    const r = await getImage(imageId);
    const reader = new window.FileReader();
    reader.readAsDataURL(r.data);
    reader.onload = function () {
      setImage(reader.result);
    };
  };
  const uploadPhoto = async () => {
    const formData = new FormData();

    formData.append("photo", photo, photo.name);

    const result = await uploadImage(id, formData);
    if (result.status == 200) {
      setMessage("Image Uploaded");
    } else {
      console.log(result.status);
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
    <div className="receiveShipment">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-row justify-content-between">
          <h1 className="breadcrumb mt-3">RECEIVE SHIPMENT</h1>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <button
                className="btn btn-outline-primary mr-4 mt-3"
                onClick={() => props.history.push(`/viewshipment/${id}`)}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="btn-primary btn fontSize20 font-bold mr-2 mt-3"
                onClick={receiveShipment}
                disabled={isDisabled}
              >
                <img
                  src={returnShipment}
                  width="16"
                  height="16"
                  className="mr-2 mb-1" 
                />
                <span>Receive Shipment</span>
              </button>
            </div>
            {openUpdatedStatus && (
              <Modal
                close={() => closeModal()}
                size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
                
              ></Modal>
            )}
          </div>
        </div>
        <div className="d-flex  flex-auto">
          <div className="panel commonpanle" style={{width:"32%"}}>
            <div className="form-group pt-2"> 
              <label className="mb-1 text-secondary pt-2">Shipment ID:</label>
              <input
                name="id"
                type="text"
                className="form-control ml-5 "
                //onChange={(e) => setshipmentId(e.target.value)}
                size="35"
                value={id}
              />
            </div>
          </div>
          <div className="panel commonpanle" style={{width:"32%",height:"100px"}}>
            <div className="form-group pt-2">
            <label className="text-secondary pt-2">Transit No.</label>
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
                type="text"
                className="form-control ml-5"
                name="billNo"
                //onChange={(e) => setBillNo(e.target.value)}
                size="35"
                value={props.trackData.airWayBillNo}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          {/* <h6 className="heading mb-3">SHIPMENT SUMMARY</h6> */}
          {/* <ShipmentSummary shipments={tracking} /> */}
          <h6 className="heading mt-3 mb-4 ml-3">Shipment Details</h6>
          <ShipmentDetails
            shipments={tracking}
            setMenuShip={setMenuShip}
            menuShip={menuShip}
            highLight={highLight}
            setHighLight={setHighLight}
          />

          <h6 className="heading mt-3 mb-3 ml-3">Product Details</h6>
          <ProductList
            shipments={tracking}
            productHighLight={productHighLight}
            setProductHighLight={setProductHighLight}
            menuProduct={menuProduct}
            setMenuProduct={setMenuProduct}
            setDelivered={setDelivered}
            setIndex={setIndex}
            onQuantityChange={(index, value) => qtyChange(index, value)}
          />
        </div>
        <div className="col-sm-4">
          <h6 className="heading mt-3 mb-3 ml-3" style={{padding:4}}>Comments</h6>
          <div className="col panel commonpanle" style={{ height: "45%"}}>
            <div className="form-group" style={{ width: "150%" }}>
              <textarea
                style={{
                  fontSize: "16px",
                  resize: "none",
                  borderBottom: "none",
                }}
                type="text"
                className="form-control"
                name="Comment"
                onChange={(e) => setComment(e.target.value)}
                size="40"
                cols="120"
                rows="7"
                placeholder="Enter Comment Here"
                value={comment}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row justify-content-between">
          <h6 className="heading mt-3 ml-4">Upload Image</h6>  
              <button className="btn btn-orange font-weight-bold mr-4"
                   onClick={uploadPhoto} 
                   style={{height:'5vh',width:'6vw'}}>
              {/* <img
                    src={uploadWhite}
                    width="35"
                    height="17"
                  /> */}
              <span style={{ fontSize: "15px" }}>Upload</span>
            </button>
          </div>
          <div
            className="upload bg-white panel commonpanle"
            style={{ height: "45%" }}
          >
            {photo ? (
              <div>
                <div
                  className="row"
                  style={{ margin: "auto", display: "table", cursor:"pointer"}}
                >
                  <img onClick={clearImage} width="20" height="20" src={crossIcon} style={{ position:'relative', left:'25vw'}}/>
                  <img
                    src={photoUrl}
                    name="photo"
                    width="450"
                    height="185"
                    className="mt-1"
                    style={{ margin: "auto", display: "table" }}
                  />
                </div>
                <div className="row">
                                {photoUrl >
                                  0 && (
                                  <ModalImage
                                    small={image}
                                    className="challanImage"
                                    large={image}
                                    showRotate={true}
                                    hideZoom={false}
                                    alt="Upload Image"
                                  />
                                )}
                              </div>
              </div>
            ) : (
              <div>
                <div
                  className="row mt-3"
                  style={{ margin: "auto", display: "table" }}
                >
                  {/* <label>{photo.name?photo.name:""}</label> */}
                  <img
                    src={uploadBlue}
                    name="photo"
                    width="50"
                    height="50"
                    className="mt-1"
                    style={{ margin: "auto", display: "table" }}
                  />
                  <label className="mt-3">
                    Drag and drop files here{" "}
                    <input type="file" class="select" onChange={setFile} />{" "}
                  </label>
                </div>
                <div
                  className="row mb-3"
                  style={{ margin: "auto", display: "table" }}
                >
                  OR
                </div>
                <div
                  className="row"
                  style={{
                    margin: "auto",
                    display: "table",
                    //position: "relative",
                    //top: "0%",
                  }}
                >
                  <label
                    class="btn btn-primary"
                    style={{ margin: 0, height: "4.3vh" }}
                  >
                    Browse Files
                    <input type="file" class="select" onChange={setFile} />{" "}
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {receiveShipmentModal && (
        <Modal
          close={() => closeModalShipment()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModalShipment} //FailurePopUp
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
        <div className="d-flex justify-content-center mt-3"> <Alert severity="success"><AlertTitle>Success</AlertTitle>{message}</Alert></div>
      )}
    </div>
  );
};
export default ReceiveShipment;

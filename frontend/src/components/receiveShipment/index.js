import React, { useState } from "react";
import { useSelector } from "react-redux";
import { receiveApi, uploadImage } from "../../actions/shipmentActions";
import Modal from "../../shared/modal";
import returnShipment from '../../assets/icons/returnShipment.svg';
import "./style.scss";
import ProductList from "./productlist";
import ShipmentDetails from './shipmentdetails';
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import uploadWhite from "../../assets/icons/UploadWhite.svg";
import { LOCAL_SERVER_URL_SHIPPINGORDER } from "../../config";
import SuccessPopup from './successPopup';
import FailPopup from './failPopup';

const ReceiveShipment = (props) => {
  let shipmentDetails = props.trackData.shipmentDetails;
  console.log('Details')
  console.log(props)
  const tracking = props.trackData;
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [delivered, setDelivered] = useState(0);

  const [shipmentId, setShipmentId] = useState([]);
  const [billNo, setBillNo] = useState("");
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);
  const id = props.match.params.id

  const [openUpdatedStatus, setOpenUpdatedStatus] = useState(false);
  const [receiveShipmentModal, setreceiveShipmentModal] = useState(false);
  const setFile = (evt) => {
    setPhoto(evt.target.files[0]);
  };
  const defaultData =  
  {
    "label": {
        "labelType": "QR_2DBAR",
        "labelId": "123445"
    },
    "supplier": {
        "id": "emp-1jpv5xx3kmkkck4e",
        "locationId": "AP001"
    },
    "receiver": {
        "id": "emp-18gpp20egkkf54n59",
        "locationId": "AP002"
    },
    "transactionIds": [],
    "_id": "60588f346570743b5f9ebbf7",
    "airWayBillNo": "7464840",
    "shippingOrderId": "so-1jpv8pdklqnvl7g",
    "externalShipmentId": "",
    "shippingDate": "2021-03-30T00:00:00.000Z",
    "expectedDeliveryDate": "2021-04-03T00:00:00.000Z",
    "actualDeliveryDate": "2021-04-03T00:00:00.000Z",
    "status": "UPDATED",
    "products": [
        {
            "_id": "60588f346570743b5f9ebbf8",
            "productID": "prod-9bhkk6yiutx",
            "productQuantity": 100,
            "productName": "Biohib",
            "manufacturer": "Bharath Biotech"
        }
    ],
    "poId": "po-g7kn51ef6klnqk02v",
    "id": "SHjXsVBDOmTz",
    "createdAt": "2021-03-22T12:36:04.250Z",
    "updatedAt": "2021-03-22T12:36:04.250Z",
    "__v": 0,
    "comment": "",
    "imagesDetails": []
}

  const receiveShipment = async () => {
    let data = tracking?tracking:defaultData;
    // let formData = new FormData();

    // formData.append(shipmentDetails[0]);
    // formData.append("billNo", billNo);  
    data.comment = comment;
    data.imagesDetails = [];
    console.log(delivered);
    data.products[0].productQuantityDelivered=parseInt(delivered);

    console.log('On Button Click');
    console.log(data);
    const result = await receiveApi(data);
    if (result.status == 200) {
      // setOpenUpdatedStatus(true);
      console.log("success add product");
      setreceiveShipmentModal(true);
    }
    else{
      console.log(result);
    }
  };

  const uploadPhoto = () => {
      const formData = new FormData();
    
      formData.append(
        "photo",
        photo,
        photo.name
      );

      const result = uploadImage(id,formData);
      console.log(result);
      if (result.status == 1) {
        console.log('After uploading image');
        console.log(result);
      } 
      else{
        console.log(result.status);
      }     
  };

  const closeModal = () => {
    setOpenUpdatedStatus(false);
    props.history.push("/tracing");
  };

  const closeModalShipment = () => {
    setreceiveShipmentModal(false);
    props.history.push("/viewshipment/"+id);
  };

  return (
    <div className="receiveShipment">

    <div className="d-flex flex-column justify-content-between">
      <div className="d-flex flex-row justify-content-between"> 
        <h1 className="breadcrumb">RECEIVE SHIPMENT</h1>
        <div className="d-flex flex-row justify-content-between">
            <div>
              <button
                className="btn btn-outline-primary mr-4"
                onClick={() => props.history.push(`/viewshipment/${id}`)}
              >
              Cancel
              </button>
            </div>
            <div>
              <button
                className="btn-primary btn fontSize20 font-bold "
                onClick={receiveShipment}
                disabled={delivered==0}
              >
              <img src={returnShipment} width="14" height="14" className="mr-2"/>
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

        <div className="d-flex flex-row">
          <div className="panel commonpanle">
            <div className="form-group">
              <label className="mb-1 text-secondary">Shipment ID</label>
              <input
                name="id"
                type="text"
                className="form-control"
                onChange={(e) => setshipmentId(e.target.value)}
                size="40"
                value={id}
              />
            </div>
          </div>
          <div className="panel commonpanle">
             <div className="form-group">
             <label className="mb-1 text-secondary">Bill No</label>
              <input
                type="text"
                className="form-control"
                name="billNo"
                onChange={(e) => setBillNo(e.target.value)}
                size="40"
                value={billNo}
              />
              </div>
          </div>        
        </div>
      </div>
      <div className="row">
          <div className="col-sm-4">
            {/* <h6 className="heading mb-3">SHIPMENT SUMMARY</h6> */}
            {/* <ShipmentSummary shipments={tracking} /> */}
            <h6 className="heading mt-3 mb-3 ml-3">Shipment Details</h6>
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
            />
          </div>
          <div className="col-sm-4">
          <h6 className="heading mt-3 mb-3 ml-3">Comments</h6>            
            <div className="panel commonpanle" style={{height:'45%'}}>
              <div className="form-group">
                <textarea
                  style={{fontSize:'16px'}}
                  type="text"
                  className="form-control"
                  name="Comment"
                  onChange={(e) => setComment(e)}
                  size="40"
                  placeholder="Enter Comment Here"
                />              
              </div>           
            </div>               

          </div>
          <div className="col-sm-4">
            <div className="row justify-content-between">
              <h6 className="heading mt-3 mb-1 ml-4">Upload Image</h6>             
                <button className="btn btn-primary font-weight-bold mb-0" onClick={uploadPhoto} style={{height:'4vh',width:'9vw'}}>
                  <img
                    src={uploadWhite}
                    width="35"
                    height="17"
                  />
                  <span style={{fontSize:'15px'}}>Upload</span>
                </button>
            </div>
            <div className="upload bg-white panel commonpanle" style={{height:'45%'}}>
              <div className="row" style={{margin:'auto',display:'table'}}>
                  <img
                    src={uploadBlue}
                    name="photo"
                    width="80"
                    height="80"
                    className="mt-1"
                    style={{margin:'auto',display:'table'}}
                  />
                  <label>
                    Drag and drop files here{" "}
                    <input type="file" class="select" onChange={setFile} />{" "}
                  </label>                  
              </div>
              <div className="row" style={{margin:'auto',display:'table'}}>OR</div>
              <div className="row" style={{margin:'auto',display:'table', position:'relative',top:'3%'}}>
                <label class="btn btn-primary" style={{margin:0, height:'5vh'}}>
                  Browse Files
                  <input
                    type="file"
                    class="select"
                    onChange={setFile}
                  />{" "}
                </label>
              </div>
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
    </div>

  );
};
export default ReceiveShipment;

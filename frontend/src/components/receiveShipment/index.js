import React, { useState } from "react";
import { useSelector } from "react-redux";
import { receiveShipment } from "../../actions/shipmentActions";
import Modal from "../../shared/modal";
import returnShipment from '../../assets/icons/returnShipment.svg';
import "./style.scss";
import ShipmentSummary from "../tracing/shipmentsummary";
import ProductList from "../tracing/productlist";
import ShipmentDetails from '../tracing/shipmentdetails';
import uploadBlue from "../../assets/icons/UploadBlue.svg";
import uploadWhite from "../../assets/icons/UploadWhite.svg";
import { Formik } from "formik";

const ReceiveShipment = (props) => {
  console.log(props.trackData)
  const tracking = props.trackData;
  const [menu, setMenu] = useState(false);
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [chain, setChain] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  const [shipmentId, setShipmentId] = useState([]);
  const [billNo, setBillNo] = useState("");

  const [openUpdatedStatus, setOpenUpdatedStatus] = useState(false);
  const setFile = (evt) => {
    setPhoto(evt.target.files[0]);
  };

  const receiveShipment = async () => {
    const data = { shipmentId, billNo };
    let formData = new FormData();

    formData.append("shipmentId", shipmentId);
    formData.append("billNo", billNo);
    const result = await addNewProduct(formData);
    if (result.status == 1) {
      setOpenUpdatedStatus(true);
      console.log("success add product");
    }
  };

  const closeModal = () => {
    setOpenUpdatedStatus(false);
    props.history.push("/tracing");
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
                onClick={() => props.history.push(`/tracing/${id}`)}
              >
              Cancel
              </button>
            </div>
            <div>
              <button
                className="btn-primary btn fontSize20 font-bold "
                onClick={receiveShipment}
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
                value={props.match.params.id}
              />
            </div>
          </div>
          <div className="panel commonpanle">
             <div className="form-group">
             <label className="mb-1 text-secondary">BillNo.,</label>
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
            <h6 className="heading mt-3 mb-3">Shipment Details</h6>
            <ShipmentDetails
              shipments={tracking}
              setMenuShip={setMenuShip}
              menuShip={menuShip}
              highLight={highLight}
              setHighLight={setHighLight}
            />

            <h6 className="heading mt-3 mb-3">Product Details</h6>
            <ProductList
              shipments={tracking}
              productHighLight={productHighLight}
              setProductHighLight={setProductHighLight}
              menuProduct={menuProduct}
              setMenuProduct={setMenuProduct}
            />
          </div>
          <div className="col-sm-4">
          <h6 className="heading mt-3 mb-3">Comments</h6>            
            <div className="panel commonpanle" style={{height:'58%'}}>
              <div className="form-group">
                <input
                  style={{fontSize:'16px'}}
                  type="text"
                  className="form-control"
                  name="Comment"
                  onChange={(e) => console.log(e)}
                  size="40"
                  placeholder="Enter Comment Here"
                />              
              </div>
              <button className="btn btn-main-blue fontSize20 font-bold" style={{position:'relative',top:'65%', left:'57%'}}>
                  {/* <img src={returnShipment} width="14" height="14" className="mr-2" /> */}
                  <span className="chain">Comment</span>
                </button>                
            </div>               

          </div>
          <div className="col-sm-4">
            <div className="row justify-content-between">
              <h6 className="heading mt-3 mb-3">Upload Image</h6>             
                <button className="btn btn-primary font-weight-bold">
                  <img
                    src={uploadWhite}
                    width="35"
                    height="17"
                    className="mb-1"
                  />
                  <span>Upload</span>
                </button>
            </div>
            <div className="upload bg-white panel commonpanle" style={{height:'58%'}}>
              <div className="row" style={{margin:'auto',display:'table'}}>
                  <img
                    src={uploadBlue}
                    name="photo"
                    width="120"
                    height="120"
                    className="mt-3"
                    style={{margin:'auto',display:'table'}}
                  />
                  <label>
                    Drag and drop files here{" "}
                    <input type="file" class="select" onChange={setFile} />{" "}
                  </label>                  
              </div>
              <div className="row" style={{margin:'auto',display:'table',  position:'relative',top:'4%'}}>OR</div>
              <div className="row" style={{margin:'auto',display:'table', position:'relative',top:'10%'}}>
                <label class="btn btn-primary" style={{margin:0}}>
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
    </div>

  );
};
export default ReceiveShipment;

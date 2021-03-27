import React, { useState } from "react";
import { useSelector } from "react-redux";
import { receiveShipment } from "../../actions/shipmentActions";
import Modal from "../../shared/modal";
import returnShipment from '../../assets/icons/returnShipment.svg';
import "./style.scss";

const ReceiveShipment = (props) => {
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
      <h1 className="breadcrumb">RECEIVE SHIPMENT</h1>

      <div className="d-flex flex-row justify-content-between">
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
                value={shipmentId}
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
          <div className="d-flex" >
<div className="button">
            <button
              className="btn btn-outline-primary mr-4"
              onClick={() => props.history.push("/tracing")}
            >
              Cancel
            </button></div>
<div className="button1">
            <button
              className="btn btn-secondary btn fontSize20 font-bold "
              onClick={receiveShipment}
            >
        <img src={returnShipment} width="14" height="14" className="mr-2" />
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
</div>

  );
};
export default ReceiveShipment;

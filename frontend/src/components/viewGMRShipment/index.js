import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chart from "./temperature";
import DriverGraph from "./driverGraph";
import ShipmentSummary from "./shipmentsummary";
import ShipmentDetails from "./shipmentdetails";
import ProductList from "./productlist";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import shipmentsvg from "../../assets/icons/Shippmentselected.svg";
import back from "../../assets/icons/back.png";
import UpdateStatus from "../../assets/icons/Update_Status.png";
import "./style.scss";
import ChainOfCustody from "./chainofcustody";
import Modal from "../../shared/modal";
import { isAuthenticated } from "../../utils/commonHelper";
import ViewShippingModal from "../shipments/shippingOrder/viewShippingModal";
import { customReceiveShipment } from "../../actions/shipmentActions";
import SuccessPopup from "./successPopup";
import FailedPopup from "./FailedPopup";

const ViewGMRShipment = (props) => {
  const { t } = props;
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const [receiveShipmentModal, setreceiveShipmentModal] = useState(false);
  const [FailPopUp, setFailPopUp] = useState(false);
  const tracking = props.trackData;
  const status = tracking.status;
  const shippmentChainOfCustodyData = props.shippmentChainOfCustodyData;
  const { id } = props.match.params;
  if (!isAuthenticated("viewShipment")) props.history.push(`/profile`);
  const closeModalShipping = () => {
    setOpenShipping(false);
  };

  const receiveShipment = async (id) => {
    const res = await customReceiveShipment(id);
    if (res.success) {
      setreceiveShipmentModal(true);
    } else {
      setFailPopUp(true);
    }
  };

  const closeModalShipment = () => {
    setFailPopUp(false);
    setreceiveShipmentModal(false);
    props.history.push("/shipments");
  };

  return (
    <div className='tracing'>
      <div className='row justify-content-between'>
        <h1 className='breadcrumb mt-3'>VIEW SHIPMENT</h1>
        <div className='row'>
          <Link to={`/shipments`}>
            <button className='btn btn-outline-primary mr-4 mt-3'>
              <img src={back} height='17' className='mr-2 mb-1' alt='Back' />
              Back to shipments
            </button>
          </Link>
          {isAuthenticated("updateShipment") && (
            <Link
              to={
                status === "RECEIVED"
                  ? `/viewshipment/${id}`
                  : `/updatestatus/${id}`
              }
            >
              <button
                className='btn btn-orange mr-4 mt-3 chain'
                disabled={status === "RECEIVED"}
              >
                <img
                  src={UpdateStatus}
                  height='17'
                  className='mr-2 mb-1'
                  alt='Update Status'
                />
                <b>Update Status</b>
              </button>
            </Link>
          )}
          <button
            className='btn btn-primary mr-4 mt-3 chain'
            disabled={status === "RECEIVED"}
            onClick={() => {
              receiveShipment(id);
            }}
          >
            <img
              src={shipmentsvg}
              fill='#000000'
              height='17'
              className='mr-2 mb-1'
              alt='Receive Shipment'
            />
            <b>Receive Shipment</b>
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <h6 className='heading mb-3'>SHIPMENT SUMMARY</h6>
          <ShipmentSummary shipments={tracking} />
          <h6 className='heading mt-4 mb-3'>SHIPMENT DETAILS</h6>
          <ShipmentDetails
            shipments={tracking}
            setMenuShip={setMenuShip}
            menuShip={menuShip}
            highLight={highLight}
            setHighLight={setHighLight}
          />

          <h6 className='heading mt-4 mb-3'>PRODUCT LIST</h6>
          <ProductList
            shipments={tracking}
            productHighLight={productHighLight}
            setProductHighLight={setProductHighLight}
            menuProduct={menuProduct}
            setMenuProduct={setMenuProduct}
          />
          {props.imagesData.length > 0 && (
            <>
              <h6 className='heading mt-4 mb-3'>{t("images")}</h6>
              <div className='col panel commonpanle mb-3'>
                {props.imagesData.map((value, index) => (
                  <div className='col-sm' key={index}>
                    <img src={value} className='img-fluid p-1' alt='Shipment' />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className='col-sm-8'>
          <div className='d-flex'>
            { isAuthenticated("vacus") &&(
            <div className='col-sm-7'>
              <p className='heading'>TEMPERATURE</p>
              <Chart shipmentId={id} />
            </div>)
            }
            { isAuthenticated("mobileye") &&(
            <div className='col-sm-5 ml-2'>
              <p className='heading'>DRIVER STATS</p>
              <DriverGraph shipmentId={id} />
            </div>)}
          </div>
          {openShipping && (
            <Modal
              title='Shipping Order Details'
              close={() => closeModalShipping()}
              size='modal-xl' //for other size's use `modal-lg, modal-md, modal-sm`
            >
              <ViewShippingModal shipments={tracking} />
            </Modal>
          )}
          <h6 className='heading mb-3'>CHAIN OF CUSTODY</h6>
          {shippmentChainOfCustodyData.length === 0 ? (
            <div>N/A</div>
          ) : (
            <div className='row'>
              <div className='picture'>
                <img
                  src={currentinventory}
                  alt='truck'
                  height='15'
                  width='15'
                />
              </div>
              <div className='d-flex flex-column'>
                <div className='chain text-secondary'>Shipment Number</div>
                <div className='chain'>
                  <strong>{shippmentChainOfCustodyData[0].id}</strong>
                </div>
              </div>
              <div className='d-flex flex-column  ml-5 mr-3'>
                <div className='dot bg-secondary mt-2 mb-5'></div>
                <div className='dot bg-info'></div>
              </div>
              <div className='col'>
                <div className='chain'>
                  <strong>
                    {shippmentChainOfCustodyData[0].supplier?.locationId}
                  </strong>
                </div>
                <div className='chainhead mb-4'>
                  {shippmentChainOfCustodyData[0].supplier.id}
                </div>
                <div className='chain'>
                  <strong>
                    {shippmentChainOfCustodyData[0].receiver?.locationId}
                  </strong>
                </div>
                <div className='chainhead'>
                  {shippmentChainOfCustodyData[0].receiver.id}
                </div>
              </div>
            </div>
          )}

          <ChainOfCustody
            t={t}
            shipments={shippmentChainOfCustodyData}
            imagesData={props.imagesData}
            setHighLight={setHighLight}
            setMenuShip={setMenuShip}
            setMenuProduct={setMenuProduct}
            setProductHighLight={setProductHighLight}
          />

          {receiveShipmentModal && (
            <Modal close={() => closeModalShipment()} size='modal-sm'>
              <SuccessPopup onHide={closeModalShipment} t={t} />
            </Modal>
          )}
          {FailPopUp && (
            <Modal close={() => closeModalShipment()} size='modal-sm'>
              <FailedPopup onHide={closeModalShipment} t={t} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewGMRShipment;

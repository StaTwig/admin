import React, { useState } from "react";
import ShipmentSummary from "./shipmentsummary";
import ShipmentDetails from "./shipmentdetails";
import ProductList from "./productlist";
import Map from "./map";
import returnShipment from "../../assets/icons/returnShipment.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import back from "../../assets/icons/back.png";
import UpdateStatus from "../../assets/icons/Update_Status.png";
import "./style.scss";
import ChainOfCustody from "./chainofcustody";
import Modal from "../../shared/modal";
import { Link } from "react-router-dom";
import { getAddress } from "../../utils/commonHelper";
import { isAuthenticated } from "../../utils/commonHelper";
import ViewShippingModal from "../shipments/shippingOrder/viewShippingModal";
const Tracing = (props) => {
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const tracking = props.trackData;
  const status = tracking.status;
  const shippmentChainOfCustodyData = props.shippmentChainOfCustodyData;
  const { id } = props.match.params;
  if (!isAuthenticated("viewShipment")) props.history.push(`/profile`);

  const closeModalShipping = () => {
    setOpenShipping(false);
  };

  return (
    <div className='tracing'>
      <div className='row justify-content-between'>
        <h1 className='breadcrumb mt-3'>VIEW SHIPMENT</h1>
        <div className='row'>
          <Link to={`/shipments`}>
            <button className='btn btn-outline-primary mr-4 mt-3'>
              <img src={back} height='17' className='mr-2 mb-1' alt='' />
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
          {isAuthenticated("receiveShipment") && (
            <Link
              to={
                status === "RECEIVED"
                  ? `/viewshipment/${id}`
                  : `/receiveShipment/${id}`
              }
            >
              <button
                className='btn btn-main-blue chain mr-3 mt-3'
                disabled={status === "RECEIVED"}
              >
                <img
                  src={returnShipment}
                  width='14'
                  height='14'
                  className='mr-2'
                  disabled={status === "RECEIVED"}
                  alt='Return Shipment'
                />
                <b>Receive Shipment</b>
              </button>
            </Link>
          )}
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
        </div>
        <div className='col-sm-8'>
          <div className='row mb-4 mt-0'>
            <div
              className='col' // commonpanle
              style={{ height: "350px" }}
            >
              <p className='heading'>Geographical Tracking</p>
              <Map data={shippmentChainOfCustodyData} />{" "}
            </div>
            {/* <div className="panel commonpanle col">
              {props.iotEnabledStatus ?
                <div className="d-flex justify-content-between">
                  <div className="row ml-4 mb-2">
                    <div className="arrow mr-2" 
                      style={{ width: '56px', height: '58px'}}
                    >
                      <img 
                        className='temperature-icon' 
                        src={CurrentTemperature} />
                    </div>

                    <div className="d-flex flex-column">
                      <div className="info">Current temperature</div>
                      <div className="temp">{Object.keys(props.latestIotShipmentData).length > 0
                        ? props.latestIotShipmentData.temp['temp'] : 0}°C</div>
                    </div>
                  </div>

                  <div className="current-info-container">
                    <div className="current-info">
                      <div className="info">Last Upadated on</div>
                      <div className="info">{Object.keys(props.latestIotShipmentData).length > 0
                        ? formatTimeAMPM(new Date().toString().split(' ')[4]) : ''} </div>
                    </div>
                    <img 
                      className="zoom-in-icon" 
                      src={zoomInIcon} 
                      onClick={() => props.openInTrackingPage()} />
                  </div>
                </div> :
                ''}
              {
                props.iotEnabledStatus ?
                  <Chart lastTenIotShipmentData={props.lastTenIotShipmentData} /> : ''
              }
            </div>*/}
          </div>
          <button
            className='btn btn-outline-* fontSize200 enlargeTemperature float-right'
            onClick={() =>
              window.open(
                `//iot.vaccineledger.com/dashboard/db/${tracking.shipmentDetails[0].id}?orgId=1`,
                "_blank"
              )
            }
          >
            SHOW MORE
          </button>
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
                    {getAddress(
                      shippmentChainOfCustodyData[0].supplier.warehouse
                        .warehouseAddress
                    )}
                  </strong>
                </div>
                <div className='chainhead mb-4'>
                  {shippmentChainOfCustodyData[0].supplier.org.name}
                </div>
                <div className='chain'>
                  <strong>
                    {getAddress(
                      shippmentChainOfCustodyData[0].receiver.warehouse
                        .warehouseAddress
                    )}
                  </strong>
                </div>
                <div className='chainhead'>
                  {shippmentChainOfCustodyData[0].receiver.org.name}
                </div>
              </div>
            </div>
          )}

          <ChainOfCustody
            // chain={chain}
            //setChain={setChain}
            shipments={shippmentChainOfCustodyData}
            imagesData={props.imagesData}
            setHighLight={setHighLight}
            setMenuShip={setMenuShip}
            setMenuProduct={setMenuProduct}
            setProductHighLight={setProductHighLight}
          />
        </div>
      </div>
    </div>
  );
};

export default Tracing;

/*  <svg width="100" height="100"><line x1="35" y1="35" x2="35" y2="0" stroke="black"/></svg>*/

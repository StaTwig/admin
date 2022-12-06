import React, { useState } from "react";
import ShipmentSummary from "./shipmentsummary";
import ShipmentDetails from "./shipmentdetails";
import ProductList from "./productlist";
import Chart from "./temperature";
import Map from "./map";
import returnShipment from "../../assets/icons/returnShipment.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import CurrentTemperature from "../../assets/icons/thermometer.svg";
import "./style.scss";
import SoChainOfCustody from "./sochainofcustody";
import Modal from "../../shared/modal";
import ViewShippingModal from "./shippingorder/shippingpopup";
import { Link } from "react-router-dom";
const Tracing = (props) => {
  console.log("Props");
  console.log(props);
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const tracking = props.trackData;
  const shippmentChainOfCustodyData = props.shippmentChainOfCustodyData;
  // console.log(shippmentChainOfCustodyData.status)
  var status;
  shippmentChainOfCustodyData.map((data) => {
    status = data.status;
  });
  const productCard = props.productDetails;
  const poCard = props.poDetails;
  const { id } = props.match.params;

  const closeModal = () => {
    setOpenPurchase(false);
  };

  const closeModalShipping = () => {
    setOpenShipping(false);
  };
  return (
    <div className='tracing'>
      <div className='row justify-content-between'>
        <h1 className='breadcrumb'>Track & Trace</h1>
        <div className='row'>
          <Link
            to={
              status === "RECEIVED" ? `/track/${id}` : `/updatestatus/${id}`
            }
          >
            <button
              className='btn btn-orange fontSize20 font-bold mr-5'
              disabled={status === "RECEIVED"}
            >
              <span className='chain'>Update Status</span>
            </button>
          </Link>
          <Link
            to={
              status === "RECEIVED"
                ? `/track/${id}`
                : `/receiveShipment/${id}`
            }
          >
            <button
              className='btn btn-main-blue fontSize20 font-bold '
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
              <span className='chain'>Receive Shipment</span>
            </button>
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <h6 className='heading mb-3'>SHIPMENT SUMMARY</h6>
          <ShipmentSummary shipments={tracking} />
          <h6 className='heading mt-3 mb-3'>SHIPMENT DETAILS</h6>
          <ShipmentDetails
            shipments={tracking}
            setMenuShip={setMenuShip}
            menuShip={menuShip}
            highLight={highLight}
            setHighLight={setHighLight}
          />

          <h6 className='heading mt-3 mb-3'>PRODUCT LIST</h6>
          <ProductList
            shipments={tracking}
            productHighLight={productHighLight}
            setProductHighLight={setProductHighLight}
            menuProduct={menuProduct}
            setMenuProduct={setMenuProduct}
          />
        </div>
        <div className='col-sm-8'>
          <div className='row mb-4'>
            <div className='panel col mr-1 geo commonpanle'>
              <p className='heading'>Geographical Tracking</p> <Map />{" "}
            </div>
            <div className='panel commonpanle col'>
              <div className='d-flex justify-content-between'>
                <div className='row ml-3'>
                  <div className='arrow mr-2'>
                    <img
                      src={CurrentTemperature}
                      width='20'
                      height='20'
                      alt='Current Templerature'
                    />
                  </div>

                  <div className='d-flex flex-column'>
                    <div className='info'>Current temperature</div>
                    <div className='info'>3°C</div>
                  </div>
                </div>

                <div className='d-flex flex-column'>
                  <div className='info'>Last Upadated on</div>
                  <div className='info'>07:00 am</div>
                </div>
              </div>
              <Chart />{" "}
            </div>
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
          <h6 className='heading mb-5'>CHAIN OF CUSTODY</h6>
          {shippmentChainOfCustodyData.length === 0 ? (
            <div>N/A</div>
          ) : (
            <div className='row mb-3 mt-2'>
              <div className='picture ml-3'>
                <img
                  src={currentinventory}
                  alt='truck'
                  height='15'
                  width='15'
                />
              </div>
              <div className='d-flex flex-column mr-2'>
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
                    {shippmentChainOfCustodyData[0].supplier.org.postalAddress}
                  </strong>
                </div>
                <div className='chainhead mb-4'>
                  {shippmentChainOfCustodyData[0].supplier.org.name}
                </div>
                <div className='chain'>
                  <strong>
                    {shippmentChainOfCustodyData[0].receiver.org.postalAddress}
                  </strong>
                </div>
                <div className='chainhead'>
                  {shippmentChainOfCustodyData[0].receiver.org.name}
                </div>
              </div>
            </div>
          )}
          {/* <PoChainOfCustody
            shipments={props.poChainOfCustodyData}
            setOpenPurchase={setOpenPurchase}
          /> */}
          <SoChainOfCustody
            shipments={shippmentChainOfCustodyData}
            setOpenShipping={setOpenShipping}
          />
          {/* <ChainOfCustody
            chain={chain}
            setChain={setChain}
            shipments={tracking}
            setHighLight={setHighLight}
            setMenuShip={setMenuShip}
            setMenuProduct={setMenuProduct}
            setProductHighLight={setProductHighLight}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Tracing;

/*  <svg width="100" height="100"><line x1="35" y1="35" x2="35" y2="0" stroke="black"/></svg>*/

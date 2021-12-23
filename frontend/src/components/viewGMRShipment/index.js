import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "./temperature";
import ShipmentSummary from "./shipmentsummary";
import ShipmentDetails from "./shipmentdetails";
import ProductList from "./productlist";
import Map from "./map";
import { config } from "../../config";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import CurrentTemperature from "../../assets/icons/CurrentTemperature.svg";
import zoomInIcon from "../../assets/icons/chain-icon.png";
import back from "../../assets/icons/back.png";
import UpdateStatus from "../../assets/icons/Update_Status.png";
import "./style.scss";
import ChainOfCustody from "./chainofcustody";
import Modal from "../../shared/modal";
import { isAuthenticated } from "../../utils/commonHelper";
import ViewShippingModal from "../shipments/shippingOrder/viewShippingModal";
import { io } from "socket.io-client";
import { fromUnixTime } from "date-fns";

const ViewGMRShipment = (props) => {
  const [sensorData, setSensorData] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
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

  useEffect(() => {
    console.log("SOCKETURL", config().temperatureSocketUrl);
    const socket = io(config().temperatureSocketUrl, {
      path: "/shipmentmanagement/api/socket",
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Socket ***** connected");
      socket.emit("join", props.match.params.id);
      socket.on("sensorData", (data) => {
        const time = fromUnixTime(data.timestamp);
        console.log("sensorData", data);
        setCurrentTemperature(data.temperature);
        setLastUpdateTime(time.toLocaleString("en-IN"));
        console.log("currentTemperature", currentTemperature);
        const array = sensorData;
        console.log("time", time);
        array.push([time, data.temperature]);
        if (array.length > 10) {
          array.shift();
        }
        setSensorData(array);
        console.log("STATE", array);
        // setSensorData((oldData) => [...oldData, data]);
      });
    });
  }, []);

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
          <h6 className='heading mt-4 mb-3'>TEMPERATURE</h6>
          <div className='col panel commonpanle'>
            <div className='d-flex justify-content-between'>
              <div className='row ml-4 mb-2'>
                <img
                  style={{ width: "2rem", height: "3.5rem" }}
                  className='temperature-icon mr-2'
                  src={CurrentTemperature}
                  alt='Current Temperature'
                />
                <div className='d-flex flex-column'>
                  <div className='info'>Current temperature</div>
                  <div className='temp'>
                    {currentTemperature ? currentTemperature : 0}
                    {""}
                    °C
                  </div>
                </div>
              </div>
              <div className='d-flex'>
                <img
                  style={{ width: "2rem", height: "3.5rem" }}
                  className='temperature-icon mr-2'
                  src={zoomInIcon}
                  alt='Zoom in'
                />
                <div className='current-info'>
                  <div className='info'>Last Updated on</div>
                  <div
                    className='info'
                    style={{ fontSize: "13px", marginTop: "1rem" }}
                  >
                    {lastUpdateTime
                      ? lastUpdateTime
                      : new Date().toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
            <Chart lastTemperatureData={sensorData} />
          </div>
        </div>
        <div className='col-sm-8'>
          <div className='row mb-4 mt-0'>
            <div className='col' style={{ height: "350px" }}>
              <p className='heading'>GEOGRAPHICAL TRACKING </p>
              <Map data={shippmentChainOfCustodyData} />{" "}
            </div>
          </div>
          <button
            className='btn btn-outline-* fontSize200 enlargeTemperature float-right'
            onClick={() =>
              window.open("http://iot.vaccineledger.com", "_blank")
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

export default ViewGMRShipment;

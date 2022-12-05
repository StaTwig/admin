import React, { useState } from "react";
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
import { t } from "i18next";
import ShipmentInfo from "./ShipmentInfo";
import ProductInfo from "./ProductInfo";
import ShipmentOverview from "./ShipmentOverview";

const Tracing = (props) => {
  const [menuShip, setMenuShip] = useState(false);
  const [menuProduct, setMenuProduct] = useState(false);
  const [highLight, setHighLight] = useState(false);
  const [productHighLight, setProductHighLight] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const tracking = props.trackData;

  const closeModalShipping = () => {
    setOpenShipping(false);
  };

  
  const shippmentChainOfCustodyData = props.shippmentChainOfCustodyData;
  const { id } = props.match.params;
  if (!isAuthenticated("viewShipment")) props.history.push(`/profile`);
  const status = tracking.status;

  return (
    <div className='tracing'>
      <div className='row justify-content-between'>
        <h1 className='breadcrumb mt-3'>{t("view_shipment")}</h1>
        <div className='row'>
          <Link to={`/shipments`}>
            <button className='btn btn-outline-primary mr-4 mt-3'>
              <img src={back} height='17' className='mr-2 mb-1' alt='' />
              {t("back_to_shipments")}
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
                  alt={t("update_status")}
                />
                <b>{t("update_status")}</b>
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
                  alt={t("receive_shipment")}
                />
                <b>{t("receive_shipment")}</b>
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <h6 className='heading mb-3'>{t("shipment_summary")}</h6>
          <ShipmentOverview shipments={tracking} t={t} />
          <h6 className='heading mt-4 mb-3'>{t("shipment_details")}</h6>
          <ShipmentInfo shipments={tracking}
            setMenuShip={setMenuShip}
            menuShip={menuShip}
            highLight={highLight}
            setHighLight={setHighLight}
            t={t} />
          <h6 className='heading mt-4 mb-3'>{t("product_list")}</h6>
          <ProductInfo shipments={tracking}
            productHighLight={productHighLight}
            setProductHighLight={setProductHighLight}
            menuProduct={menuProduct}
            setMenuProduct={setMenuProduct}
            t={t} />
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
          <div className='row mb-4 mt-0'>
            <div className='col' style={{ height: "350px" }}>
              <p className='heading mb-3'>{t("geographical_tracking")}</p>
              <Map data={shippmentChainOfCustodyData} t={t} />{" "}
            </div>
          </div>
          {openShipping && (
            <Modal
              title='Shipping Order Details'
              close={() => closeModalShipping()}
              size='modal-xl'
            >
              <ViewShippingModal shipments={tracking} />
            </Modal>
          )}
          <h6 className='heading mb-3'>{t("chain_of_custody")}</h6>
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
                <div className='chain text-secondary'>
                  {" "}
                  {t("shipment_number")}
                </div>
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
            shipments={shippmentChainOfCustodyData}
            imagesData={props.imagesData}
            setHighLight={setHighLight}
            setMenuShip={setMenuShip}
            setMenuProduct={setMenuProduct}
            setProductHighLight={setProductHighLight}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default Tracing;

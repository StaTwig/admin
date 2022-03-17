import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import infoIcon from "../../assets/icons/info.png";
import Modal from "../../shared/modal";
import SuccessPopUp from "./PopUp/successPopUp";
import {
  createUpdateNewAlert,
  getAllManageAlerts,
} from "../../actions/userActions";
import "./style.scss";

const Settings = (props) => {
  const { t } = props;
  const [visible, setvisible] = useState("one");
  const [emailClicked, setEmailClicked] = useState(false);
  const [smsClicked, setSmsClicked] = useState(false);
  const [alertsObj, setAlertsObj] = useState({
    eventSecondary: "",
    alertMobile: false,
    alertEmail: false,
    alertWebPush: true,
  });
  const [
    showMobileVerificationRequiredLabel,
    setShowMobileVerificationRequiredLabel,
  ] = useState(false);

  const userProfile = useSelector((state) => {
    return state.user;
  });

  const [showToolTipForOrderAlerts, setShowToolTipForOrderAlerts] =
    useState(false);
  const [showToolTipForInventoryAlerts, setShowToolTipForInventoryAlerts] =
    useState(false);
  const [showToolTipForShippingAlerts, setShowToolTipForShippingAlerts] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileAlert, setMobileAlert] = useState(false);
  const [disabledQuesMark, setDisabledQuesMark] = useState(true);

  const setIndicatorValuesForTooltipPanel = (type) => {
    if (type === "orders_alerts") {
      setShowToolTipForOrderAlerts(!showToolTipForOrderAlerts);
      setShowToolTipForInventoryAlerts(false);
      setShowToolTipForShippingAlerts(false);
    } else if (type === "inventory_alerts") {
      setShowToolTipForInventoryAlerts(!showToolTipForInventoryAlerts);
      setShowToolTipForShippingAlerts(false);
      setShowToolTipForOrderAlerts(false);
    } else if (type === "shipping_alerts") {
      setShowToolTipForShippingAlerts(!showToolTipForShippingAlerts);
      setShowToolTipForOrderAlerts(false);
      setShowToolTipForInventoryAlerts(false);
    }
  };

  const isMobileNumberNotAvailable = () => {
    if (!userProfile && !userProfile.phoneNumber) {
      return true;
    }
    return false;
  };

  const getEventSecondaryValues = (activeAlerts) => {
    if (activeAlerts.length > 0) {
      return activeAlerts.toString();
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllManageAlerts();
      if (data.length > 0 && Object.keys(data[0].alertMode).length > 0) {
        setAlertsObj({
          eventSecondary: getEventSecondaryValues(data[0].active),
          alertMobile: data[0].alertMode["mobile"],
          alertEmail: data[0].alertMode["email"],
          alertWebPush: true,
        });
      }
    }
    fetchData();
  }, []);

  const prepareAndGetEventSecondary = (type) => {
    if (type === "ORDER" || type === "SHIPMENT" || type === "INVENTORY") {
      const eventSecondary = alertsObj.eventSecondary.split(",");
      if (eventSecondary.length > 0 && !eventSecondary.includes(type)) {
        return (
          `${type}` +
          (alertsObj.eventSecondary
            ? `,${alertsObj.eventSecondary}`
            : ""
          ).trim()
        );
      }
    } else {
      if (type === "REMOVE_ORDER") {
        const type = "ORDER";
        const eventSecondary = alertsObj.eventSecondary.split(",");
        if (eventSecondary.length > 0 && eventSecondary.includes(type)) {
          eventSecondary.splice(eventSecondary.indexOf(type), 1);
          return eventSecondary.toString().trim();
        }
      } else if (type === "REMOVE_SHIPMENT") {
        const type = "SHIPMENT";
        const eventSecondary = alertsObj.eventSecondary.split(",");
        if (eventSecondary.length > 0 && eventSecondary.includes(type)) {
          eventSecondary.splice(eventSecondary.indexOf(type), 1);
          return eventSecondary.toString().trim();
        }
      } else if (type === "REMOVE_INVENTORY") {
        const type = "INVENTORY";
        const eventSecondary = alertsObj.eventSecondary.split(",");
        if (eventSecondary.length > 0 && eventSecondary.includes(type)) {
          eventSecondary.splice(eventSecondary.indexOf(type), 1);
          return eventSecondary.toString().trim();
        }
      }
    }
  };

  const updateAlertsObj = (type) => {
    let newAlertsObject = alertsObj;
    if (type === "email") {
      const emailDocument = document.getElementById("email-alert-checkbox");
      if (emailDocument.checked) {
        newAlertsObject.alertEmail = true;
        setAlertsObj({ ...newAlertsObject });
      } else {
        newAlertsObject.alertEmail = false;
        if (!alertsObj.alertMobile) {
          newAlertsObject.eventSecondary = "";
        }
        setAlertsObj({ ...newAlertsObject });
      }
    } else if (type === "mobile") {
      const mobileDocument = document.getElementById("mobile-alert-checkbox");
      if (mobileDocument.checked) {
        newAlertsObject.alertMobile = true;
        setAlertsObj({ ...newAlertsObject });
      } else {
        newAlertsObject.alertMobile = false;
        if (!alertsObj.alertEmail) {
          newAlertsObject.eventSecondary = "";
        }
        setAlertsObj({ ...newAlertsObject });
      }
    } else if (type === "order") {
      const orderDocument = document.getElementById("order-alert-checkbox");
      if (orderDocument.checked) {
        newAlertsObject.eventSecondary = prepareAndGetEventSecondary("ORDER");
        setAlertsObj({ ...newAlertsObject });
      } else {
        newAlertsObject.eventSecondary =
          prepareAndGetEventSecondary("REMOVE_ORDER");
        setAlertsObj({ ...newAlertsObject });
      }
    } else if (type === "shipment") {
      const shipmentDoc = document.getElementById("shipment-alert-checkbox");
      if (shipmentDoc.checked) {
        newAlertsObject.eventSecondary =
          prepareAndGetEventSecondary("SHIPMENT");
        setAlertsObj({ ...newAlertsObject });
      } else {
        newAlertsObject.eventSecondary =
          prepareAndGetEventSecondary("REMOVE_SHIPMENT");
        setAlertsObj({ ...newAlertsObject });
      }
    } else if (type === "inventory") {
      const inventoryDoc = document.getElementById("inventory-alert-checkbox");
      if (inventoryDoc.checked) {
        newAlertsObject.eventSecondary =
          prepareAndGetEventSecondary("INVENTORY");
        setAlertsObj({ ...newAlertsObject });
      } else {
        newAlertsObject.eventSecondary =
          prepareAndGetEventSecondary("REMOVE_INVENTORY");
        setAlertsObj({ ...newAlertsObject });
      }
    }
  };

  const createNewAlert = async () => {
    await createUpdateNewAlert(alertsObj);
  };

  const closeModal = () => {
    setShowModal(false);
    props.history.push("/overview");
  };

  const isEmailMobileModeEnabled = () => {
    if (alertsObj.alertEmail || alertsObj.alertMobile) {
      return false;
    } else {
      return true;
    }
  };

  const fetchAlertInformation = (type) => {
    if (type === "ORDERS") {
      return (
        <ul>
          <li>{"New Order Received"}</li>
          <li>{"Order Accepted"}</li>
          <li>{"Order Rejected"}</li>
          <li>{"Order Pending"}</li>
          <li>{"Order Fully Fulfilled"}</li>
          <li>{"Order Partialy Fulfilled"}</li>
        </ul>
      );
    } else if (type === "INVENTORY") {
      return (
        <ul>
          <li>{"Products near Expiration"}</li>
          <li>{"Products Expired"}</li>
          <li>{"Products out of stock"}</li>
          <li>{"Cold chain Failure"}</li>
          <li>{"Products Added"}</li>
          <li>{"Products Sent"}</li>
          <li>{"Products Received"}</li>
        </ul>
      );
    } else if (type === "SHIPMENT") {
      return (
        <ul>
          <li>{"Shipment Created"}</li>
          <li>{"Shipment updated"}</li>
          <li>{"Shipment Delivered"}</li>
          <li>{"Shipment Delayed"}</li>
          <li>{"Shipment Cold chain Failure"}</li>
        </ul>
      );
    }
  };

  return (
    <>
      <div className='settings'>
        <h1 className='breadcrumb'>{t("settings")}</h1>
        <div className='card'>
          <div className='card-body'>
            <div className='mt-4'>
              <div className='tabs'>
                <ul
                  className='nav nav-pills'
                  style={{
                    marginBottom: "-20px",
                    marginLeft: "-12px",
                  }}
                >
                  <li
                    style={{
                      marginBottom: "15px",
                      marginTop: "10px",
                      marginLeft: "12px",
                    }}
                    className={
                      visible === "one" ? "nav-item-active" : "nav-item"
                    }
                    onClick={() => setvisible("one")}
                  >
                    <div
                      className={
                        visible === "one"
                          ? "nav-link"
                          : "nav-link text-secondary"
                      }
                    >
                      {t("manage")} {t("alerts")}
                    </div>
                  </li>
                </ul>
              </div>
              <div className='subscription-type'>
                <span className='subscription-alert-header-text'>
                  {t("get_alerts_on")} {t("mobile")} {t("or")} {t("Email")}
                </span>
                <div className='subscription-alert-section'>
                  <input
                    className='subscription-alert-checkbox'
                    type='checkbox'
                    id='email-alert-checkbox'
                    checked={alertsObj.alertEmail}
                    onClick={() => {
                      updateAlertsObj("email");
                      setEmailClicked(!emailClicked);
                    }}
                  />
                  <label
                    className='subscription-alert-label'
                    style={{ color: emailClicked ? "black" : "grey" }}
                  >
                    {t("Email")}
                  </label>
                </div>
                <div className='subscription-alert-section'>
                  <input
                    className='subscription-alert-checkbox'
                    type='checkbox'
                    id={"mobile-alert-checkbox"}
                    checked={alertsObj.alertMobile}
                    onClick={() => {
                      updateAlertsObj("mobile");
                      setSmsClicked(!smsClicked);
                    }}
                    disabled={isMobileNumberNotAvailable()}
                  />
                  <label
                    className='subscription-alert-label'
                    style={{
                      // color: isMobileNumberNotAvailable()
                      //   ? "#B4B4B4"
                      //   : "#000000",
                      color: smsClicked ? "black" : "grey",
                    }}
                  >
                    {t("mobile")} {"SMS"} &nbsp;
                    {disabledQuesMark && (
                      <span
                        onClick={() => {
                          setMobileAlert(true);
                          setDisabledQuesMark(false);
                        }}
                        className='ques-mark cursorP'
                      >
                        {"(?)"}
                      </span>
                    )}
                  </label>
                  {mobileAlert && (
                    <p className='register-mobile-alert'>
                      {t("mobile_alert_msg")}
                    </p>
                  )}
                  <label
                    className='subscription-alert-label'
                    style={{ color: "#D80000" }}
                    onClick={() =>
                      setShowMobileVerificationRequiredLabel(
                        !showMobileVerificationRequiredLabel
                      )
                    }
                  >
                    {isMobileNumberNotAvailable() && "(?)"}
                  </label>
                  {showMobileVerificationRequiredLabel && (
                    <p
                      style={{
                        color: isMobileNumberNotAvailable()
                          ? "#B4B4B4"
                          : "#000000",
                      }}
                    >
                      {t("mobile_alert_msg")}
                    </p>
                  )}
                </div>
              </div>
              <div className='alert-type'>
                <span className='subscription-alert-header-text'>
                  {t("select")} {t("alerts")} {t("type")}
                </span>
                <div className='subscription-alert-section'>
                  <input
                    className='subscription-alert-checkbox'
                    type='checkbox'
                    id='order-alert-checkbox'
                    checked={
                      alertsObj.eventSecondary.split(",").length > 0 &&
                      alertsObj.eventSecondary.includes("ORDER")
                        ? true
                        : false
                    }
                    onClick={() => {
                      updateAlertsObj("order");
                    }}
                    disabled={isEmailMobileModeEnabled()}
                  />
                  <label className='subscription-alert-label'>
                    {t("orders")} {t("alerts")}
                  </label>
                  <div className='tooltip-ex'>
                    <img
                      src={infoIcon}
                      alt='info'
                      className={"infoIcon"}
                      onClick={() =>
                        setIndicatorValuesForTooltipPanel("orders_alerts")
                      }
                    />
                    {showToolTipForOrderAlerts && (
                      <span className='tooltip-ex-text tooltip-ex-right'>
                        {fetchAlertInformation("ORDERS")}
                      </span>
                    )}
                  </div>
                </div>
                <div className='subscription-alert-section'>
                  <input
                    className='subscription-alert-checkbox'
                    type='checkbox'
                    id='inventory-alert-checkbox'
                    checked={
                      alertsObj.eventSecondary.split(",").length > 0 &&
                      alertsObj.eventSecondary.includes("INVENTORY")
                        ? true
                        : false
                    }
                    onClick={() => {
                      updateAlertsObj("inventory");
                    }}
                    disabled={isEmailMobileModeEnabled()}
                  />
                  <label className='subscription-alert-label'>
                    {t("inventory")} {t("alerts")}
                  </label>
                  <div className='tooltip-ex'>
                    <img
                      src={infoIcon}
                      alt='info'
                      className={"infoIcon"}
                      onClick={() =>
                        setIndicatorValuesForTooltipPanel("inventory_alerts")
                      }
                    />
                    {showToolTipForInventoryAlerts && (
                      <span className='tooltip-ex-text tooltip-ex-right'>
                        {fetchAlertInformation("INVENTORY")}
                      </span>
                    )}
                  </div>
                </div>
                <div className='subscription-alert-section'>
                  <input
                    className='subscription-alert-checkbox'
                    type='checkbox'
                    checked={
                      alertsObj.eventSecondary.split(",").length > 0 &&
                      alertsObj.eventSecondary.includes("SHIPMENT")
                        ? true
                        : false
                    }
                    id='shipment-alert-checkbox'
                    onClick={() => {
                      updateAlertsObj("shipment");
                    }}
                    disabled={isEmailMobileModeEnabled()}
                  />
                  <label className='subscription-alert-label'>
                    {t("shipment")} {t("alerts")}
                  </label>
                  <div className='tooltip-ex'>
                    <img
                      src={infoIcon}
                      alt='info'
                      className={"infoIcon"}
                      onClick={() =>
                        setIndicatorValuesForTooltipPanel("shipping_alerts")
                      }
                    />
                    {showToolTipForShippingAlerts && (
                      <span className='tooltip-ex-text tooltip-ex-right'>
                        {fetchAlertInformation("SHIPMENT")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='alert-save'>
                <button
                  className='btn-primary btn'
                  disabled={alertsObj.eventSecondary ? false : true}
                  onClick={() => {
                    setShowModal(true);
                    createNewAlert();
                  }}
                >
                  <span>{t("save")}</span>
                </button>
              </div>
              {showModal && (
                <Modal
                  close={() => closeModal()}
                  size='modal-md' //for other size's use `modal-lg, modal-md, modal-sm`
                >
                  <SuccessPopUp
                    onHide={closeModal} //FailurePopUp
                    t={t}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

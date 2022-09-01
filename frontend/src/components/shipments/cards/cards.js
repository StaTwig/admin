import React, { useState, useEffect } from "react";
import Sent from "../../../assets/icons/Sent1.svg";
import Received from "../../../assets/icons/Received1.svg";
import InboundAlert from "../../../assets/icons/Inbound_Alert.png";
import OutboundAlert from "../../../assets/icons/Outbound_alert.png";
import { getShipmentAnalytics } from "../../../actions/analyticsAction";

import "../style.scss";
import "./cards.scss";

function Cards(props) {
  const { t } = props;
  const [shipmentAnalytics, setShipmentAnalytics] = useState({});
  useEffect(() => {
    async function fetchData() {
      const result = await getShipmentAnalytics();
      setShipmentAnalytics(result.data.shipment);
    }
    fetchData();
  }, []);
  return (
    <div className="grid-tile-container">
      <div onClick={() => props.setData("one")} className="grid-tiles cursorP">
        <div className="picture recived-bg">
          <img src={Received} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="card-text f-500 blue">{t('inbound_shipments')}</p>
          <h1 className="number-text f-500 blue">
            {shipmentAnalytics.inboundShipments}
          </h1>
        </div>
      </div>

      <div onClick={() => props.setData("two")} className="grid-tiles cursorP">
        <div className="picture sent-bg">
          <img src={Sent} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="card-text f-500 orange">{t('outbound_shipments')}</p>
          <h1 className="number-text f-500 orange">
            {shipmentAnalytics.outboundShipments}
          </h1>
        </div>
      </div>

      <div
        onClick={() => props.setData("one", true)}
        className="grid-tiles cursorP"
      >
        <div className="picture inbound-alert-bg">
          <img src={InboundAlert} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="card-text f-500 darkblue">{t('inbound_alert')}</p>
          <h1 className="number-text f-500 darkblue">
            {shipmentAnalytics.inboundAlerts}
          </h1>
        </div>
      </div>

      <div
        onClick={() => props.setData("two", true)}
        className="grid-tiles cursorP"
      >
        <div className="picture outbound-alert-bg">
          <img src={OutboundAlert} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="card-text f-500 tale">{t('outbound_alert')}</p>
          <h1 className="number-text f-500 tale">
            {shipmentAnalytics.outboundAlerts}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Cards;

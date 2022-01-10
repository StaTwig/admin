import React, { useState, useEffect } from "react";
import Sent from "../../assets/icons/Sent1.svg";
import Received from "../../assets/icons/Received1.svg";
import InboundAlert from "../../assets/icons/Inbound_Alert.png";
import OutboundAlert from "../../assets/icons/Outbound_alert.png";

import "./style.scss";
import { getShipmentAnalytics } from "../../actions/analyticsAction";

const Tiles = (props) => {
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
    <div className='row mb-4'>
      <div className='col'>
        <div onClick={() => props.setData("one")} className='panel cursorP'>
          <div className='picture recived-bg'>
            <img src={Received} alt='truck' />
          </div>
          <div className='d-flex flex-column'>
            <div className='title recived-text font-weight-bold'>
              {t('inbound_shipments')}
            </div>
            <div className='recived-text count'>
              {shipmentAnalytics.inboundShipments}
            </div>
          </div>
        </div>
      </div>
      <div className='col'>
        <div onClick={() => props.setData("two")} className='panel cursorP'>
          <div className='picture sent-bg'>
            <img src={Sent} alt='truck' />
          </div>
          <div className='d-flex flex-column'>
            <div className='title sent-text font-weight-bold'>
              {t('outbound_shipments')}
            </div>
            <div className='sent-text count'>
              {shipmentAnalytics.outboundShipments}
            </div>
          </div>
        </div>
      </div>
      <div className='col'>
        <div
          onClick={() => props.setData("one", true)}
          className='panel cursorP'
        >
          <div className='picture inbound-alert-bg'>
            <img src={InboundAlert} alt='truck' />
          </div>

          <div className='d-flex flex-column'>
            <div className='title inbound-text font-weight-bold'>
              {t('inbound_alert')}
            </div>
            <div className='inbound-text count'>
              {shipmentAnalytics.inboundAlerts}
            </div>
          </div>
        </div>
      </div>
      <div className='col'>
        <div
          onClick={() => props.setData("two", true)}
          className='panel cursorP'
        >
          <div className='picture outbound-alert-bg'>
            <img src={OutboundAlert} alt='truck' />
          </div>
          <div className='d-flex flex-column'>
            <div className='title outbound-text font-weight-bold'>
              {t('outbound_alert')}
            </div>
            <div className='outbound-text count'>
              {shipmentAnalytics.outboundAlerts}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiles;

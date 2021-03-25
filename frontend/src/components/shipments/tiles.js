import React, { useState, useEffect } from 'react';
import Sent from '../../assets/icons/Sent1.svg';
import Received from '../../assets/icons/Received1.svg';

import './style.scss';
import {
  getAnalytics
} from '../../actions/analyticsAction';



const Tiles = props => {
  const outbounds = props.shipments.filter(row => props.user.warehouseId == row.supplier.locationId);
  const inbounds = props.shipments.filter(row => props.user.warehouseId != row.supplier.locationId);
  const outboundAlerts = outbounds?.shipmentAlerts;
  const inboundAlerts = inbounds?.shipmentAlerts;
  useEffect(() => {

  }, []);

  const [shipmentAnalytics,setShipmentAnalytics]= useState({})
  useEffect(() => {
  async function fetchData() {
    const result = await getAnalytics();
    setShipmentAnalytics(result.data.shipment);
  }
  fetchData();
}, []);

  
  return (
    <div className="row mb-4">
      <div className="col">
        <div onClick={() => props.setData('one')} className="panel cursorP">
          <div className="picture recived-bg">
            <img src={Received} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title recived-text">Inbound Shipments</div>
            <div className="recived-text count">{shipmentAnalytics.inboundShipments}</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div onClick={() => props.setData('two')} className="panel cursorP">
          <div className="picture sent-bg">
            <img src={Sent} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title sent-text ">Outbound Shipments</div>
            <div className="sent-text count">{shipmentAnalytics.outboundShipments}</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div onClick={() => props.setData('one', 'a')} className="panel cursorP">
          <div className="picture inbound-alert-bg">
            
          </div>
          <div className="d-flex flex-column">
            <div className="title inbound-text">Inbound Alert</div>
            <div className="inbound-text count">{shipmentAnalytics.inboundAlerts}</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div onClick={() => props.setData('two', 'a')} className="panel cursorP">
          <div className="picture outbound-alert-bg">
            
          </div>
          <div className="d-flex flex-column">
            <div className="title outbound-text ">Outbound Alert</div>
            <div className="outbound-text count">{shipmentAnalytics.outboundAlerts}</div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Tiles;

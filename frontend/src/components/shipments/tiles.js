import React, { useState, useEffect } from 'react';


import truckthree from "../../assets/icons/truckthree.svg";
import Sent from "../../assets/icons/Sent.svg";
import Received from "../../assets/icons/Received.svg";
import CurrentShipment from "../../assets/icons/CurrentShipmentInTransit2.svg";

import './style.scss'

const Tiles = (props) => {
    const [totalShipments, setTotalShipments] = useState('');
      const [shipmentsSent, setShipmentsSent] = useState('');
      const [shipmentsReceived, setShipmentsReceived] = useState('0');
      const [shipmentsTransit, setShipmentsTransit] = useState('0');
      let count=0;
      let near=0;
      let key=0;
      useEffect(() => {
        props.shipments.map((shipment,index) => {
              key = index+1;
             if(shipment.status=='Shipped'||shipment.status=='In Transit'){
                count++;
             }
             if(shipment.status=='In Transit')
             {
                 near++;
             }
      })
    setTotalShipments(key);
    setShipmentsSent(count);
    setShipmentsTransit(near);
      })
      
      
       
    return (
        <div className="row mb-4">
            <div className="col">
                <div className="panel">
                    <div className="picture truck-bg">
                        <img src={truckthree} alt="truck" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="title truck-text">Total Shipments</div>
                        <div className="tab-container">
                            <div className="tab-item active">This Year</div>
                            <div className="tab-item">This Month</div>
                            <div className="tab-item">This Week</div>
                            <div className="tab-item">Today</div>
                        </div>
                        <div className="truck-text count">{totalShipments}</div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="panel">
                    <div className="picture sent-bg">
                        <img src={Sent} alt="truck" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="title sent-text ">Total Shipments Sent</div>
                        <div className="tab-container">
                            <div className="tab-item ">This Year</div>
                            <div className="tab-item ">This Month</div>
                            <div className="tab-item ">This Week</div>
                            <div className="tab-item ">Today</div>
                        </div>
                        <div className="sent-text count">{shipmentsSent}</div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="panel">
                    <div className="picture recived-bg">
                        <img src={Received} alt="truck" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="title recived-text">Total Shipments Received</div>
                        <div className="tab-container">
                            <div className="tab-item active">This Year</div>
                            <div className="tab-item">This Month</div>
                            <div className="tab-item">This Week</div>
                            <div className="tab-item">Today</div>
                        </div>
                        <div className="recived-text count">0</div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="panel">
                    <div className="picture transit-bg">
                        <img src={CurrentShipment} alt="truck" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="title transit-text">Current Shipment in Transit</div>
                        <div className="tab-container">
                            <div className="tab-item active">This Year</div>
                            <div className="tab-item">This Month</div>
                            <div className="tab-item">This Week</div>
                            <div className="tab-item">Today</div>
                        </div>
                        <div className="transit-text count">{shipmentsTransit}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tiles;
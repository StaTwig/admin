import React from 'react'


import truckthree from "../../assets/icons/truckthree.svg";
import Sent from "../../assets/icons/Sent.svg";
import Received from "../../assets/icons/Received.svg";
import CurrentShipment from "../../assets/icons/CurrentShipmentInTransit2.svg";

import './style.scss'

const Tiles = () => {
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
                        <div className="truck-text count">2,34,532</div>
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
                            <div className="tab-item active">This Year</div>
                            <div className="tab-item">This Month</div>
                            <div className="tab-item">This Week</div>
                            <div className="tab-item">Today</div>
                        </div>
                        <div className="sent-text count">14,532</div>
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
                        <div className="recived-text count">1,532</div>
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
                        <div className="transit-text count">1,532</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tiles;
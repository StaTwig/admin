import React from "react";

import TotalTransactions from "../../assets/icons/TotalTransactions.svg";
import TotalShipments from "../../assets/icons/TotalShipments.svg";
import TotalBlocks from "../../assets/icons/TotalBlocks.svg";
import TotalUsers from "../../assets/icons/TotalUsers.svg";
import TotalUnitsShipped from "../../assets/icons/TotalUnitsShipped.svg";
import './style.scss';


const StatusBar = () => {
    return (
        <div className="full-width-ribben">
            <div className="row no-gutters">
                <div className="col">
                    <div className="panel">
                        <div className="picture truck-bg">
                            <img src={TotalTransactions} alt="truck" />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="title">Total Transactions</div>
                            <div className="count">532</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="panel">
                        <div className="picture truck-bg">
                            <img src={TotalShipments} alt="truck" />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="title">Total Shipments</div>
                            <div className="count" >132</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="panel">
                        <div className="picture truck-bg">
                            <img src={TotalBlocks} alt="truck" />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="title">Total Blocks</div>
                            <div className="count">132</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="panel">
                        <div className="picture truck-bg">
                            <img src={TotalUsers} alt="truck" />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="title">Total Users</div>
                            <div className="count">132</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="panel">
                        <div className="picture truck-bg">
                            <img src={TotalUnitsShipped} alt="truck" />
                        </div>

                        <div className="d-flex flex-column">
                            <div className="title">Total Units Shipped</div>
                            <div className="count">132</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;


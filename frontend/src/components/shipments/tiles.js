import React, { useState, useEffect } from 'react';
import {
  getAnalytics
} from '../../actions/analyticsAction';
import truckthree from '../../assets/icons/truckthree.svg';
import Sent from '../../assets/icons/Sent.svg';
import Received from '../../assets/icons/Received.svg';
import CurrentShipment from '../../assets/icons/CurrentShipmentInTransit2.svg';

import './style.scss';

const Tiles = props => {
  const [totalShipmentsSent, setTotalShipmentsSent] = useState('');
  const [totalShipmentsReceived, setTotalShipmentsReceived] = useState('');
  const [currentShipmentTransit, setCurrentShipmentTransit] = useState('');
  const [totalShipmentsDelayed, setTotalShipmentsDelayed] = useState('');
  const [shipmentAnalytics,setshipmentAnalytics]= useState({})

    useEffect(() => {
 async function fetchData() {
   const resultAnalytics = await getAnalytics();
   setshipmentAnalytics(resultAnalytics.data);
   setTotalShipmentsSent(
     resultAnalytics.data.totalShipmentsSent
   );
   setTotalShipmentsReceived(
    resultAnalytics.data.totalShipmentsReceived
  );
   setCurrentShipmentTransit(
     resultAnalytics.data.totalShipmentsInTransit
   );
   setTotalShipmentsDelayed(
     resultAnalytics.data.totalShipmentsWithDelayInTransit
   )
  
 }
 fetchData();
}, []);
  
  return (
    <div className="row mb-4">
      <div className="col">
        <div className="panel">
          <div className="picture sent-bg">
            <img src={Sent} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title sent-text ">Total Shipments Sent</div>
            <div className="tab-container">
              <div
                className="tab-item "
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                   shipmentAnalytics.totalShipmentsSent
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    shipmentAnalytics.totalShipmentsSent
                  )
                }
              >
                Today
              </div>
            </div>
            <div className="sent-text count">{totalShipmentsSent}</div>
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
              <div
                className="tab-item active"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    shipmentAnalytics.totalShipmentsReceived
                  )
                }
              >
                Today
              </div>
            </div>
            <div className="recived-text count">{totalShipmentsReceived}</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="panel">
          <div className="picture transit-bg">
            <img src={CurrentShipment} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title transit-text">
              Current Shipment in Transit
            </div>
            <div className="tab-container">
              <div
                className="tab-item active"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    shipmentAnalytics.totalShipmentsInTransit
                  )
                }
              >
                Today
              </div>
            </div>
            <div className="transit-text count">{currentShipmentTransit}</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="panel">
          <div className="picture truck-bg">
            <img src={truckthree} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title truck-text">Shipments Delayed</div>
            <div className="tab-container">
              <div
                className="tab-item active"
                onMouseLeave={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit)
                }
                onMouseEnter={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                    )
                }
                onMouseEnter={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsDelayed(
                    shipmentAnalytics.totalShipmentsWithDelayInTransit
                  )
                }
              >
                Today
              </div>
            </div>
            <div className="truck-text count">{totalShipmentsDelayed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiles;

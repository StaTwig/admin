import React, { useState, useEffect } from 'react';
import truckthree from '../../assets/icons/truckthree.svg';
import Sent from '../../assets/icons/Sent.svg';
import Received from '../../assets/icons/Received.svg';
import CurrentShipment from '../../assets/icons/CurrentShipmentInTransit2.svg';

import './style.scss';

const Tiles = props => {
  const [totalShipments, setTotalShipments] = useState('2');
  const [totalShipmentsSent, setTotalShipmentsSent] = useState('13');
  const [totalShipmentsReceived, setTotalShipmentsReceived] = useState('11');
  const [currentShipmentTransit, setCurrentShipmentTransit] = useState('6');
  useEffect(
    () => {
      //setTotalShipments(props.shipmentsCount.totalShipments.total);
     // setTotalShipmentsSent(props.shipmentsCount.totalShipmentsSent.total);
     /* setTotalShipmentsReceived(
        props.shipmentsCount.totalShipmentsReceived.total,
      );
      setCurrentShipmentTransit(props.shipmentsCount.currentShipments.total);*/
    },
    [props.shipmentsCount],
  );
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
                   // props.shipmentsCount.totalShipmentsSent.total,
                   100
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    //props.shipmentsCount.totalShipmentsSent.thisYear,
                    100
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    //props.shipmentsCount.totalShipmentsSent.total,
                    50
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    //props.shipmentsCount.totalShipmentsSent.thisMonth,
                    50
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                   // props.shipmentsCount.totalShipmentsSent.total,
                   30
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    //props.shipmentsCount.totalShipmentsSent.thisWeek,
                    30
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    //props.shipmentsCount.totalShipmentsSent.total,
                    20
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                  20 // props.shipmentsCount.totalShipmentsSent.today,
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
                    //props.shipmentsCount.totalShipmentsReceived.total,
                    100
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                   // props.shipmentsCount.totalShipmentsReceived.thisYear,
                   100
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                   // props.shipmentsCount.totalShipmentsReceived.total,
                   80
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                   // props.shipmentsCount.totalShipmentsReceived.thisMonth,
                   80
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    //props.shipmentsCount.totalShipmentsReceived.total,
                    60
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    //props.shipmentsCount.totalShipmentsReceived.thisWeek,
                    60
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                   // props.shipmentsCount.totalShipmentsReceived.total,
                   40
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                   // props.shipmentsCount.totalShipmentsReceived.today,
                   40
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
                   // props.shipmentsCount.currentShipments.total,
                   50
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    //props.shipmentsCount.currentShipments.thisYear,
                    50
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    //props.shipmentsCount.currentShipments.total,
                    50
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                   // props.shipmentsCount.currentShipments.thisMonth,
                   50
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                   // props.shipmentsCount.currentShipments.total,
                   40
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                   // props.shipmentsCount.currentShipments.thisWeek,
                   40
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    //props.shipmentsCount.currentShipments.total,
                    30
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                   // props.shipmentsCount.currentShipments.today,
                   30
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
                 setTotalShipments(
                   //props.shipmentsCount.totalShipments.total
                   50)
                }
                onMouseEnter={() =>
                  setTotalShipments(
                  50 // props.shipmentsCount.totalShipments.thisYear,
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipments(
                    40//props.shipmentsCount.totalShipments.total
                    )
                }
                onMouseEnter={() =>
                  setTotalShipments(
                   40// props.shipmentsCount.totalShipments.thisMonth,
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  30//setTotalShipments(props.shipmentsCount.totalShipments.total)
                }
                onMouseEnter={() =>
                  setTotalShipments(
                   30// props.shipmentsCount.totalShipments.thisWeek,
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                 30// setTotalShipments(props.shipmentsCount.totalShipments.total)
                }
                onMouseEnter={() =>
                  setTotalShipments(
                   30// props.shipmentsCount.totalShipments.today
                    )
                }
              >
                Today
              </div>
            </div>
            <div className="truck-text count">{totalShipments}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiles;

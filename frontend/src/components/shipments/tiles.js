import React, { useState, useEffect } from 'react';
import truckthree from '../../assets/icons/truckthree.svg';
import Sent from '../../assets/icons/Sent.svg';
import Received from '../../assets/icons/Received.svg';
import CurrentShipment from '../../assets/icons/CurrentShipmentInTransit2.svg';

import './style.scss';

const Tiles = props => {
  const [totalShipments, setTotalShipments] = useState('');
  const [totalShipmentsSent, setTotalShipmentsSent] = useState('');
  const [totalShipmentsReceived, setTotalShipmentsReceived] = useState('');
  const [currentShipmentTransit, setCurrentShipmentTransit] = useState('');
  useEffect(
    () => {
      setTotalShipments(props.shipmentsCount.totalShipments.total);
      setTotalShipmentsSent(props.shipmentsCount.totalShipmentsSent.total);
      setTotalShipmentsReceived(
        props.shipmentsCount.totalShipmentsReceived.total,
      );
      setCurrentShipmentTransit(props.shipmentsCount.currentShipments.total);
    },
    [props.shipmentsCount],
  );
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
              <div
                className="tab-item active"
                onMouseLeave={() =>
                  setTotalShipments(props.shipmentsCount.totalShipments.total)
                }
                onMouseEnter={() =>
                  setTotalShipments(
                    props.shipmentsCount.totalShipments.thisYear,
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipments(props.shipmentsCount.totalShipments.total)
                }
                onMouseEnter={() =>
                  setTotalShipments(
                    props.shipmentsCount.totalShipments.thisMonth,
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipments(props.shipmentsCount.totalShipments.total)
                }
                onMouseEnter={() =>
                  setTotalShipments(
                    props.shipmentsCount.totalShipments.thisWeek,
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipments(props.shipmentsCount.totalShipments.total)
                }
                onMouseEnter={() =>
                  setTotalShipments(props.shipmentsCount.totalShipments.today)
                }
              >
                Today
              </div>
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
              <div
                className="tab-item "
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.thisYear,
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.thisMonth,
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.thisWeek,
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item "
                onMouseLeave={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsSent(
                    props.shipmentsCount.totalShipmentsSent.today,
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
                    props.shipmentsCount.totalShipmentsReceived.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.thisYear,
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.thisMonth,
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.thisWeek,
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.total,
                  )
                }
                onMouseEnter={() =>
                  setTotalShipmentsReceived(
                    props.shipmentsCount.totalShipmentsReceived.today,
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
                    props.shipmentsCount.currentShipments.total,
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.thisYear,
                  )
                }
              >
                This Year
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.total,
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.thisMonth,
                  )
                }
              >
                This Month
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.total,
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.thisWeek,
                  )
                }
              >
                This Week
              </div>
              <div
                className="tab-item"
                onMouseLeave={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.total,
                  )
                }
                onMouseEnter={() =>
                  setCurrentShipmentTransit(
                    props.shipmentsCount.currentShipments.today,
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
    </div>
  );
};

export default Tiles;

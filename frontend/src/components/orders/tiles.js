import React, { useState, useEffect } from 'react';
import Sent from '../../assets/icons/TotalOrdersReceived.png';
import Received from '../../assets/icons/TotalOrdersSent.png';
import Rejected from '../../assets/icons/TotalOrdersRejected.png';
import Current from '../../assets/icons/TotalOrdersPending.png';
import './style.scss';

const Tiles = props => {
  return (
    <div className="row mb-4">
      <div className="col">
        <div onClick={() => props.setData('one')} className="panel cursorP">
          <div className="picture recived-bg">
            <img src={Received} alt="truck"/>
          </div>
          <div className="d-flex flex-column">
            <div className="title recived-text">Total Orders Sent</div>
            <div className="recived-text count">200</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div onClick={() => props.setData('two')} className="panel cursorP">
          <div className="picture sent-bg">
            <img src={Sent} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title sent-text ">Total Orders Received</div>
            <div className="sent-text count">1200</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div onClick={() => props.setData('one', true)} className="panel cursorP">
          <div className="picture inbound-alert-bg">
            <img src={Current} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title inbound-text">Total Orders Pending</div>
            <div className="inbound-text count">10</div>
          </div>
        </div>
      </div>
      <div className="col">
        <div onClick={() => props.setData('two', true)} className="panel cursorP">
          <div className="picture outbound-alert-bg">
            <img src={Rejected} alt="truck" />
          </div>
          <div className="d-flex flex-column">
            <div className="title outbound-text ">Total Orders Rejected</div>
            <div className="outbound-text count">30</div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Tiles;

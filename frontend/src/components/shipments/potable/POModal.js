import React, { useState } from 'react';
import greenTick from '../../../assets/icons/tickGreen.svg';
import crossRed from '../../../assets/icons/crossRed.svg';
import addIcon from '../../../assets/icons/add.svg';

const POModal = props => {
  const {
    purchaseOrder,
    userAddress,
    onAccept,
    onReject,
    onCreateShipment,
  } = props;
  const po = purchaseOrder;
  const receiverAddress = po.receiver;
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-between">
          <div className="input-group">
            <label className="reference">Purchase order ID:</label>
            <p className="font-weight-bold ml-2">{purchaseOrder.orderID}</p>
          </div>
          <div className="input-group">
            <label className="reference">Delivery To</label>
            <p className="font-weight-bold ml-2">{po.destination}</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="input-group">
            <label className="reference">Client</label>
            <p className="font-weight-bold ml-2">{po.client}</p>
          </div>
          <div className="input-group">
            <label className="reference">Delivery Location</label>
            <p className="font-weight-bold ml-2">{po.destination}</p>
          </div>
        </div>
        <div className="d-flex flex-column  align-self-center">
          <div className="input-group">
            <label className="reference">Date</label>
            <p className="font-weight-bold ml-2">{po.date}</p>
          </div>
        </div>
      </div>

      <table className="table poModalTable">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Product Name</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <div className="square-box" />
            </th>
            <td>{Object.keys(po.products[0])[0].split('-')[0]}</td>
            <td>{Object.keys(po.products[0])[0].split('-')[1]}</td>
            <td>{parseInt(po.products[0][Object.keys(po.products[0])])}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column">
          <span>Total Quantity</span>
          <h3>{parseInt(po.products[0][Object.keys(po.products[0])])}</h3>
        </div>
      </div>
      {purchaseOrder.status === 'Received' &&
        userAddress === receiverAddress && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-success fontSize20 font-bold"
              onClick={() => onAccept('Accepted')}
            >
              <img src={greenTick} width="14" height="14" className="mr-2" />
              <span>Accept</span>
            </button>
            <button
              className="btn btn-outline-danger fontSize20 font-bold ml-2"
              onClick={() => onReject('Rejected')}
            >
              <img src={crossRed} width="14" height="14" className="mr-2" />
              <span>Reject</span>
            </button>
          </div>
        )}
      {purchaseOrder.status === 'Accepted' &&
        userAddress === receiverAddress && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-yellow fontSize20 font-bold"
              onClick={onCreateShipment}
            >
              <img src={addIcon} width="14" height="14" className="mr-2" />
              <span>Create Shipment</span>
            </button>
          </div>
        )}
    </div>
  );
};

export default POModal;

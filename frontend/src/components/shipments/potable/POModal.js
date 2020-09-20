import React, { useState } from 'react';

const POModal = props => {
  const { purchaseOrder, userAddress, onAccept, onReject } = props;
  const po = JSON.parse(purchaseOrder.data);
  const receiverAddress = po.receiver.address;
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-between">
          <div className="input-group">
            <label className="reference">Delivery To</label>
            <p className="font-weight-bold ml-2">Some Name</p>
          </div>
          <div className="input-group">
            <label className="reference">Delivery To</label>
            <p className="font-weight-bold ml-2">Some Name</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="input-group">
            <label className="reference">Delivery To</label>
            <p className="font-weight-bold ml-2">Some Name</p>
          </div>
          <div className="input-group">
            <label className="reference">Delivery To</label>
            <p className="font-weight-bold ml-2">Some Name</p>
          </div>
        </div>
        <div className="d-flex flex-column  align-self-center">
          <div className="input-group">
            <label className="reference">Date To</label>
            <p className="font-weight-bold ml-2">12.06.1988</p>
          </div>
        </div>
      </div>

      <table className="table poModalTable">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row"><div className="square-box" /></th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row"><div className="square-box" /></th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column">
        <span>Total Quantity</span>
        <h3>$13,000.00</h3>
        </div>

      </div>
      {purchaseOrder.status === 'Received' &&
      userAddress === receiverAddress && (
          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-success fontSize20 font-bold"  onClick={() => onAccept('Accepted')}>
              <img src="/dist/b0fc7234dcb631b33836a799008216ca.svg" width="14" height="14" className="mr-2"/>
              <span>Accept</span>
            </button>
            <button className="btn btn-outline-danger fontSize20 font-bold ml-2" onClick={() => onReject('Rejected')}>
              <img src="/dist/b0fc7234dcb631b33836a799008216ca.svg" width="14" height="14" className="mr-2"/>
              <span>Reject</span>
            </button>
          </div>
        )}
      {purchaseOrder.status === 'Approved' &&
        userAddress === receiverAddress && (
        <div className="d-flex justify-content-end">
        <button className="btn btn-yellow fontSize20 font-bold">
          <img src="/dist/b0fc7234dcb631b33836a799008216ca.svg" width="14" height="14" className="mr-2"/>
          <span>Create Shipment</span>
        </button>
        </div>
        )}
    </div>
  );
};

export default POModal;

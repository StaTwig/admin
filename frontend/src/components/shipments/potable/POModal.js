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
  //const po = purchaseOrder;
  //const receiverAddress = po.receiver;
  return (
    <div className="PO">
      <div className="row">
        <div className="col">
          <div className="input-group">
            <label className="reference custom1">External PO ID: </label>
            <p >PO123409090<span class="badge badge-success ml-5">Success</span></p>
         
          </div>
          <div className="input-group text-primary font-weight-bold mb-2 ">Supplier Details: </div>
          <div className="input-group">
            <label className="reference custom2">Organisation ID : </label>
            <p>PR5678889676</p>
          </div>
          <div className="input-group">
            <label className="reference custom3">Organisation Name : </label>
            <p>Bharat Biotech</p>
          </div>
        </div>
        <div className="col">
          <div className="input-group text-primary font-weight-bold mb-3">Customer Details</div>
          <div className="input-group">
            <label className="reference custom2">Organisation ID : </label>
            <p>Org123</p>
          </div>
          <div className="input-group">
            <label className="reference custom3">Delivery Location ID : </label>
            <p>Location 123</p>
          </div>
          <div className="input-group">
            <label className="reference custom2">Delivery Location : </label>
            <p>ssssssss</p>
          </div>
        </div>
      </div>

      <table className="table poModalTable">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col" class="text-secondary">Product ID</th>
            <th scope="col " class="text-secondary">Product Name</th>
            <th scope="col" class="text-secondary">Manufacturer</th>
             <th scope="col" class="text-secondary">Quantity</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <div className="square-box" />
            </th>
            <td>sssssssssssssssssssssss</td>
            <td>sssssssssssssssssss</td>
            <td>ssssssssssssssssssssss</td>
            <td>sssssssss</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column mr-5">
          <span>Total Quantity</span>
          <h3>50000</h3>
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

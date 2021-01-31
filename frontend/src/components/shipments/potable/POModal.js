import React, { useState } from 'react';
import greenTick from '../../../assets/icons/tickGreen.svg';
import crossRed from '../../../assets/icons/crossRed.svg';
import addIcon from '../../../assets/icons/add.svg';

const POModal = props => {
  const {
    purchaseOrder,
  } = props;
  //const po = purchaseOrder;
  //const receiverAddress = po.receiver;
  let totalQuantity = 0;
  purchaseOrder.products.forEach(product => totalQuantity += parseInt(product.quantity));

  return (
    <div className="PO">
      <div className="row">
        <div className="col">
          <div className="input-group">
            <label className="reference custom1">External PO ID: </label>
            <p >{purchaseOrder.externalId}<span class="badge badge-success ml-5">Success</span></p>
         
          </div>
          <div className="input-group text-primary font-weight-bold mb-2 ">Supplier Details: </div>
          <div className="input-group">
            <label className="reference custom2">Organisation ID : </label>
            <p>{purchaseOrder.suppplierOrgID}</p>
          </div>
          <div className="input-group">
            <label className="reference custom3">Organisation Name : </label>
            <p>{purchaseOrder.supplierOrgName}</p>
          </div>
        </div>
        <div className="col">
          <div className="input-group text-primary font-weight-bold mb-3">Customer Details</div>
          <div className="input-group">
            <label className="reference custom2">Organisation ID : </label>
            <p>{purchaseOrder.customerOrgID}</p>
          </div>
          <div className="input-group">
            <label className="reference custom3">Delivery Location ID : </label>
            <p>{purchaseOrder.deliveryLocationId}</p>
          </div>
          <div className="input-group">
            <label className="reference custom2">Delivery Location : </label>
            <p>{purchaseOrder.deliveryLocation}</p>
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
        {purchaseOrder.products.map(product => <tr>
          <th scope="row">
            <div className="square-box" />
          </th>
          <td>{product.productID}</td>
          <td>{product.productName}</td>
          <td>{product.manufacturer}</td>
          <td>{product.quantity}</td>
        </tr>)}

        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column mr-5">
          <span>Total Quantity</span>
          <h3>{totalQuantity}</h3>
        </div>
      </div>
    </div>
  );
};

export default POModal;

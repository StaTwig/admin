import React, { useState } from 'react';
import './style.scss';

const PurchasePopUp  = props => {
  let totalQuantity = 0;
 props.shipments.poDetails[0].products.forEach(product => totalQuantity += parseInt(product.productQuantity));
  return (
    <div className="PO">
      <p className="date-alignment mr-5">Date:{props.shipments.poDetails[0].creationDate.split('T')[0].split('-')[2]+"/"+props.shipments.poDetails[0].creationDate.split('T')[0].split('-')[1]+"/"+props.shipments.poDetails[0].creationDate.split('T')[0].split('-')[0]}</p>
      <div className="row">
        <div className="col">
          <div className="input-group">
            <label className="reference custom1">External PO ID: </label>
            <p >{props.shipments.poDetails[0].externalId}<span class="badge badge-success ml-5">Success</span></p>
         
          </div>
          <div className="input-group text-primary font-weight-bold mb-2 ">Supplier Details: </div>
          <div className="input-group">
            <label className="reference custom2">Organisation ID : </label>
            <p>{props.shipments.supplierOrgId}</p>
          </div>
          <div className="input-group">
            <label className="reference custom3">Organisation Name : </label>
            <p>{props.shipments.supplierOrgName}</p>
          </div>
        </div>
        <div className="col">
          <div className="input-group text-primary font-weight-bold mb-3">Customer Details</div>
          <div className="input-group">
            <label className="reference custom2">Organisation ID : </label>
            <p>{props.shipments.customerOrgId}</p>
          </div>
          <div className="input-group">
            <label className="reference custom3">Delivery Location ID : </label>
            <p>{props.shipments.poDetails[0].customer.shippingAddress.shippingAddressId}</p>
          </div>
          <div className="input-group">
            <label className="reference custom4">Delivery Location : </label>
            <p>{props.shipments.toLocation}</p>
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
          {props.shipments.poDetails[0].products.map(product => <tr>
          <th scope="row">
            <div className="square-box" />
          </th>
          <td>{product.productId}</td>
          <td></td>
          <td></td>
          <td>{product.productQuantity}</td>
        </tr>)}

        </tbody>
      </table>
      <hr />
      <div className="d-flex  justify-content-end">
        <div className="d-flex flex-column mr-5 mt-3">
          <span>Total Quantity</span>
          <h3 className="text-info">{totalQuantity}</h3>
        </div>
      </div>

    </div>
  );
};

export default PurchasePopUp ;


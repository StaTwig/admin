import React, { useState } from 'react';
import Modal from '../../../shared/modal';
import greenTick from '../../../assets/icons/tickGreen.svg';
import crossRed from '../../../assets/icons/crossRed.svg';
import addIcon from '../../../assets/icons/add.svg';
import Order from '../../../assets/icons/order.svg';
import CreateShippingOrder from  '../createShippingOrder';
import './style.scss';

const POModal = props => {
 const[showCreateShippingOrder,setShowCreateShippingOrder]=useState(false);
  const {
    purchaseOrder,
  } = props;
  let totalQuantity = 0;
  purchaseOrder.products.forEach(product => totalQuantity += parseInt(product.productQuantity));

  const month = new Date().getMonth() + 1;
  const todayDate =
    new Date().getDate() + '/' + month + '/' + new Date().getFullYear();

    const closeModal = ()=>{
      setShowCreateShippingOrder(false)
    }

    const onOpen = () => {

      setShowCreateShippingOrder(true)
      
   
    }
  return (
    <div className="PO">
      <p className="date-alignment mr-5">Date: {todayDate}</p>
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
            <label className="reference custom4">Delivery Location : </label>
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
          <td>{product.productQuantity}</td>
        </tr>)}

        </tbody>
      </table>
      <hr />
      {showCreateShippingOrder && (
          <Modal
          close={() => closeModal()}
          title=" Create Shipping Order"
          size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <CreateShippingOrder {...props} />
        </Modal>
      )}
      <div className="d-flex  justify-content-end">
        <div className="d-flex flex-column mr-5 mt-3">
          <span>Total Quantity</span>
          <h3 className="text-info">{totalQuantity}</h3>
        </div>
      </div>
      <button
        className="btn btn-orange fontSize20 font-bold mr-2  mt-3 float-right"  onClick={onOpen}>
        <img src={Order} width="14" height="14" className="mr-2" />
        <span>Create Shipping Order</span>
      </button>

    </div>
  );
};

export default POModal;


import React from 'react';
import Order from '../../../assets/icons/order.svg';
import {
  Link
} from "react-router-dom";
import './style.scss';


const ViewShippingModal = (props) => {
  const {
    singleShippingOrder,
  } = props;

  let totalQuantity = 0;
  singleShippingOrder.products.forEach(product => totalQuantity += parseInt(product.productQuantity));
  const month = new Date().getMonth() + 1;
  const todayDate =
  new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
    return(
        <div className="PO">
        <p className="date-alignment mr-5">Date: {todayDate}</p>
        <div className="d-flex flex-row ml-4 mb-5">
            <div className="input-group">
              <label className="reference mr-3">Warehouse ID: </label>
              <div>{singleShippingOrder.soAssignedTo.warehouseId}</div>
            </div>
            <div className="input-group">
              <label className="reference mr-3">Warehouse Location: </label>
                <div>{singleShippingOrder.soAssignedTo.warehouseLocation}</div>
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
        {singleShippingOrder.products.map(product => <tr>
            <th scope="row">
              <div className="square-box" />
            </th>
            <td>{product.productID}</td>
          <td>{product.productName}</td>
          <td>{product.manufacturer}</td>
          <td>{product.productQuantity}</td>
     
          </tr>
        )}
        </tbody>
      </table>
      <hr />
      <div className="d-flex justify-content-end">
        <div className="d-flex flex-column mr-5">
          <span>Total Quantity</span>
          <h3 className="text-info">{totalQuantity}</h3>
        </div>
      </div>
      <Link to={`/newshipment?shippingId=${singleShippingOrder.id}`}>
      <button
        className="btn btn-orange fontSize20 font-bold mr-2  mt-3 float-right">
        <img src={Order} width="14" height="14" className="mr-2" />
        <span>Create Shipment</span>
      </button>
      </Link>
            </div>

    );
}

export default ViewShippingModal;
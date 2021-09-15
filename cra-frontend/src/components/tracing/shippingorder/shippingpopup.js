import React from "react";
import "./style.scss";

const ViewShippingModal = (props) => {
  let totalQuantity = 0;
  props.shipments.shippingOrderDetails[0].products.forEach(
    (product) => (totalQuantity += parseInt(product.productQuantity))
  );
  return (
    <div className='PO'>
      <p className='date-alignment mr-5'>
        Date:
        {props.shipments.shippingOrderDetails[0].createdAt
          .split("T")[0]
          .split("-")[2] +
          "/" +
          props.shipments.shippingOrderDetails[0].createdAt
            .split("T")[0]
            .split("-")[1] +
          "/" +
          props.shipments.shippingOrderDetails[0].createdAt
            .split("T")[0]
            .split("-")[0]}
      </p>
      <div className='d-flex flex-row ml-4 mb-5'>
        <div className='input-group'>
          <label className='reference mr-3'>Warehouse ID: </label>
          <div>
            {props.shipments.shippingOrderDetails[0].soAssignedTo.warehouseId}
          </div>
        </div>
        <div className='input-group'>
          <label className='reference mr-3'>Warehouse Location: </label>
          <div>
            {
              props.shipments.shippingOrderDetails[0].soAssignedTo
                .warehouseLocation
            }
          </div>
        </div>
      </div>
      <table className='table poModalTable'>
        <thead>
          <tr>
            <th scope='col' />
            <th scope='col' class='text-secondary'>
              Product ID
            </th>
            <th scope='col ' class='text-secondary'>
              Product Name
            </th>
            <th scope='col' class='text-secondary'>
              Manufacturer
            </th>
            <th scope='col' class='text-secondary'>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {props.shipments.shippingOrderDetails[0].products.map((product) => (
            <tr>
              <th scope='row'>
                <div className='square-box' />
              </th>
              <td>{product.productID}</td>
              <td>{product.productName}</td>
              <td>{product.manufacturer}</td>
              <td>{product.productQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className='d-flex justify-content-end'>
        <div className='d-flex flex-column mr-5'>
          <span>Total Quantity</span>
          <h3 className='text-info'>{totalQuantity}</h3>
        </div>
      </div>
    </div>
  );
};

export default ViewShippingModal;

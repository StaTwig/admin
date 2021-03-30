
import React from 'react';
import { Link } from 'react-router-dom';
import location from '../../assets/icons/CurrentLocationWhite.svg';
import './style.scss';
import { formatDate } from '../../utils/dateHelper';

const ViewOrder = props => {
  const { order, id } = props;

  let statusStyle = 'bg-primary';
  let status = order.poStatus;
  if (order.poStatus === 'RECEIVED') {
    statusStyle = 'bg-success';
    status = 'Delivered';
  }

  return (
    <div className="vieworder text-muted">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">VIEW ORDER</h1>
        <div className="d-flex">
          <Link to={`/orders`}>
           <button className="btn btn-outline-primary mr-2" >Back to orders</button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <div className="row bg-white shadow  p-3 m-3">
          <div className="col row pl-4">
            <span className="col">Order ID</span>
            <div className="col">
              <span className="text-dark">{order.id}</span>
              <span className={`ml-2 p-1 status pl-2 plr-2 rounded text-white secondary-bg ${statusStyle}`}>
                {status}
                </span>
              </div>
          </div>
          <div className="col row pl-4">
            <span className="col">Order Date</span>
            <span className="col text-dark">{formatDate(order.creationDate)}</span>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary">Order From</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col">Organisation Name: </span>
                  <span className="col text-dark">{order.supplier?.organisation?.name}</span>
                </div>
                <div className="col row">
                  <span className="col">Organisation ID: </span>
                  <span className="col text-dark">{order.supplier?.organisation?.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary">Order To</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col">Organisation Name</span>
                  <span className="col text-dark">{order.customer?.organisation?.name}</span>
                </div>
                <div className="col row">
                  <span className="col">Organisation ID</span>
                  <span className="col text-dark">{order.customer?.organisation?.id}</span>
                </div>
                <div class="w-100"></div>
                <div className="col row col-6 mt-2">
                  <span className="col">Delivery Location</span>
                  <span className="col ml-4 text-dark">{order.warehouse?.warehouseAddress?.city+', '+order.warehouse?.warehouseAddress?.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-3 m-3">
          <span className="p-1 text-info">Product details</span>
          <div className="row">
            {order?.products?.map((product, index) => 
            <div className={`bg-white shadow ${index > 0 ? 'ml-4' : ''}  p-3`}>
              <span className="p-1 font-weight-normal text-primary">{product.name}</span>
              <div className="row  p-1">
                <span className="col">Product ID</span>
                <span className="col text-dark">{product.productId}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Product Category</span>
                <span className="col text-dark">{product?.category}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Manufacturer</span>
                <span className="col text-dark">{product.manufacturer}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Quantity</span>
                <span className="col text-dark">{product.quantity}</span>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

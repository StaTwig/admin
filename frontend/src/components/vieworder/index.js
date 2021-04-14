import React,{  useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/icons/back.png';
import './style.scss';
import { formatDate } from '../../utils/dateHelper';
import {changePOStatus} from '../../actions/poActions';

const ViewOrder = props => {
  const { order, id } = props;
 const [alertMessage, setAlertMessage] = useState({});
  let statusStyle = 'bg-primary';
  let status = order.poStatus;
  if (order.poStatus === 'RECEIVED') {
    statusStyle = 'bg-info';
    status = 'Delivered';
  }
else if (order.poStatus === 'Accepted') {
    statusStyle = 'bg-success';
    status = 'Accepted';
  }else if (order.poStatus === 'Rejected') {
    statusStyle = 'bg-warning';
  }


const onPOStatusChange = async status => {
    const data = { status, orderID: order.id };
    const result = await changePOStatus(data);
    if (result.status === 200) {
      setAlertMessage('Success');
 
} else {
      setAlertMessage('Fail');
    }
  };

  return (
    <div className="vieworder text-muted">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">VIEW ORDER</h1>

{order.poStatus === 'RECEIVED' ? (
  <div className="d-flex">
<Link to={`/orders`}>
 <button className="btn btn-success fontSize20 font-bold mr-4" onClick={() => onPOStatusChange('Accepted')} >Accept Order</button></Link>
<Link to={`/orders`}>
 <button className="btn btn-orange fontSize20 font-bold mr-4"  onClick={() => onPOStatusChange('Rejected')} >Reject Order</button></Link>
<Link to={`/orders`}>
            <button className="btn btn-outline-primary mr-2" ><img src={back} height="17" className="mr-2 mb-1" />Back to Orders</button>
          </Link>
        </div>):(<div className="d-flex">
          <Link to={`/orders`}>
            <button className="btn btn-outline-primary mr-2" ><img src={back} height="17" className="mr-2 mb-1" />Back to Orders</button>
          </Link>
        </div>)}
      </div>
      <div className="mt-4">
        <div className="row bg-white shadow  p-3 m-3">
          <div className="col row pl-4">
            <span className="col-4">Order ID:</span>
            <div className="col">
              <span className="text-dark font-weight-bold">{order.id}</span>
              <span className={`ml-2 p-1 status pl-2 plr-2 rounded text-white secondary-bg ${statusStyle}`}>
                {status}
                </span>
              </div>
          </div>
          <div className="col row pl-4">
            <span className="col-4">Order Date:</span>
            <span className="col text-dark font-weight-bold">{formatDate(order.creationDate)}</span>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary font-weight-bold">Order From</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className="col text-dark font-weight-bold">{order.supplier?.organisation?.name}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className="col font-weight-bold text-dark">{order.supplier?.organisation?.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary font-weight-bold">Order To</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className="col text-dark font-weight-bold">{order.customer?.organisation?.name}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className="col text-dark font-weight-bold">{order.customer?.organisation?.id}</span>
                </div>
                <div class="w-100"></div>
                <div className="col row col-6 mt-2">
                  <span className="col-4">Delivery Location:</span>
                  <span className="col ml-2 text-dark font-weight-bold">{order.warehouse?.warehouseAddress?.city+', '+order.warehouse?.warehouseAddress?.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-3 m-3">
          <span className="p-1 text-info font-weight-bold">Product Details</span>
          <div className="row mt-3">
            {order?.products?.map((product, index) =>
            <div className={`bg-white shadow ${index > 0 ? 'ml-4' : ''}  p-3`}>
              <span className="p-1 font-weight-normal text-primary font-weight-bold">{product.name}</span>
              <div className="row  p-1">
                <span className="col">Product ID:</span>
                <span className="col text-dark font-weight-bold">{product.productId}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Product Category:</span>
                <span className="col text-dark font-weight-bold">{product?.category}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Manufacturer:</span>
                <span className="col text-dark font-weight-bold">{product.manufacturer}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Quantity:</span>
                <span className="col text-dark font-weight-bold">{product.quantity}</span>
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

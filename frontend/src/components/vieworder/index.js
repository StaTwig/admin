import React,{  useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/icons/back.png';
import { useSelector } from "react-redux";
import './style.scss';
import { formatDate } from '../../utils/dateHelper';
import {changePOStatus} from '../../actions/poActions';

const ViewOrder = props => {
  const { order, id } = props;
  const [alertMessage, setAlertMessage] = useState({});
  const user = useSelector((state) => {
    return state.user;
  });
  let statusStyle = 'bg-info';
  let status = order.poStatus;
  if  (order?.supplier?.supplierOrganisation === user?.organisationId && order.poStatus === 'CREATED'){
    statusStyle = 'bg-info';
    status = 'Received'
}
else if (order?.customer?.customerOrganisation && order.poStatus === 'CREATED'){
    statusStyle = 'bg-primary';
    status = 'Sent';
  }

else if (order.poStatus === 'ACCEPTED') {
    statusStyle = 'bg-success';
    status = 'Accepted';
  }else if (order.poStatus === 'REJECTED') {
    statusStyle = 'bg-warning';
    status = 'Rejected';
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

{order?.supplier?.supplierOrganisation === user?.organisationId && order.poStatus === 'CREATED' ? (
  <div className="d-flex">
<Link to={`/orders`}>
 <button className="btn btn-success fontSize20 font-bold mr-4 mt-2" onClick={() => onPOStatusChange('ACCEPTED')} >Accept Order</button></Link>
<Link to={`/orders`}>
 <button className="btn btn-orange fontSize20 font-bold mr-4 mt-2"  onClick={() => onPOStatusChange('REJECTED')} >Reject Order</button></Link>
<Link to={`/orders`}>
            <button className="btn btn-outline-primary mt-2" ><img src={back} height="17" className="mr-2 mb-1" />Back to Orders</button>
          </Link>
        </div>):(<div className="d-flex">
          <Link to={`/orders`}>
            <button className="btn btn-outline-primary mt-2" ><img src={back} height="17" className="mr-2 mb-1" />Back to Orders</button>
          </Link>
        </div>)}
      </div>
      <div className="mt-5">
        <div className="row bg-white shadow  p-3" style={{position:"relative", marginTop:"-40px"}}>
          <div className="col row">
            <span className="col-4 ml-2">Order ID:</span>
            <div className="col">
              <span className= " text-dark "> {order.id} </span>
              <span className={`ml-3 p-2 status rounded text-white secondary-bg ${statusStyle}`}>
                {status}
                </span>
              </div>
          </div>
          <div className="col row">
            <span className="col-4">Order Date:</span>
            <span className= "col text-dark ">{formatDate(order.creationDate)}</span>
          </div>
        </div>
        <div className="row bg-white shadow mt-4 p-3">
          <div className="col-12">
            <span className=" p-1 text-primary " >Order From</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className= " col text-dark "> {order.supplier?.organisation?.name}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className= " col  text-dark " >{order.supplier?.organisation?.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white shadow p-3 mt-4">
          <div className="col-12">
            <span className= " p-1 text-primary ">Order To</span>
            <div>
              <div className="row p-1">
                <div className="col row">
                  <span className="col-4">Organisation Name: </span>
                  <span className= " col text-dark ">{order.customer?.organisation?.name}</span>
                </div>
                <div className="col row">
                  <span className="col-4">Organisation ID: </span>
                  <span className= " col text-dark ">{order.customer?.organisation?.id}</span>
                </div>
                <div class="w-100"></div>
                <div className="col row col-6 mt-3">      
                  <span className="col-4">Delivery Location:</span>
                  <span className= " col ml-2 text-dark ">{order && order.customer&& order.customer.warehouse && order.customer.warehouse.warehouseAddress ? order.customer.warehouse.title+ " / "+ order.customer.warehouse.warehouseAddress.firstLine + " "+order.customer.warehouse.warehouseAddress.city: null}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-3 ml-5 mt-5">
          <span className="p-1 text-info font-weight-bold">Product Details</span>
          <div className="row mt-3">
            {order?.products?.map((product, index) =>
            <div className={`bg-white shadow ${index > 0 ? 'ml-5' : ''}  p-3`}>
              <span className= " p-1 font-weight-normal text-primary ">{product.name}</span>
              <div className="row  p-1">
                <span className="col">Product ID:</span>
                <span className= " col text-dark ">{product.productId}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Product Category:</span>
                <span className= " col text-dark ">{product?.type}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Manufacturer:</span>
                <span className= " col text-dark ">{product.manufacturer}</span>
              </div>
              <div className="row  p-1">
                <span className="col">Quantity:</span>
                <span className= " col text-dark ">{product.quantity}</span>
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

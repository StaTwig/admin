
import React from 'react';
import { Link } from 'react-router-dom';
import location from '../../assets/icons/CurrentLocationWhite.svg';
import './style.scss';

const ViewOrder = props => {
  const { shipment, id } = props;

  let statusStyle = 'bg-primary';
  let status = 'Received';
  if (shipment?.status === 'RECEIVED') {
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
              <span className="text-dark">BPMLJJGDHD67891</span>
              <span className={`ml-2 p-1 status pl-2 plr-2 rounded text-white secondary-bg ${statusStyle}`}>
                {status}
                </span>
              </div>
          </div>
          <div className="col row pl-4">
            <span className="col">Order Date</span>
            <span className="col text-dark">01/01/2021</span>
          </div>
        </div>
        <div className="row bg-white shadow p-3 m-3">
          <div className=" pl-4 col-12">
            <span className="p-1 text-primary">Order From</span>
            <div>
              <div className=" row p-1">
                <div className="col row">
                  <span className="col">Organisation Name: </span>
                  <span className="col text-dark">Bharat Bioteh</span>
                </div>
                <div className="col row">
                  <span className="col">Organisation ID: </span>
                  <span className="col text-dark">BBT0001</span>
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
                  <span className="col text-dark">Apollo Pvt. Ltd</span>
                </div>
                <div className="col row">
                  <span className="col">Organisation ID</span>
                  <span className="col text-dark">APPP0001</span>
                </div>
                <div class="w-100"></div>
                <div className="col row col-6 mt-2">
                  <span className="col">Delivery Location</span>
                  <span className="col ml-4 text-dark">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-3 m-3">
          <span className="p-1 text-info">Product details</span>
          <div className="row">
            <div className={`bg-white shadow  p-3`}>
              <span className="p-1 font-weight-normal text-primary">OPV111</span>
              
              <div className="row  p-1">
                <span className="col">Manufacturer</span>
                <span className="col text-dark">Bharat Biotech</span>
              </div>
              <div className="row  p-1">
                <span className="col">Quantity</span>
                <span className="col text-dark">Bharat Biotech</span>
              </div>
              <div className="row  p-1">
                <span className="col">Label ID</span>
                <span className="col text-dark">LBLnbdfnbfnb12334</span>
              </div>
            </div>
            <div className={`bg-white shadow ml-4  p-3`}>
              <span className="p-1 font-weight-normal text-primary">OPV111</span>
              
              <div className="row  p-1">
                <span className="col">Product ID</span>
                <span className="col text-dark">Bharat Biotech</span>
              </div>
              <div className="row  p-1">
                <span className="col">Product Category</span>
                <span className="col text-dark">Bharat Biotech</span>
              </div>
              <div className="row  p-1">
                <span className="col">Manufacturer</span>
                <span className="col text-dark">Bharat Biotech</span>
              </div>
              <div className="row  p-1">
                <span className="col">Quantity</span>
                <span className="col text-dark">Bharat Biotech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

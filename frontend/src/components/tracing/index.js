import React from "react";
import 'typeface-roboto';
import searchingIcon from "../../assets/icons/searching@2x.png";
import Filter from '../../assets/icons/Filter.svg';
import downarrow from "../../assets/icons/drop-down.svg";
import './style.scss';


const Tracing = () => {
  return (
    <div className="tracing">
    <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div>
              <img src={Filter} width='16' height='16' className="mr-2" />
              <span> All Filter</span>
            </div>
            <img src={downarrow} width='14' height='14' />
            <img src={searchingIcon} alt="searching" />
          </button>
        </div>
      </div>
      <div className="row">
      <div className="col-sm-4 d-flex flex-column col-sm-4">
      <h5 >Shipment Details</h5>
      <div className="panel d-flex justify-content-between">
      <ul>
    <li>Transaction ID</li>
    <li>Shipment ID</li>
    <li>Client Name</li>
    <li>Total Quantity</li>
  </ul>      
    <ul>
    <li>yfhashvbsdyvyvyrbrv</li>
    <li>SHI989735GH</li>
    <li >UNICEF</li>
    <li>60,000</li>
  </ul>   
                        </div>
                        <h5>Product List</h5>
                        <div className="panel d-flex">
                              
                        </div>
      
      </div>
      <div className="col-sm-8">
      <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
      <div className="panel"></div>
      <div className="panel "></div>
      </div>
      <h3>Geographical Tracking/ Chain of Custody</h3>
      <div className="panel "></div>

      </div>
      
      </div>

        
        
      </div>
      </div >
  );
};

export default Tracing;


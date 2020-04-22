import React from "react";
import searchingIcon from "../../assets/icons/searching@2x.png";
import Filter from '../../assets/icons/Filter.svg';
import updownarrow from "../../assets/icons/up-and-down-white.svg";
import OPV from "../../assets/icons/OPV.svg";
import MMR from "../../assets/icons/MMR.svg";
import HiB from "../../assets/icons/HiB.svg";
import HepB from "../../assets/icons/HepB.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import CurrentTemperature from "../../assets/icons/CurrentTemperature.png";
import Chart from "./temperature";
import Map from './map';

import './style.scss';


const Tracing = () => {
  return (
    <div className="tracing">
     <div className="d-flex justify-content-between mb-3">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div className="allfilterbtn">
              <img src={Filter} />
              <span> All Filter</span>
              <img src={updownarrow} />
            </div>
          </button>
          <img src={searchingIcon} alt="searching" className="search-icon" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 d-flex flex-column col-sm-4">
          <h5 className="head">Shipment Details</h5>
          <div className="panel d-flex justify-content-between mb-3">
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
          <h5 className="head">Product List</h5>

          <div className="panel d-flex flex-column">
            <div className="d-flex justify-content-between">
              <h4><img src={OPV} width='30' height='30' className="mr-2" />OPV</h4> <div>Quantity:20,000</div>
            </div>
            <div className="row">
              <div className="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div className="row">
              <div className="col">Mfg Date : 06/2019</div>
              <div className="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={MMR} width='30' height='30' className="mr-2" />MMR</h4> <div>Quantity:20,000</div>
            </div>
            <div className="row">
              <div className="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div className="row">
              <div className="col">Mfg Date : 06/2019</div>
              <div className="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={HiB} width='30' height='30' className="mr-2" />HiB</h4> <div>Quantity:20,000</div>
            </div>
            <div className="row">
              <div className="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div className="row">
              <div className="col">Mfg Date : 06/2019</div>
              <div className="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" /> 
            <div className="d-flex justify-content-between">
              <h4><img src={HepB} width='30' height='30' className="mr-2" />Hep B</h4> <div>Quantity:20,000</div>
            </div>
            <div className="row">
              <div className="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div className="row">
              <div className="col">Mfg Date : 06/2019</div>
              <div className="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={OPV} width='30' height='30' className="mr-2" />OPV</h4> <div>Quantity:20,000</div>
            </div>
            <div className="row">
              <div className="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div className="row">
              <div className="col">Mfg Date : 06/2019</div>
              <div className="col">Exp Date : 01/2023</div>
            </div>



          </div>

        </div>
        <div className="col-sm-8">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="panel col"><h3 className="head">Geographical Tracking</h3><Map /></div>
              <div className="panel">
              <div className="d-flex justify-content-between">
              <div class = "row">

              <img src={CurrentTemperature} width='20' height='20' className="mr-2" />
              
              <div className="d-flex flex-column">

              <div className="info">Current temperature</div>
              <div className="info">3°C</div>
              </div>
              
              </div>
                 
              <div className="d-flex flex-column">

              <div className="info">Last Upadated on</div>
              <div className="info">07:00 am</div>
              </div>
              
              </div>
              <Chart />
         </div>
            </div>
            <h5 className="head mt-3">Chain of Custody</h5>
            <div className="panel ">
              <div className="d-flex flex-row">
                 <ul className="mr-3">
                   <li> <div className="picture transit-bg">
                                          <img src={currentinventory} alt="truck" />
                                    </div> </li>
                                     <li className="my-3 ml-3"><div className="picture symbol-bg "></div></li>
                                    <li className="my-3 ml-3"><div className="picture symbol-bg"> </div></li>
                                    <li className="my-3 ml-3"><div className="picture symbol-bg"> </div></li>  
                                    <li className="my-3 ml-3"><div className="picture last-bg"> </div></li>   
                   </ul>
                   <ul className="mr-5">
                   <li className="col"> <div>Shipment Number</div>
                   <div>AGHJKJSG78999</div> </li>
                   <li className="col"> <div>Hyderabad,India</div>
                   <div>12/12/2019</div> </li>
                   <li className="col"> <div>Hyderabad Airport</div>
                   <div>01/02/2020</div> </li>
                   <li > Kenya Airport</li>
                   <li > UNICEF Kenya</li>
                  </ul>
                   <ul>
                   <li className="col"> <div>Added to inventory</div>
                   <div>Wallet Address:</div> </li>
                   <li>Delivered</li>
                   <li > In Transit</li>
                   <li >Pending Delivered</li>
                   
                   </ul>


              </div>

            </div>

          </div>

        </div>



      </div>
    </div >
  );
};

export default Tracing;


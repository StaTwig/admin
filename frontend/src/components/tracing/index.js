import React from "react";
import 'typeface-roboto';
import searchingIcon from "../../assets/icons/searching@2x.png";
import Filter from '../../assets/icons/Filter.svg';
import updownarrow from "../../assets/icons/up-and-down-white.svg";
//import Chart from '../temperaturegraph'
import OPV from "../../assets/icons/OPV.svg";
import MMR from "../../assets/icons/MMR.svg";
import HiB from "../../assets/icons/HiB.svg";
import HepB from "../../assets/icons/HepB.svg";
import CurrentTemperature from "../../assets/icons/CurrentTemperature.png";
import { LineChart } from 'react-chartkick';
import 'chart.js';
import './style.scss';


const Tracing = () => {
  return (
    <div className="tracing">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="search-form">
          <input type="text" className="form-control search-field" />
          <button className="btn btn-main-blue fontSize20 font-bold floated">
            <div className="flex-basis-80">
              <img src={Filter} width='16' height='16' className="mr-2" />
              <span> All Filter</span>
            </div>
            <img src={updownarrow} width='14' height='14' />
          </button>
          <img src={searchingIcon} alt="searching" className="search-icon" />
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

          <div className="panel d-flex flex-column">
            <div className="d-flex justify-content-between">
              <h4><img src={OPV} width='30' height='30' className="mr-2" />OPV</h4> <div>Quantity:20,000</div>
            </div>
            <div class="row">
              <div class="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div class="row">
              <div class="col">Mfg Date : 06/2019</div>
              <div class="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={MMR} width='30' height='30' className="mr-2" />MMR</h4> <div>Quantity:20,000</div>
            </div>
            <div class="row">
              <div class="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div class="row">
              <div class="col">Mfg Date : 06/2019</div>
              <div class="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={HiB} width='30' height='30' className="mr-2" />HiB</h4> <div>Quantity:20,000</div>
            </div>
            <div class="row">
              <div class="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div class="row">
              <div class="col">Mfg Date : 06/2019</div>
              <div class="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={HepB} width='30' height='30' className="mr-2" />Hep B</h4> <div>Quantity:20,000</div>
            </div>
            <div class="row">
              <div class="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div class="row">
              <div class="col">Mfg Date : 06/2019</div>
              <div class="col">Exp Date : 01/2023</div>
            </div>

            <span className="divider" />
            <div className="d-flex justify-content-between">
              <h4><img src={OPV} width='30' height='30' className="mr-2" />OPV</h4> <div>Quantity:20,000</div>
            </div>
            <div class="row">
              <div class="col">Manufacturer : ABC Pharma Ltd .</div>
            </div>
            <div class="row">
              <div class="col">Mfg Date : 06/2019</div>
              <div class="col">Exp Date : 01/2023</div>
            </div>



          </div>

        </div>
        <div className="col-sm-8">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="panel"></div>
              <div className="panel ">
              <div className="d-flex justify-content-between">
              <div class = "row">

              <img src={CurrentTemperature} width='30' height='30' className="mr-2" />
              
              <div className="d-flex flex-column">

              <div>Current temperature</div>
              <div>3°C</div>
              </div>
              
              </div>
                 
              <div className="d-flex flex-column">

              <div>Last Upadated on</div>
              <div>07:00 am</div>
              </div>
              
              </div>
              < LineChart ymin="-10" ymax="10" min={-5} max={10}  colors={["#FA7923", "#666"]} 
          data={{"1:00": 2, "2:00": 5,  "3:00": 3 , "4:00": 4, "5:00": 3, "6:00": 5, "7:00": 3, "8:00": 4, "9:00": 3}} />
    </div>
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


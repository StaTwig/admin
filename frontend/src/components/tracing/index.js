import React, { useState } from 'react';
import returnPo from '../../assets/icons/returnPo.svg';
import returnShipment from '../../assets/icons/returnShipment.svg';
import updownarrow from '../../assets/icons/up-and-down-white.svg';
import currentinventory from '../../assets/icons/CurrentInventory.svg';
import CurrentTemperature from '../../assets/icons/CurrentTemperature.png';
import traceDrop from '../../assets/icons/traceDrop.png';
import Chart from './temperature';
import Map from './map';
import Serial from './serial';
import './style.scss';

const Tracing = props => {
  const[menu,setMenu]=useState(false);
  const[chain,setChain]=useState(false);
  return (
    <div className="tracing">
      <div className="row justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
        <div className="row">
        <button className="btn btn-orange fontSize20 font-bold mr-5" >
            <img src={returnPo} width="14" height="14" className="mr-2" />
            <span className="chain">Return Order</span>
          </button>
          <button className="btn btn-main-blue fontSize20 font-bold ">
            <img src={returnShipment} width="14" height="14" className="mr-2" />
            <span className="chain">Receive Shipment</span>
          </button>
         </div>
       </div>
       <div className ="row">
        <div className="col-sm-4">
        <h6 className="heading mb-3">SHIPMENT DETAILS</h6>
        <div className="row panel justify-content-between">
          <ul >
            <li>Shipment ID</li>
            <li>Unicef PO ID</li>
            <li>Shipped From</li>
            <li>Shipped To</li>
            <li>Shipment Date</li>
            <li>Shipment Time</li>
            <li>Quantity</li>
            <li>Vendor ID</li>
            <li>Vendor Name</li>
            <li>Transaction ID</li>
            </ul>
            <ul className="bold">
            <li>SHP12345</li>
            <li>456789</li>
            <li>Mumbai</li>
            <li>Zurich Office</li>
            <li>20/12/2021</li>
            <li>12:45</li>
            <li>950000</li>
            <li>19000000</li>
            <li>Serium Institute of Aura</li>
            <li>7hg578898ff565677</li>
            </ul>
            <div className="font-weight-bold">
                <span className="badge badge-pill badge-warning">
                   In Transit
                </span>
              </div>
        </div>
        <h6 className="heading mt-3 mb-3">PURCHASE ORDER DETAILS</h6>
        <div className="row panel justify-content-between">
          <ul >
            <li>Unicef PO ID</li>
            <li>Vendor Name</li>
            <li>Time</li>
           {menu== true ? <li>Po Item#</li> : null}
           {menu== true ? <li>Vendor ID</li> : null}
           {menu== true ? <li>Shipped From</li> : null}
           {menu== true ? <li>To Location ID</li> : null}
           {menu== true ? <li>To Location</li> : null}
           {menu== true ? <li>Material ID</li> : null}
           {menu== true ? <li>Product Name</li> : null}
           {menu== true ? <li>Quantity</li> : null}

           </ul>
           <ul className="bold">
            <li>456789</li>
            <li>Serium Institute of Aura</li>
            <li>12:45</li>
            {menu== true ? <li>Po Item#</li> : null}
           {menu== true ? <li>Vendor ID</li> : null}
           {menu== true ? <li>Shipped From</li> : null}
           {menu== true ? <li>To Location ID</li> : null}
           {menu== true ? <li>To Location</li> : null}
           {menu== true ? <li>Material ID</li> : null}
           {menu== true ? <li>Product Name</li> : null}
           {menu== true ? <li>Quantity</li> : null}
           </ul>
           <div></div>
          </div>
          <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setMenu(!menu)} /></div>
         
     <h6 className="heading mt-3 mb-3">PRODUCT LIST</h6> 
     <div className="row panel justify-content-between">
            <ul >
            <li>Material ID</li>
            <li>Product Name</li>
            <li>Quantity</li>
            <li>Mfg Date</li>
            <li>Exp Date</li>
            <li>Batch No</li>
            <li>Optimum Temp</li>
            <li>Serial No</li>
           </ul>
           <ul className="bold">
            <li>456789</li>
            <li>Serium Institute of Aura</li>
            <li>124500</li>
            <li>12/5/2020</li>
            <li>12/8/2020</li>
            <li>124500</li>
            <li>12F-19F</li>
            <li>788655447989</li>
           </ul>
           <div></div>
           </div>
        </div>
           <div className="col-sm-8">
            <div className="row ml-1 mb-4">
            <div className="panel col mr-1 geo"><p className="heading">Geographical Tracking</p> <Map/> </div> 
           <div className="panel col">
           <div className="d-flex justify-content-between">
                  <div class="row ml-3">
                    <img
                      src={CurrentTemperature}
                      width="20"
                      height="20"
                      className="mr-2"
                    />

                    <div className="d-flex flex-column">
                      <div className="info">Current temperature</div>
                      <div className="info">3°C</div>
                    </div>
                  </div>

                  <div className="d-flex flex-column">
                    <div className="info">Last Upadated on</div>
                    <div className="info">07:00 am</div>
                  </div>
                </div><Chart/> </div>
             </div>
          <h6 className="heading mb-4">CHAIN OF CUSTODY</h6> 
          <div className="row mb-3 ">
        <div className="picture ml-3"><img src={currentinventory} alt="truck" height="15" width="15" /></div> 
         <div className="col">
        <div className="chain">Shipment Number</div>
         <div className="chain"><strong>SH8292992838339</strong></div>
         </div>
         <div className="col">
           <div className="chain"><strong>Mumbai INTL Airport</strong></div>
           <div className="chain">Mumbai,India</div>
           <div className="chain"><strong>Niger</strong></div>
           <div className="chain">Niger, West Africa</div>
           </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="col">
              <div className="color mb-3">RECEIVED</div>
              <div className="col panel chain chainPad">
                <div className="row justify-content-between">
                <div><strong>Purchase order received</strong></div>
                  <div className="mr-4">20/12/2020</div>
                </div>
                <div className="row justify-content-between">
                  <div>By: Serium Institute of pvt ltd</div>
                  <div>Unicef Po ID : <strong>45688837</strong></div>
                  <div className="mr-4">10:23 AM</div>
                </div>
                {chain==true ? <button className="btn btn-yellow">View Purchase Order</button>:null}
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="col">
              <div className="color mb-3">ACCEPTED</div>
              <div className="col panel chain chainPad">
                <div className="row justify-content-between">
                <div><strong>Purchase order received</strong></div>
                <div className="mr-4">20/12/2020</div>
                </div>
                <div className="row justify-content-between">
                  <div>By: Serium Institute of pvt ltd</div>
                  <div>Unicef Po ID : <strong>45688837</strong></div>
                  <div className="mr-4">10:23 AM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="col">
              <div className="color mb-3">ARRIVAL</div>
              <div className="col panel chain chainPad">
                <div className="row justify-content-between">
                <div><strong>Purchase order received</strong></div>
                  <div className="mr-4">20/12/2020</div>
                </div>
                <div className="row justify-content-between">
                  <div>By: Serium Institute of pvt ltd</div>
                  <div>Unicef Po ID : <strong>45688837</strong></div>
                  <div className="mr-4">10:23 AM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="col">
              <div className="color mb-3">DEPARTURE</div>
              <div className="col panel chain chainPad">
                <div className="row justify-content-between">
                <div><strong>Purchase order received</strong></div>
                  <div className="mr-4">20/12/2020</div>
                </div>
                <div className="row justify-content-between">
                  <div>By: Serium Institute of pvt ltd</div>
                  <div>Unicef Po ID : <strong>45688837</strong></div>
                  <div className="mr-4">10:23 AM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
           </div>
          </div>
     </div>
    
       
          
    
  );
};

export default Tracing;



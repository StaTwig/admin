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
  const[menuShip,setMenuShip]=useState(false);
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
            <li>SHP46786</li>
            <li>456789</li>
            <li>Mumbai</li>
            <li>Zurich Office</li>
            <li>20/12/2021</li>
            <li>12:45</li>
            <li>950000</li>
            <li>19000000</li>
            <li>Serium Institute of Pvt Ltd</li>
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
            <li>669577</li>
            <li>Serium Institute of Pvt</li>
            <li>12:45</li>
            {menu== true ? <li>90</li> : null}
           {menu== true ? <li>9000777</li> : null}
           {menu== true ? <li>Mumbai</li> : null}
           {menu== true ? <li>5645</li> : null}
           {menu== true ? <li>Niger</li> : null}
           {menu== true ? <li>8uy655</li> : null}
           {menu== true ? <li>bOPV</li> : null}
           {menu== true ? <li>800000</li> : null}
           </ul>
           <div></div>
          </div>
          <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setMenu(!menu)} /></div>
         
          <h6 className="heading mt-3 mb-3">SHIPMENT DETAILS</h6>
        <div className="row panel justify-content-between">
          <ul >
            <li>Shipment ID</li>
            <li>Vendor Name</li>
            <li>Tracking Id</li>
           {menuShip== true ? <li>Date</li> : null}
           {menuShip== true ? <li>Expected Delivery</li> : null}
           {menuShip== true ? <li>Time</li> : null}
           {menuShip== true ? <li>Shipped From</li> : null}
           {menuShip== true ? <li>To Location ID</li> : null}
           {menuShip== true ? <li>To Location</li> : null}
           {menuShip== true ? <li>Transaction ID</li> : null}
          </ul>
           <ul className="bold">
            <li>439870</li>
            <li>Serium Institute of Pvt</li>
            <li>Dh577fs55dds</li>
            {menuShip== true ? <li>20/11/2022</li> : null}
           {menuShip== true ? <li>26/20/2022</li> : null}
           {menuShip== true ? <li>12:45</li> : null}
           {menuShip== true ? <li>Mumbai Intl</li> : null}
           {menuShip== true ? <li>5678</li> : null}
           {menuShip== true ? <li>Niger</li> : null}
           {menuShip== true ? <li>ju788gf55677</li> : null}
           </ul>
           <div></div>
          </div>
          <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setMenuShip(!menuShip)} /></div>
         
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
         <div className="d-flex flex-column mr-5">
        <div className="chain">Shipment Number</div>
         <div className="chain"><strong>SH8292992838339</strong></div>
         </div>
         <div className="d-flex flex-column  ml-5 mr-3">
           <div className="dot bg-secondary mt-2 mb-5"></div>
           <div className="dot bg-info"></div>
         </div>
         <div className="col">
           <div className="chain"><strong>Mumbai INTL Airport</strong></div>
           <div className="chain mb-2">Mumbai,India</div>
           <div className="chain"><strong>Niger</strong></div>
           <div className="chain">Niger, West Africa</div>
           </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
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
                {chain==true ? <button className="btn btn-yellow dir mt-4">View Purchase Order</button>:null}
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">ACCEPTED</div>
              <div className="col panel chain chainPad">
                <div className="row justify-content-between">
                <div><strong>Purchase order Accepted</strong></div>
                <div className="mr-4">20/12/2020</div>
                </div>
                <div className="row justify-content-between">
                  <div>By: Serium Institute of pvt ltd</div>
                  <div>Unicef Po ID : <strong>45688837</strong></div>
                  <div className="mr-4">10:23 AM</div>
                </div>
                {chain==true ? <button className="btn btn-yellow dir mt-4">View Purchase Order</button>:null}
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">DISPATCHED</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Shipment Created : SD Warehouse</strong></div>
                  <div>By: Serium institute of Pvt</div>
                  <div>From: Mumbai,India</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">ARRIVAL</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Reached Airport</strong></div>
                  <div>Mumbai intl Airport</div>
                  <div>Location: Mumbai,India</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">DEPARTURE</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Flight Departed</strong></div>
                  <div>Mumbai Intl Airport</div>
                  <div>To: NIger</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">ARRIVAL</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Flight Arrived</strong></div>
                  <div>Dior Hamani</div>
                  <div>To: Niger,west Africa</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">RECEIVED</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Shipment Received</strong></div>
                  <div>Nigery Country Office</div>
                  <div>Location: Niami,Niger</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">DISPATCHED</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Shipment Dispatched</strong></div>
                  <div>By: Serium institute of Pvt</div>
                  <div>Location: Niami,Niger</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
                </div>
              </div>
              <div className="arrow float-right"><img src={traceDrop} alt="actions" height="7" width ="12" onClick={() => setChain(!chain)} /></div>
              </div>
          </div>
          <div className="row mb-3">
            <div></div>
            <div className="big-dot bg-info ml-4"></div>
            <div className="col">
              <div className="color mb-3">RECEIVED</div>
              <div className="row justify-content-between panel chain chainPad">
                <div className="d-flex flex-column">
                <div><strong>Shipment Received</strong></div>
                  <div>Maradi Niger Warehouse</div>
                  <div>Location: Niami,Niger</div>
                  {chain==true ?
                 <div className="d-flex flex-row mt-4">
                 <button className="btn btn-main-blue dir mr-2">View Shipment</button>
                 <button className="btn btn-orange dir">View Product List</button>
                 </div>:null}
                </div>
                <div className="d-flex flex-column">
                    <div>Unicef Po ID : <strong>45688837</strong></div>
                    <div>Shipment ID : <strong>8954487</strong></div>
                </div>
                <div className="d-flex flex-column">
                    <div>20/2/2020</div>
                    <div>07:20 PM</div>
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



import React, { useState, useEffect } from "react";
import Tabs from "./tabs/tabs";
import "./style.scss";
import { Formik } from "formik";
import Arrow from "../../assets/icons/arrow.png"
import ORGType from "./orgtype.js";

import WARType from "./warehousetype";
import { func } from "prop-types";
import { Link } from "react-router-dom";


const Configurationpart = (props) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [orgType,setOrgType]=useState(false);
  const [warType,setWarType]=useState(false);



const showOrgType = ()=>{
  setOrgType(true);
 setWarType(false);
}

// const showWarType = ()=>{
//   setWarType(true);
//  setOrgType(false);
// }

const showWarType = () => {
  setWarType(true);
  setOrgType(false);
  console.log("-------------------",orgType,warType);
};


  return (
    <div>
      <div className="addproduct">
        <h1 className="breadcrumb">CONFIGURATION</h1>
        <div>
        <Tabs {...props} tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
       
        {tabIndex == 6 && (
          <div className="">
             
            {/* <button type="button" className="btn btn-primary" onclick={()=>showOrgType()}>Organisation Type</button>
            
            
            <button type="button" className="btn btn-primary ml-5" onclick={()=>showWarType()}>Warehouse Type</button> */}
            <div className="w-100">
    <WARType />
   </div>
{/* {
  orgType ? <div className="w-100">
    <ORGType />
   </div> : <div className="w-100">
    <WARType />
   </div>
}
{
 warType ? <div className="w-100">
    <WARType />
   </div> :<div>
   </div>
}
        */}
           
          </div>
        )}
         {tabIndex == 3 && (
       <div className="row d-flex flex-row p-3">
        <div className=" w-13 mt-3 mr-3">
     
          <div className="card">
            <div className="card-body" style="list-style: none; height:450px">
            <div className="">
              <li className="p-2 ">Overview<img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
              <li className="p-2">Shipment<img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
              <li className="p-2">Inventory<img src={Arrow} alt="icon" width="7px" height="12px" className="ml-4"/></li>
            </div>
            </div>
          </div>
          </div>
<div className="col">
<table class="table ">
  <thead className="borderless">
    <tr className="borderless text-center">
      <th scope="col"></th>
      <th scope="col">Sent</th>
      <th scope="col">Received</th>
      <th scope="col">InTransit</th>
      <th scope="col">Expiring</th>
      <th scope="col">Expired</th>
      <th scope="col">Delay</th>
      <th scope="col">Added</th>
    </tr>
  </thead>
  <tbody className="borderless">
    <tr>
      <th scope="row">Total Products</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      
    </tr>
    <tr>
      <th scope="row">Total Products Expiring this week</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expiring this month</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expiring this year</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expired this week</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expired this month</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Products Expired this year</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Shipments</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
    <tr>
      <th scope="row">Total Product in inventory</th>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
      <td><input type="checkbox"/></td>
    </tr>
  </tbody>
</table>

</div>

          </div>  )}
       </div>
    </div>
  );
};

export default Configurationpart;
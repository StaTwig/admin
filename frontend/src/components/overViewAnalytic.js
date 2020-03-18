import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import 'typeface-roboto';
import './overViewAnalytic.css';
import totalshipments from "../assets/Total Shipments Completed.svg";
import totalinventory from "../assets/Total Inventory Added.svg";
import currentshipment from "../assets/Current Shipment InTransit.svg";
import Totalshipments from "../assets/Total Shipments.svg";
import shipmentsdelayed from "../assets/Total Shipments Delayed.svg";



const OverViewAnalytic = () => {
  return (
   <div className="containerAnalytic">
          <div className="box1">
           <div id="circle"><img id="car1" src={totalshipments} /></div>
            <div id="text1">Total Shipments Completed</div>
            <div id="text2">1.3 M</div>
            <div id="text3">This Year</div>
            
              
      </div>
     
     <div className="box1">
     <div id="circle"> <img id="car3" src={totalinventory}/></div>
           <div id="text1">Total Inventory Added</div>
           <div id="text4" >5.4 M</div>
           <div id="text3">This Year</div>
             </div>
             
     <div className="box1">
     <div id="circle">  <img id="car1" src={currentshipment}/> </div> 
           <div id="text1">Current Shipment in transit</div>
           <div id="text5">53</div>
           <div id="text8">Today</div>
             </div>
             
     <div className="box1">
     <div id="circle">  <img id="car1" src={Totalshipments}/>  </div>
           <div id="text1">Total Shipments</div>
           <div id="text6">42</div>
           <div id="text9">Today</div>
             </div>
             
     <div className="box1">
     <div id="circle">  <img id="car1" src={shipmentsdelayed}/> </div>
           <div id="text1">Total Shipments Delayed</div>
           <div id="text7">32</div>
           <div id="text10">This Month</div>
             </div>
     </div>
     
 
 );
};

export default OverViewAnalytic;


import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import 'typeface-roboto';
import './shipments.css';
import BasicButtonGroup from './button';

const ShipmentAnalytic = () => {
  return (
   <div className="containerInventory">
          <div className="box2">
          <img id="car2" src={require('../assets/car1.png')}/>
            <div id="inventoryData1">Total Shipments Completed</div>
            
            <div id="buttonGroup"><BasicButtonGroup/></div>
       
      </div>
      <div className="box2">
            <img id="car2" src={require('../assets/Sent.svg')}/>
             <div id="inventoryData2">Total Shipments Sent</div>
             
             <div id="buttonGroup"><BasicButtonGroup/></div>
        
       </div>
       <div className="box2">
            <img id="car2" src={require('../assets/Shippment.png')}/> 
            <div id="inventoryData3">Total Shipments Received</div>
            
            <div id="buttonGroup"><BasicButtonGroup/></div>
       
      </div>
      <div className="box2">
              <img id="car2" src={require('../assets/Shippment.png')}/> 
             <div id="inventoryData4">Current Shipment in Transit</div>
             
             
        
       </div>
       
     
     
       
     </div>
     
 
 );
};

export default ShipmentAnalytic;

//<div className="icon"><i><img src={require('../assets/user.png')}/></i></div>
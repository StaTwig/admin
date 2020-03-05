import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import 'typeface-roboto';
import './inventoryAnalytic.css';
import ButtonGroup from './button';

const InventoryAnalytic = () => {
  return (
   <div className="containerInventory">
          <div className="box2">
          <img id="car2" src={require('../assets/car1.png')}/>
            <div id="inventoryData1">Total Inventory Added</div>
            
            <div id="buttonGroup"><ButtonGroup/></div>
       
      </div>
      <div className="box2">
            <img id="car2" src={require('../assets/Sent.svg')}/>
             <div id="inventoryData2">Current Inventory</div>
             
             <div id="buttonGroup"><ButtonGroup/></div>
        
       </div>
       <div className="box2">
            <img id="car2" src={require('../assets/Shippment.png')}/> 
            <div id="inventoryData3">Total Vaccine near Expiration</div>
            
            <div id="buttonGroup"><ButtonGroup/></div>
       
      </div>
      <div className="box2">
              <img id="car2" src={require('../assets/Shippment.png')}/> 
             <div id="inventoryData4">Total Vaccine Expired</div>
             
             <div id="buttonGroup"><ButtonGroup/></div>
        
       </div>
       
     
     
       
     </div>
     
 
 );
};

export default InventoryAnalytic;

//<div className="icon"><i><img src={require('../assets/user.png')}/></i></div>
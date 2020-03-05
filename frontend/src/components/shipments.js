import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'typeface-roboto';
import './shipments.css';
import ButtonGroup from './button';

const ShipmentAnalytic = () => {
      return (
            <div className="containerInventory">
                   <div className="box2">
                   <div id="circle1"><img id="car2" src={require('../assets/truck-3.svg')}/>  </div>
                     <div id="inventoryData1">Total Shipments Completed</div>
                     <div id="buttonGroup"><ButtonGroup/></div>
                     <div id="numeric">532</div>
         
                
               </div>
               <div className="box2">
               <div id="circle2"><img id="car2" src={require('../assets/Sent.svg')}/> </div>
                      <div id="inventoryData2">Total Shipments Sent</div>
                      <div id="buttonGroup"><ButtonGroup/></div>
                      <div id="numeric1">532</div>
                </div>
                <div className="box2">
                <div id="circle3"><img id="car2" src={require('../assets/Received.svg')}/>  </div>
                     <div id="inventoryData3">Total Shipments Received</div>
                     <div id="buttonGroup"><ButtonGroup/></div>
                     <div id="numeric2">532</div>
               </div>
               <div className="box2">
               <div id="circle4"><img id="car2" src={require('../assets/Current Shipment InTransit 2.svg')}/> </div>
                      <div id="inventoryData4">Current Shipment in Transit</div>
                      <div id="numeric4">532</div>
                </div>
                
              
              
                
              </div>
              
          
          );
         };
       
    

export default ShipmentAnalytic;


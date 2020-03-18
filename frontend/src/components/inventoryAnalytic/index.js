import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'typeface-roboto';
import './style.scss';
import ButtonGroup from '../button';
import inventorycopy from "../../assets/icons/Total Inventory Added copy.svg";
import pic2 from "../../assets/icons/Current Inventory.svg";
import pic3 from "../../assets/icons/Total Vaccine near Expiration.svg";
import pic4 from "../../assets/icons/Total Vaccine Expired.svg";

const InventoryAnalytic = () => {
  return (
   <div className="containerInventory">
          <div className="box2">
          <div id="circle1"><img id="car2" src={inventorycopy}/>  </div>
            <div id="inventoryData1">Total Inventory Added</div>
            <div id="buttonGroup"><ButtonGroup/></div>
            <div id="numeric">2,34,532</div>

       
      </div>
      <div className="box2">
      <div id="circle2"><img id="car2" src={pic2}/> </div>
             <div id="inventoryData2">Current Inventory</div>
             <div id="buttonGroup"><ButtonGroup/></div>
             <div id="numeric1">14,532</div>
       </div>
       <div className="box2">
       <div id="circle3"><img id="car2" src={pic3}/>  </div>
            <div id="inventoryData3">Total Vaccine near Expiration</div>
            <div id="buttonGroup"><ButtonGroup/></div>
            <div id="numeric2">532</div>
      </div>
      <div className="box2">
      <div id="circle4"><img id="car2" src={pic4}/> </div>
             <div id="inventoryData4">Total Vaccine Expired</div>
             <div id="buttonGroup"><ButtonGroup/></div>
             <div id="numeric3">1532</div>
       </div>
       
     
     
       
     </div>
     
 
 );
};

export default InventoryAnalytic;

//<div className="icon"><i><img src={require('../../assets/icons/user.png')}/></i></div>
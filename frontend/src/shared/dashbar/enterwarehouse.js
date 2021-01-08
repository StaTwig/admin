import React from 'react'
import {Link} from 'react-router-dom'
import CloseIcon from '../../assets/icons/cross.svg';
import PinGrey from '../../assets/icons/pingrey.png';
import './style.scss'

const EnterWareHouse = (props) => {
const region = "Select Region"

return (
 <div className="dashbar">
   <div>
  <button type="button" className="close" onClick={()=>props.setDashVisible(false) }>
   <img src={CloseIcon} alt="Close" with="30" height="30" />
   </button></div>
   <div className=" panel  mb-3 searchpanel">
     <div>Unicef Warehouse 123</div>
     <div><u><small>8g4gb4ff4jej9jehrugknasci99988gdjnddbdb</small></u></div>
     <div className="d-flex flex-row mt-2">
       <ul className="mr-2">
         <li className="mb-1">Country</li>
         <li className="mb-1">Plant Name</li>
         <li className="mb-1">Warehouse</li>
         <li className="mb-1">Warehouse Name</li>
       </ul>
       <ul>
         <li className="mb-1">India</li>
         <li className="mb-1">democartic of serum</li>
         <li className="mb-1">123</li>
         <li className="mb-1">warehouse 123</li>
       </ul>
     </div>
     </div> 
     <div className= "panel address searchpanel mb-2">
    <div className="row">
        <img src={PinGrey} height="20" width="15" />
        <div className="ml-2 text-secondary">Address</div>
        </div> 
     <div>
     <div>Gobind Mahal , 86B Netaji </div>
     <div>Subhasg Road ,Mumbai 400002,</div>
    <div>India.</div> 
       </div>
     </div> 
     <div className="d-flex flex-row justify-content-between prod mb-2">
       <div>Inventory</div>
      <Link to="/productlist/all"><div className="text-primary">View All</div></Link> 
     </div>

     <div className= "panel address searchpanel prodpanel d-flex flex-column">
     <div className="mb-1 subprod">
      <div className="text-primary"><strong>PVC</strong></div>
      <div className="d-flex flex-row mb-1">
        <div className="mr-3 text-secondary">Manufacture : CSK</div>
        <div className="text-secondary">Quantity : <span className="text-info">789000</span></div>
      </div>
      <div className="d-flex flex-row mb-1">
        <div className="mr-3 text-secondary">Mfg Date : 05/2020</div>
        <div className=" text-secondary">Exp Date : 07/2021</div>
      </div>
   <Link to="/productlist/all"><button className="btn btn-outline-info fontSize200 sho mb-2 mt-1" >SHOW MORE</button></Link> 
    </div>
    <div className="mb-1">
    <div className="text-primary"><strong>OPV</strong></div>
      <div className="d-flex flex-row mb-1">
        <div className="mr-3 text-secondary">Manufacture : CSK</div>
        <div className="text-secondary">Quantity : <span className="text-info">67912</span></div>
      </div>
      <div className="d-flex flex-row mb-1">
        <div className="mr-3  text-secondary">Mfg Date : 05/2020</div>
        <div className=" text-secondary">Exp Date : 07/2021</div>
      </div>
   <Link to="/productlist/all"><button className="btn btn-outline-info fontSize200 sho mt-2" >SHOW MORE</button></Link> 
   
    </div>
     </div> 
     
      </div> 
  )
}

export default EnterWareHouse;
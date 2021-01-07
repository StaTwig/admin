import React from 'react'
import CloseIcon from '../../assets/icons/cross.svg';
import DropdownButton from '../dropdownButtonGroup';
import './style.scss'


const DashBar = (props) => {

  const region = "Select Region"
  
  return (
 props.content ? <div className="dashbar">
  <button type="button" className="close" onClick={()=>props.setDashVisible(false) }>
   <img src={CloseIcon} alt="Close" with="30" height="30" />
   </button>
   <div className=" panel  mb-3">
     <div>Unicef Warehouse 123</div>
     <div><u><small>8g4gb4ff4jej9jehrugknasci99988gdjnddbdb</small></u></div>
     <div className="d-flex flex-row mt-2">
       <ul className="mr-2">
         <li>Plant</li>
         <li>Plant Name</li>
         <li>Warehouse</li>
         <li>Warehouse Name</li>
       </ul>
       <ul>
         <li>1212</li>
         <li>democartic of serum</li>
         <li>123</li>
         <li>warehouse 123</li>
       </ul>
     </div>
     </div> 
     <div className= "panel address mb-2">
     <h6>Address</h6>
     <div>
     <div>Gobind Mahal , 86B Netaji </div>
     <div>Subhasg Road ,Mumbai 400002,</div>
    <div>India.</div> 
       </div>
     </div> 
     <div className="d-flex flex-row justify-content-between prod mb-2">
       <div>Inventory</div>
       <div>View All</div>
     </div>

     <div className= "panel address">
       <div className="mb-5">
      <div>OPV</div>
      <div className="d-flex flex-row justify-content-between">
        <div>Manufacture : CSK</div>
        <div>Quantity : 67912</div>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div>Mfg Date : 05/2020</div>
        <div>Exp Date : 07/2021</div>
      </div>
    <button className="btn btn-outline-info fontSize200 sho mt-2" >SHOW MORE</button>
    </div>
    <div className="mb-5">
    <div>OPV</div>
      <div className="d-flex flex-row justify-content-between">
        <div>Manufacture : CSK</div>
        <div>Quantity : 67912</div>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div>Mfg Date : 05/2020</div>
        <div>Exp Date : 07/2021</div>
      </div>
    <button className="btn btn-outline-info fontSize200 sho mt-2" >SHOW MORE</button>
   
    </div>
     </div> 
     
      </div> : <div className="dashbar">
  <button type="button" className="close" onClick={()=>props.setDashVisible(false) }>
   <img src={CloseIcon} alt="Close" with="30" height="30" />
   </button>
   <div className="input-group">
            <label htmlFor="shipmentId">Region</label>
            <div className="form-control">
              <DropdownButton
                 name={region}
                onSelect={item =>(item)}
               />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Plant</label>
            <div className="form-control">
              <DropdownButton
                 name={region}
                onSelect={item =>(item)}
               />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="shipmentId">Warehouse</label>
            <div className="form-control">
              <DropdownButton
                 name={region}
                onSelect={item =>(item)}
               />
            </div>
          </div>
   </div>
  )
}

export default DashBar;
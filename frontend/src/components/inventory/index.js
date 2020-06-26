import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";

import { expired, expiringIn, Count } from '../../utils/dateHelper';
import './style.scss';
import Table from '../../shared/table';
import TableFilter from '../../shared/advanceTableFilter';
import TotalInventoryAdded from "../../assets/icons/TotalInventoryAddedcopy.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import Expiration from "../../assets/icons/TotalVaccinenearExpiration.svg";
import TotalVaccineExpired from "../../assets/icons/TotalVaccineExpired.svg";
import Add from '../../assets/icons/add.svg';
import user from '../../assets/icons/brand.svg';
import Package from '../../assets/icons/package.svg';
import calender from '../../assets/icons/calendar.svg';
import Status from '../../assets/icons/Status.svg';

const Inventory = (props) => {
  const headers = {
    coloumn1 : "Product Type",
    coloumn2:  "Manufacturer",
    coloumn3: "Expiry Date",
    coloumn4:  "Date Added",

    img1: <img src={Package} width="16" height="16" />,
    img2: <img src={user} width="16" height="16" />,
    img3: <img src={calender} width="16" height="16" />,
    img4:  <img src={Status} width="16" height="16" />
  }

  const tableHeaders = {
    coloumn1 : "Product Name",
    coloumn2:  "Manufacturer",
    coloumn3:  "Batch Number",
    coloumn4:  "Quantity",
    coloumn5:  "Serial Number",
    coloumn6:  "Mfg Date",
    coloumn7:  "Exp Date",
  }
  const [inventoryExpiring, setInventoryExpiring] = useState('');
  const [inventoryExpired, setInventoryExpired] = useState('');
  const [inventoryCurrent, setInventoryCurrent] = useState('');
  const month = new Date().getMonth()+1;
  const newMonth = `0${month}`.slice(-2);
  const todayDate =  newMonth + '/'  +new Date().getFullYear();
  let key=0;
  let count=0;
  let near=0;
  useEffect(() => {
    props.inventories.map((inventory,index) => {
          key = index+1;
          let a =inventory.expiryDate.slice(-4)
          let b =todayDate.slice(-4)
          let c = inventory.expiryDate.substring(0,2)
          let d = todayDate.substring(0,2)
          if(a<b||(a==b&&c<=d)){
            count++;
          }
           else if(a==b&&(c==parseInt(d)+1||c==parseInt(d)+2)){
            near++;
           }
  })
setInventoryCurrent(key);
setInventoryExpired(count);
setInventoryExpiring(near);
  })

let total = 0;
let bOPV = 0;  
let MMR  = 0;
let PVC = 0; 
let BCG = 0;
let RV= 0;
let HepB= 0;

const [bopvQuantity, setBopvQuantity] = useState('');
const [mmrQuantity, setMmrQuantity] = useState('');
const [pvcQuantity, setPvcQuantity] = useState(''); 
const [bcgQuantity, setBcgQuantity] = useState('');
const [rvQuantity, setRvQuantity] = useState('');
const [hepbQuantity, setHepbQuantity] = useState('');


  useEffect(() => {
    props.inventories.map((inventory) => {
          if(inventory.productName=="bOPV"){
            bOPV += JSON.parse(inventory.quantity)
          }
           else if(inventory.productName=="MMR")
           {
            MMR += JSON.parse(inventory.quantity)
           }
           else if(inventory.productName=="PVC")
           {
            PVC += JSON.parse(inventory.quantity)
           }
           else if(inventory.productName=="BCG")
           {
            BCG += JSON.parse(inventory.quantity)
           }
           else if(inventory.productName=="RV")
           {
            RV += JSON.parse(inventory.quantity)
           }
           else if(inventory.productName=="Hep B")
           {
            HepB += JSON.parse(inventory.quantity)
           }
  })
setBopvQuantity(bOPV);
setMmrQuantity(MMR);
setPvcQuantity(PVC);
setBcgQuantity(BCG);
setRvQuantity(RV);
setHepbQuantity(HepB);
  })
  


  {props.inventories.map(inventory => (
    
  total += JSON.parse(inventory.quantity)
  

  ))}
  return (
    <div className="inventory">
      <div className="d-flex justify-content-between">
        <h1 className="breadcrumb">INVENTORY </h1>
        <div className="d-flex">
          <Link to="/newinventory">
            <button className="btn btn-yellow font-weight-bold">
              <img src={Add} width='13' height='13' className="mr-2" />
              <span>Add Inventory</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="panel">
            <div className="picture truck-bg">
              <img src={TotalInventoryAdded} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title truck-text">Inventory Added</div>
              <div className="tab-container">
                <div className="tab-item active">This Year</div>
                <div className="tab-item">This Month</div>
                <div className="tab-item">This Week</div>
                <div className="tab-item">Today</div>
              </div>
              <div className="truck-text count">{total}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <div className="picture sent-bg">
              <img src={currentinventory} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title sent-text">Current Inventory</div>
              <div className="tab-container">
                <div className="tab-item active">This Year</div>
                <div className="tab-item">This Month</div>
                <div className="tab-item">This Week</div>
                <div className="tab-item">Today</div>
              </div>
              <div className="sent-text count">{inventoryCurrent}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <div className="picture recived-bg">
              <img src={Expiration} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title recived-text">Vaccines near Expiration</div>
              <div className="tab-container">
                <div className="tab-item active">This Year</div>
                <div className="tab-item">This Month</div>
                <div className="tab-item">This Week</div>
                <div className="tab-item">Today</div>
              </div>
       <div className="recived-text count">{inventoryExpiring}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="panel">
            <div className="picture transit-bg">
              <img src={TotalVaccineExpired} alt="truck" />
            </div>
            <div className="d-flex flex-column">
              <div className="title transit-text">Vaccine Expired</div>
              <div className="tab-container">
                <div className="tab-item active">This Year</div>
                <div className="tab-item">This Month</div>
                <div className="tab-item">This Week</div>
                <div className="tab-item">Today</div>
              </div>
        <div className="transit-text count">{inventoryExpired}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="full-width-ribben">
        <TableFilter data={headers} />
      </div>
      <div className="ribben-space">
        <div className="row no-gutter">
          <div className="col-sm-12 col-xl-9">
            <Table data={tableHeaders}{...props} />
          </div>
          <div className="col-sm-12 col-xl-3">
            <div className="list-container">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Product List</h4>
                <button className="btn btn-link">View all</button>
              </div>
              <div className="row overflow">
                <div className="col-sm-6">
                  <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign ellipseOne">bOPV</div>
                    <p>Oral Polio Vaccine</p>
                      <h3>Qty : {bopvQuantity}</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign ellipseTwo">MMR</div>
                    <p>Mumps, Measles & Rubella Vaccine</p>
                     <h3>Qty : {mmrQuantity}</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign ellipseThree">PVC</div>
                    <p>Pneumococcal conjugate Vaccine</p>
                      <h3>Qty : {pvcQuantity}</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign ellipseSix">BCG</div>
                    <p>Bacillus Calmette–Guérin vaccine</p>
                    <h3>Qty : {bcgQuantity}</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign ellipseFive">RV</div>
                    <p>Rotavirus Vaccine</p>
                    <h3>Qty : {rvQuantity}</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex card flex-column align-items-center">
                    <div className="round-sign ellipseFour">HepB</div>
                    <p>Hepatitis B Vaccine</p>
                    <h3>Qty : {hepbQuantity}</h3>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};



export default Inventory;


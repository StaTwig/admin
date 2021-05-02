import React, { useState, useEffect } from 'react';
import './style.scss';
import DropdownButton from '../../shared/dropdownButtonGroup';
import Date_time from '../../assets/icons/date_time.png';
import Product from '../../assets/icons/product.png';
import mobile from '../../assets/icons/mobile.png';
import idprrof from '../../assets/icons/idproof.png';
import patient from '../../assets/icons/patient.png';
import pingrey from '../../assets/icons/pingrey.png';
import TableFilter from './tablefilter.js';
import ExportIcon from '../../assets/icons/Export.svg';
import dropdownIcon from '../../assets/icons/drop-down.svg';

const lastMile=(props)=>{
    const [region,setRegion]= useState('Select Region')
    const [regions,setRegions]= useState([])
    const [country,setCountry] = useState('Select Country')
    const [state,setstate] = useState('Select State')
    const [district,setdistrict] = useState('Select District')
    const [location,setlocation] = useState('Select Location')
    const [product,setproduct] = useState('Select Product')
    const [countries,setCountries] = useState([])
    const headers = {
        coloumn1: 'Beneficiary Details',
        coloumn2: 'ID Proof',
        coloumn3: 'Mobile No',
        coloumn4: 'Product',
        coloumn5: 'Date & Time',
    
        img1: <img src={patient} width="18" height="20" className="pb-1"/>,
        img2: <img src={idprrof} width="23" height="20" className="pb-1"/>,
        img3: <img src={mobile} width="16" height="25" className="pb-1"/>,
        img4: <img src={Product} width="20" height="22" className="pb-1"/>,
        img5: <img src={Date_time} width="19" height="22" className="pb-1"/>,
      };
      

  
return (
      
<div> 
<div>
<div className="addproduct" >

    <h1 className="breadcrumb">LAST MILE</h1>
    <div className="float-right" style={{position:"absolute",left:"1020px",top:"15vh",right:"520px"}}>
    <button className="btn btn-md btn-main-blue">
            <div className="d-flex align-items-center">
              <img src={ExportIcon} width="16" height="16" className="mr-3" />
              <span>Export</span>
              <img src={dropdownIcon} width="16" height="16" className="ml-3" />
            </div>
          </button></div>
    <div className="row">
    <div className="col tab" style={{width:"80%"}}>
    <div className=" mt-1 pl-1">
        <TableFilter data={headers} fb="77%"/>
      </div>
      </div>
      </div>
      </div>
      
        <div className="col-xl-3">
        <div className="dashbar">
          
          <div className="d-flex flex-column mb-2 region pt-5">
                <div className="form-group row mr-1">
                  <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Region</label>
                    <div className="form-control col">
                        <DropdownButton
                               name={region}
                               
                        />
                    </div>
                </div>
                <div className="form-group row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Country</label>
                    <div className="form-control col">
                        <DropdownButton
                             name={country}
                        />
                    </div>
                </div>
                <div className="form-group row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">State</label>
                    <div className="form-control col">
                        <DropdownButton
                             name={state}
                        />
                    </div>
                </div>
                <div className="form-group row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">District</label>
                    <div className="form-control col">
                        <DropdownButton
                             name={district}
                        />
                    </div>
                </div>
                <div className="form-group row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Location</label>
                    <div className="form-control col">
                        <DropdownButton
                             name={location}
                        />
                    </div>
                </div>
                <div className="form-group mb-4 row mr-1">
                    <label htmlFor="shipmentId" className="mt-2 mr-3 col-4">Product</label>
                    <div className="form-control col">
                        <DropdownButton
                            name={product}
                           
                        />
                    </div>
                </div>
            </div> 
              <div className="mainsearchwarehouse">
               
                <div className=" panel  mb-3 searchpanel">
                    <div>Warehouse Title</div>
                    <div>
                        <u>
                            <small>
                                "wallet1234 Address"  
                                &nbsp;
                            </small>
                        </u>
                    </div>
                <div className="d-flex text-white mt-2 flex-row " >
                    <ul className="mr-3 text-light">
                        <li className="mb-1">Country ID</li>
                        <li className="mb-1">Country</li>
                        <li className="mb-1">Location</li>
                        <li className="mb-1">Location Name</li>
                    </ul>
                    <ul class="text-light">
                        <li className="mb-1">{"123"}</li>
                        <li className="mb-1">{"India"}</li>
                        <li className="mb-1">{"TS"}</li>
                        <li className="mb-1">{"Lumbini park"}</li>
                    </ul>
                </div>
                </div>
                <div class="panel address searchpanel mb-2 mt-3 ml-1 mr-1">
                    <div className="row">
                        <img src={pingrey} height="20" width="15"></img>
                        <div className="ml-2">Address</div>

                        </div>
                        <div>JNIBF gachibowli,hyderabad,Telangana</div>
                    </div>
                </div>
                </div>
            </div>
          </div>
  </div>
         
)}

export default lastMile;

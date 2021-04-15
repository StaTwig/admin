import React, { useState, useEffect } from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import Location from '../../assets/icons/CurrentLocation1.png';
// import React, { useState,useRef } from 'react';

import './style.scss';



const Addlocation=()=>{
  const [ state,setState]=useState("Select State") 
  const [ region,setRegion]=useState("Select Region") 
  const [ country,setCountry]=useState("Select Country") 
return (
      
<div> 

<div className="addproduct" >
    <h1 className="breadcrumb">ADD NEW LOCATION</h1>

   <div className="card">
        <div className="card-body">
            <div className="row">
              
                 <div className="col-md-6 com-sm-12" >
                    <div className="form-group">
                      
                        <label htmlFor="Location Name">Location Name*</label>
                        <input
                        type="text"
                        className="form-control"
                        name="Enter Name"
                        
                        placeholder="Enter Location Name "/>
                        
              
                 </div></div>
                 {/* <div className="col">
                        <button  className="btn btn-blue btn-lg float-right mr-2 ml-1">
                        
                        
                        <span style={{color:'white'}}>Use my current Location</span>
                        </button>
                       

                      
                    </div> */}
                </div>


                <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Flat"> Pincode* </label>
                    <input
                    type="text"
                    className="form-control"
                    name="productcategory"
                    placeholder="Enter Pincode "
                
                    />
                    </div>
                </div>
           </div>
           <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Flat"> Flat, House No,Building,Company* </label>
                    <input
                    type="text"
                    className="form-control"
                    name="productcategory"
                    placeholder="Enter  Flat, House No,Building,Company "
                
                    />
                    </div>
                </div>
           </div>
  
           <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Area">Area,Colony,Street,District,Sector,Village* </label>
                    <input
                    type="text"
                    className="form-control"
                    name="Area,Colony,Street,District,Sector,Village y"
                    placeholder="Enter Area,Colony,Street,District,Sector,Village "
                    
                    />
                    </div>
                </div>
           </div>

           <div className="row">
              <div className="col-md-6 com-sm-12">
           <div className="form-group">
             <label htmlFor="Landmark">Landmark</label>
             <input
               type="text"
               className="form-control"
               name="        Landmark"
               placeholder="Enter Landmark"
             
             />
           </div></div></div>
           <div className="row">
              <div className="col-md-6 com-sm-16">
                <div className="form-group">
                  <label htmlFor="Select Location" >Select Town/City*</label>
                  <div className="form-control" >
                    <DropdownButton
                        name={state}
                       />
                  </div>
                </div>
              </div>
              </div>

              <div className="row">
              <div className="col-md-6 com-sm-12">
                <div className="form-group">
                  <label htmlFor="State/ Province/ Region*">State/ Province/ Region*</label>
                  <div className="form-control">
                    <DropdownButton
                       name={region}
                    />
                  </div>
                </div>
              </div>
              </div>

              
              <div className="row">
              <div className="col-md-6 com-sm-12">
                <div className="form-group">
                  <label htmlFor="Country*">Country*</label>
                  <div className="form-control">
                    <DropdownButton
                     name={country}
                    />
                  </div>
                </div>
              </div>
              </div>
              <div>
              
             <button class="close" className="btn btn-yellow btn-lg float-right">
            <span>Request Admin For Approval</span>
          </button>
    
          </div>
         </div>
         </div>
         <div>
              
             <button class="close" className="btn btn-blue btn-lg float-right" style={{position:"relative",top:"-65vh",right:"22px"}}>
             <img src={Location} width="26" height="26" className="mr-2 mb-1" />
            <span>Use my current Location</span>
          </button>
         
    
          </div>
         </div></div>       
)}

export default Addlocation;

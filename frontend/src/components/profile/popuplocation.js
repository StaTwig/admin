import React, {useState} from "react";
import Location from '../../assets/icons/Location.png';
import DropdownButton from "../../shared/dropdownButtonGroup";
import {
    Link
  } from "react-router-dom";

 const PopUpLocation=()=>{
    
    return (

    <div class="profile"> 
<center><h1 className="breadcrumb">Add Location</h1></center><br></br>
               
                <div class="wrapper1">
                <Link to ={'/Addlocation'}>
                     <button className="btn btn-orange fontSize20 font-bold mr-4" >
                     <img src={Location} width="20" height="26" className="mr-2 mb-1" />
                    <span>Add New Location</span>
                  </button>
                  </Link>
                </div>
               <center><h7>-------------------------        OR        -------------------------</h7></center> 
               <div className="slectloc1" rows="10" cols="70">
               <div className="row">
                  <div className="col-md-6 com-sm-16">
                    <div className="form-group">
                    <img src={Location} height='27' width='25' className="mr-3"></img>
                      <label htmlFor="Select Location">Select Location*</label>
                      <div className="form-control" >
                        <DropdownButton
                         
                        />
                      </div>
                    </div>
                  </div>
                  </div></div>
                 
                
                
                      <div class="wrapper1">
                      
                          <button className="btn btn-orange fontSize20 font-bold mr-4">
                          <span>Continue</span>
                        </button>
                        
                      </div>
                </div>
                  
                        
    )}
    export default PopUpLocation;
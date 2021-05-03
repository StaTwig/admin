import React, { useState, useEffect } from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import Location from '../../assets/icons/CurrentLocation1.png';
// import React, { useState,useRef } from 'react';

import './style.scss';
import { Formik } from 'formik';
const AddLocation=(props)=>{
  const [ LocationName,setLocationName]=useState("") 
  const [pincode,setpincode]=useState("") 
  const [ flat,setflat]=useState("") 
  const [Street,setStreet]=useState("") 
  const [ Landmark,setLandmark]=useState("")
  const [ town,setRegion]=useState("") 
  const [ state_p,setState_p]=useState("") 
  const [ country,setCountry]=useState("")
 const requestadminforapproval=()=>
  {
    //  props.history.push('/profile');
  }
return (
<div> 
<div className="addproduct" >
    <h1 className="breadcrumb">ADD NEW LOCATION</h1>

   
        <div className="card">
        <div className="card-body">
      
        <Formik
        enableReinitialize={true}
        initialValues={{
          LocationName,
          pincode,
          flat,
          Street,
          Landmark,
          town,
          state_p,
          country
          
        }}
        validate={(values) => {
          const errors = {};

          if (!values.LocationName) {
            errors.LocationName = "Required";
          }
          if (!values.pincode) {
            errors.pincode = "Required";
          }
          if (!values.flat) {
            errors.flat = "Required";
          }
          if (!values.Street) {
            errors.Street = "Required";
          }
          if (!values.Landmark) {
            errors.Landmark = "Required";
          }
          if (!values.town) {
            errors.town = "Required";
          }
          if (!values.state_p) {
            errors.state_p = "Required";
          }
          if (!values.country) {
            errors.country = "Required";
          }
         
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // updateStatus(values);
        }}
      >
         {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="row">
              
                 <div className="col-md-6 com-sm-12" >
                    <div className="form-group">
                      
                        <label htmlFor="Location Name">Location Name*</label>
                        
                        <input
                        type="text"
                        className="form-control"
                        name="LocationName"
                        placeholder="Enter Location Name "
                        value={values.LocationName}
                        onBlur={handleBlur}
                        onChange={(e)=>{
                          setLocationName(e.target.value)
                        }}
                        />
                         {errors.LocationName && touched.LocationName && (
                    <span className="error-msg text-danger">{errors.LocationName}</span>
                  )}
                       
                 </div></div>
                </div>
                <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Flat"> Pincode* </label>
                    <input 
                    type="text"
                    className="form-control"
                    name="pincode"
                    placeholder="Enter Pincode "
                    value={values.pincode}
                    onBlur={handleBlur}
                    onChange={(e)=>{
                      setpincode(e.target.value)
                    }}
                   />
                   {errors.pincode && touched.pincode && (
                    <span className="error-msg text-danger">{errors.pincode}</span>
                  )}
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
                    name="flat"
                    placeholder="Enter  Flat, House No,Building,Company "
                    value={values.flat}
                    onBlur={handleBlur}
                    onChange={(e)=>{
                      setflat(e.target.value)
                    }}
                    />
                    {errors.flat && touched.flat && (
                    <span className="error-msg text-danger">{errors.flat}</span>
                  )}
                    </div>
                </div>
           </div>
  
           <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Street">Area,Colony,Street,District,Village* </label>
                    <input
                    type="text"
                    className="form-control"
                    name="Street"
                    placeholder="Enter Area,Colony,Street,District,Village"
                    value={values.Street}
                    onBlur={handleBlur}
                        onChange={(e)=>{
                          setStreet(e.target.value)
                        }}
                        />
                        {errors.Street && touched.Street && (
                    <span className="error-msg text-danger">{errors.Street}</span>
                  )}
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
               name="Landmark"
               placeholder="Enter Landmark"
               value={values.Landmark}
                onBlur={handleBlur}
               onChange={(e)=>{
                setLandmark(e.target.value)
               }}
               />
                 {errors.Landmark && touched.Landmark && (
                    <span className="error-msg text-danger">{errors.Landmark}</span>
                  )}
           </div></div></div>
           <div className="row">
              <div className="col-md-6 com-sm-16">
                <div className="form-group">
                  <label htmlFor="Select Location" >Select Town/City*</label>
                 
                  <input
               type="text"
               className="form-control"
               name="town"
               placeholder="select Town"
               value={values.town}
                    onBlur={handleBlur}
               onChange={(e)=>{
                setRegion(e.target.value)
               }}
               />
                {errors.town && touched.town && (
                    <span className="error-msg text-danger">{errors.town}</span>
                  )}
                  
                </div>
              </div>
              </div>

              <div className="row">
              <div className="col-md-6 com-sm-12">
                <div className="form-group">
                  <label htmlFor="State/ Province/ Region*">State/ Province/ Region*</label>
                  
                  <input
               type="text"
               className="form-control"
               name="state_p"
               placeholder="Select State"
               value={values.state_p}
               onBlur={handleBlur}
               onChange={(e)=>{
                setState_p(e.target.value)
               }}
               />
                {errors.state_p && touched.state_p && (
                    <span className="error-msg text-danger">{errors.state_p}</span>
                  )}
                  
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col-md-6 com-sm-12">
                <div className="form-group">
                  <label htmlFor="Country*">Country*</label>
                  
                  <input
               type="text"
               className="form-control"
               name="country"
               placeholder="Select Country"
               value={values.country}
               onBlur={handleBlur}
               onChange={(e)=>{
                setCountry(e.target.value)
               }}
               /> 
                 {errors.country && touched.country && (
                    <span className="error-msg text-danger">{errors.country}</span>
                  )} 
                </div>
              </div>
              </div>
              <div>
             <button class="close" className="btn btn-yellow btn-lg float-right" >  
            <span>Request Admin For Approval</span>
          </button>
    
          </div>
          </form>
        )}
      </Formik> 
         </div>
         </div>
         <div>       
             <button class="close" className="btn btn-blue btn-lg float-right" style={{position:"relative",top:"-65vh",right:"22px"}}>
             <img src={Location} width="26" height="26" className="mr-2 mb-1" />
            <span>Use my current Location</span>
          </button>
          </div>
        </div> 
         </div>       
)}

export default AddLocation;


import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {updateWarehouse} from "../../actions/userActions";
import SuccessPopup from "../../shared/PopUp/successPopUp";
import Modal from "../../shared/modal";
// import React, { useState,useRef } from 'react';
import {getWarehouseById} from "../../actions/userActions";
import {fetchAllRegions,fetchCountriesByRegion,fetchStateByCountry,fetchCitiesByState,} from "../../actions/productActions";

import "./style.scss";
import { Formik } from "formik";

const EditLocation = (props) => {
  const id = props.match.params.id;

  console.log(id);

  const [addressTitle, setAddressTitle] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [region, setregion] = useState("");
  const [addedLocationModal, setAddedLocationModal] = useState(false);

  const [allregions,setallregions] = useState([]);
  const [allCountries,setallCountries] = useState([]);
  const [allState,setallState] = useState([]);
  const [allCity,setallCity] = useState([]);

  const closeModalAddedLocation = ()=>{
    setAddedLocationModal(false);
    props.history.push({
      pathname:'/profile',
      state:{
        // props.location.state.editMode=true,
        editMode:true
      }
    })
  };


  // const getDataForWareHouse = async(id) => {
  //   const result = await getWarehouseById(id);
  //   return result;
  // }

  useEffect(() => {
    async function fetchData() {
      async function fetchAllRegions1(){
        let arr = await fetchAllRegions();
        setallregions(arr.data);
      }
      fetchAllRegions1();

      const result = await getWarehouseById(id);  
      console.log('results');
      console.log(result.data);   
      const warehouseInfo = result.data.data[0];
      const region = warehouseInfo.warehouseAddress.region ? warehouseInfo.warehouseAddress.region : warehouseInfo.region.regionName;
      setregion(region);
      setAddressTitle(warehouseInfo.title);
      setAddressLine(warehouseInfo.warehouseAddress.firstLine);
      setCity(warehouseInfo.warehouseAddress.city);
      setCountry(warehouseInfo.warehouseAddress.country);
      setPincode(warehouseInfo.warehouseAddress.zipCode);
      setState(warehouseInfo.warehouseAddress.state);
    }

    fetchData();
  }, []);

  async function fetchAllCountries1(id){
    let res = await fetchCountriesByRegion(id);
    setallCountries(res.data);
  };
  async function fetchAllState1(id){
    let res = await fetchStateByCountry(id);
    setallState(res.data);
  };
  async function fetchAllCity1(id){
    let res = await fetchCitiesByState(id);
    setallCity(res.data);
  };

  const updateStatus = async (values, id) => {
    const data =  {
      title: values.addressTitle,
      organisationId: props.user.organisationId,
      postalAddress: props.user.postalAddress,
      region: values.region,
      country: props.user.warehouseAddress_country,
      location: {
        longitude: '0',
        latitude: '0',
        geohash: '1231nejf923453',
      },
      warehouseAddress: {
        firstLine: values.addressLine,
        region: values.region,
        secondLine: null,
        city: values.city,
        state: values.state,
        country: values.country,
        landmark: null,
        zipCode: values.pincode,
      },
      supervisors: [],
      employeess: [],
    };

    const result = await updateWarehouse(data, id);
    if(result.status === 200){
      console.log('Edit Location');
      console.log(result);
      setAddedLocationModal(true);
      // props.history.push('/profile');
    }
    else{
      console.log("Error in edit location");
      console.log(result);
    }
  };

  function search(name, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === name) {
            return myArray[i].id;
        }
    }
}
  // const requestadminforapproval = () => {
    //  props.history.push('/profile');
  // };
  return (
    <div>
      <div className="addproduct">
        <h1 className="breadcrumb">EDIT LOCATION</h1>

        <div className="card">
          <div className="card-body">
            <Formik
              enableReinitialize={true}
              initialValues={{
                region,
                addressTitle,
                addressLine,
                city,
                state,
                country,
                pincode,
              }}
              validate={(values) => {
                const errors = {};

                if (!values.region) {
                  errors.region = "Required";
                }
                if (!values.addressTitle) {
                  errors.addressTitle = "Required";
                }
                if (!values.addressLine) {
                  errors.addressLine = "Required";
                }
                if (!values.city) {
                  errors.city = "Required";
                }
                if (!values.state) {
                  errors.state = "Required";
                }
                if (!values.country) {
                  errors.country = "Required";
                }
                if (!values.pincode) {
                  errors.pincode = "Required";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log('Values');
                console.log(values);
                setSubmitting(false);
                updateStatus(values, id);
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
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="col-sm-6" htmlFor="addressTitle">Address Title*</label>
                      
                      {/* <TextField style={{width:"800px"}}
                        id="standard-basic"
                        label="Enter Title" 
                        className="form-control2"
                        name="addressTitle"
                        value={values.addressTitle}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setAddressTitle(e.target.value);
                        }}
                      /> */}
                      <input
                        style={{flexBasis:"47%"}}
                        className="editlocP"
                        id="standard-basic"
                        type="text"
                        name="addressTitle"
                        placeholder="Enter Address Title"
                        value={values.addressTitle}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setAddressTitle(e.target.value);
                        }}
                      />
                      {errors.addressTitle && touched.addressTitle && (
                        <span className="error-msg text-danger-EL">
                          {errors.addressTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {
                  console.log(values)
                }
                <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label className="col-sm-6" htmlFor="region">Region*</label>
                        <div className="" style={{flexBasis:"47%"}}>
                          <Autocomplete
                          value={values.region}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={<div className="select-placeholder-text">Select Region</div>}
                          onChange={(event, newValue) => {
                            setFieldValue("region",newValue);
                            fetchAllCountries1(newValue);
                            setregion(newValue);
                            setCountry("");
                            setState("");
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allregions}
                          renderInput={(params) => <TextField {...params} />}
                          />
                         {errors.region && touched.region && (
                          <span className="error-msg text-danger-ANL">
                            {errors.region}
                          </span>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                      <label className="col-sm-6" htmlFor="country">Country*</label>
                      <div className="" style={{flexBasis:"47%"}}>
                          <Autocomplete
                          value={values.country}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={<div className="select-placeholder-text">Select Country</div>}
                          onChange={(event, newValue) => {
                            // handleChange(event);
                            setFieldValue("country",newValue);
                            let v = search(newValue,allCountries);
                            fetchAllState1(v);
                            setCountry(newValue);
                            setState("");
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allCountries.map((option)=>option.name)}
                          renderInput={(params) => <TextField {...params} label="Select Country"  />}
                          />  
                      {/* <Autocomplete
                          value={values.country}
                          onChange={(event, newValue) => {
                            // handleChange(event);
                            setFieldValue("country",newValue);
                            let v = search(newValue,allCountries);
                            fetchAllState1(v);
                            setCountry(newValue);
                            setState("");
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allCountries.map((option)=>option.name)}
                          style={{ width: 800 }}
                          renderInput={(params) => <TextField {...params} label="Select Country"  />}
                        /> */}
                        {errors.country && touched.country && (
                          <span className="error-msg text-danger-ANL">
                            {errors.country}
                          </span>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                      <label className="col-sm-6" htmlFor="state">State*</label>
                      <div className="" style={{flexBasis:"47%"}}>
                          <Autocomplete
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={<div className="select-placeholder-text">Select State</div>}
                          value={values.state}
                          onChange={(event, newValue) => {
                            let v = search(newValue,allState);
                            fetchAllCity1(v);
                            setState(newValue);
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allState.map((option)=>option.name)}
                          renderInput={(params) => <TextField {...params} label="Select State"  />}
                          />    
                      {/* <Autocomplete
                          value={values.state}
                          onChange={(event, newValue) => {
                            let v = search(newValue,allState);
                            fetchAllCity1(v);
                            setState(newValue);
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allState.map((option)=>option.name)}
                          style={{ width: 800 }}
                          renderInput={(params) => <TextField {...params} label="Select State"  />}
                        /> */}
                        {errors.state && touched.state && (
                          <span className="error-msg text-danger-ANL">
                            {errors.state}
                          </span>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                      <label className="col-sm-6" htmlFor="city">City*</label>
                      <div className="" style={{flexBasis:"47%"}}>
                          <Autocomplete
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder={<div className="select-placeholder-text">Select City</div>}
                          value={values.city}
                          onChange={(event, newValue) => {
                            setCity(newValue);
                          }}
                          id="controllable-states-demo"
                          options={allCity.map((Option)=>Option.name)}
                          renderInput={(params) => <TextField {...params} label="Select City"  />}
                          />     
                      {/* <Autocomplete
                          value={values.city}
                          onChange={(event, newValue) => {
                            setCity(newValue);
                          }}
                          id="controllable-states-demo"
                          options={allCity.map((Option)=>Option.name)}
                          style={{ width: 800 }}
                          renderInput={(params) => <TextField {...params} label="Select City"  />}
                        /> */}
                        {errors.city && touched.city && (
                          <span className="error-msg text-danger-ANL">
                            {errors.city}
                          </span>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label className="col-sm-6" htmlFor="addressLine">Address Line*</label>
                        <input
                        style={{flexBasis:"47%"}}
                        id="standard-basic"
                        className="editlocP mt-2"
                        name="addressTitle"
                        placeholder="Enter Address Line"
                        value={values.addressLine}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setAddressLine(e.target.value);
                        }}
                      />
                        {/* <TextField style={{width:"800px"}}
                        type="text"
                        id="standard-basic"
                        label="Enter Address Line" 
                        className="form-control2"
                        value={values.addressLine}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setAddressLine(e.target.value);
                        }}
                      /> */}
                      {/*{errors.addressLine && touched.addressLine && (
                          <span className="error-msg text-danger-ANL">
                            {errors.addressLine}
                          </span>
                  )} */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 com-sm-16">
                      <div className="form-group">
                        <label className="col-sm-6" htmlFor="Select Location">Pincode*</label>
                        <input
                          style={{flexBasis:"47%"}}
                          id="standard-basic"
                          type="number"
                          className="editlocP mt-2"
                          name="pincode"
                          placeholder="Enter Pincode"
                          value={values.pincode}
                          onBlur={handleBlur}
                          onChange={(e) => {setPincode(e.target.value)
                          }}
                      />
                        {/* <TextField style={{width:"800px"}}
                            id="standard-basic"
                            label="Pin Code" 
                            type="number"
                            className="form-control2"
                            name="pincode"
                            value={values.pincode}
                            onBlur={handleBlur}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            error={errors.pincode}
                            touched={touched.pincode}
                            onChange={(e) => {setPincode(e.target.value)
                            }}
                          /> */}
                        {/* {errors.pincode && touched.pincode && (
                          <span className="error-msg text-danger-ANL">
                            {errors.pincode}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                {/* <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="col-sm-6" htmlFor="addressLine">Address Line</label>
                      <input
                        type="text"
                        className="form-control"
                        name="addressLine"
                        placeholder="Enter Address Line"
                        value={values.addressLine}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setAddressLine(e.target.value);
                        }}
                      />
                      {errors.addressLine && touched.addressLine && (
                        <span className="error-msg text-danger-EL">
                          {errors.addressLine}
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field col-sm-6" htmlFor="city">City/Town</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Enter City/Town"
                        value={values.city}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                      {errors.city && touched.city && (
                        <span className="error-msg text-danger-EL">
                          {errors.city}
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}

                {/* <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field col-sm-6" htmlFor="state">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        placeholder="Enter State"
                        value={values.state}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                      />
                      {errors.State && touched.State && (
                        <span className="error-msg text-danger-EL">
                          {errors.State}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label className="required-field col-sm-6" htmlFor="country">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Enter Country"
                        value={values.country}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                      {errors.country && touched.country && (
                        <span className="error-msg text-danger-EL">
                          {errors.country}
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-md-6 com-sm-16">
                    <div className="form-group">
                      <label className="required-field col-sm-6" htmlFor="Select Location">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        placeholder="Select Pincode"
                        value={values.pincode}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setPincode(e.target.value);
                        }}
                      />
                      {errors.pincode && touched.pincode && (
                        <span className="error-msg text-danger-EL">
                          {errors.pincode}
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="d-flex flex-row-reverse">
                  <button
                    class="close"
                    className="btn btn-yellow float-right font-weight-bold"
                    disabled={!((values.country)&&(values.addressLine)&&(values.addressTitle)&&(values.city)&&(values.state)&&(values.pincode))}
                    type="submit"
                  >
                    <span>Request Admin For Approval</span>
                  </button>
                  <button 
                    type="button"
                    className="btn btn-white shadow-radius font-bold mr-3 font-weight-bold" 

                    onClick={() => {
                      props.history.push({
                        pathname:'/profile',
                        state:{
                          editMode:true
                        }
                      })
                    }}
                    >Cancel
                   </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div>
          {/* <button
            class="close"
            className="btn btn-blue btn-lg float-right"
            style={{ position: "relative", top: "-65vh", right: "22px" }}
          >
            <img src={Location} width="26" height="26" className="mr-2 mb-1" />
            <span>Use my current Location</span>
          </button> */}
        </div>
        {addedLocationModal && (
        <Modal
          close={() => closeModalAddedLocation()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModalAddedLocation} //FailurePopUp
          />
        </Modal>
      )}
      </div>
    </div>
  );
};

export default EditLocation;

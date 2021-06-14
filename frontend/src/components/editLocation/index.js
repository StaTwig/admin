import React, { useState, useEffect } from "react";
import DropdownButton from "../../shared/dropdownButtonGroup";
import Location from "../../assets/icons/CurrentLocation1.png";
import {updateWarehouse} from "../../actions/userActions";
import SuccessPopup from "../../shared/PopUp/successPopUp";
import FailPopup from "../../shared/PopUp/failedPopUp";
import Modal from "../../shared/modal";
// import React, { useState,useRef } from 'react';
import {getWarehouseById} from "../../actions/userActions";

import "./style.scss";
import { Formik } from "formik";

const editLocation = (props) => {
  const id = props.match.params.id;

  console.log(id);

  const [addressTitle, setAddressTitle] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [addedLocationModal, setAddedLocationModal] = useState(false);

  const closeModalAddedLocation = ()=>{
    setAddedLocationModal(false);
    props.history.push('/profile');
  };


  // async getDataForWareHouse(id){
    // const result = await getWarehouseById(id);
    // return result;
  // }

  const getDataForWareHouse = async(id) => {
    const result = await getWarehouseById(id);
    return result;
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getWarehouseById(id);  
      console.log('results');
      console.log(result.data.data);   
      const warehouseInfo = result.data.data[0];
      setAddressTitle(warehouseInfo.title);
      setAddressLine(warehouseInfo.warehouseAddress.firstLine);
      setCity(warehouseInfo.warehouseAddress.city);
      setCountry(warehouseInfo.warehouseAddress.country);
      setPincode(warehouseInfo.warehouseAddress.zipCode);
      setState(warehouseInfo.warehouseAddress.state);
    }

    fetchData();
  }, []);

  const updateStatus = async (values, id) => {
    const data =  {
      title: values.addressTitle,
      organisationId: props.user.organisationId,
      postalAddress: props.user.postalAddress,
      region: "",
      country: props.user.warehouseAddress_country,
      location: {
        longitude: '0',
        latitude: '0',
        geohash: '1231nejf923453',
      },
      warehouseAddress: {
        firstLine: values.addressLine,
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
    if(result.status = 200){
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

  const requestadminforapproval = () => {
    //  props.history.push('/profile');
  };
  return (
    <div>
      <div className="addproduct">
        <h1 className="breadcrumb">EDIT LOCATION</h1>

        <div className="card">
          <div className="card-body">
            <Formik
              enableReinitialize={true}
              initialValues={{
                addressTitle,
                addressLine,
                city,
                state,
                country,
                pincode,
              }}
              validate={(values) => {
                const errors = {};

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
                        <label htmlFor="addressTitle">Address Title</label>

                        <input
                          type="text"
                          className="form-control"
                          name="addressTitle"
                          placeholder="Enter Address Title"
                          value={values.addressTitle}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setAddressTitle(e.target.value);
                          }}
                        />
                        {errors.addressTitle && touched.addressTitle && (
                          <span className="error-msg text-danger">
                            {errors.addressTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label htmlFor="addressLine">Address Line</label>
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
                          <span className="error-msg text-danger">
                            {errors.addressLine}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label htmlFor="city">City/Town</label>
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
                          <span className="error-msg text-danger">
                            {errors.city}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label htmlFor="state">State</label>
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
                          <span className="error-msg text-danger">
                            {errors.State}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 com-sm-12">
                      <div className="form-group">
                        <label htmlFor="country">Country</label>
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
                          <span className="error-msg text-danger">
                            {errors.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 com-sm-16">
                      <div className="form-group">
                        <label htmlFor="Select Location">Pincode</label>
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
                          <span className="error-msg text-danger">
                            {errors.pincode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      class="close"
                      className="btn btn-yellow btn-lg float-right"
                      disabled={!((values.country)&&(values.addressLine)&&(values.addressTitle)&&(values.city)&&(values.state)&&(values.pincode))}
                      type="submit"
                    >
                      <span>Request Admin For Approval</span>
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

export default editLocation;
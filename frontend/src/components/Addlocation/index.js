import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addWarehouse } from "../../actions/userActions";
import SuccessPopup from "../../shared/PopUp/successPopUp";
import Modal from "../../shared/modal";
import {
  fetchAllRegions,
  fetchCountriesByRegion,
  fetchStateByCountry,
  fetchCitiesByState,
} from "../../actions/productActions";
import "./style.scss";
import { Formik } from "formik";

const AddLocation = (props) => {
  const { t } = props;
  const [addressTitle, setAddressTitle] = useState("");
  const [pincode, setPincode] = useState("");
  const [region, setregion] = useState("");
  const [country, setcountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addedLocationModal, setAddedLocationModal] = useState(false);

  //Newly Added
  const [allregions, setallregions] = useState([]);
  const [allCountries, setallCountries] = useState([]);
  const [allState, setallState] = useState([]);
  const [allCity, setallCity] = useState([]);

  const closeModalAddedLocation = () => {
    setAddedLocationModal(false);
    props.history.push({ pathname: "/profile", state: { editMode: true } });
  };
  useEffect(() => {
    async function fetchAllRegions1() {
      let arr = await fetchAllRegions();
      setallregions(arr.data);
      fetchAllState1(53);
    }
    fetchAllRegions1();
  }, []);

  async function fetchAllCountries1(id) {
    let res = await fetchCountriesByRegion(id);
    setallCountries(res.data);
  }
  async function fetchAllState1(id) {
    let res = await fetchStateByCountry(id);
    setallState(res.data);
  }
  async function fetchAllCity1(id) {
    let res = await fetchCitiesByState(id);
    setallCity(res.data);
  }
  const updateStatus = async (values) => {
    const data = {
      title: values.addressTitle,
      organisationId: props.user.organisationId,
      postalAddress: props.user.postalAddress,
      region: values.region,
      country: props.user.warehouseAddress_country,
      // location: {
      //   longitude: '0',
      //   latitude: '0',
      //   geohash: '1231nejf923453',
      // },
      warehouseAddress: {
        region: values.region,
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
    const result = await addWarehouse(data);
    if (result.data.status !== 0) {
      setAddedLocationModal(true);
    }
  };

  function search(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === name) {
        return myArray[i].id;
      }
    }
  }
  return (
    <div>
      <div className='addproduct'>
        <h1 className='breadcrumb'>{t('ADD_NEW_LOCATION')}</h1>

        <div className='card'>
          <div className='card-body'>
            <Formik
              enableReinitialize={true}
              initialValues={{
                addressTitle,
                addressLine,
                city,
                state,
                pincode,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.addressTitle) {
                  errors.addressTitle = t("Required");
                }
                if (!values.addressLine) {
                  errors.addressLine = t("Required");
                }
                if (!values.city) {
                  errors.city = t("Required");
                }
                if (!values.state) {
                  errors.state = t("Required");
                }
                if (!values.pincode) {
                  errors.pincode = t("Required");
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                updateStatus(values);
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
                <form onSubmit={handleSubmit} className='mb-3'>
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='addressTitle'>
                          {t('Address_Title')}*
                        </label>
                        <input
                          style={{ flexBasis: "47%" }}
                          className='addlocP'
                          type='text'
                          id='referenceShipmentId'
                          name='addressTitle'
                          placeholder={t('Enter_Title')}
                          value={values.addressTitle}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setAddressTitle(e.target.value);
                          }}
                        />
                        {/*  {errors.addressTitle && touched.addressTitle && (
                        <span className="error-msg text-danger-ANL">
                          {errors.addressTitle}
                        </span>
                     )} */}
                      </div>
                    </div>
                  </div>
                  {/* <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='region'>
                          {t('Region')}*
                        </label>
                        <div className='' style={{ flexBasis: "47%" }}>
                          <Autocomplete
                            value={region}
                            labelId='demo-simple-select-label'
                            id='demo-simple-select controllable-states-demo'
                            placeholder={
                              <div className='select-placeholder-text'>
                                {t('Select_Region')}
                              </div>
                            }
                            onChange={(event, newValue) => {
                              fetchAllCountries1(newValue);
                              setregion(newValue);
                              setcountry("");
                              setState("");
                              setCity("");
                            }}
                            options={allregions}
                            renderInput={(params) => (
                              <TextField {...params} label={t('Select_Region')} />
                            )}
                          />
                          {errors.region && touched.region && (
                            <span className='error-msg text-danger-ANL'>
                              {errors.region}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='country'>
                          {t('Country')}*
                        </label>
                        <div className='' style={{ flexBasis: "47%" }}>
                          <Autocomplete
                            labelId='demo-simple-select-label'
                            id='demo-simple-select controllable-states-demo'
                            placeholder={
                              <div className='select-placeholder-text'>
                                {t('Select_Country')}
                              </div>
                            }
                            value={country}
                            onChange={(event, newValue) => {
                              let v = search(newValue, allCountries);
                              fetchAllState1(v);
                              setcountry(newValue);
                              setState("");
                              setCity("");
                            }}
                            options={allCountries.map((option) => option.spanishName)}
                            renderInput={(params) => (
                              <TextField {...params} label={t('Select_Country')} />
                            )}
                          />

                          {errors.country && touched.country && (
                            <span className='error-msg text-danger-ANL'>
                              {errors.country}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='state'>
                          {t('State')}*
                        </label>
                        <div className='' style={{ flexBasis: "47%" }}>
                          <Autocomplete
                            labelId='demo-simple-select-label'
                            id='demo-simple-select controllable-states-demo'
                            placeholder={
                              <div className='select-placeholder-text'>
                                {t('Select_State')}
                              </div>
                            }
                            value={state}
                            onChange={(event, newValue) => {
                              let v = search(newValue, allState);
                              fetchAllCity1(v);
                              setState(newValue);
                              setCity("");
                            }}
                            options={allState.map((option) => option.name)}
                            renderInput={(params) => (
                              <TextField {...params} label={t('Select_State')} />
                            )}
                          />
                          {errors.state && touched.state && (
                            <span className='error-msg text-danger-ANL'>
                              {errors.state}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='city'>
                          {t('City')}*
                        </label>
                        <div className='' style={{ flexBasis: "47%" }}>
                          <Autocomplete
                            labelId='demo-simple-select-label'
                            id='demo-simple-select controllable-states-demo'
                            placeholder={
                              <div className='select-placeholder-text'>
                                {t('Select_City')}
                              </div>
                            }
                            value={city}
                            onChange={(event, newValue) => {
                              setCity(newValue);
                            }}
                            options={allCity.map((Option) => Option.name)}
                            renderInput={(params) => (
                              <TextField {...params} label={t('Select_City')} />
                            )}
                          />
                          {/* <Autocomplete
                          value={city}
                          onChange={(event, newValue) => {
                            setCity(newValue);
                          }}
                          id="controllable-states-demo"
                          options={allCity.map((Option)=>Option.name)}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Select City"  />}
                        /> */}
                          {errors.city && touched.city && (
                            <span className='error-msg text-danger-ANL'>
                              {errors.city}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='addressLine'>
                          {t('Address_Line')}*
                        </label>
                        <input
                          style={{ flexBasis: "47%" }}
                          id='standard-basic'
                          placeholder={t('Enter_Address_Line')}
                          className='addlocP mt-2'
                          name='addressTitle'
                          value={values.addressLine}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setAddressLine(e.target.value);
                          }}
                        />
                        {/* <TextField style={{width:"300px"}}
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
                  <div className='row'>
                    <div className='col-md-6 com-sm-16'>
                      <div className='form-group'>
                        <label className='col-sm-6' htmlFor='Select Location'>
                          {t('Pincode')}*
                        </label>
                        <input
                          type='number'
                          style={{ flexBasis: "47%" }}
                          id='standard-basic'
                          placeholder={t('Pincode')}
                          className='addlocP mt-2'
                          name='pincode'
                          value={values.pincode}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setPincode(e.target.value);
                          }}
                        />
                        {/* <TextField style={{width:"300px"}}
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
                  <div className='d-flex flex-row-reverse'>
                    <button
                      className='btn btn-yellow float-right font-weight-bold'
                      disabled={
                        !(
                          values.addressTitle &&
                          values.city &&
                          values.state &&
                          values.pincode &&
                          addressLine.length > 0
                        )
                      }
                      type='submit'
                    >
                      <span>{t('Request_Admin_For_Approval')}</span>
                    </button>
                    <button
                      type='button'
                      className='btn btn-white shadow-radius font-bold mr-3 font-weight-bold'
                      onClick={() => {
                        props.history.push({
                          pathname: "/profile",
                          state: { editMode: true },
                        });
                      }}
                    >
                      {t('Cancel')}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          {/* <button
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
            size='modal-sm' //for other size's use `modal-lg, modal-md, modal-sm`
          >
            <SuccessPopup
              onHide={closeModalAddedLocation} //FailurePopUp
              t={t}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddLocation;

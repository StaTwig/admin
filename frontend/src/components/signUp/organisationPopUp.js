import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik } from "formik";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import Modal from "../../shared/modal";
import CloseIcon from "../../assets/icons/cross.svg";
import {
  fetchAllRegions,
  fetchCountriesByRegion,
  fetchStateByCountry,
  fetchCitiesByState,
} from "../../actions/productActions";
import { useTranslation } from 'react-i18next';

const OrganisationPopUp = (props) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState(
    "Location service is disabled. Enter address manually!!!"
  );

  const closeModal = () => setShowModal(false);
  const orgTypeArr = [
    { id: "SUPPLIER", name: t('supplier') },
    { id: "CUSTOMER", name: t('customer') },
    { id: "CUSTOMER_SUPPLIER", name: t('both') },
    { id: "CENTRAL_AUTHORITY", name: t('central')+" "+t('authority') },
  ];
  const [line1, setline1] = useState("");
  const [name, setname] = useState("");
  const [pincode, setPincode] = useState("");
  const [region, setregion] = useState("");
  const [country, setcountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [allregions, setallregions] = useState([]);
  const [allCountries, setallCountries] = useState([]);
  const [allState, setallState] = useState([]);
  const [allCity, setallCity] = useState([]);
  useEffect(() => {
    async function fetchAllRegions1() {
      let arr = await fetchAllRegions();
      console.log(arr);
      setallregions(arr.data);
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
    console.log(res, "All City");
    setallCity(res.data);
  }
  //   const getGeoLocation = async () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         setPos(position);
  //         dispatch(turnOn());
  //         const result = await getAddressByLatLong(position);
  //         dispatch(turnOff());
  //         if (result.status === 200) {
  //           await setAddress(result);
  //         } else {
  //           setShowModal(true);
  //         }
  //       },
  //       (error) => {
  //         setShowModal(true);
  //       }
  //     );
  //   } else {
  //     setShowModal(true);
  //   }
  //   };
  function search(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === name) {
        return myArray[i].id;
      }
    }
  }
  return (
    <div className='inventorypopup'>
      {showModal && (
        <Modal
          close={closeModal}
          // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName='btn-orange'
        >
          <FailedPopUp onHide={closeModal} message={message} />
        </Modal>
      )}
      <div className='d-flex flex-row justify-content-between'>
        <div className='flex-column'>
          <div className='alert mt-3 p-0 pl-3'>{t('almost')} {t('there')}!</div>
          <div className='text-info pl-3'>
            {t('add')} {t('organisation').toLocaleLowerCase()} {t('details')} {t('to')} {t('continue').toLocaleLowerCase()}
          </div>
        </div>
        <div>
          <button
            type='button'
            className='close'
            onClick={() => props.onHide()}
          >
            <img src={CloseIcon} alt='Close' with='40' height='40' />
          </button>
        </div>
        {/* <div className="pt-1 ">
            <button
                onClick={getGeoLocation}
                type="button"
                className="btn btn-primary btn-sm"
            >
                <span className="txt">Use my current location</span>
            </button>
        </div> */}
      </div>
      <div className='mr-4'>
        <div className='card-body flex-column d-flex'>
          <div className='flex-row text-muted justify-content-between'>
            <Formik
              enableReinitialize={true}
              initialValues={{
                //   type: "",
                region,
                name,
                line1,
                pincode,
                city,
                state,
                country,
              }}
              validate={(values) => {
                // console.log(values, "Values Validate");
                const errors = {};
                //   if (!values.type) {
                //     errors.type = "Required";
                //   }
                if (!values.name) {
                  errors.name = t('required');
                }
                if (!values.pincode) {
                  errors.pincode = t('required');
                }
                if (!values.region) {
                  errors.region = t('required');
                }
                if (!values.line1) {
                  errors.line1 = t('required');
                }
                if (!values.city) {
                  errors.city = t('required');
                }
                if (!values.state) {
                  errors.state = t('required');
                }
                if (!values.country) {
                  errors.country = t('required');
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                // console.log(values, "Values");
                setClicked(true);
                setSubmitting(false);
                props.onSignup(values);
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
                        <TextField
                          style={{
                            width: "425px",
                          }}
                          id='standard-basic'
                          label={t('organisation')+" "+t('name')}
                          className='form-control2'
                          name='name'
                          value={values.name}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          //error={errors.name}
                          touched={touched.name}
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                        />
                        {errors.name && touched.name && (
                          <span className='error-msg text-danger-ANL'>
                            {errors.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        {/* <label className="required-field col-sm-6" htmlFor="region">Region</label> */}
                        <Autocomplete
                          value={region}
                          onChange={(event, newValue) => {
                            fetchAllCountries1(newValue);
                            setregion(newValue);
                            setcountry("");
                            setState("");
                            setCity("");
                          }}
                          id='controllable-states-demo'
                          // inputValue={inputValue1}
                          // onInputChange={(event, newInputValue) => {
                          //   setInputValue1(newInputValue);
                          // }}
                          options={allregions}
                          style={{ width: 425 }}
                          renderInput={(params) => (
                            <TextField {...params} label={t('select')+" "+t('region')} />
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

                  {/* <AddressField
                      error={errors.city}
                      touched={touched.city}
                      label="City/ Town"
                      refe="city"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.city}
                    />
                    <AddressField
                      error={errors.state}
                      touched={touched.state}
                      label="State"
                      refe="state"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.state}
                    /> */}
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        {/* <label className="required-field col-sm-6" htmlFor="country">Country</label> */}
                        <Autocomplete
                          value={country}
                          onChange={(event, newValue) => {
                            let v = search(newValue, allCountries);
                            fetchAllState1(v);
                            setcountry(newValue);
                            setState("");
                            setCity("");
                          }}
                          id='controllable-states-demo'
                          options={allCountries.map((option) => option.name)}
                          style={{ width: 425 }}
                          renderInput={(params) => (
                            <TextField {...params} label={t('select')+" "+t('country')} />
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
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        {/* <label className="required-field col-sm-6" htmlFor="state">State</label> */}
                        <Autocomplete
                          value={state}
                          onChange={(event, newValue) => {
                            let v = search(newValue, allState);
                            fetchAllCity1(v);
                            setState(newValue);
                            setCity("");
                          }}
                          id='controllable-states-demo'
                          options={allState.map((option) => option.name)}
                          style={{ width: 425 }}
                          renderInput={(params) => (
                            <TextField {...params} label={t('select')+" "+t('state')} />
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

                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        {/* <label className="required-field col-sm-6" htmlFor="city">City</label> */}
                        <Autocomplete
                          value={city}
                          onChange={(event, newValue) => {
                            setCity(newValue);
                          }}
                          id='controllable-states-demo'
                          options={allCity.map((Option) => Option.name)}
                          style={{ width: 425 }}
                          renderInput={(params) => (
                            <TextField {...params} label={t('select')+" "+t('city')} />
                          )}
                        />
                        {errors.city && touched.city && (
                          <span className='error-msg text-danger-ANL'>
                            {errors.city}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <AddressField
                      error={errors.name}
                      touched={touched.name}
                      label="Organisation Name"
                      refe="name"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.name}
                    /> */}
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group' style={{ width: "425px" }}>
                        <TextField
                          style={{
                            width: "425px",
                          }}
                          id='standard-basic'
                          label={t('address')+" "+t('line')}
                          className='form-controll'
                          name='line1'
                          value={values.line1}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          //error={errors.line1}
                          touched={touched.line1}
                          onChange={(e) => {
                            setline1(e.target.value);
                          }}
                        />
                        {errors.line1 && touched.line1 && (
                          <span className='error-msg text-danger-ANL'>
                            {errors.line1}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <AddressField

                      error={errors.line1}
                      touched={touched.line1}
                      label="Address Line"
                      refe="line1"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.line1}
                    /> */}
                  <div className='row'>
                    <div className='col-md-6 com-sm-12'>
                      <div className='form-group'>
                        <TextField
                          style={{
                            width: "425px",
                          }}
                          id='standard-basic'
                          label={t('pincode')}
                          type='number'
                          className='form-control2'
                          name='pincode'
                          value={values.pincode}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          //error={errors.pincode}
                          touched={touched.pincode}
                          onChange={(e) => {
                            setPincode(e.target.value);
                          }}
                        />
                        {errors.pincode && touched.pincode && (
                          <span className='error-msg text-danger-ANL'>
                            {errors.pincode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <AddressField
                      error={errors.pincode}
                      touched={touched.pincode}
                      label="Pincode"
                      refe="pincode"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.pincode}
                    /> */}
                  <div className='pt-5 d-flex flex-row-reverse'>
                    <button
                      disabled={clicked}
                      type='submit'
                      className='btn btn-primary '
                    >
                      {t('done')}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationPopUp;

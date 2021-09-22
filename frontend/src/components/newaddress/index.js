import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import AddressField from "./addressfield";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik } from "formik";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import SuccessPopUp from "../../shared/PopUp/successPopUp";
import {
  getAddressByLatLong,
  addAddress,
  getWareHouses,
  fetchAllRegions,fetchCountriesByRegion,fetchStateByCountry,fetchCitiesByState,
} from "../../actions/organisationActions";
import Modal from "../../shared/modal";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { useSelector, useDispatch } from "react-redux";
import './indexStyle.scss'

const NewAddress = (props) => {
  // const editAddress = JSON.parse(props.match.params.address);
  useEffect(()=>{
    async function fetchAllRegions1(){
      let arr = await fetchAllRegions();
      setallregions(arr.data);
    }
    fetchAllRegions1();
  },[]);

  let editAddress;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [addr, setAdd] = useState({});
  const [message, setMessage] = useState("Location service is disabled. Enter address manually!!!");
  const [address, setAddress] = useState({});
  const [pos, setPos] = useState({});
  const closeModal = () => setShowModal(false);
  const closeModals = () => setShowModals(false);

  const [addressTitle, setAddressTitle] = useState("");
  const [pincode, setPincode] = useState("");
  const [region,setregion] = useState("");
  const [country, setcountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [addressLine, setAddressLine] = useState("");

  const [allregions,setallregions] = useState([]);
  const [allCountries,setallCountries] = useState([]);
  const [allState,setallState] = useState([]);
  const [allCity,setallCity] = useState([]);

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

  const addArr = useSelector((state) => {
    return state.organisation.addresses;
  });

  useEffect(() => {
    dispatch(getWareHouses());
  }, []);

  const getGeoLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setPos(position);
          dispatch(turnOn());
          const result = await getAddressByLatLong(position);
          dispatch(turnOff());
          if (result.status === 200) {
            await setAddress(result);
          } else {
            setShowModal(true);
          }
        },
        (error) => {
          setShowModal(true);
        }
      );
    } else {
      setShowModal(true);
    }
  };

  const saveAddress = async (data) => {
    data.postitions = pos;
    data.id = props.match.params.address
      ? JSON.parse(props.match.params.address)
      : "";
    data.organisationId = props.user.organisationId;
    dispatch(turnOn());
    const result = await addAddress(data);
    if (result.status == 200) {
      props.history.push(`/address`);
      setMessage(result.data.data.message);
    }
    dispatch(turnOff());
  };

  if (addArr && Object.keys(addr).length === 0 && props.match.params.address) {
    editAddress = addArr.filter(
      (row) => row.id == JSON.parse(props.match.params.address)
    );
    if (editAddress?.length) setAdd((a) => editAddress[0]);
  }
  useEffect(() => {
    if (
      addArr.length &&
      Object.keys(addr).length === 0 &&
      props.match.params.address
    ) {
      editAddress = addArr.filter(
        (row) => row.id == JSON.parse(props.match.params.address)
      );
      if (editAddress?.length) setAdd(editAddress[0]);
    }
  });
  function search(name, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === name) {
            return myArray[i].id;
        }
    }
}
  return (
    <div className="address">
      {showModal && (
        <Modal
          close={closeModal}
          // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <FailedPopUp onHide={closeModal} message={message} />
        </Modal>
      )}
      {showModals && (
        <Modal
          close={closeModals}
          // size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <SuccessPopUp onHide={closeModals} message={message} />
        </Modal>
      )}
      {
        Object.keys(addr).length == 0 ? <h1 className="breadcrumb dash pl-2">ADD NEW ADDRESS</h1>:
        <h1 className="breadcrumb dash pl-2">EDIT ADDRESS</h1>
      }
      <div className="d-flex row ">
        <div className="card w-100 rounded border border-white shadow bg-white m-4 p-3">
          <div className="card-body d-flex flex-row justify-content-between">
            <div className="w-50">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  title: Object.keys(addr).length ? addr?.title : addressTitle,
                  region:Object.keys(addr).length? addr?.region?.regionName: region,
                  // flatno: addr?.length ? addr[0] : "",
                  pincode: address?.PostalCode
                    ? address?.PostalCode
                    : Object.keys(addr).length
                    ? addr?.warehouseAddress?.zipCode
                    : pincode,
                  area: address?.Subdistrict
                    ? address?.Subdistrict
                    : Object.keys(addr).length
                    ? addr?.warehouseAddress?.firstLine
                    : addressLine,
                  // landmark: addr?.length ? addr[2] : "",
                  town: address?.City
                    ? address?.City
                    : Object.keys(addr).length
                    ? addr?.warehouseAddress?.city
                    : city,
                  state: address?.AdditionalData?.length
                    ? address?.AdditionalData?.filter(
                        (row) => row.key == "StateName"
                      )[0].value
                    : Object.keys(addr).length
                    ? addr?.warehouseAddress?.state
                    : state,
                  country: address?.AdditionalData?.length
                    ? address?.AdditionalData?.filter(
                        (row) => row.key == "CountryName"
                      )[0].value
                    : Object.keys(addr).length
                    ? addr?.warehouseAddress?.country
                    : country,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.title) {
                    errors.title = "Required";
                  }
                  if (!values.pincode) {
                    errors.pincode = "Required";
                  }
                  if (!values.region) {
                    errors.region = "Required";
                  }
                  if (!values.area) {
                    errors.area = "Required";
                  }
                  if (!values.town) {
                    errors.town = "Required";
                  }
                  if (!values.state) {
                    errors.state = "Required";
                  }
                  if (!values.country) {
                    errors.country = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  saveAddress(values);
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
                  <form onSubmit={handleSubmit} className="mb-3" enableReinitialize>
                  <TextField 
                          style={{
                              width:"425px"
                          }}
                          id="standard-basic"
                          label="Address Title" 
                          className="form-control2 mb-3"
                          name="title"
                          value={values.title}
                          // handleChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.title && touched.title}
                          onChange={(e) => {handleChange(e);setAddressTitle(e.target.value)}}
                        />
                        {/* {errors.title && touched.title && (
                        <span className="error-msg text-dangerS">{errors.title}</span>
                        )}  */} 

                        <Autocomplete
                          value={values.region}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => {
                            setFieldValue("region",newValue);
                            fetchAllCountries1(newValue);
                            setregion(newValue);
                            setcountry("");
                            setState("");
                            setCity("");
                          }}
                          id="controllable-states-demo"               
                          options={allregions}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField style={{
                            width:"425px"
                        }}{...params} className="mb-3" /*error={errors.region}  touched={touched.region} */ label="Select Region"  />}
                        />
                        {/* {errors.region && touched.region && (
                          <span className="error-msg text-danger-ANL">
                            {errors.region}
                          </span>
                        )} */}
                        <Autocomplete
                          value={values.country}
                          onChange={(event, newValue) => {
                            setFieldValue("country",newValue);
                            let v = search(newValue,allCountries);
                            fetchAllState1(v);
                            setcountry(newValue);
                            setState("");
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allCountries.map((option)=>option.name)}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField style={{
                            width:"425px"
                        }} {...params} className="mb-3"  label="Select Country"  />}
                        />
                        {/* {errors.country && touched.country && (
                          <span className="error-msg text-danger-ANL">
                            {errors.country}
                          </span>
                        )} */}
                        <Autocomplete
                          onBlur={handleBlur}
                          value={values.state}
                          onChange={(event, newValue) => {
                            setFieldValue("state",newValue);
                            let v = search(newValue,allState);
                            fetchAllCity1(v);
                            setState(newValue);
                            setCity("");
                          }}
                          id="controllable-states-demo"
                          options={allState.map((option)=>option.name)}
                          style={{ width: 300 }}
                          renderInput={(params) => < TextField style={{
                            width:"425px"
                        }}{...params} className="mb-3"  label="Select State"  />}
                        />
                        {/* {errors.state && touched.state && (
                          <span className="error-msg text-danger-ANL">
                            {errors.state}
                          </span>
                        )} */}
                        <Autocomplete
                          value={values.town}
                          onBlur={handleBlur}
                          onChange={(event, newValue) => {
                            setFieldValue("town",newValue);
                            setCity(newValue);
                          }}
                          id="controllable-states-demo"
                          options={allCity.map((Option)=>Option.name)}
                          style={{ width: 300 }}
                          renderInput={(params) => <TextField style={{
                            width:"425px"
                        }} {...params} className="mb-3" label="Select City"  />}
                        />
                        {/* {errors.town && touched.town && (
                          <span className="error-msg text-danger-ANL">
                            {errors.town}
                          </span>
                        )} */}
                   <TextField 
                    style={{
                        width:"425px"
                    }}
                    id="standard-basic"
                    label="Address Line" 
                    className="form-control2 mb-3"
                    name="area"
                    value={values.area}
                    // handleChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.area && touched.area}
                    //touched={touched.area}
                    onChange={(e) => {handleChange(e);setAddressLine(e.target.value)}}
                    />
                    {/* {errors.area && touched.area && (
                    <span className="error-msg text-dangerS">{errors.area}</span>
                    )}  */} 
                    <br/>
                <TextField 
                  style={{
                      width:"425px"
                  }}
                  id="standard-basic"
                  label="Pin Code" 
                  type="number"
                  className="form-control2 mb-3"
                  name="pincode"
                  value={values.pincode}
                  //handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.pincode && touched.pincode}
                  //touched={touched.pincode}
                  onChange={(e) => {handleChange(e); setPincode(e.target.value)}}
                  />
                  {/* {errors.pincode && touched.pincode && (
                  <span className="error-msg text-dangerS">{errors.pincode}</span>
                  )} */}
                    {/* <AddressField
                      error={errors.title}
                      touched={touched.title}
                      label="Address Title"
                      refe="title"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.title}
                    /> */}
                    {/* <AddressField
                      error={errors.flatno}
                      touched={touched.flatno}
                      label="Address line"
                      refe="flatno"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.flatno}
                    /> */}
                    {/* <AddressField
                      error={errors.area}
                      touched={touched.area}
                      label="Address line"
                      refe="area"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.area}
                    /> */}
                    {/* <AddressField
                      error={errors.landmark}
                      touched={touched.landmark}
                      label="Landmark"
                      refe="landmark"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.landmark}
                    /> */}
                    {/* <AddressField
                      error={errors.town}
                      touched={touched.town}
                      label="City/ Town"
                      refe="town"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.town}
                    /> */}
                    {/* <AddressField
                      error={errors.state}
                      touched={touched.state}
                      label="State"
                      refe="state"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.state}
                    />
                    <AddressField
                      error={errors.country}
                      touched={touched.country}
                      label="Country"
                      refe="country"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.country}
                    /> */}
                    {/* <AddressField
                      error={errors.pincode}
                      touched={touched.pincode}
                      label="Pincode"
                      refe="pincode"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.pincode}
                    /> */}<br/>

                    {
                      Object.keys(addr).length == 0 ? 
                      <div className="w-50 d-flex flex-row-reverse" style={{float:"right", position:"relative", left:"330px"}}>
                        <button type="submit" 
                          className="btn btn-warning"
                          style={{backgroundColor:'#b2b0aa', borderColor: '#b2b0aa'}} >
                          <i
                            className="fa fa-plus txt pr-2"
                            aria-hidden="true"
                          ></i>
                          <span className="txt">Add New Address</span>
                        </button>
                      </div> :
                        ``
                    }
                    
                  </form>
                )}
              </Formik>
            </div>
            <div className="w-50 ml-5 d-flex flex-row justify-content-between">
              <div className="pt-1 w-50 d-flex flex-row-reverse addressBtn">
                <button
                  onClick={getGeoLocation}
                  type="button"
                  className="btn btn-primary btn-sm"
                >
                  <span className="txt">Use my current location</span>
                </button>
              </div>
              <div className="pl-1 w-75 pt-1 txtAdress">
                <p className="txtColor font-13">
                  This will auto populate/ auto fill every information that is shown mandatory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;

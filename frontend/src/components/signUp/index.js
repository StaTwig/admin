import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import DropdownButton from '../../shared/dropdownButtonGroup';
import {getOrganisations} from '../../actions/productActions';
import {getOrganizationsByType} from '../../actions/userActions';
import { Formik } from "formik";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import './style.scss';
import Key from "../../assets/icons/key.png";
import User from "../../assets/icons/user.png";
import Mail from "../../assets/icons/mail.png";
import Phone from "../../assets/icons/phone.png";
import hide from "../../assets/icons/hide.png";
import eye from "../../assets/icons/eye.png";
import org from "../../assets/icons/organization.png";
import Waiting from "../../assets/icons/waiting.png";
import organisationType from "../../assets/icons/organisationType.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
import dropdownIcon from '../../assets/icons/dropdown_selected.png';
import TextField from '@material-ui/core/TextField';
import {verifyEmailAndPhoneNo} from "../../actions/userActions";

const FormPage = (props) => {
const [organisations, setOrganisations] = useState([]);
const [organisationsType, setOrganisationsType] = useState([]);
const [organisationsArr, setOrganisationsArr] = useState([]);
const [value, setValue] = useState('');
const [orgType, setorgType] = useState('');
const [selectedType,setselectedType] = useState();
const [emailError,setemailerror] = useState(false);
const [phoneError,setphoneerror] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const orgs = await getOrganisations();

      orgs.push({ id: 'Other', name: 'Other' });
      setOrganisations(orgs);
      setOrganisationsArr(orgs);
    }
    async function fetchOrganisationType() {
      const orgsType = await getOrganizationsByType("CONF000");
      var arr =[];
      arr.push(orgsType.data[0].organisationTypes);
      setOrganisationsType(arr);
    }
    // async function check(){
    //   const data = await verifyEmailAndPhoneNo("phoneNumber=919461132817");
    //   console.log(data);
    // }
    // check();
    fetchOrganisationType();
    fetchData();
  }, []);
var orgTypeArray = [];
organisationsType.map((data)=>{
  for(var i=0;i<data.length;i++){
    orgTypeArray.push(data[i].name);
  }
})
const showOrgByType = (value) =>{
  let arr = organisations.filter(data => data.type == value);
  arr.push({name:'Other'});
  return arr;
}

async function verifyEmailandPhoneNo(value){
  let result = await verifyEmailAndPhoneNo(value); 
  return result.data;
}
const changeFn = (value_new,e) => {
    setValue(value_new);
    let orgs = organisationsArr.filter(org => org.name.toLowerCase().includes(value_new.toLowerCase()));
    // orgs.push({ id: 0, name: 'Other' });
    setOrganisations(orgs);
    // console.log(organisations);

    if (organisationsArr.filter(org => org.name.toLowerCase() == value_new.toLowerCase()).length && value_new != 'Other')
      props.onOrgChange(false);
    else {
      props.onOrgChange(true);
      if (e) {
        setValue('Other');
      }
    }

  props.onOrganisationChange({id: 0, name: value_new});
  }
  
  return (
    <div className="login-wrapper">
      <div className="container">
        {/* <div className="mobile-header ">
          <div className="branding">
            <img src={logo} alt="vaccineledger" />
          </div>
        </div> */}
      
  <div className="row">
          <div className="col-m-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome,</h1>
              <p>Signup to continue</p>
            </div>
          </div>
          <div className="col-m-6 col-lg-6">
            <div className="card">
              { props.adminAwaiting ?
                <><img alt="" src={Waiting} height="150" width="150" className="align-self-center mt-5 mb-2" />
              <div className="font-weight-bold align-self-center text-center ml-2 mr-2 mb-3 approve">Request is pending and you will receive an email/sms after approval</div></>

              :
              <div className="card-body">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: '',
                  phone:'',
                  org: "",
                  type: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.firstName) {
                    errors.firstName = "Required";
                  }
                  if (!values.lastName) {
                    errors.lastName = "Required";
                  }
                  //if (!values.email) {
                   // errors.email = "Required";
                  //}
                  // if (!values.phone) {
                  //   errors.phone = "Required";
                  // }
                  if (!values.org) {
                    errors.org = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
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
                  <form onSubmit={handleSubmit} className="mb-5">
                  <div className="login-form mt-1 pl-5 pr-5 ml-5">
                 <div className="card-title p-0">Signup</div>
                  <div className="form-group flex-column ">
                   
                  <div style={{position:"absolute", left:"-10px", top:"20px"}}>
                       <img alt="" src={User} height="20px" width="18px"/>
                  </div>
                  
                  <TextField 
                  id="standard-basic"
                  label="First Name" 
                  className="form-controll ml-4"
                  name="firstName"
                  value={props.firstName}
                  onChange={(e) => { props.onfirstNameChange(e); handleChange(e);}}
                  />
                  {errors.firstName && touched.firstName && (
                  <span className="error-msg text-danger">{errors.firstName}</span>
                  )}
                  </div>
                  <div className="form-group flex-column" style={{position:"relative", top:"-10px"}}>
                  <div style={{position:"absolute", left:"-10px", top:"20px"}}>
                        <img alt="" src={User} height="20px" width="18px"/>
                  </div>
                  <TextField 
                  id="standard-basic" 
                  label="Last Name" 
                  className=" form-controll ml-4"
                  name="lastName"
                  value={props.lastName}
                  onChange={(e) => { props.onlastNameChange(e); handleChange(e);}}
                  />
                  {errors.lastName && touched.lastName && (
                    <span className="error-msg text-danger">{errors.lastName}</span>
                  )}
                  </div>


                  <div className="form-group flex-column" style={{position:"relative", top:"-20px"}}>
                  <div style={{position:"absolute", left:"-10px", top:"20px"}}>
                        <img alt="Mail Icon" src={Mail} height="15px" width="18px" />
                  </div>
                  <TextField 
                  id="standard-basic" 
                  label="Email ID" 
                  className="form-controll ml-4"
                  name="email"
                  autoCapitalize = 'none'
                  value={(props.email).toLowerCase()}
                  onChange={(e) => { props.onEmailChange(e); handleChange(e);}}
                  // onBlur={console.log("Deepak")}
                  handleBlur={props.email?verifyEmailAndPhoneNo(`emailId=${props.email}`).then((v)=>{
                    if(v.data.length){
                      setemailerror(true);
                  }else{
                    setemailerror(false)
                  }
                }):null}
                  />
                  {errors.email && touched.email && (
                    <span className="error-msg text-danger">{errors.email}</span>
                  )}
                  {emailError && (
                    <span className="error-msg text-danger">Email ID Already registered</span>
                  )}
                  </div>

                  <div className="form-group" style={{position:"relative", left:"-15px", bottom:"20px"}}>
                  <div style={{position:"absolute", left:"4px", top:"10px"}}>
                        <img alt="Phone icon" src={Phone} height="20px" width="19px" />
                  </div>
                  <PhoneInput
                      country={'in'}
                      placeholder='Enter Phone number'
                      inputProps={{
                        name: 'phone',
                        required:false,
                        defaultCountry:"IN",
                        enableSearch: true,
                      }}
                      value={props.phone}
                      onChange={(e)=>{props.onphoneChange(e)}}
                      handleBlur={props.phone?verifyEmailAndPhoneNo(`phoneNumber=${props.phone}`).then((v)=>{if(v.data[0].phoneNumber=="+"+props.phone){
                        setphoneerror(true);
                    }else{setphoneerror(false);}}):null}
                      onChange = {props.onphoneChange}
                    /></div>
                   {errors.phone && touched.phone && (
                    <span className="error-msg text-danger">{errors.phone}</span>
                  )}
                  {phoneError && (
                    <span className="error-msg text-danger">Mobile No. Already registered</span>
                  )}
                  <div className="pb-3"></div>
                 
                            
                   
                  <div className="form-group" style={{position:"relative", left:"30px", bottom:"0px"}}>
                  <div style={{position:"absolute", left:"-40px", top:"10px", color:"black"}}>
                        <img alt="Phone icon" src={organisationType} height="30px" width="25px" />
                  </div>  
                  <div className="form-controll">
                  {/* <Select
                      isText={true}
                      value={orgType}
                      placeholder='Organisation Type'
                      onChange={item =>{
                        setFieldValue('type', item);
                        props.onOrgTypeChange(item);
                        setselectedType(item);
                        setorgType(item);
                        setValue('');
                      }}
                      options={orgTypeArray}
                        /> */}
                   <DropdownButton
                      isText={true}
                      value={orgType}
                      placeholder='Organisation Type'
                      onSelect={item => {
                        setFieldValue('type', item);
                        props.onOrgTypeChange(item);
                        setselectedType(item);
                        setorgType(item);
                        setValue('');
                      }}
                      groups={orgTypeArray}
                      dClass="ml-1"
                      className="text"
                    /> 
                    </div>
                    <div style={{position:"relative", left:"-35px", top:"10px",cursor:"pointer"}}>
                        <img src={dropdownIcon} width="15" height="10" />
                    </div>
                    { errors.org && touched.org &&  (
                      <span  className="error-msg text-danger "> {errors.org} </span>
                    )}
                    </div>  
                    
                    

                    <div className="form-group" style={{position:"relative", left:"30px", bottom:"-12px"}}>
                    <div style={{position:"absolute ", left:"-38px", top:"10px", color:"black"}}>
                       <img alt="Phone icon" src={org} height="20px" width="23px" />
                    </div>
                    <div className="form-controll ">
                    <DropdownButton
                    name={props.organisation.organisationId}
                    value={value}
                    isText={true}
                    placeholder='Organisation Name'
                    onSelect={item => {
                      setFieldValue('org', item);
                      props.onOrganisationChange(item);
                        if(item.name!='Other'){
                          setValue(item.name);
                          props.onOrgChange(false);
                        }
                        if(item.name =='Other'){
                          props.onOrgChange(true);
                        }
                    }}
                    groups={showOrgByType(selectedType)}
                        //   changeFn={(v, e = '') => {
                        //     console.log(v);
                        //     setFieldValue('org', v); 
                        //     changeFn(v, e);
                        //  }}
                    dClass="ml-1"
                    className="text"
                  /> 
                  </div>
                  <div style={{position:"relative", left:"-50px", top:"10px",cursor:"pointer"}}>
                  <img src={dropdownIcon} width="15" height="10" className="ml-3" />
                  </div>
                  {errors.org && touched.org && (
                    <span className="error-msg text-danger">{errors.org}</span>
                  )}
                  </div>
                  {
                  props.errorMessage && <div className="alert alert-danger">{props.errorMessage}</div>
                  }
                  
                  <div className="text-center" >
                    <br></br>
                  <button type="submit" className="btn btn-primary mr-5" >
                  SIGNUP
                  </button>
                    </div>
                        <div className="signup-link text-center mt-3 mb-4 mr-5">
                  Already have an Account? <Link to="/login">Login</Link>
                  </div>
                  </div></form>
                )}
              </Formik>
                  </div>
              }   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;




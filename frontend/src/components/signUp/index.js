import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import DropdownButton from '../../shared/dropdownButtonGroup';
import {getOrganisations} from '../../actions/productActions';
import {getOrganizationsByType} from '../../actions/userActions';
import { Formik } from "formik";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import '../login/style.scss';
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

const FormPage = (props) => {
const [organisations, setOrganisations] = useState([]);
const [organisationsType, setOrganisationsType] = useState([]);
const [organisationsArr, setOrganisationsArr] = useState([]);
const [value, setValue] = useState('');
const [orgType, setorgType] = useState('');
const [selectedType,setselectedType] = useState();
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
  return arr;
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
                <><img alt="" src={Waiting} height="150" width="150" className="align-self-center mt-5 mb-4" />
              <div className="font-weight-bold align-self-center text-center ml-2 mr-2 mb-5 approve">Request is pending and you will receive an email/sms after approval</div></>
              
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
                  <form onSubmit={handleSubmit} className="mb-3">
                  <div className="login-form mt-3 pl-5 pr-5">
                  
                  <div className="card-title p-0">Signup</div>
                  <div className="form-group flex-column">
                    <div className="pb-1">
                  <img alt="" src={User} className="icon imgs"/></div>
                  <input type="text"
                  className="form-control-login"
                  name="firstName"
                  value={props.firstName}
                  onChange={(e) => { props.onfirstNameChange(e); handleChange(e);}}
                  placeholder="    First Name" />
                  {errors.firstName && touched.firstName && (
                    <span className="error-msg text-danger">{errors.firstName}</span>
                  )}
                  </div>
                  <div className="form-group flex-column">
                  <div className="pb-1">
                  <img alt="" src={User} className="icon imgs" /></div>
                  <input type="text"
                  className="form-control-login"
                  name="lastName"
                  value={props.lastName}
                  onChange={(e) => { props.onlastNameChange(e); handleChange(e);}}
                  placeholder="    Last Name" />
                  {errors.lastName && touched.lastName && (
                    <span className="error-msg text-danger">{errors.lastName}</span>
                  )}
                  </div>
                  <div className="form-group flex-column">
                  <div className="pb-1">
                  <img alt="Mail Icon" src={Mail} className="icon imgs" /></div>
                  <input type="text"
                  className="form-control-login"
                  name="email"
                  autoCapitalize = 'none'
                  value={(props.email).toLowerCase()}
                  onChange={(e) => { props.onEmailChange(e); handleChange(e);}}
                  placeholder="    Email ID" />
                  {errors.email && touched.email && (
                    <span className="error-msg text-danger">{errors.email}</span>
                  )}
                  </div>

                  <div className="form-group flex-column">
                  <div className="pb-1">
                  <img alt="" src={Phone} className="icon imgsPhone" /></div>
                    <PhoneInput
                      country={'in'}
                      placeholder='Enter Phone number'
                      inputProps={{
                        name: 'phone',
                        required:false,
                        defaultCountry:"US",
                        enableSearch: true,
                      }}
                      value={props.phone}

                      onChange = {props.onphoneChange}
                    />
                   {errors.phone && touched.phone && (
                    <span className="error-msg text-danger">{errors.phone}</span>
                  )}
                  <div className="pb-3"></div>
                  </div>
          
                  <div className="form-group flex-column">               
                  <div className="pl-4" style={{color:"black"}}>
                    <img alt="" src={organisationType} className="icon imgs" />
                    <DropdownButton
                      isText={true}
                      value={orgType}
                      placeholder='  Organisation Type'
                      onSelect={item => {
                        setselectedType(item);
                        setorgType(item);
                        setValue("");
                      }}
                      groups={orgTypeArray}
                      dClass="ml-4"
                      className="text"
                    />   
                                      {errors.org && touched.org && (
                    <span className="error-msg text-danger">{errors.org}</span>
                  )}
                     </div></div>
                    <div className="pb-4"></div>
                  <div className="form-group flex-column">               
                  <div className="pl-4" style={{color:"black"}}>
                    <img alt="" src={org} className="icon imgs" />
                  <DropdownButton
                    name={props.organisation.organisationId}
                    value={value}
                    isText={true}
                    placeholder='  Organisation Name'
                    onSelect={item => {
                      setFieldValue('org', item);
                      props.onOrganisationChange(item);
                      let orgs = organisationsArr.filter(org => org.name == item.name);
                      if (orgs.length && item.name != 'Other')
                        props.onOrgChange(false);
                      else
                        props.onOrgChange(true);
                        setValue(item.name);
                    }}
                    groups={showOrgByType(selectedType)}
                  //   changeFn={(v, e = '') => {
                  //     console.log(v);
                  //     setFieldValue('org', v); 
                  //     changeFn(v, e);
                  //  }}
                    dClass="ml-4"
                    className="text"
                  /> 
                  {errors.org && touched.org && (
                    <span className="error-msg text-danger">{errors.org}</span>
                  )}
                  </div>
                  </div>
              {
                  props.errorMessage && <div className="alert alert-danger">{props.errorMessage}</div>
              }
                  <div className="text-center mt-2">
                    <br></br>
                  <button type="submit" className="btn btn-primary" >
                  SIGNUP
                  </button>
                    </div>
                        <div className="signup-link text-center mt-2">
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




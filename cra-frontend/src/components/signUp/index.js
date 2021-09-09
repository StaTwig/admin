import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownButton from "../../shared/dropdownButtonGroup";
import { getOrganisations } from "../../actions/productActions";
import { getOrganizationsByType } from "../../actions/userActions";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./style.scss";
import Key from "../../assets/icons/key.png";
import User from "../../assets/icons/user.png";
import Mail from "../../assets/icons/mail.png";
import Phone from "../../assets/icons/phone.png";
import hide from "../../assets/icons/hide.png";
import eye from "../../assets/icons/eye.png";
import org from "../../assets/icons/org.png";
import Waiting from "../../assets/icons/waiting.png";
import organisationType from "../../assets/icons/organisationType.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
import dropdownIcon from "../../assets/icons/dropdown_selected.png";
import TextField from "@material-ui/core/TextField";
import { verifyEmailAndPhoneNo } from "../../actions/userActions";
import { Alert, AlertTitle } from "@material-ui/lab";

const FormPage = (props) => {
  const [organisations, setOrganisations] = useState([]);
  const [organisationsType, setOrganisationsType] = useState([]);
  const [organisationsArr, setOrganisationsArr] = useState([]);
  const [value, setValue] = useState("");
  const [orgType, setorgType] = useState("");
  const [selectedType, setselectedType] = useState();
  const [emailError, setemailerror] = useState(false);
  const [phoneError, setphoneerror] = useState(false);
  const [signupDisable, setsignupDisable] = useState(true);
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [checker, setChecker] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const orgs = await getOrganisations();

      orgs.push({ id: "Other", name: "Other" });
      setOrganisations(orgs);
      setOrganisationsArr(orgs);
    }
    async function fetchOrganisationType() {
      const orgsType = await getOrganizationsByType("CONF000");
      var arr = [];
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
  organisationsType.map((data) => {
    for (var i = 0; i < data.length; i++) {
      orgTypeArray.push(data[i].name);
    }
  });
  const showOrgByType = (value) => {
    let arr = organisations.filter((data) => data.type == value);
    arr.push({ name: "Other" });
    return arr;
  };

  async function verifyEmailandPhoneNo(value) {
    let result = await verifyEmailAndPhoneNo(value);
    return result.data;
  }
  const changeFn = (value_new, e) => {
    setValue(value_new);
    let orgs = organisationsArr.filter((org) =>
      org.name.toLowerCase().includes(value_new.toLowerCase())
    );
    // orgs.push({ id: 0, name: 'Other' });
    setOrganisations(orgs);
    // console.log(organisations);

    if (
      organisationsArr.filter(
        (org) => org.name.toLowerCase() == value_new.toLowerCase()
      ).length &&
      value_new != "Other"
    )
      props.onOrgChange(false);
    else {
      props.onOrgChange(true);
      if (e) {
        setValue("Other");
      }
    }

    props.onOrganisationChange({ id: 0, name: value_new });
  };

  // console.log(firstName);
  // console.log(lastName);
  // console.log(orgType);
  // console.log(email);
  // console.log(value);
  // console.log(mobileNumber);
  if (
    checker &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    orgType.length > 0 &&
    value.length > 0 &&
    (email.length > 0 || mobileNumber.length > 0)
  ) {
    console.log("Entered");
    console.log(firstName);
    console.log(lastName);
    console.log(orgType);
    console.log(email);
    console.log(value);
    console.log(mobileNumber);
    setsignupDisable(false);
    setChecker(false);
  }

  return (
    <div className='login-wrapper'>
      <div className='container'>
        {/* <div className="mobile-header ">
          <div className="branding">
            <img src={logo} alt="vaccineledger" />
          </div>
        </div> */}

        <div className='row'>
          <div className='col-m-6 col-lg-6'>
            <div className='form-content'>
              <img className='logo' src={logo} alt='Logo' />
              <h1>Welcome,</h1>
              <p>Signup to continue</p>
            </div>
          </div>
          <div className='col-m-6 col-lg-6'>
            <div className='card'>
              {props.adminAwaiting ? (
                <>
                  <img
                    alt=''
                    src={Waiting}
                    height='150'
                    width='150'
                    className='align-self-center mt-5 mb-2'
                  />
                  <div className='font-weight-bold align-self-center text-center ml-2 mr-2 mb-3 approve'>
                    Request is pending and you will receive an email/sms after
                    approval
                  </div>
                </>
              ) : (
                <div className='card-body'>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      org: "",
                      type: "",
                    }}
                    validate={(values) => {
                      const errors = {};
                      console.log(values);
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
                      //    errors.phone = "Required";
                      //  }
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
                      <form onSubmit={handleSubmit} className='mb-5'>
                        <div className='login-form mt-1 pl-5 pr-5 ml-5'>
                          <div className='card-title mr-5'>Signup</div>
                          <div className='form-group flex-column '>
                            <div
                              style={{
                                position: "absolute",
                                left: "-9px",
                                top: "20px",
                              }}
                            >
                              <img
                                alt=''
                                src={User}
                                height='19px'
                                width='17px'
                              />
                            </div>

                            <TextField
                              id='standard-basic'
                              label='First Name'
                              className='form-controll ml-4'
                              name='firstName'
                              value={props.firstName}
                              onChange={(e) => {
                                setChecker(true);
                                console.log(e.target.value.length);
                                if (e.target.value.length > 0) {
                                  setFirstNameError(false);
                                } else {
                                  setsignupDisable(true);
                                }
                                setFirstName(e.target.value);
                                props.onfirstNameChange(e);
                                handleChange(e);
                              }}
                            />
                            {errors.firstName && touched.firstName && (
                              <span className='error-msg text-dangerS'>
                                {errors.firstName}
                              </span>
                            )}

                            {firstNameError && (
                              <span className='error-msg text-dangerS'>
                                First Name is required
                              </span>
                            )}
                          </div>

                          <div
                            className='form-group flex-column'
                            style={{ position: "relative", top: "-10px" }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "-9px",
                                top: "20px",
                              }}
                            >
                              <img
                                alt=''
                                src={User}
                                height='19px'
                                width='17px'
                              />
                            </div>
                            <TextField
                              id='standard-basic'
                              label='Last Name'
                              className=' form-controll ml-4'
                              name='lastName'
                              value={props.lastName}
                              onChange={(e) => {
                                setChecker(true);
                                console.log(e.target.value.length);
                                if (e.target.value.length > 0) {
                                  setLastNameError(false);
                                } else {
                                  setsignupDisable(true);
                                }
                                setLastName(e.target.value);
                                props.onlastNameChange(e);
                                handleChange(e);
                              }}
                            />
                            {errors.lastName && touched.lastName && (
                              <span className='error-msg text-dangerS'>
                                {errors.lastName}
                              </span>
                            )}

                            {lastNameError && (
                              <span className='error-msg text-dangerS'>
                                Last Name is required
                              </span>
                            )}
                          </div>

                          <div
                            className='form-group flex-column'
                            style={{ position: "relative", top: "-20px" }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "-10px",
                                top: "20px",
                              }}
                            >
                              <img
                                alt='Mail Icon'
                                src={Mail}
                                height='14px'
                                width='19px'
                              />
                            </div>
                            <TextField
                              id='standard-basic'
                              label='Email ID'
                              className='form-controll ml-4'
                              name='email'
                              autoCapitalize='none'
                              value={props.email.toLowerCase()}
                              onChange={(e) => {
                                setChecker(true);
                                console.log(e.target.value);
                                if (e.target.value.length > 0) {
                                  setPhoneNumberError(false);
                                  setMailError(false);
                                  console.log(mailError);
                                } else {
                                  setsignupDisable(true);
                                }
                                setEmail(e.target.value);
                                props.onEmailChange(e);
                                handleChange(e);
                              }}
                              handleBlur={
                                props.email
                                  ? verifyEmailAndPhoneNo(
                                      `emailId=${props.email}`
                                    ).then((v) => {
                                      if (v.data.length) {
                                        setemailerror(true);
                                        //setemailerror(true);
                                        setsignupDisable(true);
                                      } else {
                                        setemailerror(false);
                                        //setsignupDisable(false);
                                        //setsignupDisable(false);
                                      }
                                    })
                                  : null
                              }
                            />
                            {errors.email && touched.email && (
                              <span className='error-msg text-dangerS'>
                                {errors.email}
                              </span>
                            )}
                            {emailError && (
                              <span className='error-msg text-dangerS'>
                                Email ID Already registered
                              </span>
                            )}
                            {phoneNumberError && (
                              <span className='error-msg text-dangerS'>
                                Phone Number or Email ID is required
                              </span>
                            )}
                          </div>

                          <div
                            className='form-group'
                            style={{
                              position: "relative",
                              left: "-15px",
                              bottom: "20px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "4px",
                                top: "10px",
                              }}
                            >
                              <img
                                alt='Phone icon'
                                src={Phone}
                                height='20px'
                                width='20px'
                              />
                            </div>

                            <PhoneInput
                              country={"in"}
                              placeholder='Enter Phone number'
                              inputProps={{
                                name: "phone",
                                required: false,
                                defaultCountry: "IN",
                                enableSearch: true,
                              }}
                              value={props.phone}
                              onChange={(e) => {
                                setChecker(true);
                                if (e.length > 0) {
                                  setPhoneNumberError(false);
                                } else {
                                  setsignupDisable(true);
                                }
                                setMobileNumber(e);
                                props.onphoneChange(e);
                              }}
                              handleBlur={
                                props.phone
                                  ? verifyEmailAndPhoneNo(
                                      `phoneNumber=${props.phone}`
                                    ).then((v) => {
                                      console.log("Hi");
                                      console.log(v.data, "Data");
                                      if (v.data[0].phoneNumber) {
                                        setphoneerror(true);
                                        // setsignupDisable(true);
                                      } else {
                                        setphoneerror(false);
                                        //setsignupDisable(false);
                                      }
                                    })
                                  : null
                              }
                            />
                          </div>
                          {errors.phone && touched.phone && (
                            <span className='error-msg text-dangerS'>
                              {errors.phone}
                            </span>
                          )}
                          {phoneError && (
                            <span className='error-msg text-dangerS'>
                              Mobile No. Already registered
                            </span>
                          )}
                          {phoneNumberError && (
                            <span className='error-msg text-dangerS'>
                              Phone Number or Email ID is required
                            </span>
                          )}

                          <div className='pb-3'></div>
                          <div
                            className='form-group'
                            style={{
                              position: "relative",
                              left: "30px",
                              bottom: "0px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "-40px",
                                top: "14px",
                                color: "black",
                              }}
                            >
                              <img
                                alt='Phone icon'
                                src={organisationType}
                                height='28px'
                                width='24px'
                              />
                            </div>
                            <div
                              className='form-controll'
                              style={{
                                position: "relative",
                                bottom: "5px",
                                width: "345px",
                              }}
                            >
                              <Autocomplete
                                value={orgType}
                                onChange={(event, item) => {
                                  setChecker(true);
                                  console.log("Hi");
                                  if (firstName.length <= 0) {
                                    console.log("Hi1");
                                    setFirstNameError(true);
                                  }
                                  if (lastName.length <= 0) {
                                    setLastNameError(true);
                                  }
                                  if (
                                    mobileNumber.length <= 0 &&
                                    email.length <= 0
                                  ) {
                                    setPhoneNumberError(true);
                                  }

                                  setFieldValue("type", item);
                                  props.onOrgTypeChange(item);
                                  setselectedType(item);
                                  setorgType(item);
                                  setValue("");
                                }}
                                id='debug'
                                options={orgTypeArray}
                                debug
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Organisation Type'
                                  />
                                )}
                              />

                              {/* <Select
                        isText={true}
                        value={orgType}
                        placeholder='Organisation Type'
                        onChange={item =>{
                          setChecker(true);
                          setFieldValue('type', item);
                          props.onOrgTypeChange(item);
                          setselectedType(item);
                          setorgType(item);
                          setValue('');
                        }}
                        options={orgTypeArray}
                          /> */}
                              {/* <DropdownButton
                      isText={true}
                      value={orgType}
                      placeholder='Organisation Type'
                      onSelect={item => {
                        setChecker(true);
                        console.log('Hi');
                        if(firstName.length<=0)
                        {
                          console.log("Hi1");
                          setFirstNameError(true);
                        }
                        if(lastName.length <=0)
                        {
                          setLastNameError(true);
                        }
                        if(mobileNumber.length <=0 && email.length <=0)
                        {
                            setPhoneNumberError(true);
                        }
                       
                        setFieldValue('type', item);
                        props.onOrgTypeChange(item);
                        setselectedType(item);
                        setorgType(item);
                        setValue('');
                      }}
                      groups={orgTypeArray}
                      dClass="ml-1"
                      className="text"
                    />  */}
                            </div>
                            {/* <div style={{position:"relative", left:"-35px", top:"10px",cursor:"pointer"}}>
                        <img src={dropdownIcon} width="15" height="10" />
                  </div> */}
                            {errors.org && touched.org && (
                              <span className='error-msg text-dangerO '>
                                {" "}
                                {errors.org}{" "}
                              </span>
                            )}
                          </div>

                          <div
                            className='form-group'
                            style={{
                              position: "relative",
                              left: "30px",
                              bottom: "-12px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute ",
                                left: "-38px",
                                top: "-1px",
                                color: "black",
                              }}
                            >
                              <img
                                alt='Phone icon'
                                src={org}
                                height='19px'
                                width='22px'
                              />
                            </div>
                            <div
                              className='form-controll'
                              style={{
                                position: "relative",
                                bottom: "25px",
                                width: "345px",
                              }}
                            >
                              <Autocomplete
                                onChange={(event, item) => {
                                  console.log(item, "item-------------");
                                  console.log(
                                    "lastName Length " + lastName.length
                                  );
                                  if (firstName.length <= 0) {
                                    console.log("Hi1");
                                    setFirstNameError(true);
                                  }
                                  if (lastName.length <= 0) {
                                    setLastNameError(true);
                                  }
                                  if (
                                    mobileNumber.length <= 0 &&
                                    email.length <= 0
                                  ) {
                                    setPhoneNumberError(true);
                                  }
                                  setFieldValue("org", item);
                                  props.onOrganisationChange(item);
                                  if (item.name != "Other") {
                                    setValue(item.name);
                                    props.onOrgChange(false);
                                  }
                                  if (item.name == "Other") {
                                    props.onOrgChange(true);

                                    if (
                                      firstName.length > 0 &&
                                      lastName.length > 0 &&
                                      orgType.length > 0 &&
                                      (email.length > 0 ||
                                        mobileNumber.length > 0)
                                    ) {
                                      props.onOrgChange(true);
                                    } else {
                                      setPhoneNumberError(true);
                                      props.onOrgChange(false);
                                    }
                                  }
                                }}
                                id='debug'
                                debug
                                getOptionLabel={(option) => option.name}
                                options={showOrgByType(selectedType)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Organisation Name'
                                  />
                                )}
                              />

                              {/* <DropdownButton
                    name={props.organisation.organisationId}
                    value={value}
                    isText={true}
                    placeholder='Organisation Name'
                    onSelect={item => {
                      console.log("lastName Length " + lastName.length);
                      if(firstName.length<=0)
                      {
                        console.log("Hi1");
                        setFirstNameError(true);
                      }
                      if(lastName.length <=0)
                      {
                        setLastNameError(true);
                      }
                      if(mobileNumber.length <=0 && email.length <=0)
                        {
                            setPhoneNumberError(true);
                        }
                     
                      setFieldValue('org', item);
                      props.onOrganisationChange(item);
                        if(item.name!='Other'){
                          setValue(item.name);
                          props.onOrgChange(false);
                        }
                        if(item.name =='Other'){
                          props.onOrgChange(true);

                          if(firstName.length > 0 && lastName.length > 0 && orgType.length > 0 && (email.length > 0  || mobileNumber.length >0))
                          {
                            props.onOrgChange(true);
                          }
                          else{
                            setPhoneNumberError(true);
                             props.onOrgChange(false);
                          }
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
                  />  */}
                            </div>
                            {/* <div style={{position:"relative", left:"-50px", top:"10px",cursor:"pointer"}}>
                  <img src={dropdownIcon} width="15" height="10" className="ml-3" />
                  </div> */}
                            {errors.org && touched.org && (
                              <span className='error-msg text-dangerON'>
                                {errors.org}
                              </span>
                            )}
                          </div>
                          {props.errorMessage && (
                            <div className='mt-3 mr-4'>
                              {" "}
                              <Alert variant='filled' severity='error'>
                                <AlertTitle>Error</AlertTitle>
                                {props.errorMessage}
                              </Alert>
                            </div>
                          )}

                          <div className='text-center'>
                            <br></br>
                            {console.log(signupDisable)}
                            <button
                              type='submit'
                              className='buttonS btn btn-primary mr-5'
                              disabled={signupDisable}
                            >
                              SIGNUP
                            </button>
                          </div>
                          <div className='signup-link text-center mt-3 mb-4 mr-5'>
                            Already have an Account?{" "}
                            <Link to='/login'>
                              <b>Login</b>
                            </Link>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;

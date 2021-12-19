import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrganisations } from "../../actions/productActions";
import { getOrganizationsByType } from "../../actions/userActions";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./style.scss";
import User from "../../assets/icons/user.png";
import Mail from "../../assets/icons/mail.png";
import Phone from "../../assets/icons/phone.png";
import org from "../../assets/icons/org.png";
import Waiting from "../../assets/icons/waiting.png";
import organisationType from "../../assets/icons/organisationType.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
import TextField from "@material-ui/core/TextField";
import { verifyEmailAndPhoneNo } from "../../actions/userActions";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';

const FormPage = (props) => {
  const { t, i18n } = useTranslation();
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
  const other = t('other');
  useEffect(() => {
    async function fetchData() {
      const orgs = await getOrganisations();
      
      orgs.push({ id: t('other'), name: t('other') });
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
    let arr = organisations.filter((data) => data.type === value);
    arr.push({ name: t('other') });
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
    setOrganisations(orgs);
    if (
      organisationsArr.filter(
        (org) => org.name.toLowerCase() === value_new.toLowerCase()
      ).length &&
      value_new !== t('other')
    )
      props.onOrgChange(false);
    else {
      props.onOrgChange(true);
      if (e) {
        setValue(t('other'));
      }
    }
    props.onOrganisationChange({ id: 0, name: value_new });
  };

  if (
    checker &&
    firstName?.length > 0 &&
    lastName?.length > 0 &&
    orgType?.length > 0 &&
    value?.length > 0 &&
    (email?.length > 0 || mobileNumber?.length > 0)
  ) {
    setsignupDisable(false);
    setChecker(false);
  }

  return (
    <div className='login-wrapper'>
      <div className='container'>
        <div className='mobile-header '>
          <div className='branding'>
            <img src={logo} alt='vaccineledger' />
          </div>
        </div>

        <div className='row'>
          <div className='col-m-6 col-lg-6'>
            <div className='form-content'>
              <img className='logo' src={logo} alt='Logo' />
              <h1>{t('welcome')},</h1>
              <p>{t('signup')} {t('to')} {t('continue').toLowerCase()}</p>
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
                    {t('signup_success_message')}
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
                      if (!values.firstName) {
                        errors.firstName = t('required');
                      }
                      if (!values.lastName) {
                        errors.lastName = t('required');
                      }
                      //if (!values.email) {
                      // errors.email = "Required";
                      //}
                      // if (!values.phone) {
                      //    errors.phone = "Required";
                      //  }
                      if (!values.org) {
                        errors.org = t('required');
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
                              <div className='card-title mr-5'>{t('signup')}</div>
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
                              label={t('first_name')}
                              className='form-controll ml-4'
                              name='firstName'
                              value={props.firstName}
                              onChange={(e) => {
                                setChecker(true);
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
                                {t('first_name')} {t('is')} {t('required')}
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
                              label={t('last_name')}
                              className=' form-controll ml-4'
                              name='lastName'
                              value={props.lastName}
                              onChange={(e) => {
                                setChecker(true);
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
                                {t('last_name')} {t('is')} {t('required')}
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
                              label={t('email_id')}
                              className='form-controll ml-4'
                              name='email'
                              autoCapitalize='none'
                              value={props.email.toLowerCase()}
                              onChange={(e) => {
                                setChecker(true);
                                if (e.target.value.length > 0) {
                                  setPhoneNumberError(false);
                                  setMailError(false);
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
                                {t('email_id')} {t('already')} {t('registered')}
                              </span>
                            )}
                            {phoneNumberError && (
                              <span className='error-msg text-dangerS'>
                                {t('phone_number')} {t('or')} {t('email_id')} {t('is')} {t('required')}
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
                              placeholder={t('enter_phone_number')}
                              inputProps={{
                                name: "phone",
                                required: false,
                                // defaultCountry: "IN",
                                // enableSearch: true,
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
                              {t('phone_number')} {t('already')} {t('registered')}
                            </span>
                          )}
                          {phoneNumberError && (
                            <span className='error-msg text-dangerS'>
                             {t('phone_number')} {t('or')} {t('email_id')} {t('is')} {t('required')}
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
                                  if (firstName.length <= 0) {
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
                                    label={t('organisation') + " " + t('type')}
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
                        if(firstName.length<=0)
                        {
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
                                  if (firstName.length <= 0) {
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
                                  if (item.name !== t('other')) {
                                    setValue(item.name);
                                    props.onOrgChange(false);
                                  }
                                  if (item.name === t('other')) {
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
                                getOptionLabel={(option) => option.name.toLocaleLowerCase()}
                                options={showOrgByType(selectedType)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label={t('organisation')+" "+t('name')}
                                  />
                                )}
                              />

                              {/* <DropdownButton
                    name={props.organisation.organisationId}
                    value={value}
                    isText={true}
                    placeholder='Organisation Name'
                    onSelect={item => {
                      if(firstName.length<=0)
                      {
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
                                <AlertTitle>{t('error')}</AlertTitle>
                                {props.errorMessage}
                              </Alert>
                            </div>
                          )}

                          <div className='text-center'>
                            <br></br>
                            <button
                              type='submit'
                              className='buttonS btn btn-primary mr-5'
                              disabled={signupDisable}
                            >
                              {t('signup')}
                            </button>
                          </div>
                          <div className='signup-link text-center mt-3 mb-4 mr-5'>
                                {t('already')} {t('have')} {t('an')} {t('account')}?{" "}
                            <Link to='/login'>
                              <b>{t('login')}</b>
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

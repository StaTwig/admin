import React, { useState } from "react";

import logo from "../../assets/ABInBev.png";

const SignUp = (props) => {
  const {
    setSteps,
    setContinueClick,
    onSignUpClick
  } = props;
  const [values, setValues] = useState({ firstName: '', lastName: '', mobile_email: '', organisation: '' });
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
  }

  const handleChange = (property, e) => {
    if (property === 'firstName') {
      setValues({
        ...values,
        firstName: e.target.value
      });
    } else if (property === 'lastName') {
      setValues({
        ...values,
        lastName: e.target.value
      });
    } else if (property === 'mobile_email') {
      setValues({
        ...values,
        mobile_email: e.target.value
      });
    } else if (property === 'organisation') {
      setValues({
        ...values,
        organisation: e.target.value
      });
    }
  }

  const handleSignUpClick = () => {
    let errorMessages = [];
    if (!isValidEmail(values.mobile_email)) {
      errorMessages.push('Invalid Email/Mobile number provided');
    }
    if (isBlank(values.firstName)) {
      errorMessages.push('Invalid First name provided');
    }
    if (isBlank(values.lastName)) {
      errorMessages.push('Invalid Last name provided');
    }
    if (isBlank(values.organisation)) {
      errorMessages.push('Invalid organisation provided');
    }
    if (errorMessages.length) {
      setErrorMessages(errorMessages);
      setDisplayErrorMessage(true);
    } else {
      onSignUpClick(values);
    }

  }

  return (
    <div className="signUpScreen">
      <div className="align-center pb-5 pt-5">
        <h2 className="titleSubHeading">Welcome Back!</h2>
        <span className="titleSubHeading"><span className="titleHeading">Sign Up</span> to continue.</span>
      </div>

      <div className="loginUserBlock justify-content-center">
        <div className="form-group">
          <label htmlFor="firstName" className="userNameLabel mb-1">First Name</label>
          <input name="firstName" className="form-control username mb-3" value={values.firstName}
            onChange={(e) => { handleChange('firstName', e); }} />

          <label htmlFor="lastName" className="userNameLabel mb-1">Last Name</label>
          <input name="lastName" className="form-control username mb-3" value={values.lastName}
            onChange={(e) => { handleChange('lastName', e); }} />

          <label htmlFor="mobileemail" className="userNameLabel mb-1">Mobile No / Email ID</label>
          <input name="mobileemail" className="form-control username mb-3" value={values.mobile_email}
            onChange={(e) => { handleChange('mobile_email', e); }} />

          <label htmlFor="organisation" className="organisationLabel mb-1">Organisation</label>
          <input name="organisation" className="form-control organisation mb-3" value={values.organisation}
            onChange={(e) => { handleChange('organisation', e); }} />

          <button
            onClick={() => {
              handleSignUpClick();
            }}
            className={`width100 btn mt-4`}
            type="button"
          >
            GET STARTED
          </button>
          <p className="signUpDesc align-center mt-3 ">Already have an account? <a href="#" onClick={
            () => {
              setContinueClick(true);
              setSteps(2);
            }
          } className="signUpLink">Log In</a></p>
        </div>
      </div>
      <div className="loginUserBlock justify-content-center">
        {
          displayErrorMessage ?
            <>
              <ul className="error-messages">
                {
                  errorMessages.map((message, index) => (
                    <li key="index">
                      {message}
                    </li>)
                  )
                }
              </ul>
            </> : ""
        }
      </div>
      <div className="col text-center footer-logo">
        <img src={logo} width={60} />
      </div>
    </div>
  );
};

export default SignUp;

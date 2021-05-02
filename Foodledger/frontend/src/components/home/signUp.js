import React, { useState } from "react";
import { Formik } from "formik";
import logo from "../../assets/ABInBev.png";

const SignUp = (props) => {
  const {
    setSteps,
    setContinueClick,
    onSignUpClick
  } = props;

  const [responseError, SetResponseError] = useState('');
  
  return (
    <div className="signUpScreen">
      <div className="align-center pb-5 pt-5">
        <h2 className="titleSubHeading">Welcome Back!</h2>
        <span className="titleSubHeading"><span className="titleHeading">Sign Up</span> to continue.</span>
      </div>
      <Formik
        initialValues={{
          firstName: '', lastName: '', mobileemail: '', organisation: ''
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Required";
          }
          if (!values.lastName) {
            errors.lastName = "Required";
          }
          if (!values.mobileemail) {
            errors.mobileemail = "Required";
          }
          if (!values.organisation) {
            errors.organisation = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          const result = await onSignUpClick(values);
          
          SetResponseError(result.msg);
          
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
          <form onSubmit={handleSubmit} className="">
      <div className="loginUserBlock justify-content-center">
        <div className="form-group">
          <label htmlFor="firstName" className="userNameLabel mb-1">First Name</label>
          <input 
            name="firstName" 
            className={`form-control username ${errors.firstName ? `` : `mb-3`}`}
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && touched.firstName && (
            <div className="error-msg text-danger mb-3">{errors.firstName}</div>
          )}

          <label htmlFor="lastName" className="userNameLabel mb-1">Last Name</label>
          <input 
            name="lastName" 
            className={`form-control username ${errors.lastName  ? `` :  `mb-3`}`}
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur} 
          />
          {errors.lastName && touched.lastName && (
            <div className="error-msg text-danger mb-3">{errors.lastName}</div>
          )}

          <label htmlFor="mobileemail" className="userNameLabel mb-1">Mobile No / Email ID</label>
          <input 
            name="mobileemail" 
            className={`form-control username ${errors.mobileemail  ? `` :  `mb-3`}`}
            value={values.mobileemail}
            onChange={handleChange}
            onBlur={handleBlur} 
          />
          {errors.mobileemail && touched.mobileemail && (
            <div className="error-msg text-danger mb-3">{errors.mobileemail}</div>
          )}

          <label htmlFor="organisation" className="organisationLabel mb-1">Organisation</label>
          <input 
            name="organisation" 
            className={`form-control organisation ${errors.organisation  ? `` :  `mb-3`}`}
            value={values.organisation}
            onChange={handleChange}
            onBlur={handleBlur} 
          />
          {errors.organisation && touched.organisation && (
            <div className="error-msg text-danger mb-3">{errors.organisation}</div>
          )}
          {responseError && <div className="text-danger mt-2 mb-2">{responseError}</div>}
          <button 
            className={`width100 btn mt-4`}
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
      </form>
      )}
      </Formik>
      {/* <div className="loginUserBlock justify-content-center">
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
      </div> */}
      <div className="col text-center footer-logo">
        <div className="foodledgerLogo">
          <span className="logo1">FOOD</span> <span className="logo2">LEDGER</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

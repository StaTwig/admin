import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import logo from '../../assets/ABInBev.png';

import { getAllBreweries } from '../../actions/userActions';

const SignUp = (props) => {
  const { setSteps, setContinueClick, onSignUpClick } = props;

  const dispatch = useDispatch();

  const [responseError, SetResponseError] = useState('');

  const [allBreweries, setAllBreweries] = useState([]);
  const districtList = [
    'BENGALURU URBAN',
    'BENGALURU RURAL',
    'TUMKUR',
    'KOLAR',
    'CHIKBALLAPUR',
    'RAMANAGARA',
    'BAGALKOT',
    'BIDAR',
    'GULBARG',
    'RAICHUR',
    'BIJAPUR',
    'YADGIR',
    'BELGAUM',
    'DHARWAD',
    'DAVANGERE',
    'HAVERI',
    'UTTARA KANNADA',
    'BELLARY',
    'SHIVAMOGGA',
    'CHITRADURGA',
    'GADAG',
    'VIJAYANAGARA',
    'KOPPAL',
    'CHIKKAMAGALURU',
    'UDUPI',
    'DAKSHINA KANNADA',
    'CHAMARAJANAGAR',
    'HASSAN',
    'MYSURU',
    'KODAGU',
    'MANDYA',
  ];

  useEffect(() => {
    (async () => {
      const response = await dispatch(getAllBreweries());
      const _organizations = response.data ? response.data : [];
      setAllBreweries(_organizations);
    })();
  }, []);

  return (
    <div className="signUpScreen">
      <div className="align-center pt-5">
        <h2 className="titleSubHeading">Welcome Back!</h2>
        <span className="titleSubHeading">
          <span className="titleHeading">Sign Up</span> to continue.
        </span>
      </div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          mobileemail: '',
          authority: '',
          organisation: '',
          state: '',
          district: '',
          line1: '',
          pincode: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Firstname Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last Required';
          }
          if (!values.mobileemail) {
            errors.mobileemail = 'Mobile/Email Required';
          }
          if (!values.authority) {
            errors.authority = 'Select S1';
          }
          if (!values.organisation) {
            errors.organisation = 'Organisation Required';
          }
          if (!values.state) {
            errors.state = 'Select State';
          }
          if (!values.district) {
            errors.district = 'Select district';
          }
          if (!values.line1) {
            errors.line1 = 'Address Required';
          }
          if (!values.pincode) {
            errors.pincode = 'Pincode Required';
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
            <div className="form-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="firstName" className="userNameLabel mb-1">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      className={`form-control username ${
                        errors.firstName ? `` : `mb-3`
                      }`}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.firstName && touched.firstName && (
                        <div className="error-msg text-danger mb-3">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="userNameLabel mb-1">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      className={`form-control username ${
                        errors.lastName ? `` : `mb-3`
                      }`}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.lastName && touched.lastName && (
                        <div className="error-msg text-danger mb-3">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="form-group">
                    <label htmlFor="mobileemail" className="userNameLabel mb-1">
                      Mobile No / Email ID
                    </label>
                    <input
                      name="mobileemail"
                      className={`form-control username ${
                        errors.mobileemail ? `` : `mb-3`
                      }`}
                      value={values.mobileemail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.mobileemail && touched.mobileemail && (
                        <div className="error-msg text-danger mb-3">
                          {errors.mobileemail}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="authority"
                      className="organisationLabel mb-1"
                    >
                      Select S1
                    </label>
                    <select
                      name="authority"
                      className={`form-control brewery ${
                        errors.authority ? `` : `mb-3`
                      }`}
                      value={values.authority}
                      onChange={handleChange}
                    >
                      <option value="">Select S1</option>
                      {allBreweries &&
                        allBreweries.map((brewery, index) => (
                          <option key={index} value={brewery.id}>
                            {brewery.name}
                          </option>
                        ))}
                      {/* <option value="S1">I am a S1</option> */}
                    </select>
                    <div className="errorDisplay">
                      {errors.authority && touched.authority && (
                        <div className="error-msg text-danger mb-3">
                          {errors.authority}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="organisation"
                      className="organisationLabel mb-1"
                    >
                      Organisation
                    </label>
                    <input
                      name="organisation"
                      className={`form-control organisation ${
                        errors.organisation ? `` : `mb-3`
                      }`}
                      value={values.organisation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.organisation && touched.organisation && (
                        <div className="error-msg text-danger mb-3">
                          {errors.organisation}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="state" className="organisationLabel mb-1">
                      State
                    </label>
                    <select
                      name="state"
                      className={`form-control brewery ${
                        errors.state ? `` : `mb-3`
                      }`}
                      value={values.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                    <div className="errorDisplay">
                      {errors.state && touched.state && (
                        <div className="error-msg text-danger mb-3">
                          {errors.state}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="line1" className="organisationLabel mb-1">
                      Line 1
                    </label>
                    <input
                      name="line1"
                      className={`form-control organisation ${
                        errors.line1 ? `` : `mb-3`
                      }`}
                      value={values.line1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.line1 && touched.line1 && (
                        <div className="error-msg text-danger mb-3">
                          {errors.line1}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="district"
                      className="organisationLabel mb-1"
                    >
                      District
                    </label>
                    <select
                      name="district"
                      className={`form-control brewery ${
                        errors.district ? `` : `mb-3`
                      }`}
                      value={values.district}
                      onChange={handleChange}
                    >
                      <option value="">Select District</option>
                      {districtList &&
                        districtList.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>
                    <div className="errorDisplay">
                      {errors.district && touched.district && (
                        <div className="error-msg text-danger mb-3">
                          {errors.district}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="pincode" className="organisationLabel mb-1">
                      Pincode
                    </label>
                    <input
                      name="pincode"
                      className={`form-control organisation ${
                        errors.pincode ? `` : `mb-3`
                      }`}
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="errorDisplay">
                      {errors.pincode && touched.pincode && (
                        <div className="error-msg text-danger mb-3">
                          {errors.pincode}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {responseError && (
                <div className="text-danger mt-2 mb-2">{responseError}</div>
              )}
              <button type="submit" className={`width100 btn mt-4`}>
                GET STARTED
              </button>
              <p className="signUpDesc align-center mt-3 ">
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={() => {
                    setContinueClick(true);
                    setSteps(2);
                  }}
                  className="signUpLink"
                >
                  Log In
                </a>
              </p>
            </div>
          </form>
        )}
      </Formik>
      <div className="col text-center footer-logo">
        <img src={logo} width={60} />
      </div>
    </div>
  );
};

export default SignUp;

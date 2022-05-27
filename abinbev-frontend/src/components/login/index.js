import React, { useState } from "react";

import "./style.scss";
import User from "../../assets/icons/mail.png";
import logo from "../../assets/aicons/AdminLogo.png";
import { Formik } from "formik";

const FormLoginPage = (props) => {
  const { email, onEmailChange, errorMessage, onSendOtp } = props;

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="mobile-header">
          <div className="branding">
            <img src={logo} alt="vaccineledger" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              {/* <img className="logo" src={logo} /> */}
              <h1>Welcome Back,</h1>
              <p>Login to continue</p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form mt-2">
                  <div className="card-title mb-4">Login</div>
                  <Formik
                    initialValues={{ email: email }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);
                      onSendOtp();
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
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group m-5 mb-0 ">
                          <label htmlFor="email">
                            <img alt="" src={User} className="icon imgs mb-1" />
                            <span className="ml-1 text-muted">
                              Email ID/Mobile Number
                            </span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            className={`pl-0 form-control ${
                              errors.email ? "border-danger" : ""
                            }`}
                            // value={email}
                            autoFocus
                            // onChange={onEmailChange}
                            placeholder=""
                            onChange={(e) => {
                              handleChange(e);
                              onEmailChange(e);
                            }}
                            // onKeyDown={onkeydown}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <span className="error-msg text-danger">
                              {errors.email}
                            </span>
                          )}
                        </div>
                        {errorMessage && (
                          <div className="alert alert-danger">
                            {errorMessage}
                          </div>
                        )}
                        <div className="text-center mt-5">
                          <button type="submit" className="btn btn-primary">
                            SEND OTP
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>

                  {/* <div className="signup-link text-center mt-2">
                    Don't have an account? <Link to="/signup">Signup</Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLoginPage;

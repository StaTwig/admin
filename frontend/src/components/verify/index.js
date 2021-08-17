import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';
import '../login/style.scss';
import { Formik } from "formik";
import { Alert, AlertTitle } from '@material-ui/lab';


const FormVerifyPage = (props) => {
  const { otp, onOtpChange, onVerifyOtp, errorMessage, onResendOtp } = props;
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);  
  const formRef = useRef();
  
  
  const otpChange = (index, handleChange,) => {
    return (event) => {
      let value = event.target.value;
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      onOtpChange(otpArrayCopy.join().replaceAll(",", ""));
      if (value !== "") {
        if (index === 0) secondInputRef.current.focus();
        else if (index === 1) thirdInputRef.current.focus();
        else if (index === 2) fourthInputRef.current.focus();
      }
      handleChange(event);
      if (otpArrayCopy.filter((v) => v != "").length == 4) {
        formRef.current.handleSubmit();
      }
    };
  };
  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      if (value === "Backspace" && otpArray[index] === "") {
        if (index === 1) firstInputRef.current.focus();
        else if (index === 2) secondInputRef.current.focus();
        else if (index === 3) thirdInputRef.current.focus();
      }
    };
  };
    return (
    <div className="login-wrapper">
      <div className="container">
          <div className="mobile-header" >
            <div className="branding" >
            
              <img src={ logo } alt="vaccineledger" />
            </div>
           </div>
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome</h1>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                  <div className="card-title mb-5">Enter OTP</div>
                  <Formik
                    innerRef={formRef}
                    initialValues={{ otp0: "", otp1: "", otp2: "", otp3: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.otp0) {
                        errors.otp0 = "Required";
                      } else if (!values.otp1) {
                        errors.otp1 = "Required";
                      } else if (!values.otp2) {
                        errors.otp2 = "Required";
                      } else if (!values.otp3) {
                        errors.otp3 = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);
                      onVerifyOtp();
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
                      
                    }) => (
                      <form onSubmit={handleSubmit}>
                      <div className="ml-5 d-flex flex-row justify-content-center">
                        {[
                          firstInputRef,
                          secondInputRef,
                          thirdInputRef,
                          fourthInputRef,
                        ].map((textInputRef, index) => (
                          <input
                            ref={textInputRef}
                            name={"otp" + index}
                            id={"otp" + index}
                            type="text"
                            style={{border: "none",
                              borderBottom: "1px solid #d6d6d6",
                              borderRadius: 0
                              }}
                            className={`form-control text-center mr-5 ${
                              errors.otp0 && touched.otp0 ? "border-danger" : "" }`}
                            value={otpArray[index]}
                            onKeyUp={onOtpKeyPress(index)}
                            maxLength={1}
                            onChange={otpChange(
                              index,
                              handleChange,
                              handleSubmit
                            )}
                            onKeyDown={onkeydown}
                            //onBlur={handleBlur}
                            autoFocus={index === 0 ? true : undefined}
                            key={index}
                          />
                        ))}
                        </div>
                        <div className="mb-4 mt-5">
                          {(errors.otp0 ||
                            errors.otp1 ||
                            errors.otp2 ||
                            errors.otp3) &&
                            (touched.otp0 ||
                              touched.otp1 ||
                              touched.otp2 ||
                              touched.otp3) && (
                              <span className="error-msg text-danger">
                              
                              </span>
                            )}
                          &nbsp;
                        </div>
                        <div className="font-weight-bold text-center">
                          Didn't receive the OTP?
                        </div>
                        <div
                          className="text-center mt-2 mb-5 text-primary resend"
                          style={{cursor: "pointer"}}
                          onClick={onResendOtp}
                        >
                          RESEND CODE
                        </div>

                        {errorMessage && (
                          <div> <Alert severity="error"><AlertTitle>Error</AlertTitle>{errorMessage}</Alert></div>
                        )}
                        <div className="text-center mt-3 mb-3 ml-1">
                          <button type="submit" className=" buttonS btn btn-primary">
                            VERIFY
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};         

export default FormVerifyPage;


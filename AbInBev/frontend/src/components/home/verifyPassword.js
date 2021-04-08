import React, { useState, useRef } from "react";
import logo from "../../assets/ABInBev.png";

const VerifyPassword = (props) => {
  const { buttonActive,
    setSteps,
    setContinueClick, otp1, onOtpChange1, otp2, onOtpChange2, otp3, onOtpChange3, otp4, onOtpChange4,
    onVerifyOtp, errorMessage, onResendOtp } = props;
  const ref = useRef();
  return (
    <div className="verifyPasswordScreen">
      <div className="align-center pb-5 pt-5">
        <h2 className="verifyTitle">Verification Code</h2>
        <span className="verifyTitleSubHeading">Please enter the Verification Code <br /> Sent to +91 9********9</span>
      </div>
      <div className="login-form">
        <div className="card-title mb-2">Enter OTP</div>
        <div className="form-groupverify pl-5 pr-5 mb-2">
          <input
            id="1"
            type='text'
            className="otpInput mr-3"
            maxLength="1"
            value={otp1}
            ref={input => input && input.focus()}
            onChange={onOtpChange1}
          />

          <input
            id="2"
            type='text'
            className="otpInput mr-3"
            maxLength="1"
            value={otp2}
            ref={otp1.length === 1 ? input => input && input.focus() : null}
            onChange={onOtpChange2}
          />

          <input
            id="3"
            type='text'
            className="otpInput mr-3"
            maxLength="1"
            value={otp3}
            ref={otp2.length === 1 ? input => input && input.focus() : null}
            onChange={onOtpChange3}
          />

          <input
            id="4"
            type='text'
            className="otpInput mr-3"
            maxLength="1"
            value={otp4}
            ref={otp3.length === 1 ? input => input && input.focus() : null}
            onChange={onOtpChange4}
          />
        </div>
        <div>
          <p className="signUpDesc mt-1 mb-3 ">Didn’t get the code? <a href="#" onClick={
            () => {
              onResendOtp();
            }
          } className="signUpLink">Resend OTP</a></p>
        </div>

        <div className="text-center mt-5">
          <button type="button" className="btn btn-primary width100"
            onClick={() => {
              setContinueClick(true);
              setSteps(4);
              onVerifyOtp();
            }}
            className={`btn ${buttonActive > 0 ? `btn-red` : ``}`}
            type="button">
            NEXT
            </button>
          <p className="signUpDesc mt-3 mb-3 ">Already have an account? <a href="#" onClick={
            () => {
              setContinueClick(true);
              setSteps(2);
            }
          } className="signUpLink">Log In</a></p>
        </div>
      </div>
      <div className="col text-center footer-logo">
        <img src={logo} width={60} />
      </div>
    </div>
  );
};

export default VerifyPassword;

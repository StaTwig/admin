import React, { useState, useRef } from "react";
import logo from "../../assets/ABInBev.png";

const VerifyPassword = (props) => {
  const { buttonActive, setSteps, setContinueClick, onVerifyOtp, onResendOtp, email } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  let otp = otp1 + otp2 + otp3 + otp4;

  const onVerifyOtpClick = async() => {
    if (otp.length < 4) {
      return;
    }
    const result = await onVerifyOtp(otp, email);
    if (result) { setErrorMessage(result);}
  }

  const onResendOtpClick = async () => {
    setOtp1('');
    setOtp2('');
    setOtp3('');
    setOtp4('');
    const result = await onResendOtp(email);
    if (result) { setResendMessage(result);}
  }
  const handleOnOTP1Change = (e) => {
    setOtp1(e.target.value);
  }
  const handleOnOTP2Change = (e) => {
    setOtp2(e.target.value);
  }
  const handleOnOTP3Change = (e) => {
    setOtp3(e.target.value);
  }
  const handleOnOTP4Change = (e) => {
    setOtp4(e.target.value);
  }

  const ref = useRef();
  return (
    <div className="verifyPasswordScreen">
      <div className="align-center pb-5 pt-5">
        <h2 className="verifyTitle">Verification Code</h2>
        <span className="verifyTitleSubHeading">Please enter the Verification Code <br /> Sent to <b>"{email}"</b></span>
      </div>
      <div className="login-form">
        <div className="card-title mb-2">Enter OTP</div>
        <div className="form-groupverify pl-5 pr-5 mb-2">
          <input
            id="1"
            type='text'
            className="otpInput m-1"
            maxLength="1"
            value={otp1}
            ref={input => input && input.focus()}
            onChange={handleOnOTP1Change}
          />

          <input
            id="2"
            type='text'
            className="otpInput m-1"
            maxLength="1"
            value={otp2}
            ref={otp1.length === 1 ? input => input && input.focus() : null}
            onChange={handleOnOTP2Change}
          />

          <input
            id="3"
            type='text'
            className="otpInput m-1"
            maxLength="1"
            value={otp3}
            ref={otp2.length === 1 ? input => input && input.focus() : null}
            onChange={handleOnOTP3Change}
          />

          <input
            id="4"
            type='text'
            className="otpInput m-1"
            maxLength="1"
            value={otp4}
            ref={otp3.length === 1 ? input => input && input.focus() : null}
            onChange={handleOnOTP4Change}
          />

        </div>
          {
            errorMessage ? <h4 className="error-message text-danger pb-2">{errorMessage}</h4> : ""
          }
          
        <div>
          <p className="signUpDesc mt-1 mb-3 ">Didn’t get the code? <a href="#" onClick={
            () => {
              onResendOtpClick();
            }
          } className="signUpLink">Resend OTP</a></p>
          {
            resendMessage ? <h4 className="text-primary pb-2">{resendMessage}</h4> : ""
          }
        </div>

        <div className="text-center mt-5">
          <button type="button" className="btn btn-primary width100"
            onClick={() => {
              onVerifyOtpClick();
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
        <div className="foodledgerLogo">
          <span className="logo1">FOOD</span> <span className="logo2">LEDGER</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;

import React, { useState,useRef } from 'react';
import Key from '../../assets/icons/key.png';
import mail from '../../assets/icons/mail.png';
import hide from '../../assets/icons/hide.png';
import eye from '../../assets/icons/eye.png';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';
import '../login/style.scss';

const FormVerifyPage = (props) => {
  const { otp1, onOtpChange1, otp2, onOtpChange2, otp3, onOtpChange3, otp4, onOtpChange4,
    onVerifyOtp, errorMessage, onResendOtp } = props;
    const ref= useRef();
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
              <img className="logo" src={logo} />
              <h1>Welcome</h1>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                  <div className="card-title mb-5">Enter OTP</div>
                  <div className="form-groupverify pl-5 pr-5 mb-5">
                    <input 
                      id="1"
                      type='text'
                      className="form-controlverify mr-3" 
                      maxlength="1"
                      value={otp1}
                      ref={input => input && input.focus()}
                      onChange={onOtpChange1} 
                      />
                 
                    <input 
                      id="2"
                      type='text' 
                      className="form-controlverify mr-3" 
                      maxlength="1"
                      value={otp2} 
                      ref={otp1.length === 1 ? input => input && input.focus():null}
                      onChange={onOtpChange2} 
                   />

                    <input 
                     id="3"
                     type='text' 
                     className="form-controlverify mr-3" 
                     maxlength="1"
                     value={otp3}
                     ref={otp2.length === 1 ? input => input && input.focus():null}
                     onChange={onOtpChange3} 
                     />

                    <input 
                      id="4"
                      type='text' 
                      className="form-controlverify mr-3" 
                      maxlength="1"
                      value={otp4}
                      ref={otp3.length === 1 ? input => input && input.focus():null}
                      onChange={onOtpChange4} 
                      />


                  </div>
                  <div className="font-weight-bold text-center mb-2">Didn't receive the OTP?</div>
                  <div className="cursorP text-center mb-5 resend" onClick={onResendOtp}>RESEND CODE</div>
                  <div></div>

                  {
                    errorMessage && <div className="alert alert-danger">{errorMessage}</div>
                  }
                  <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={onVerifyOtp}>
                      LOGIN
                    </button>
                  </div>
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


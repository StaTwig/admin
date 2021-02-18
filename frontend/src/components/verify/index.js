import React, { useState } from 'react';
import Key from '../../assets/icons/key.png';
import mail from '../../assets/icons/mail.png';
import hide from '../../assets/icons/hide.png';
import eye from '../../assets/icons/eye.png';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';
import '../login/style.scss';

const FormVerifyPage = (props) => {
  const { otp, onOtpChange, onVerifyOtp,  errorMessage, onResendOtp } = props;
  return (
    <div className="login-wrapper">
      <div className="container">
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
                  <div className="form-group mb-5">
                    <input type='text' className="form-control"
                      value={otp}
                      onChange={onOtpChange} />

                  </div>
              <div className="font-weight-bold text-center mb-2">Didn't receive the OTP?</div>
              <div className="text-center mb-5 resend" onClick={onResendOtp}>RESEND CODE</div>
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


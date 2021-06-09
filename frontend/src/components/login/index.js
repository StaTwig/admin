import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import './style.scss';
import Key from '../../assets/icons/key.png';
import User from '../../assets/icons/mail.png';
import hide from '../../assets/icons/hide.png';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';
import eye from '../../assets/icons/eye.png';
import Phone from "../../assets/icons/phone.png";
import TextField from '@material-ui/core/TextField';

const FormLoginPage = (props) => {
  const { email, onEmailChange, errorMessage, onSendOtp, phone, onPhoneChange } = props;
  const onkeydown = (event) => {
    if (event.keyCode  === 13) {
        onSendOtp();
    }
   }
  return (
    <div className="login-wrapper">
      <div className="container">
        {/* <div className="mobile-header">
            <div className="branding">
                <img src={logo} alt="vaccineledger" />
            </div>
</div> */}
          <div className="row">
          <div className="col-m-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome Back,</h1>
              <p>Login to continue</p>
            </div>
          </div>
          <div className="col-m-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form mt-2">
                  <div className="card-title mb-4">Login</div>
                  <div className="form-group mb-3 mt-1 ml-5 mr-5 p-1">
                  <div style={{position:"absolute", left:"-5px", top:"25px"}}>
                        <img alt="Mail Icon" src={User} height="15px" width="18px" />
                  </div>      
                  <TextField 
                        label="Email ID" 
                        className="form-controlll ml-4"
                        name="email"
                        autoCapitalize = 'none'
                        value={email}
                        onChange={onEmailChange}
                      />
                  </div>
                  <div className="card-title ml-3 mb-0 mt-3"><h5 style={{color:"#0093E9"}}>OR</h5></div>
                  <div className="form-group mt-0 ml-5 mr-3 p-1" style={{position:"relative", left:"-15px"}}>
                  <div className="form-group mt-0 ml-3 p-1" style={{position:"relative", left:"-15px"}}>
                        <img alt="Phone icon" src={Phone} height="20px" width="20px" /></div>
                      <PhoneInput
                        country={'in'}
                        placeholder='Enter Phone number'
                        inputProps={{
                          name: 'phone',
                          required: true,
                          // autoFocus: true,
                          enableSearch: true,
                        }}
						            value={phone}
                        onChange={onPhoneChange}
                      />
                   </div>
                    

                  {
                    errorMessage && <div className="alert alert-danger">{errorMessage}</div>
                  }
                  <div className="text-center mt-2">
                    <button type="button" className="btn btn-primary" onClick={onSendOtp}>
                      SEND OTP
                    </button>
                  </div>
                  <div className="signup-link text-center mt-2">Don't have an account? <Link to="/signup">Signup</Link></div>
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


/* <Link to="/forgotPassword" className="forgot-link">Forgot Password?</Link>
                  <div className="checkbox-group mb-2">
                    <input type="checkbox" className="mr-1" /> <span>Remember me</span>
                  </div> */


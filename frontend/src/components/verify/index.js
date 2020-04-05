import React, { useState } from 'react';
import Key from '../../assets/icons/key.png';
import mail from '../../assets/icons/mail.png';
import hide from '../../assets/icons/hide.png';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';
import '../login/style.scss';

const FormVerifyPage = (props) => {
  const { otp, onOtpChange, onVerifyOtp,  errorMessage, email, onEmailChange} = props;
  const [passwordType, setPasswordType] = useState(true);
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome,</h1>
              <p>Verify to continue</p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                  <div className="card-title">Verify</div>
                  <div className="form-group">
                    <img alt="" src={mail} className="icon" />
                    <input type='text' className="form-control"
                      value={email}
                      onChange={onEmailChange}
                      placeholder="email" />
                  </div>
                  <div className="form-group">
                    <img alt="" src={Key} className="icon" />
                    <input type={passwordType ? 'password' : 'text'} className="form-control"
                      value={otp}
                      onChange={onOtpChange}
                      placeholder="otp" />
                      <img
                      className="showpassword"
                      alt=""
                      src={hide}
                      onClick={() => setPasswordType(!passwordType)}
                    />

                  </div>


                  {
                    errorMessage && <div className="alert alert-danger">{errorMessage}</div>
                  }
                  <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={onVerifyOtp}>
                      Verify
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


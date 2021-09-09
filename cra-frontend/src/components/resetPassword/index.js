import React, { useState } from "react";

import '../login/style.scss';
import Key from "../../assets/icons/key.png";
import hide from "../../assets/icons/hide.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
const ResetPasswordPage = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome,</h1>
              <p>Reset to continue</p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                  <div className="card-title">Reset Password</div>
                  <div className="form-group">
                    <img alt="" src={Key} className="icon" />
                    <input type={passwordType ? 'password' : 'text'} className="form-control"
                      //value=""
                      placeholder="Password" />
                    <img
                      className="showpassword"
                      alt=""
                      src={hide}
                      onClick={() => setPasswordType(!passwordType)}
                    />
                  </div>
                  <div className="form-group">
                    <img alt="" src={Key} className="icon" />
                    <input type={passwordType ? 'password' : 'text'} className="form-control"
                     // value=""
                      placeholder="Confirm Password" />
                    <img
                      className="showpassword"
                      alt=""
                      src={hide}
                      onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                    />
                  </div>
                  
                  <div className="text-center">
                    <button type="button" className="btn btn-primary">
                      Reset
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

export default ResetPasswordPage;


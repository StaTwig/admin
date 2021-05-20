import React from "react";

import '../login/style.scss';

import Mail from "../../assets/icons/mail.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";


const ForgotPassword = (props) => {
  const {email,errorMessage,onForgot,onEmailChange } = props;
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome</h1>
              <p>Reset your Password</p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                <div className="card-title">Forgot Password</div>
                  <div className="form-group">
                    <img alt="" src={Mail} className="icon" />
                    <input type="email"
                      className="form-control"
                      value={email.toLowerCase()}
                      onChange={onEmailChange}
                      placeholder="Email" />
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={onForgot}>
                    SUBMIT
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

export default ForgotPassword;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import Key from '../../assets/icons/key.png';
import User from '../../assets/icons/mail.png';
import hide from '../../assets/icons/hide.png';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';
import eye from '../../assets/icons/eye.png';

import './style.scss';

const FormLoginPage = (props) => {
  const { password, email, onEmailChange, onPasswordChange, errorMessage, onLogin } = props;
  const [passwordType, setPasswordType] = useState(true);

  
  const onkeydown = (event) => {
    if (event.keyCode  === 13) {
      onLogin();
    }
   }
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome Back,</h1>
              <p>Login to continue</p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                  <div className="card-title">Login</div>
                  <div className="form-group">
                    <img alt="" src={User} className="icon" />
                    <input type="email" className="form-control"
                      value={email}
                      onChange={onEmailChange}
                      placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <img alt="" src={Key} className="icon" />
                    <input type={passwordType ? 'password' : 'text'} className="form-control"
                      value={password}
                      onChange={onPasswordChange}
                      placeholder="Password" 
                 
                      />
                   
                    <img
                      className="showpassword"
                      alt=""
                      src={` ${ passwordType ? hide : eye}`}
                      onClick={() => setPasswordType(!passwordType)}
                    />
                  </div>
                  <Link to="/forgotPassword" className="forgot-link">Forgot Password?</Link>
                  <div className="checkbox-group mb-2">
                    <input type="checkbox" className="mr-1" /> <span>Remember me</span>
                  </div>

                  {
                    errorMessage && <div className="alert alert-danger">{errorMessage}</div>
                  }
                  <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={onLogin}>
                      Login
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

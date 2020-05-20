import React, { useState } from "react";
import { Link } from 'react-router-dom';

import '../login/style.scss';
import Key from "../../assets/icons/key.png";
import User from "../../assets/icons/user.png";
import Mail from "../../assets/icons/mail.png";
import hide from "../../assets/icons/hide.png";
import eye from "../../assets/icons/eye.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
const FormPage = (props) => {
  const [passwordType, setPasswordType] = useState(true);
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="form-content">
              <img className="logo" src={logo} />
              <h1>Welcome,</h1>
              <p>Signup to continue</p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="login-form">
                  <div className="card-title">Signup</div>
                  <div className="form-group">
                    <img alt="" src={User} className="icon" />
                    <input type="text"
                      className="form-control"
                      value={props.name}
                      onChange={props.onNameChange}
                      placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <img alt="" src={Mail} className="icon" />
                    <input type="email"
                      className="form-control"
                      value={props.email}
                      onChange={props.onEmailChange}
                      placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <img alt="" src={Key} className="icon" />
                    <input type={passwordType ? 'password' : 'text'}
                      className="form-control"
                      value={props.password}
                      onChange={props.onPasswordChange}
                      placeholder="Password" />
                    <img
                      className="showpassword"
                      alt=""
                      src={` ${ passwordType ? hide : eye}`}
                      onClick={() => setPasswordType(!passwordType)}
                    />
                  </div>
                  {
                    props.errorMessage && <div className="alert alert-danger">{props.errorMessage}</div>
                  }
                  <div className="text-center mt-2">
                    <button type="button" className="btn btn-primary" onClick={props.onSignup}>
                      SIGNUP
                    </button>
                  </div>
                  <div className="signup-link text-center mt-2">
                    Already have an Account? <Link to="/login">Login</Link>
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

export default FormPage;




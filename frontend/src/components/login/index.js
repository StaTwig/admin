import React from 'react';
import { Link } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
import 'typeface-roboto';
import './style.scss';
import Key from '../../assets/icons/key.png';
import User from '../../assets/icons/user.png';
import hide from '../../assets/icons/hide.png';
import logo from '../../assets/brands/VaccineLedgerlogo.svg';

import './style.scss';

const FormLoginPage = (props) => {
  const { password, email, onEmailChange, onPasswordChange, errorMessage, onLogin } = props;
  return (
    <div className="login-wrapper">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="h2 d-flex align-items-center">
            <div>
              <img id="img2" src={logo} />
              <div id="Welcome2">Welcome Back ,</div>
              <div id="Sign2">Login to continue</div>
            </div>

          </MDBCol>
          <MDBCol md="6" className="signin2">
            <MDBCard className="card2">
              <MDBCardBody>
                <form>
                  <p className="heading2">Login</p>
                  <div className="input2">
                    <div className="row no-gutters">
                      <div className="icon col-sm-2">
                        <img width="25px" src={User} />
                      </div>
                      <div className="col-sm-10">
                        <MDBInput
                          label="Email"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          value={email}
                          onChange={onEmailChange}
                        />
                      </div>
                    </div>
                    <div className="row no-gutters">
                      <div className="icon col-sm-2">
                        <img width="25px" src={Key} />
                      </div>
                      <div className="col-sm-10">
                        <img
                          id="eye2"
                          width="25px"
                          src={hide}
                        />
                        <MDBInput
                          label="Password"
                          group
                          type="password"
                          validate
                          value={password}
                          onChange={onPasswordChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div id="notify">Forgot Password?</div>
                  <div id="alert">
                    <input type="checkbox" />
                    Remember me
                  </div>
                  <div className="text-center mt-3">
                    <MDBBtn id="submit2" color="cyan" onClick={onLogin}>
                      Login
                    </MDBBtn>
                  </div>
                  <label id="danger">{errorMessage}</label>
                  <div id="text-center2">
                    <Link to="/signup">
                      <div id="noaccount">Don't have an account? Signup</div>
                    </Link>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default FormLoginPage;

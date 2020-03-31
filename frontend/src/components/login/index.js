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
    <div className="admin-login2">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="h2">
            <img id="img2" src={logo} />

            <div id="Welcome2">Welcome Back ,</div>
            <div id="Sign2">Login to continue</div>
          </MDBCol>
          <MDBCol md="6" className="signin2">
            <MDBCard className="card2">
              <MDBCardBody>
                <form>
                  <p className="heading2">Login</p>
                  <div className="input2">
                    <MDBRow>
                      <MDBCol md="2">
                        <img className="icon" width="25px" src={User} />
                      </MDBCol>
                      <MDBCol md="10" id="col2">
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
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="2">
                        <img className="icon" width="25px" src={Key} />
                        <img
                          className="icon"
                          id="eye2"
                          width="25px"
                          src={hide}
                        />
                      </MDBCol>
                      <MDBCol md="10" id="col2">
                        <MDBInput
                          label="Password"
                          group
                          type="password"
                          validate
                          value={password}
                          onChange={onPasswordChange}
                        />
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn id="submit2" color="cyan" onClick={onLogin}>
                      Login
                    </MDBBtn>
                  </div>
                  <label id="danger">{errorMessage}</label>
                  <div id="notify">Forgot Password?</div>
                  <div id="alert">Remember me</div>
                  <div id="text-center2"><Link to="/signup">
                    <div id ="noaccount">Don't have an account? Signup</div>
                  </Link></div>
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

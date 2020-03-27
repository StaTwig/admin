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

const FormVerifyPage = (props) => {
  const { email, onEmailChange, otp, onOtpChange, onVerifyOtp, errorMessage } = props;
  return (
    <div className="admin-login2">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="h2">
            <img id="img2" src={logo} />

            <div id="Welcome2">Welcome Back ,</div>
            <div id="Sign2">Verify to continue</div>
          </MDBCol>
          <MDBCol md="6" className="signin2">
            <MDBCard className="card2">
              <MDBCardBody>
                <form>
                  <p className="heading2">Verify</p>
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
                          label="OTP"
                          group
                          type="password"
                          validate
                          value={otp}
                          onChange={onOtpChange}
                        />
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <label className="text-danger">{errorMessage}</label>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn id="submit2" color="cyan" onClick={onVerifyOtp}>
                      Verify
                    </MDBBtn>
                  </div>
                  <div id="text-center2"><Link to="/signup">
                    <div>Don't have an account? Signup</div>
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

export default FormVerifyPage;

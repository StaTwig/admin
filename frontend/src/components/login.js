import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'typeface-roboto';
import './login.css';
import Key from "../assets/key.png";
import User from "../assets/user.png";
import hide from "../assets/hide.png";
const FormLoginPage = () => {
  return (
    <div className="admin-login">
    <MDBContainer>

      <MDBRow><MDBCol md="6" className="h1"> 
      <img id ="img" src={require('../assets/Vaccine Ledger logo.svg')}/>

      <div id="Welcome">Welcome Back ,</div>
      <div id="Sign">Login to continue</div>

        </MDBCol>
        <MDBCol md="6" className="signin">
          <MDBCard className="card">
            <MDBCardBody>
              <form>
              <p className="heading">Login</p>
                <div className="input">
                <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={User} /></MDBCol>
                <MDBCol md="10" id="col1">
                  <MDBInput
                    label="Name"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  /></MDBCol></MDBRow>
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Key} /><img  className="icon" id="eye"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col1">
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    validate
                  /></MDBCol></MDBRow>

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn id="submit" color="cyan" type="submit">
                    Login
                  </MDBBtn>
                </div>
                <div id="text-center">Don't have an account? Signup</div>
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

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
import logo from "../assets/VaccineLedgerlogo.svg";
const FormLoginPage = () => {
  return (
    <div className="admin-login2">
    <MDBContainer>

      <MDBRow><MDBCol md="6" className="h2"> 
      <img id ="img2" src={logo}/>

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
                <img  className="icon" width = "25px" src={User} /></MDBCol>
                <MDBCol md="10" id="col2">
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
                <img  className="icon" width = "25px" src={Key} /><img  className="icon" id="eye2"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col2">
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    validate
                  /></MDBCol></MDBRow>

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn id="submit2" color="cyan" type="submit">
                    Login
                  </MDBBtn>
                </div>
                <div id="text-center2">Don't have an account? Signup</div>
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

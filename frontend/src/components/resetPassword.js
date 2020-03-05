import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'typeface-roboto';
import './resetPassword.css';
import Key from "../assets/key.png";
import hide from "../assets/hide.png";
const resetPasswordPage = () => {
  return (
    <div className="admin-login">
    <MDBContainer>

      <MDBRow><MDBCol md="6" className="h1"> 
      <img id ="img" src={require('../assets/Vaccine Ledger logo.svg')}/>

      <div id="Welcome">Welcome</div>

        </MDBCol>
        <MDBCol md="6" className="signin">
          <MDBCard className="card">
            <MDBCardBody>
              <form>
              <p className="heading">Reset Password</p>
                <div className="input">
              
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Key} id="key"/><img  className="icon" id="eye"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col1">
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    validate
                  /></MDBCol></MDBRow>
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Key} id="key"/><img  className="icon" id="eye"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col1">
                  <MDBInput
                    label="Confirm Password"
                    group
                    type="password"
                    validate
                  /></MDBCol></MDBRow>

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn id="submit" color="cyan" type="submit">
                    SUBMIT
                  </MDBBtn>
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

export default resetPasswordPage;


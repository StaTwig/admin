import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'typeface-roboto';
import './forgotPassword.scss';

import Mail from "../assets/mail.png";
import logo from "../assets/VaccineLedgerlogo.svg";

const ForgotPasswordPage = () => {
  return (
    <div className="admin-login3">
    <MDBContainer>

      <MDBRow><MDBCol md="6" className="h3"> 
      <img id ="img3" src={logo}/>

      <div id="Welcome3">Welcome </div>
      

        </MDBCol>
        <MDBCol md="6" className="signin3">
          <MDBCard className="cardForgot">
            <MDBCardBody>
              <form>
              <p className="heading3">Forgot Password</p>
                <div className="input3">
             
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Mail} /></MDBCol>
                <MDBCol md="10" id="col3">
                  <MDBInput
                    label="Email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  /></MDBCol></MDBRow>
                 

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn id="submit3" color="cyan" type="submit">
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

export default ForgotPasswordPage;


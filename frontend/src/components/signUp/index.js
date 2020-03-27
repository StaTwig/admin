import React from "react";
import { Link } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'typeface-roboto';
import './style.scss';
import Key from "../../assets/icons/key.png";
import User from "../../assets/icons/user.png";
import Mail from "../../assets/icons/mail.png";
import hide from "../../assets/icons/hide.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
const FormPage = (props) => {
  return (
    <div className="admin-login1">
    <MDBContainer>

      <MDBRow><MDBCol md="6" className="h1"> 
      <img id ="img1" src={logo}/>

      <div id="Welcome1">Welcome ,</div>
      <div id="Sign1">Signup to continue</div>

        </MDBCol>
        <MDBCol md="6" className="signin1">
          <MDBCard className="card1">
            <MDBCardBody>
              <form>
              <p className="heading1">Signup</p>
                <div className="input1">
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
                    value={props.name}
                    onChange={props.onNameChange}
                  /></MDBCol></MDBRow>
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Mail} /></MDBCol>
                <MDBCol md="10" id="col1">
                  <MDBInput
                    label="Email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    value={props.email}
                    onChange={props.onEmailChange}
                  /></MDBCol></MDBRow>
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Key} /><img  className="icon" id="eye1"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col1">
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    validate
                    value={props.password}
                    onChange={props.onPasswordChange}
                  /></MDBCol></MDBRow>

                </div>
                <label className="text-danger">{props.errorMessage}</label>
                <div className="text-center py-4 mt-3">
                  <MDBBtn id="submit1" color="cyan" onClick={props.onSignup}>
                    SIGNUP
                  </MDBBtn>
                </div>
                <div id="text-center1"><Link to="/login">
                  <div>Already have an Account? Login</div>
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

export default FormPage;



     
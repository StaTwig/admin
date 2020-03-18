import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'typeface-roboto';
import './style.scss';
import Key from "../../assets/icons/key.png";
import hide from "../../assets/icons/hide.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
const resetPasswordPage = () => {
  return (
    <div className="admin-login4">
    <MDBContainer>

      <MDBRow><MDBCol md="6" className="h4"> 
      <img id ="img4" src={logo}/>

      <div id="Welcome4">Welcome</div>

        </MDBCol>
        <MDBCol md="6" className="signin4">
          <MDBCard className="card4">
            <MDBCardBody>
              <form>
              <p className="heading4">Reset Password</p>
                <div className="input4">
              
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Key} id="key4"/><img  className="icon" id="eye4"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col4">
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    validate
                  /></MDBCol></MDBRow>
                  <MDBRow>
                <MDBCol md="2">
                <img  className="icon" width = "25px" src={Key} id="key4"/><img  className="icon" id="eye4"width = "25px" src={hide} /></MDBCol>
                <MDBCol md="10"id="col4">
                  <MDBInput
                    label="Confirm Password"
                    group
                    type="password"
                    validate
                  /></MDBCol></MDBRow>

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn id="submit4" color="cyan" type="submit">
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


import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import DropdownButton from '../../shared/dropdownButtonGroup';
import {getOrganisations} from '../../actions/productActions';

import '../login/style.scss';
import Key from "../../assets/icons/key.png";
import User from "../../assets/icons/user.png";
import Mail from "../../assets/icons/mail.png";
import hide from "../../assets/icons/hide.png";
import eye from "../../assets/icons/eye.png";
import org from "../../assets/icons/organization.png";
import Waiting from "../../assets/icons/waiting.png";
import logo from "../../assets/brands/VaccineLedgerlogo.svg";
const FormPage = (props) => {
const [organisations, setOrganisations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const orgs = await getOrganisations();
      const orgIds = orgs.map(org => org.id);
      setOrganisations(orgIds);
    }
    fetchData();
  }, []);
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="mobile-header">
          <div className="branding">
            <img src={logo} alt="vaccineledger" />
          </div>
        </div>
      
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
              { props.adminAwaiting ?
                <><img alt="" src={Waiting} height="150" width="150" class="align-self-center mt-5 mb-4" />
              <div class="font-weight-bold align-self-center mb-5 approve"> Waiting for Admin's Approval...</div></>
              
              :
                  <div className="card-body">
                  <div className="login-form">
                  <div className="card-title">Signup</div>
                  <div className="form-group">
                  <img alt="" src={User} className="icon imgs" />
                  <input type="text"
                  className="form-control"
                  value={props.firstName}
                  onChange={props.onfirstNameChange}
                  placeholder="First-Name" />
                  </div>
                  <div className="form-group">
                  <img alt="" src={User} className="icon imgs" />
                  <input type="text"
                  className="form-control"
                  value={props.lastName}
                  onChange={props.onlastNameChange}
                  placeholder="last-Name" />
                  </div>
                  <div className="form-group">
                  <img alt="" src={Mail} className="icon imgs" />
                  <input type="email"
                  className="form-control"
                  value={props.email}
                  onChange={props.onEmailChange}
                  placeholder="Email ID/Mobile Number" />
                  </div>
                  <div className="form-group">
                  <img alt="" src={org} className="icon imgs" />
                  <div className="form-control">
                  <DropdownButton
                  name={props.organisationId}
                  onSelect={item => {
                  props.onOrganisationChange(item);
              }}
                  groups={organisations}
                  className="text"
                  />
                  </div>
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
              }

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;




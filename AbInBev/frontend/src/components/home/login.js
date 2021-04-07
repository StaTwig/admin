import React from "react";
import logo from "../../assets/ABInBev.png";
import { Link } from 'react-router-dom';

const Login = (props) => {

  const { setSteps, setContinueClick, email, onEmailChange, errorMessage, onSendOtp } = props;

  return (
    <div className="loginScreen">
      <div className="align-center pb-5 pt-5">
        <h2 className="titleSubHeading">Welcome Back!</h2>
        <span className="titleSubHeading"><span className="titleHeading">Login</span> to continue.</span>
      </div>

      <div className="loginUserBlock justify-content-center">
        <div className="form-group">
          <label htmlFor="username" className="userNameLabel">Username/ Mobile No.</label>
          <input name="username" className="form-control username" value={email}
            onChange={onEmailChange} />
          <button
            onClick={() => {
              setContinueClick(true);
              setSteps(3);
              onSendOtp();
            }}
            className={`width100 btn mt-4`}
            type="button"
          >
            Send OTP
          </button>
          {/* <div className="signup-link text-center mt-3">Don't have an account? <Link to="/signup">Signup</Link></div> */}
          <p className="signUpDesc align-center mt-3 ">Don't have an account? <a href="#" onClick={
            () => {
              setContinueClick(true);
              setSteps(4);
            }
          } className="signUpLink">Sign Up</a></p>
        </div>
      </div>
      <div className="col text-center footer-logo">
        <img src={logo} width={60} />
      </div>
    </div>
  );
};

export default Login;

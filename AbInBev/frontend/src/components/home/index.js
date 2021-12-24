import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import Waiting from "../../assets/icons/waiting.png";

import Selection from "./selection";
import Login from "./login";
import VerifyPassword from "./verifyPassword";
import SignUp from "./signUp";
import "./style.scss";
import {
  sendOtp,
  verifyOtp,
  setCurrentUser,
  registerUser,
  getUserInfoUpdated,
} from "../../actions/userActions";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import setAuthToken from "../../utils/setAuthToken";

const Home = (props) => {
  const [showSignUpCompletedMessage, setShowSignUpCompletedMessage] =
    useState(false);
  const [buttonActive, setButtonActive] = useState(0);
  const [steps, setSteps] = useState(1);
  const [continueClick, setContinueClick] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onSendOtp = useCallback(async (email) => {
    setEmail(email);
    const data = { emailId: email };

    dispatch(turnOn());
    const result = await sendOtp(data);
    dispatch(turnOff());

    if (result.status === 200) {
      setContinueClick(true);
      setSteps(3);
    } else if (result.status === 500) {
      const err = result.data.message;
      setErrorMessage(err);
      return err;
    } else if (result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
      // setContinueClick(true);
      setShowSignUpCompletedMessage(true);
      setSteps(5);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
      return err;
    }
  });

  const onVerifyOTP = useCallback(async (otp, email) => {
    const data = { emailId: email, otp };
    dispatch(turnOn());
    const result = await verifyOtp(data);
    dispatch(turnOff());
    if (result.status === 200) {
      const token = result.data.data.token;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      localStorage.setItem("theAbInBevToken", token);
      dispatch(setCurrentUser(decoded));
      dispatch(turnOn());
      const r = await getUserInfoUpdated();
      dispatch(turnOff());

      localStorage.setItem("type", r.data.data.type);
      props.history.push("/analytics");
    } else {
      const err = result.data.message;
      setErrorMessage(err);
      return err;
    }
  });

  const resendOtp = useCallback(async (email) => {
    const data = { emailId: email };
    dispatch(turnOn());
    const result = await sendOtp(data);
    dispatch(turnOff());
    if (result.status === 200) {
      const err = result.data.message;
      setErrorMessage(err);
      return err;
    } else if (result.status === 500) {
      const err = result.data.message.response;
      setErrorMessage(err);
      return err;
    } else if (result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
      return err;
    }
  });

  const onSignUpClick = useCallback(async (values) => {
    let isEmail = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (values.mobileemail.match(regexEmail)) {
      isEmail = true;
    } else {
      isEmail = false;
    }
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      authority: values.authority,
      organisationName: values.organisation,
      organisationId: 0,
      address: {
        line1: values.line1,
        city: values.district,
        state: values.state,
        country: "",
        pincode: values.pincode,
      },
    };

    if (isEmail) data.emailId = values.mobileemail;
    else data.phoneNumber = values.mobileemail;

    dispatch(turnOn());
    const result = await registerUser(data);
    dispatch(turnOff());
    if (result.status === 200) {
      setSteps(5);
      setShowSignUpCompletedMessage(true);
    } else if (result.status === 500) {
      setErrorMessage(result.data.message);
      return result.data.message;
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
      return err;
    }
  });

  const goBackButton = () => {
    if (steps == 2 || steps == 5) {
      setSteps(1);
      setButtonActive(0);
    }
    if (steps == 3 || steps == 4) {
      setSteps(2);
    }
  };

  return (
    <div className='home'>
      <div className='container centered scroll-y'>
        <div className='selectUser centered'>
          {steps != 1 && (
            <button
              type='button'
              className='btn btn-primary btn-circle btn-lg back-button'
              onClick={goBackButton}
            >
              <i className='fa fa-angle-left'></i>
            </button>
          )}
          {steps == 1 && (
            <Selection
              setContinueClick={setContinueClick}
              setButtonActive={setButtonActive}
              buttonActive={buttonActive}
              continueClick={continueClick}
              setSteps={setSteps}
            />
          )}
          {steps == 2 && (
            <Login
              msg={errorMessage}
              setSteps={setSteps}
              setContinueClick={setContinueClick}
              steps={steps}
              onSendOtp={onSendOtp}
            />
          )}
          {steps == 3 && (
            <VerifyPassword
              setSteps={setSteps}
              setContinueClick={setContinueClick}
              steps={steps}
              buttonActive={buttonActive}
              setButtonActive={setButtonActive}
              email={email}
              onVerifyOtp={onVerifyOTP}
              onResendOtp={resendOtp}
            />
          )}
          {steps == 4 && (
            <SignUp
              setSteps={setSteps}
              setContinueClick={setContinueClick}
              onSignUpClick={onSignUpClick}
            />
          )}
          {steps == 5 && (
            <>
              {showSignUpCompletedMessage && (
                <div className='col-sm-6 col-lg-5'>
                  <div className='card'>
                    <img
                      alt=''
                      src={Waiting}
                      height='150'
                      width='150'
                      className='align-self-center mt-1 mb-4'
                    />
                    <div className='font-weight-bold align-self-center text-center ml-2 mr-2 approve'>
                      Request is pending and you will receive an email/sms after
                      approval
                    </div>
                    <h4 className='mb-5 text-center'>
                      Click{" "}
                      <a
                        href='#'
                        onClick={() => {
                          setSteps(2);
                        }}
                        className='btn btn-warning loginButton signUpLink'
                      >
                        here
                      </a>
                      &nbsp;login
                    </h4>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Selection from "./selection";
import Login from "./login";
import VerifyPassword from './verifyPassword';
import SignUp from './signUp';
import "./style.scss";
import { sendOtp, verifyOtp, setCurrentUser, registerUser } from "../../actions/userActions";
import setAuthToken from "../../utils/setAuthToken";

const Home = (props) => {
  const [showSignUpCompletedMessage, setShowSignUpCompletedMessage] = useState(false);
  const [buttonActive, setButtonActive] = useState(0);
  const [steps, setSteps] = useState(1);
  const [continueClick, setContinueClick] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onSendOtp = useCallback(async (email) => {
    setEmail(email);
    const data = { emailId: email };
    const result = await sendOtp(data);
    if (result.status === 200) {
      setContinueClick(true);
      setSteps(3);
    } else if (result.status === 500) {
      const err = result.data.message;
      setErrorMessage(err);
    } else if (result.status === 401) {
      console.log('step5');
      const err = result.data.message;
      setErrorMessage(err);
      // setContinueClick(true);
      setShowSignUpCompletedMessage(true);
      setSteps(5);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  const onVerifyOTP = useCallback(async (otp, email) => {
    const data = { emailId: email, otp };
    const result = await verifyOtp(data);
    if (result.status === 200) {
      const token = result.data.data.token;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      localStorage.setItem('theLedgerToken', token);
      dispatch(setCurrentUser(decoded));
      // props.history.push(`/overview`);
      window.location.href = '/overview';
    } else {
      const err = result.data.message;
      setErrorMessage(err);
    }

  });
  const resendOtp = useCallback(async (email) => {
    const data = { emailId: email };
    const result = await sendOtp(data);
    if (result.status === 200) {
      const err = result.data.message;
      setErrorMessage(err);
    } else if (result.status === 500) {
      const err = result.data.message.response;
      setErrorMessage(err);
    } else if (result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  const onSignUpClick = useCallback(async (values) => {
    let data = { firstName: values.firstName, lastName: values.lastName, emailId: values.mobile_email, organisationName: values.organisation, organisationId: 0 };
    const result = await registerUser(data);
    if (result.status === 200) {
      setSteps(5);
      setShowSignUpCompletedMessage(true);
    } else if (result.status === 500) {
      setErrorMessage(result.data.message);
    }
    else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  return (
    <div className="home">
      <div className="container centered">
        <div className="selectUser centered">
          {steps == 1 && (
            <Selection
              setContinueClick={setContinueClick}
              setButtonActive={setButtonActive}
              buttonActive={buttonActive}
              continueClick={continueClick}
              setSteps={setSteps}
            />
          )}
          {steps == 2 && <Login setSteps={setSteps} setContinueClick={setContinueClick} steps={steps} onSendOtp={onSendOtp} />}
          {steps == 3 && <VerifyPassword setSteps={setSteps} setContinueClick={setContinueClick} steps={steps} buttonActive={buttonActive} setButtonActive={setButtonActive} email={email}
            onVerifyOtp={onVerifyOTP}
            onResendOtp={resendOtp} />}
          {steps == 4 && <SignUp setSteps={setSteps} setContinueClick={setContinueClick} onSignUpClick={onSignUpClick} />}
          {steps == 5 &&
            <>
              {
                showSignUpCompletedMessage &&
                <>
                  <h4>Please wait while your Account is Verified by Admin!</h4>
                  &nbsp;
                  <h4>
                    <a href="#" onClick={() => { setSteps(2); }} className="signUpLink">Log In</a> &nbsp;here
                  </h4>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;

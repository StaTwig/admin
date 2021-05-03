import React, { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Waiting from "../../assets/icons/waiting.png";

import Selection from "./selection";
import Login from "./login";
import VerifyPassword from './verifyPassword';
import SignUp from './signUp';
import "./style.scss";
import { sendOtp, verifyOtp, setCurrentUser, registerUser } from "../../actions/userActions";
import { turnOff, turnOn } from '../../actions/spinnerActions';
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
      localStorage.setItem('theAbInBevToken', token);
      dispatch(setCurrentUser(decoded));
      props.history.push("/transactions");
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
    let data = { firstName: values.firstName, lastName: values.lastName, emailId: values.mobileemail, organisationName: values.organisation, organisationId: 0 };
    dispatch(turnOn());
    const result = await registerUser(data);
    dispatch(turnOff());
    if (result.status === 200) {
      setSteps(5);
      setShowSignUpCompletedMessage(true);
    } else if (result.status === 500) {
      setErrorMessage(result.data.message);
      return result.data.message;
    }
    else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
      return err;
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
          {steps == 2 && <Login msg={errorMessage} setSteps={setSteps} setContinueClick={setContinueClick} steps={steps} onSendOtp={onSendOtp} />}
          {steps == 3 && <VerifyPassword setSteps={setSteps} setContinueClick={setContinueClick} steps={steps} buttonActive={buttonActive} setButtonActive={setButtonActive} email={email}
            onVerifyOtp={onVerifyOTP}
            onResendOtp={resendOtp} />}
          {steps == 4 && <SignUp setSteps={setSteps} setContinueClick={setContinueClick} onSignUpClick={onSignUpClick} />}
          {steps == 5 &&
            <>
              {
                showSignUpCompletedMessage &&
                <div className="col-sm-6 col-lg-5">
                  <div className="card">
                    <img alt="" src={Waiting} height="150" width="150" className="align-self-center mt-5 mb-4" />
                    <div className="font-weight-bold text-dark align-self-center text-center ml-2 mr-2 approve">Request is pending and you will receive an email/sms after approval</div>
                    <h4 className="mb-5 text-dark text-center">
                      Click <a href="#" onClick={() => { setSteps(2); }} className="signUpLink text-primary">here</a>&nbsp;login
                    </h4>
                  </div>
                  </div>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;

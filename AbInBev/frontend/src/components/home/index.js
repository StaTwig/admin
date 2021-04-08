import React, { useState, useCallback } from "react";

import Selection from "./selection";
import Login from "./login";
import VerifyPassword from './verifyPassword';
import SignUp from './signUp';
import "./style.scss";
import { sendOtp, verifyOtp, registerUser } from "../../actions/userActions";

const Home = (props) => {
  const [showSignUpCompletedMessage, setShowSignUpCompletedMessage] = useState(false);
  const [buttonActive, setButtonActive] = useState(0);
  const [steps, setSteps] = useState(1);
  const [continueClick, setContinueClick] = useState(false);
  const [email, setEmail] = useState('');
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  let otp = otp1 + otp2 + otp3 + otp4

  const [errorMessage, setErrorMessage] = useState('');

  const onSendOtp = useCallback(async () => {
    const data = { emailId: email };
    const result = await sendOtp(data);
    if (result.status === 200) {
      props.history.push(`/verify?emailId=${email}`);
    } else if (result.status === 500) {
      const err = result.data.message;
      setErrorMessage(err);
    } else if (result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  const onVerifyOTP = useCallback(async () => {
    // const params = props.location.search.split('emailId=');
    // if (params.length > 1) {
    //   const emailId = params[1];
    const data = { emailId: email, otp };
    const result = await verifyOtp(data);
    if (result.status === 200) {
      const token = result.data.data.token;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      localStorage.setItem('theLedgerToken', token);
      // dispatch(setCurrentUser(decoded));
      props.history.push(`/`);
    } else {
      const err = result.data.message;
      setErrorMessage(err);
    }
    // } else {
    //   setErrorMessage('Invalid Url');
    // }

  });
  const resendOtp = useCallback(async () => {
    setOtp1('');
    setOtp2('');
    setOtp3('');
    setOtp4('');
    const params = props.location.search.split('emailId=');
    if (params.length > 1) {
      const emailId = params[1];
      const data = { emailId };
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
    }
  });

  const onSignUpClick = useCallback(async (values) => {
    let data = { firstName: values.firstName, lastName: values.lastName, emailId: values.mobile_email, organisationId: values.organisation };
    const result = await registerUser(data);
    if (result.status === 200) {
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
          {steps == 2 && <Login setSteps={setSteps} setContinueClick={setContinueClick} steps={steps} onSendOtp={onSendOtp} onEmailChange={e => setEmail(e.target.value)} />}
          {steps == 3 && <VerifyPassword setSteps={setSteps} setContinueClick={setContinueClick} steps={steps} buttonActive={buttonActive} setButtonActive={setButtonActive} email={email}
            otp1={otp1}
            otp2={otp2}
            otp3={otp3}
            otp4={otp4}
            errorMessage={errorMessage}
            onEmailChange={e => setEmail(e.target.value)}
            onOtpChange1={e => setOtp1(e.target.value)}
            onOtpChange2={e => setOtp2(e.target.value)}
            onOtpChange3={e => setOtp3(e.target.value)}
            onOtpChange4={e => setOtp4(e.target.value)}
            onVerifyOtp={onVerifyOTP}
            onResendOtp={resendOtp} />}
          {steps == 4 && (!showSignUpCompletedMessage && !errorMessage.length) && <SignUp setSteps={setSteps} setContinueClick={setContinueClick} onSignUpClick={onSignUpClick} />}
          {steps == 4 && showSignUpCompletedMessage && <h4>Account waiting for approval by Admin.<a href="#" onClick={
            () => {
              setSteps(2);
            }
          } className="signUpLink">Log In</a> here</h4>}
          {steps == 4 && errorMessage.length && <h4>{errorMessage}. <a href="#" onClick={
            () => {
              setSteps(2);
            }
          } className="signUpLink">Log In</a> here.</h4>}
        </div>
      </div>
    </div>
  );
};

export default Home;

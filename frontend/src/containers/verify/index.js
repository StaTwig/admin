import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Verify from '../../components/verify';
import {sendOtp, setCurrentUser, verifyOtp} from '../../actions/userActions';
import {turnOff, turnOn} from "../../actions/spinnerActions";
import setAuthToken from "../../utils/setAuthToken";

const VerifyContainer = props => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const verifyOTP = useCallback(async () => {
    const params = props.location.search.split('emailId=');
    if(params.length > 1) {
      const emailId = params[1];
      const data = { emailId, otp };
      const result = await verifyOtp(data);
      if (result.status === 200) {
        // Set auth token auth
         const token = result.data.data.token;
         setAuthToken(token);
         // Decode token and get user info and exp
         const decoded = jwt_decode(token);
         // Set user and isAuthenticated
         localStorage.setItem('theLedgerToken', token);
         dispatch(setCurrentUser(decoded));
        props.history.push(`/`);
      } else {
        const err = result.data.message;
        setErrorMessage(err);
      }
    }else {
      setErrorMessage('Invalid Url');
    }

  });
  const resendOtp = useCallback(async () => {
    dispatch(turnOn());
    const data = { emailId:email };
    const result = await sendOtp(data);
    if (result.status === 200) {
      const err = result.data.message;
      setErrorMessage(err);
    }else if(result.status === 500) {
      const err = result.data.message.response;
      setErrorMessage(err);
    }else if(result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
    dispatch(turnOff());
  });
  return (
    <div className="container-fluid p-0">
      <Verify
        email={email}
        otp={otp}
        errorMessage={errorMessage}
        onEmailChange={e => setEmail(e.target.value)}
        onOtpChange={e => setOtp(e.target.value)}
        onVerifyOtp={verifyOTP}
        onResendOtp={resendOtp}
      />
    </div>
  );
};

export default VerifyContainer;

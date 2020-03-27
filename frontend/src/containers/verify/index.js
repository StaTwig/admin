import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Verify from '../../components/verify';
import { verifyOtp } from '../../actions/userActions';

const VerifyContainer = props => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const verifyOTP = useCallback(async () => {
    const data = { email, otp };
    const result = await verifyOtp(data);
    if (result.status === 200) {
      setErrorMessage(`${result.data.message} redirecting to login`);
      setTimeout(() => props.history.push('/login'), 3000);
    } else {
      const err = result.data;
      setErrorMessage(err.message);
    }
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
      />
    </div>
  );
};

export default VerifyContainer;

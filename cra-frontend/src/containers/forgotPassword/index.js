import React , { useState, useCallback } from "react";
import ForgotPassword from '../../components/forgotPassword';
import {forgotPassword} from '../../actions/userActions';

const ForgotPasswordContainer = (props) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onEmailChange = (e) => {
         setEmail((e.target.value).toLowerCase());
  }
  
  const onForgot =  useCallback(async () => {
    const data = { email};
    const result = await forgotPassword(data);
    if (result.status === 200) {
      setErrorMessage(`${result.data.message} redirecting to login`);
      setTimeout(() => props.history.push('/login'), 3000);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });
  return (
    <div className="container-fluid p-0">
      <ForgotPassword 
      email={email}
       onForgot={onForgot}
      errorMessage={errorMessage}
      onEmailChange={onEmailChange}
     />
    </div>
  );
};

export default ForgotPasswordContainer;


import React, { useState, useCallback } from 'react';
import Signup from '../../components/signUp';
import {authenticateUser} from '../../actions/userActions';

const SignupContainer = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const onSignup =  useCallback(async () => {
    const data = { email, password, name};
    const result = await authenticateUser(data);
    if(result.status === 200) {
      props.history.push('/verify');
    }else{
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  return (
    <div className="container-fluid p-0">
      <Signup
        email={email}
        password={password}
        name={name}
        onSignup={onSignup}
        onNameChange={e => setName(e.target.value)}
        errorMessage={errorMessage}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
      />
    </div>
  );
};

export default SignupContainer;

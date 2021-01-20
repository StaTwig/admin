import React, { useState, useCallback } from 'react';
import Signup from '../../components/signUp';
import {authenticateUser} from '../../actions/userActions';
import MobileHeader from '../../shared/header/mobileHeader';
import logo from '../../assets/brands/VACCINELEDGER.png';
import { Link } from 'react-router-dom';

const SignupContainer = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const onSignup =  useCallback(async () => {
    const data = {firstName,lastName,emailId:email, password};
    const result = await authenticateUser(data);
    if(result.status === 200) {
      props.history.push('/verify');
    }else if(result.status === 500) {
      setErrorMessage(result.data.message);
    }
    else{
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  return (
    <div className="container-fluid p-0">
 <MobileHeader {...props} />
   <nav className="navbar sticky-top navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo} width="230" height="30" alt="logo" onClick={() =>props.history.push('/#')} />
        </a>
</nav>

      <Signup
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        onSignup={onSignup}
        onfirstNameChange={e => setFirstName(e.target.value)}
        errorMessage={errorMessage}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onlastNameChange={e => setLastName(e.target.value)}
      />
    </div>
  );
};

export default SignupContainer;

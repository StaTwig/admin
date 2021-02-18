import React, { useState, useCallback } from 'react';
import Signup from '../../components/signUp';
import {registerUser} from '../../actions/userActions';
import MobileHeader from '../../shared/header/mobileHeader';
import logo from '../../assets/brands/VACCINELEDGER.png';

const SignupContainer = (props) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ organisationId, setOrganisationId ] = useState('Organisation');
  const [ adminAwaiting, setAdminAwaiting ] = useState(false);
  const onSignup =  useCallback(async () => {
    const data = {firstName,lastName,emailId:email, organisationId };
    console.log(data);
    const result = await registerUser(data);
    if(result.status === 200) {
        setAdminAwaiting(true)
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
        firstName={firstName}
        lastName={lastName}
        onSignup={onSignup}
        adminAwaiting={adminAwaiting}
        onfirstNameChange={e => setFirstName(e.target.value)}
        errorMessage={errorMessage}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onlastNameChange={e => setLastName(e.target.value)}
        onOrganisationChange={ id => setOrganisationId(id)}
        organisationId={organisationId}
      />
    </div>
  );
};

export default SignupContainer;

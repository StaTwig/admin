import React, { useState, useCallback } from 'react';
import Signup from '../../components/signUp';
import {registerUser, checkUser} from '../../actions/userActions';
import MobileHeader from '../../shared/header/mobileHeader';
import logo from '../../assets/brands/VACCINELEDGER.png';
import Modal from '../../shared/modal';
import OrganisationPopUp from '../../components/signUp/organisationPopUp';

const SignupContainer = (props) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ organisation, setOrganisation ] = useState({id: '', name: ''});
  const [showModal, setShowModal] = useState(false);
  const [ adminAwaiting, setAdminAwaiting ] = useState(false);
  const [isNewOrg, setIsNewOrg] = useState(false);
  const [innerWidth,setInnerwidth] = useState(window.innerWidth);

  // const updtaeInnerWidth = () =>{
  //     setInnerwidth(window.innerWidth);
  // } 
  // setInterval(updtaeInnerWidth,100);
  
  window.onresize = () =>{
    setInnerwidth(window.innerWidth);
  }
  const onSignup = useCallback(async (values) => {
    let data = { firstName, lastName, emailId: email, organisationId: organisation.id };
    if (isNewOrg) {
      // data.organisationName = organisation.name;
      data.organisationName = values.name;
      data.address = {
        line1: values.line1,
        city:  values.city,
        state: values.state,
        pincode: values.pincode,
        country: values.country
      }
      // data.type = 'CUSTOMER_SUPPLIER';
      data.organisationId = 0;
    }
    
    const result = await registerUser(data);
    if (result.status === 200) {
      setShowModal(false);
      setAdminAwaiting(true);
    }else if(result.status === 500) {
      setErrorMessage(result.data.message);
    }
    else{
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });

  
  const checkNcontinue = async () => {
    if (isNewOrg) {
      let data = { firstName, lastName, emailId: email, organisationId: organisation.id };
      const result = await checkUser(data);
      if(result.status === 200) {
        setShowModal(true);
      }else if(result.status === 500) {
        setErrorMessage(result.data.message);
      }
      else{
        const err = result.data.data[0];
        setErrorMessage(err.msg);
      }
    }
    else
      onSignup({});
  }

  const onkeydown = (event) => {
    if (event.keyCode  === 13) {
      checkNcontinue();
    }
  }
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid p-0" tabIndex="-1" onKeyDown={onkeydown}>
      {showModal && (
        <Modal
          isMandatory={true}
          close={() => closeModal()}
          size="modal-md" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <OrganisationPopUp
            onHide={closeModal}
            onSignup={onSignup}
          />
        </Modal>
      )}
 <MobileHeader {...props} />
 { innerWidth >1024 &&
   <nav className="navbar sticky-top navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo} width="230" height="30" alt="logo" onClick={() =>props.history.push('/#')} />
        </a>
    </nav>
}
      <Signup
        email={email}
        firstName={firstName}
        lastName={lastName}
        onSignup={checkNcontinue}
        adminAwaiting={adminAwaiting}
        onfirstNameChange={e => setFirstName(e.target.value)}
        errorMessage={errorMessage}
        onEmailChange={e => setEmail(e.target.value)}
        onOrgChange={value => setIsNewOrg(value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onlastNameChange={e => setLastName(e.target.value)}
        onOrganisationChange={org => setOrganisation({id: org.id, name: org.name})}
        organisation={organisation}
      />
    </div>
  );
};

export default SignupContainer;

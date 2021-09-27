import React,{ useState, useCallback} from 'react';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import MobileHeader from '../../shared/header/mobileHeader';
import logo from '../../assets/brands/VACCINELEDGER.png';
import { Link } from 'react-router-dom';
import Login from '../../components/login';
import { sendOtp, setCurrentUser } from '../../actions/userActions';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import setAuthToken from '../../utils/setAuthToken';

const LoginContainer = props => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailFieldDisable,setemailFieldDisable] = useState(false);
  const [phoneFieldDisable,setphoneFieldDisable] = useState(false);
  const dispatch = useDispatch();
  const [innerWidth,setInnerwidth] = useState(window.innerWidth);

  // const updtaeInnerWidth = () =>{
  //     setInnerwidth(window.innerWidth);
  // } 
  // setInterval(updtaeInnerWidth,100);
  
  window.onresize = () =>{
    setInnerwidth(window.innerWidth);
  }

  const onSendOtp = useCallback(async () => {
      dispatch(turnOn());
     


    const data = { emailId: email != '' ? email : phone};
    console.log("3",data);
    const result = await sendOtp(data);
    if (result.status === 200) {
      // Set auth token auth
     /* const token = result.data.data.token;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      localStorage.setItem('theLedgerToken', token);
      dispatch(setCurrentUser(decoded));*/
      props.history.push(`/verify?emailId=${email != '' ? email : phone}`);
    }else if(result.status === 500) {
        const err = result.data.message;
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
  const onkeydown = (event) => {
    if (event.keyCode  === 13) {
      onSendOtp();
    }
   }

// console.log(phone,"Phone");
// console.log(email,"email");
  return(
    <div className="container-fluid p-0" tabIndex="-1" onKeyDown={onkeydown}>
    <MobileHeader {...props} />  
    { innerWidth >1024 &&
   <nav className="navbar sticky-top navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo} width="230" height="30" alt="logo" onClick={() =>props.history.push('/#')} />
        </a>
    </nav>
}
 <Login
        errorMessage={errorMessage}
        onSendOtp={onSendOtp}
        onEmailChange={(e) => {
          setEmail((e.target.value).toLowerCase())
          let temp_email = (e.target.value).toLowerCase();
          if(temp_email!="")
            setphoneFieldDisable(true);
          else
            setphoneFieldDisable(false);
        }}
        onPhoneChange={(value)=>{
          setPhone(value)
          let temp_phone = value.slice(2,value.length);
          if(temp_phone!="")
            setemailFieldDisable(true);
          else 
            setemailFieldDisable(false);

        }}
        email={email}
        phone={phone}
        emailFieldDisable = {emailFieldDisable}
        phoneFieldDisable = {phoneFieldDisable}
      />
    </div>
  );
};

export default LoginContainer;

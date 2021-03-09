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
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onSendOtp = useCallback(async () => {
      dispatch(turnOn());
    const data = { emailId:email };
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
      props.history.push(`/verify?emailId=${email}`);
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

  return(

    <div className="container-fluid p-0" tabIndex="-1" onKeyDown={onkeydown}>
    <MobileHeader {...props} />  
   <nav className="navbar sticky-top navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo}  width="230" height="30" alt="logo" onClick={() =>props.history.push('/#')} />
        </a>
</nav>
 <Login
        errorMessage={errorMessage}
        onSendOtp={onSendOtp}
        onEmailChange={e => setEmail(e.target.value)}
      />
    </div>

  );
};

export default LoginContainer;

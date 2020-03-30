import React,{ useState, useCallback} from 'react';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';

import Login from '../../components/login';
import { loginUser, setCurrentUser } from '../../actions/userActions';
import setAuthToken from '../../utils/setAuthToken';

const LoginContainer = props => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = useCallback(async () => {
    const data = { email, password };
    const result = await loginUser(data);
    if (result.status === 200) {
      // Set auth token auth
      const token = result.data.data.token;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      localStorage.setItem('theLedgerToken', token);
      dispatch(setCurrentUser(decoded));
      props.history.push('/overview');
    }if(result.status === 401) {
      const err = result.data.message;
      setErrorMessage(err);
    } else {
      const err = result.data.data[0];
      setErrorMessage(err.msg);
    }
  });
  return(
    <div className="container-fluid p-0">
      <Login
        errorMessage={errorMessage}
        onLogin={onLogin}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
      />
    </div>
  );
};

export default LoginContainer;

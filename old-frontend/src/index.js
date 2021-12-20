import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';

import App from './App';
import configureStore, { history } from './configureStore';
import { setCurrentUser, logoutUser } from './actions/userActions';
import setAuthToken from './utils/setAuthToken';

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('react-root'),
  );
};

setAuthToken();
// Check for token
if (localStorage.theLedgerToken) {
  // Set auth token auth
  setAuthToken(localStorage.theLedgerToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.theLedgerToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currenTime = Date.now() / 1000;
  if (decoded.exp < currenTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/';
  }
}

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });
}

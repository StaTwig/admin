import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";
import App from "./App";
import configureStore, { history } from "./configureStore";
import { setCurrentUser, logoutUser } from "./actions/userActions";
import setAuthToken from "./utils/setAuthToken";

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

setAuthToken();
if (localStorage.theLedgerToken) {
  setAuthToken(localStorage.theLedgerToken);
  const decoded = jwt_decode(localStorage.theLedgerToken);
  store.dispatch(setCurrentUser(decoded));
  const currenTime = Date.now() / 1000;
  if (decoded.exp < currenTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

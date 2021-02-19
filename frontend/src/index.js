import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";

import App from "./App";
import configureStore, { history } from "./configureStore";

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById("react-root")
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept("./App", () => {
    render();
  });
}

import "react-app-polyfill/stable";

import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import routes from "./routes";
import "./app.css";
import "./assets/globlestyles/index.css";
import Spinner from "./containers/Spinner";

const App = ({ history }) => {
  return (
    <Suspense fallback='loading'>
      <div>
        <Spinner />
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
      </div>
    </Suspense>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;

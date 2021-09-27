import '@babel/polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';
import './app.css';
import Spinner from './containers/Spinner';

const App = ({ history }) => {
  return (
    <div>
      <Spinner />
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </div>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;

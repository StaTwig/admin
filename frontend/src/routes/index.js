import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Hello from '../components/Hello'
import NoMatch from '../components/NoMatch'
import FormPage from '../components/signUp'
import ForgotPasswordPage from '../components/forgotPassword'
import ResetPasswordPage from '../components/resetPassword'

import FormLogin from '../components/login'
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Hello} />
      <Route path="/login" component={FormLogin} />
      <Route path="/signup" component={FormPage} />
      <Route path="/forgotPassword" component={ForgotPasswordPage} />
      <Route path="/resetPassword" component={ResetPasswordPage} />





      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes

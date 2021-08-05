import React from "react";
import { Route, Switch } from "react-router";

import Login from "../containers/login";
import Verify from "../containers/verify";
import Profile from "../containers/profile";
import DashBoard from "../containers/overview";
import Address from "../containers/addresses";
import Users from "../containers/users";
import Organisations from "../containers/organisation";
import Affiliate from "../containers/affiliate";
import NewAddress from "../containers/newaddress";
import requireAuth from "../components/hocs/requireAuth";
import Signup from "../containers/signUp";
import ForgotPassword from "../containers/forgotPassword";
import resetPasswordPage from "../containers/resetPassword";
import Configuration from "../containers/configuration";

import Home from "../containers/home";

import NoMatch from "../components/NoMatch";

import "./style.scss";
const routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/overview" component={requireAuth(DashBoard)} />
    <Route path="/address" component={requireAuth(Address)} />
    <Route path="/newaddress" component={requireAuth(NewAddress)} />
    <Route path="/editaddress/:address" component={requireAuth(NewAddress)} />
    <Route path="/users" component={requireAuth(Users)} />
    <Route path="/organisation" component={requireAuth(Organisations)} />
    <Route path="/login" component={Login} />
    <Route path="/verify" component={Verify} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/resetPassword" component={resetPasswordPage} />
    <Route path="/profile" component={requireAuth(Profile)} />
    <Route path="/configuration" component={requireAuth(Configuration)} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

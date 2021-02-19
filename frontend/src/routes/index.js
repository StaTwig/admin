import React from "react";
import { Route, Switch } from "react-router";

import Login from "../containers/login";
import Verify from "../containers/verify";
import Profile from "../containers/profile";
import DashBoard from "../containers/overview";
import Address from "../containers/addresses";
import Users from "../containers/users";
import Affiliate from "../containers/affiliate";
import NewAddress from "../containers/newaddress";
import requireAuth from "../components/hocs/requireAuth";
import Signup from "../containers/signUp";
import ForgotPassword from "../containers/forgotPassword";
import resetPasswordPage from "../containers/resetPassword";

import Home from "../containers/home";

import NoMatch from "../components/NoMatch";

import "./style.scss";
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/overview" component={DashBoard} />
    <Route path="/address" component={Address} />
    <Route path="/newaddress" component={NewAddress} />
    <Route path="/users" component={Users} />
    <Route path="/affiliate" component={Affiliate} />
    <Route path="/login" component={Login} />
    <Route path="/verify" component={Verify} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/resetPassword" component={resetPasswordPage} />
    <Route path="/profile" component={Profile} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

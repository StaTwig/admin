import React from "react";
import { Route, Switch } from "react-router";

import Home from "../containers/home";

import NoMatch from "../components/NoMatch";

import "./style.scss";
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

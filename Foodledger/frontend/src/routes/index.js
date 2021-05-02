import React from "react";
import { Route, Switch } from "react-router";
import requireAuth from '../components/hocs/requireAuth';
import TransactionHistoryContainer from "../containers/transactionHistory";
import InventoryContainer from "../containers/inventory";
import Home from "../containers/home";
import NoMatch from "../components/NoMatch";

import "./style.scss";
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path="/transactions"
      component={requireAuth(TransactionHistoryContainer)}
    />
    <Route path="/inventory" component={requireAuth(InventoryContainer)} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

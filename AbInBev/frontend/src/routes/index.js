import React from "react";
import { Route, Switch } from "react-router";
import requireAuth from '../components/hocs/requireAuth';
import OverviewContainer from "../containers/overview";
import AnalyticsContainer from "../containers/analytics";
import TransactionHistoryContainer from "../containers/transactionHistory";
import InventoryContainer from "../containers/inventory";
import Home from "../containers/home";

import NoMatch from "../components/NoMatch";

import "./style.scss";
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route path="/overview" component={requireAuth(OverviewContainer)} /> */}
    <Route path="/analytics" component={requireAuth(AnalyticsContainer)} />
    <Route
      path="/transactionHistory"
      component={requireAuth(TransactionHistoryContainer)}
    />
    <Route path="/inventory" component={requireAuth(InventoryContainer)} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

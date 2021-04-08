import React from "react";
import { Route, Switch } from "react-router";
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
    <Route exact path="/overview" component={OverviewContainer} />
    <Route exact path="/analytics" component={AnalyticsContainer} />
    <Route
      exact
      path="/transactionHistory"
      component={TransactionHistoryContainer}
    />
    <Route exact path="/inventory" component={InventoryContainer} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

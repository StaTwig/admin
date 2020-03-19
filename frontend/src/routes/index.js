import React from 'react'
import { Route, Switch } from 'react-router'

import Header from '../components/shared/header';
import Sidebar from '../components/shared/sidebarMenu';
import OverView from '../components/overview';

import Home from '../components/Home'
import Hello from '../components/Hello'
import NoMatch from '../components/NoMatch'
import FormPage from '../components/signUp'
import ForgotPassword from '../components/forgotPassword'
import resetPasswordPage from '../components/resetPassword'

import FormLoginPage from '../components/login'
import ShipmentAnalytic from '../components/shipments'
import Inventory from '../components/inventory'
import trackAndTrace from '../components/trackAndTrace'
import InventorySummary from '../components/inventorySummary'

import './style.scss';
const routes = (
  <div className="container-fluid p-0">
    <Header />
    <div className="d-flex">
      <Sidebar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={OverView} />
          <Route path="/page1" component={Hello} />
          <Route path="/login" component={FormLoginPage} />
          <Route path="/signup" component={FormPage} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword" component={resetPasswordPage} />
          <Route path="/shipments" component={ShipmentAnalytic} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/trackAndTrace" component={trackAndTrace} />
          <Route path="/inventorySummary" component={InventorySummary} />
          <Route component={NoMatch} />
        </Switch>

      </div>
    </div>
  </div>
)

export default routes;
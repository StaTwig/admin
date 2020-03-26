import React from 'react'
import { Route, Switch } from 'react-router'


import Login from '../containers/login';
import OverView from '../containers/overview';
import Shipment from '../containers/shipments'
import NewShipment from '../containers/newshipment';
import Inventory from '../containers/inventory'
import NewInventory from '../containers/newinventory';
import trackAndTrace from '../containers/trackAndTrace'
import InventorySummary from '../containers/inventorySummary'
import Network from '../containers/network';

import Signup from '../containers/signUp'
import ForgotPassword from '../containers/forgotPassword'
import resetPasswordPage from '../containers/resetPassword'

import NoMatch from '../components/NoMatch'

import './style.scss';
const routes = (
  <Switch>
    <Route exact path="/" component={OverView} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/resetPassword" component={resetPasswordPage} />
    <Route path="/shipments" component={Shipment} />
    <Route path="/newshipment" component={NewShipment} />
    <Route path="/inventory" component={Inventory} />
    <Route path="/newinventory" component={NewInventory} />
    <Route path="/trackAndTrace" component={trackAndTrace} />
    <Route path="/inventorySummary" component={InventorySummary} />
    <Route path="/network" component={Network} />
    <Route component={NoMatch} />
  </Switch>
)

export default routes;
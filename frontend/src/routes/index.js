import React from 'react'
import { Route, Switch } from 'react-router'


import Login from '../containers/login';
import LandingPage from '../containers/landingpage';
import OverView from '../containers/overview';
import Shipment from '../containers/shipments'
import NewShipment from '../containers/newshipment';
import VerifyShipment from  '../containers/verifyshipment';
import Inventory from '../containers/inventory';
import NewInventory from '../containers/newinventory';
import trackAndTrace from '../containers/trackAndTrace';
import Tracing from '../containers/tracing';
import InventorySummary from '../containers/inventorySummary';
import Network from '../containers/network';
import Profile from '../containers/profile';
import AdminProfile from '../containers/adminprofile';



import Signup from '../containers/signUp'
import ForgotPassword from '../containers/forgotPassword'
import resetPasswordPage from '../containers/resetPassword'

import Home from '../containers/home';

import NoMatch from '../components/NoMatch'

import './style.scss';
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/overview" component={OverView} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/resetPassword" component={resetPasswordPage} />
    <Route path="/landingpage" component={LandingPage} />
    <Route path="/profile" component={Profile} />
    <Route path="/adminprofile" component={AdminProfile} />
    <Route path="/shipments" component={Shipment} />
    <Route path="/newshipment" component={NewShipment} />
    <Route path="/verifyshipment" component={VerifyShipment} />
    <Route path="/inventory" component={Inventory} />
    <Route path="/newinventory" component={NewInventory} />
    <Route path="/trackAndTrace" component={trackAndTrace} />
    <Route path="/tracing" component={Tracing} />
    <Route path="/inventorySummary" component={InventorySummary} />
    <Route path="/network" component={Network} />
    <Route component={NoMatch} />
  </Switch>
)

export default routes;
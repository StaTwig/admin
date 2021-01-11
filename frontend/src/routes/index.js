import React from 'react';
import { Route, Switch } from 'react-router';

import Login from '../containers/login';
import Verify from '../containers/verify';
import LandingPage from '../containers/landingpage';
import OverView from '../containers/overview';
import Shipment from '../containers/shipments';
import NewShipment from '../containers/newshipment';
import VerifyShipment from '../containers/verifyshipment';
import VerifyInventory from '../containers/verifyinventory';
import Inventory from '../containers/inventory';
import NewInventory from '../containers/newinventory';
import ProductList  from '../containers/productList'
import trackAndTrace from '../containers/trackAndTrace';
import Tracing from '../containers/tracing';
import ProductTracing from '../containers/productTracing';
import Network from '../containers/network';
import Profile from '../containers/profile';
import AdminProfile from '../containers/adminprofile';
import DashBoard from '../containers/dashboard';
import requireAuth from '../components/hocs/requireAuth';
import QrCode from '../containers/qrcode';

import AddProduct from '../containers/addproduct';
import Signup from '../containers/signUp';
import ForgotPassword from '../containers/forgotPassword';
import resetPasswordPage from '../containers/resetPassword';

import Home from '../containers/home';

import NoMatch from '../components/NoMatch';

import './style.scss';
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/overview" component={requireAuth(OverView)} />
    <Route path="/login" component={Login} />
    <Route path="/verify" component={Verify} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/resetPassword" component={resetPasswordPage} />
    <Route path="/landingpage" component={requireAuth(LandingPage)} />
    <Route path="/profile" component={requireAuth(Profile)} />
    <Route path="/adminprofile" component={requireAuth(AdminProfile)} />
    <Route path="/shipments" component={requireAuth(Shipment)} />
    <Route path="/newshipment" component={requireAuth(NewShipment)} />
    <Route path="/reviewshipment" component={requireAuth(VerifyShipment)} />
    <Route path="/inventory" component={requireAuth(Inventory)} />
    <Route path="/productlist/:id" component={requireAuth(ProductList)} />
    <Route path="/dashboard" component={requireAuth(DashBoard)} />
    <Route path="/addproduct" component={requireAuth(AddProduct)} />
    <Route path="/qrcode" component={requireAuth(QrCode)} />
    <Route path="/newinventory" component={requireAuth(NewInventory)} />
    <Route path="/reviewinventory" component={requireAuth(VerifyInventory)} />
    <Route path="/trackAndTrace" component={requireAuth(trackAndTrace)} />
    <Route path="/tracing/:id" component={requireAuth(Tracing)} />
    <Route path="/producttracing" component={requireAuth(ProductTracing)} />
    <Route path="/network" component={requireAuth(Network)} />
    <Route component={NoMatch} />
  </Switch>
);

export default routes;

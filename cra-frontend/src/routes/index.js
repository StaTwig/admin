import React from "react";
import { Route, Switch } from "react-router";
import "./style.scss";
import Login from "../containers/login";
import Verify from "../containers/verify";
import LandingPage from "../containers/landingpage";
import OverView from "../containers/overview";
import Shipment from "../containers/shipments";
import NewShipment from "../containers/newshipment";
import NewOrder from "../containers/neworder";
import ViewShipment from "../containers/viewShipment";
import VerifyShipment from "../containers/verifyshipment";
import VerifyInventory from "../containers/verifyinventory";
import Inventory from "../containers/inventory";
import NewInventory from "../containers/newinventory";
import ProductList from "../containers/productList";
import trackAndTrace from "../containers/trackAndTrace";
import Track from "../containers/track";
import ProductTracing from "../containers/productTracing";
import Network from "../containers/network";
import Profile from "../containers/profile";
import AdminProfile from "../containers/adminprofile";
import DashBoard from "../containers/dashboard";
import Orders from "../containers/orders";
import requireAuth from "../components/hocs/requireAuth";
import QrCode from "../containers/qrcode";
import TransactionHistory from "../containers/transactionHistory";
import ViewOrder from "../containers/vieworder";
import ReviewOrder from "../containers/revieworder";
import enterId from "../containers/EnterId";
import AddProduct from "../containers/addproduct";
import Signup from "../containers/signUp";
import ForgotPassword from "../containers/forgotPassword";
import resetPasswordPage from "../containers/resetPassword";
import Home from "../containers/home";
import UpdateStatus from "../containers/updateStatus";
import ReceiveShipment from "../containers/receiveShipment";
import AddLocation from "../containers/Addlocation";
import LastMile from "../containers/lastMile";
import EditLocation from "../containers/editLocation";
import TransactionProducts from "../containers/TransactionProducts";
import ProductCategory from "../containers/productcategory";
import ProductInventory from "../containers/productinventory";
import BatchExpiry from "../containers/batchexpiry";
import ViewInventory from "../containers/viewInventory";
import AddNewCategory from "../containers/addNewCategory";
import NoMatch from "../components/NoMatch";
import ViewProduct from "../containers/viewProduct";
import SettingsContainer from "../containers/settings";

const routes = (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route path='/verify' component={Verify} />
    <Route path='/signup' component={Signup} />
    <Route path='/overview' component={requireAuth(OverView)} />
    <Route path='/forgotPassword' component={ForgotPassword} />
    <Route path='/resetPassword' component={resetPasswordPage} />
    <Route path='/landingpage' component={requireAuth(LandingPage)} />
    <Route path='/profile' component={requireAuth(Profile)} />
    <Route path='/settings' component={requireAuth(SettingsContainer)} />
    <Route path='/adminprofile' component={requireAuth(AdminProfile)} />
    <Route path='/shipments' component={requireAuth(Shipment)} />
    <Route path='/newshipment' component={requireAuth(NewShipment)} />
    <Route path='/viewshipment/:id' component={requireAuth(ViewShipment)} />
    <Route path='/reviewshipment' component={requireAuth(VerifyShipment)} />
    <Route path='/inventory' component={requireAuth(Inventory)} />
    <Route path='/productlist/:id' component={requireAuth(ProductList)} />
    <Route path='/dashboard' component={requireAuth(DashBoard)} />
    <Route path='/addproduct' component={requireAuth(AddProduct)} />
    <Route path='/qrcode' component={requireAuth(QrCode)} />
    <Route path='/newinventory' component={requireAuth(NewInventory)} />
    <Route path='/reviewinventory' component={requireAuth(VerifyInventory)} />
    <Route path='/track' component={requireAuth(Track)} />
    <Route path='/trackAndTrace' component={requireAuth(trackAndTrace)} />
    <Route path='/tracing/:id' component={requireAuth(Track)} />
    <Route path='/producttracing' component={requireAuth(ProductTracing)} />
    <Route path='/network' component={requireAuth(Network)} />
    <Route
      path='/transactionHistory'
      component={requireAuth(TransactionHistory)}
    />
    <Route path='/orders' component={requireAuth(Orders)} />
    <Route path='/neworder' component={requireAuth(NewOrder)} />
    <Route path='/vieworder/:id' component={requireAuth(ViewOrder)} />
    <Route path='/revieworder' component={requireAuth(ReviewOrder)} />
    <Route path='/updateStatus/:id' component={requireAuth(UpdateStatus)} />
    <Route
      path='/receiveShipment/:id'
      component={requireAuth(ReceiveShipment)}
    />
    <Route path='/Addlocation' component={requireAuth(AddLocation)} />
    <Route path='/lastMile' component={requireAuth(LastMile)} />
    <Route path='/enterid' component={requireAuth(enterId)} />
    <Route path='/editLocation/:id' component={requireAuth(EditLocation)} />
    <Route
      path='/transactionproducts'
      component={requireAuth(TransactionProducts)}
    />
    <Route path='/productcategory' component={requireAuth(ProductCategory)} />
    <Route
      path='/productinventory/:category'
      component={requireAuth(ProductInventory)}
    />
    <Route
      path='/productoutofstock'
      component={requireAuth(ProductInventory)}
    />
    <Route
      path='/batchnearexpiry/:category'
      component={requireAuth(BatchExpiry)}
    />
    <Route path='/batchexpired' component={requireAuth(BatchExpiry)} />
    <Route
      path='/viewinventory/:warehouseId'
      component={requireAuth(ViewInventory)}
    />
    <Route path='/addNewCategory' component={requireAuth(AddNewCategory)} />
    <Route path='/viewproduct' component={requireAuth(ViewProduct)} />

    <Route component={NoMatch} />
  </Switch>
);

export default routes;

import React from "react";
import { Route, Switch } from "react-router";
import "./style.scss";
import OverView from "../containers/overview";
import Shipment from "../containers/shipments";
import NewShipment from "../containers/newshipment";
import CreateShipment from "../containers/createshipment";
import NewOrder from "../containers/neworder";
import ViewShipment from "../containers/viewShipment";
import ViewGMRShipment from "../containers/viewGmrShipment";
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
import ErrorPageContainer from "../containers/404error/ErrorPageContainer.jsx";
import ViewProduct from "../containers/viewProduct";
import ViewExpiry from "../containers/viewexpiry";
import SettingsContainer from "../containers/settings";
import AddProductContainer from "../containers/addproduct";
import NetworkingContainer from "../containers/networking/NetworkingContainer";
import TrackingContainer from "../containers/tracking/TrackingContainer";
import LandingContainer from "../containers/landingpage/LandingContainer";
import ConnectionContainer from "../containers/connection/ConnectionContainer";
import LastmileTrackingContainer from "../containers/lastmile-track/LastmileTrackingContainer";
import LastmileCenteralContainer from "../containers/lastmile-centeral/LastmileCenteralContainer";
import OrgDashboard from "../admin/pages/org-admin/Dashboard/OrgDashboard";
import Dashboard from "../admin/pages/statwig-admin/Dashboard/Dashboard";
import AdminOrganization from "../admin/pages/statwig-admin/Organization/AdminOrganization";
import Locations from "../admin/pages/statwig-admin/Locations/Locations";
import ViewUsers from "../admin/pages/statwig-admin/ViewUsers/ViewUsers";
import Configuration from "../admin/pages/statwig-admin/Configuration/Configuration";
import Users from "../admin/pages/org-admin/Users/Users";
import AdminProductList from "../admin/pages/org-admin/ProductList/ProductList";


const routes = (
  <Switch>
    {/* <Route exact path='/' component={Home} /> */}
    <Route exact path='/' component={LandingContainer} />
    <Route exact path='/signup'>
      <ConnectionContainer connection="account" />
    </Route>
    <Route exact path='/neworganization'>
      <ConnectionContainer connection="organization" />
    </Route>
    <Route exact path='/verify'>
      <ConnectionContainer connection="verify" />
    </Route>
    <Route exact path='/success'>
      <ConnectionContainer connection="success" />
    </Route>
   {/* <Route exact path='/login' component={Login} />
    <Route path='/verify' component={Verify} />
    <Route path='/signup' component={Signup} /> */}
    <Route path='/overview' component={requireAuth(OverView)} />
    <Route path='/forgotPassword' component={ForgotPassword} />
    <Route path='/resetPassword' component={resetPasswordPage} />
    <Route path='/profile' component={requireAuth(Profile)} />
    <Route path='/settings' component={requireAuth(SettingsContainer)} />
    <Route path='/adminprofile' component={requireAuth(AdminProfile)} />
    <Route path='/shipments' component={requireAuth(Shipment)} />
    <Route path='/newshipment' component={requireAuth(NewShipment)} />
    <Route path='/createshipment' component={requireAuth(CreateShipment)} />
    <Route path='/viewshipment/:id' component={requireAuth(ViewShipment)} />
    <Route
      path='/viewgmrshipment/:id'
      component={requireAuth(ViewGMRShipment)}
    />
    <Route path='/reviewshipment' component={requireAuth(VerifyShipment)} />
    <Route path='/inventory' component={requireAuth(Inventory)} />
    <Route path='/productlist/:id' component={requireAuth(ProductList)} />
    <Route path='/dashboard' component={requireAuth(DashBoard)} />
    <Route path='/addproduct' component={requireAuth(AddProduct)} />
    <Route path='/qrcode' component={requireAuth(QrCode)} />
    <Route path='/newinventory' component={requireAuth(NewInventory)} />
    <Route path='/reviewinventory' component={requireAuth(VerifyInventory)} />
    <Route path='/track/:id?' component={requireAuth(TrackingContainer)} />
    <Route path='/trackAndTrace' component={requireAuth(trackAndTrace)} />
    <Route path='/tracing/:id' component={requireAuth(Track)} />
    <Route path='/producttracing' component={requireAuth(ProductTracing)} />
    {/* <Route path='/network' component={requireAuth(Network)} /> */}
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
    <Route path='/lastMile-Track' component={requireAuth(LastmileTrackingContainer)} />
    <Route path='/lastMile-Centeral' component={requireAuth(LastmileCenteralContainer)} />
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
    <Route path='/viewexpiry' component={requireAuth(ViewExpiry)} />
    <Route path='/viewproduct' component={requireAuth(ViewProduct)} />
    <Route path='/addNewProduct' component={requireAuth(AddProductContainer)} />
    <Route path='/network' component={requireAuth(NetworkingContainer)} />
    <Route path='/tracking/:id' component={requireAuth(TrackingContainer)} />

    {/* Admin Statwig */}
    <Route path='/statwig/dashboard' component={requireAuth(Dashboard, true)} />
    <Route path='/statwig/manage-organization' component={requireAuth(AdminOrganization, true)} />
    <Route path='/statwig/view-locations/:orgId' component={requireAuth(Locations, true)} />
    <Route path='/statwig/view-users/:warehouseId/:orgId' component={requireAuth(ViewUsers, true)} />
    <Route path='/statwig/roles' component={requireAuth(Configuration, true)} />

    {/* Admin Organization */}
    <Route path='/org/dashboard' component={requireAuth(OrgDashboard, true)} />
    <Route path='/org/manage-users' component={requireAuth(Users, true)} />
    <Route path='/org/product-list' component={requireAuth(AdminProductList, true)} />

    <Route component={ErrorPageContainer} />
  </Switch>
);

export default routes;

import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Hello from '../components/Hello'
import NoMatch from '../components/NoMatch'
import FormPage from '../components/signUp'
import ForgotPasswordPage from '../components/forgotPassword'
import resetPasswordPage from '../components/resetPassword'

import FormLoginPage from '../components/login'
import ShipmentAnalytic from '../components/shipments'
import InventoryAnalytic from '../components/inventoryAnalytic'
import OverViewAnalytic from '../components/overViewAnalytic'
import ShipmentsPage from '../components/shipmentsPage'
import InventoryPage from '../components/inventoryPage'
import InventorySummary from '../components/inventorySummary'
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Hello} />
      <Route path="/login" component={FormLoginPage} />
      <Route path="/signup" component={FormPage} />
      <Route path="/forgotPassword" component={ForgotPasswordPage} />
      <Route path="/resetPassword" component={resetPasswordPage} />
      <Route path="/shipments" component={ShipmentAnalytic} />
      <Route path="/inventoryAnalytic" component={InventoryAnalytic} />
      <Route path="/overViewAnalytic" component={OverViewAnalytic} />
      <Route path="/shipmentsPage" component={ShipmentsPage} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/inventorySummary" component={InventorySummary} />
 


      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
/* <Route path="/inventory" component={InventoryPage} />
      <Route path="/shipments" component={ShipmentsPage} />*/
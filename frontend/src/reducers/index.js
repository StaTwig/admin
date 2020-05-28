import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { userReducer } from './userReducer';
import { shipmentReducer } from './shipmentReducer';
import { inventoryReducer } from './inventoryReducer';
import { usersReducer } from './usersReducer';
import { reviewShipmentReducer } from './reviewShipmentReducer';
import { reviewInventoryReducer } from './reviewInventoryReducer';
import { reviewPoReducer } from './reviewPoReducer';

const rootReducer = (history) => combineReducers({
  shipments: shipmentReducer,
  inventories: inventoryReducer,
  user: userReducer,
  users: usersReducer,
  reviewShipment: reviewShipmentReducer,
  reviewInventory: reviewInventoryReducer,
  reviewPo: reviewPoReducer,
  router: connectRouter(history)
})

export default rootReducer

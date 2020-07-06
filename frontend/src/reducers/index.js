import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { userReducer } from './userReducer';
import { shipmentReducer } from './shipmentReducer';
import { inventoryReducer } from './inventoryReducer';
import { usersReducer } from './usersReducer';
import { reviewShipmentReducer } from './reviewShipmentReducer';
import { reviewInventoryReducer } from './reviewInventoryReducer';
import { reviewPoReducer } from './reviewPoReducer';
import { tracingShipmentReducer} from './tracingShipmentReducer';
import { trackShipmentReducer} from './trackShipmentReducer';


const rootReducer = (history) => combineReducers({
  shipments: shipmentReducer,
  inventories: inventoryReducer,
  user: userReducer,
  users: usersReducer,
  reviewShipment: reviewShipmentReducer,
  tracingShipment:tracingShipmentReducer,
  reviewInventory: reviewInventoryReducer,
  trackShipment: trackShipmentReducer,
  reviewPo: reviewPoReducer,
  router: connectRouter(history)
})

export default rootReducer

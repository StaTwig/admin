import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { userReducer } from './userReducer';
import { shipmentReducer } from './shipmentReducer';
import { inventoryReducer } from './inventoryReducer';

const rootReducer = (history) => combineReducers({
  shipments: shipmentReducer,
  inventories: inventoryReducer,
  user: userReducer,
  router: connectRouter(history)
})

export default rootReducer

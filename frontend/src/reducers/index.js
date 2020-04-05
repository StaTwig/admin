import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { userReducer } from './userReducer';
import { shipmentReducer } from './shipmentReducer';

const rootReducer = (history) => combineReducers({
  shipments: shipmentReducer,
  user: userReducer,
  router: connectRouter(history)
})

export default rootReducer

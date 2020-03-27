import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'
import { userReducer } from './userReducer';

const rootReducer = (history) => combineReducers({
  count: counterReducer,
  user: userReducer,
  router: connectRouter(history)
})

export default rootReducer

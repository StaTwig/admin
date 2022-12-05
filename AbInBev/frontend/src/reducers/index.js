import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { userReducer } from "./userReducer";
import { spinnerReducer } from "./spinnerReducer";

const rootReducer = (history) =>
  combineReducers({
    user: userReducer,
    spinner: spinnerReducer,
    router: connectRouter(history),
  });

export default rootReducer;

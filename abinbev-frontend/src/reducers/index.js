import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { userReducer } from "./userReducer";
import { organisationReducer } from "./organisationReducer";
import { spinnerReducer } from "./spinnerReducer";

const rootReducer = (history) =>
  combineReducers({
    user: userReducer,
    organisation: organisationReducer,
    spinner: spinnerReducer,
    router: connectRouter(history),
  });

export default rootReducer;

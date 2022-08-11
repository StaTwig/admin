import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { userReducer } from "./userReducer";
import { shipmentReducer } from "./shipmentReducer";
import { inventoryReducer } from "./inventoryReducer";
import { inventoryDetailsReducer } from "./inventoryDetailsReducer";
import { usersReducer } from "./usersReducer";
import { reviewShipmentReducer } from "./reviewShipmentReducer";
import { reviewInventoryReducer } from "./reviewInventoryReducer";
import { reviewPoReducer } from "./reviewPoReducer";
import { tracingShipmentReducer } from "./tracingShipmentReducer";
import { shipmentCountReducer } from "./shipmentCountReducer";
import { inventoryCountReducer } from "./inventoryCountReducer";
import { editShipmentReducer } from "./editShipmentReducer";
import { editInventoryReducer } from "./editInventoryReducer";
import { editPoReducer } from "./editPoReducer";
import { trackShipmentReducer } from "./trackShipmentReducer";
import { spinnerReducer } from "./spinnerReducer";
import { poReducer } from "./poReducer";
import { lastMileReducer } from "./lastMileReducer";
import { lastMileCountReducer } from "./lastMileCountReducer";
import { userLocationReducer } from "./userLocationReducer";

const rootReducer = (history) =>
  combineReducers({
    userLocation: userLocationReducer,
    shipments: shipmentReducer,
    shipmentsCount: shipmentCountReducer,
    inventories: inventoryReducer,
    editInventory: editInventoryReducer,
    inventoriesCount: inventoryCountReducer,
    user: userReducer,
    users: usersReducer,
    reviewShipment: reviewShipmentReducer,
    editShipment: editShipmentReducer,
    tracingShipment: tracingShipmentReducer,
    trackShipment: trackShipmentReducer,
    reviewInventory: reviewInventoryReducer,
    reviewPo: reviewPoReducer,
    editPo: editPoReducer,
    spinner: spinnerReducer,
    pos: poReducer,
    inventoryDetails: inventoryDetailsReducer,
    lastMile: lastMileReducer,
    lastMileCount: lastMileCountReducer,
    router: connectRouter(history),
  });

export default rootReducer;

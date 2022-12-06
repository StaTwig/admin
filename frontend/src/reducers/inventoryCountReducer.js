import {
  GET_INVENTORIESCOUNT_SUCCESS,
  GET_INVENTORIESCOUNT_FAILURE,
} from "../constants/inventoryConstants";

export const initialState = {
  counts: {
    currentInventory: {},
    inventoryAdded: {},
    vaccinesExpired: {},
    vaccinesNearExpiration: {},
  },
  dict: {},
  data: {},
};

export const inventoryCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORIESCOUNT_SUCCESS:
      const inventoriesCount = action.payload;
      return inventoriesCount;

    case GET_INVENTORIESCOUNT_FAILURE:
      return initialState;
    default:
      return state;
  }
};

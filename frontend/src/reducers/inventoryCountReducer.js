import {GET_INVENTORIESCOUNT_SUCCESS, GET_INVENTORIESCOUNT_FAILURE} from "../constants/inventoryConstants";

export const initialState = [];

export const inventoryCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORIESCOUNT_SUCCESS:
      const inventoriesCount = action.payload.count
      return inventoriesCount;

    case GET_INVENTORIESCOUNT_FAILURE:
      return initialState
    default:
      return state;
  }
};

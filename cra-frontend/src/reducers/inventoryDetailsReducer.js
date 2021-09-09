import {GET_INVENTORY_DETAILS_SUCCESS, GET_INVENTORY_DETAILS_FAILURE} from "../constants/inventoryConstants";

export const initialState = [];

export const inventoryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY_DETAILS_SUCCESS:
      return action.payload.data;
    case GET_INVENTORY_DETAILS_FAILURE:
      return initialState
    default:
      return state;
  }
};

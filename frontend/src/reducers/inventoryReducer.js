import {GET_INVENTORIES_SUCCESS, GET_INVENTORIES_FAILURE} from "../constants/inventoryConstants";

export const initialState = [];

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORIES_SUCCESS:
      const inventories = action.payload.data.map(inventory => JSON.parse(inventory.data));
      return [
        ...inventories
      ];
    case GET_INVENTORIES_FAILURE:
      return initialState
    default:
      return state;
  }
};

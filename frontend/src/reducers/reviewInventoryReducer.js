import {
  SET_REVIEW_INVENTORY,
  RESET_REVIEW_INVENTORY,
} from "../constants/inventoryConstants";

export const initialState = [];

export const reviewInventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_INVENTORY:
      return action.payload;
    case RESET_REVIEW_INVENTORY:
      return [];

    default:
      return state;
  }
};

import {
    SET_REVIEW_INVENTORY
  } from '../constants/inventoryConstants';
  
  export const initialState = null;
  
  export const reviewInventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_REVIEW_INVENTORY:
        return action.payload;
      
      default:
        return state;
    }
  };
  
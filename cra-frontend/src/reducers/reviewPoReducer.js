import {
  SET_REVIEW_PO,
  RESET_REVIEW_PO
  } from '../constants/poconstants';
  
  export const initialState = null;
  
  export const reviewPoReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_REVIEW_PO:
        return action.payload;
      
      case RESET_REVIEW_PO:
        return initialState;
      
      default:
        return state;
    }
  };
  
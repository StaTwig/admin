import {
  SET_REVIEW_SHIPMENT
} from '../constants/shipmentConstants';

export const initialState = null;

export const reviewShipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_SHIPMENT:
      return action.payload;
    
    default:
      return state;
  }
};

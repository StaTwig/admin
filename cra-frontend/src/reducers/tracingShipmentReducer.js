import {
    SET_TRACING_SHIPMENT
  } from '../constants/shipmentConstants';
  
  export const initialState = null;
  
  export const tracingShipmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TRACING_SHIPMENT:
        return action.payload;
      
      default:
        return state;
    }
  };
  
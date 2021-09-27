import {
    SET_TRACK_SHIPMENT
  } from '../constants/shipmentConstants';
  
  export const initialState = [{products:[{quantity: 0, productName: '', manufacturingDate:'',  expiryDate:'', manufacturerName:''}]}];
  
  export const trackShipmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TRACK_SHIPMENT:
        const data = action.payload.data.map( element => JSON.parse(element));
        return data;
      
      default:
        return state;
    }
  };
  
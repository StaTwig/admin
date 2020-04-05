import {
  GET_SHIPMENTS_SUCCESS,
  GET_SHIPMENTS_FAILURE
} from '../constants/shipmentConstants';

export const initialState = [];

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPMENTS_SUCCESS:
      const shipments = action.payload.data.map(shipment => JSON.parse(shipment.data));
      return [
        ...state,
        ...shipments
      ];
    case GET_SHIPMENTS_FAILURE:
      return initialState
    default:
      return state;
  }
};

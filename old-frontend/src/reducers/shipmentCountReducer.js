import {
  GET_SHIPMENTSCOUNT_SUCCESS,
  GET_SHIPMENTSCOUNT_FAILURE,
} from '../constants/shipmentConstants';

export const initialState = {
  totalShipments: {},
  totalShipmentsSent: {},
  currentShipments: {},
  totalShipmentsReceived: {},
};

export const shipmentCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPMENTSCOUNT_SUCCESS:
      const shipmentsCount = action.payload.counts;
      return shipmentsCount;
    case GET_SHIPMENTSCOUNT_FAILURE:
      return initialState;
    default:
      return state;
  }
};

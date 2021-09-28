import {
  GET_SHIPMENTS_SUCCESS,
  GET_SHIPMENTS_FAILURE,
  SET_VISIBLE_SHIPMENT
} from '../constants/shipmentConstants';

export const initialState = [];

export const shipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPMENTS_SUCCESS:
      const shipments = action.payload.data.map(shipment => {
        return {...shipment, visible: false}
      });
      return [...state, ...shipments];
    
    case GET_SHIPMENTS_FAILURE:
      return initialState
    case SET_VISIBLE_SHIPMENT:
        const index = action.payload.index;
        const visible  = action.payload.visible;
        const shipmentsCopy  = JSON.parse(JSON.stringify(state));
        shipmentsCopy[index].visible = visible;
      return shipmentsCopy;
    default:
      return state;
  }
};

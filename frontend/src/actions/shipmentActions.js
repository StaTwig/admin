import axios from 'axios';

import { config } from '../config';
import { GET_SHIPMENTS_FAILURE, GET_SHIPMENTS_SUCCESS } from "../constants/shipmentConstants";

export const getShipments = () => {
  try {
    return async dispatch => {
      const result =  await axios.get(config().shipmentsUrl);
      dispatch(setShipments(result.data));
    }
  }catch(e){
    return dispatch => {
      dispatch(resetShipments(e.response));
    }
  }

}

const setShipments = (data) =>{
  return {
    type: GET_SHIPMENTS_SUCCESS,
    payload: data,
  };

}
const resetShipments = (data) =>{
  return {
    type: GET_SHIPMENTS_FAILURE,
    payload: data,
  };
}
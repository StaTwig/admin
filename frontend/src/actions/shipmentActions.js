import axios from 'axios';

import { config } from '../config';
import { GET_SHIPMENTS_FAILURE, GET_SHIPMENTS_SUCCESS, SET_REVIEW_SHIPMENT,SET_TRACING_SHIPMENT} from "../constants/shipmentConstants";

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
export const getShipmentsById = (query) => {
  try {
    return async dispatch => {
      const result =  await axios.get(config().shipmentsSearch + query);
      dispatch(setShipments(result.data));
    }
  }catch(e){
    return dispatch => {
      dispatch(resetShipments(e.response));
    }
  }

}

export const createShipment = async (data) => {
  try {
    debugger;
      const result =  await axios.post(config().createShipmentUrl, data);
     return result.data;
  }catch(e){
    return e.response;
  }

}

const setShipments = (data) =>{
  return {
    type: GET_SHIPMENTS_SUCCESS,
    payload: data,
  };

}


export const setReviewShipments = (data) =>{
  return {
    type: SET_REVIEW_SHIPMENT,
    payload: data,
  };

}

export const setTracingShipments = (data) =>{
  return {
    type: SET_TRACING_SHIPMENT,
    payload: data,
  };

}
const resetShipments = (data) =>{
  return {
    type: GET_SHIPMENTS_FAILURE,
    payload: data,
  };
}
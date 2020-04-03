import axios from 'axios';

import { config } from '../config/config';
import { GET_INVENTORIES_FAILURE, GET_INVENTORIES_SUCCESS } from "../constants/inventoryConstants";

export const getInventories = () => {
  try {
    return async dispatch => {
      const result =  await axios.get(config().inventoriesUrl);
      dispatch(setInventories(result.data));
    }
  }catch(e){
    return dispatch => {
      dispatch(resetInventories(e.response));
    }
  }

}

const setInventories = (data) =>{
  return {
    type: GET_INVENTORIES_SUCCESS,
    payload: data,
  };

}
const resetInventories = (data) =>{
  return {
    type: GET_INVENTORIES_FAILURE,
    payload: data,
  };
}
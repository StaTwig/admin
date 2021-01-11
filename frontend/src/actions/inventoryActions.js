import axios from 'axios';

import { config } from '../config';
import {
  GET_INVENTORIES_FAILURE,
  GET_INVENTORIES_SUCCESS,
  SET_REVIEW_INVENTORY,
  GET_INVENTORIESCOUNT_FAILURE,
  GET_INVENTORIESCOUNT_SUCCESS,
  SET_EDIT_INVENTORY,
  RESET_REVIEW_INVENTORY,
} from '../constants/inventoryConstants';
import { turnOn, turnOff } from './spinnerActions';

export const getInventories = (skip = 0, limit = 5) => {
  try {
    return async dispatch => {
      dispatch(turnOn());
      const result = await axios.get(
        `${config().inventoriesUrl}?skip=${skip}&limit=${limit}`,
      );
      dispatch(setInventories(result.data));
      dispatch(setInventoriesCount(result.data));
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    return dispatch => {
      dispatch(resetInventories(e.response));
      dispatch(resetInventoriesCount(e.response));
    };
  }
};

export const getInventoriesById = query => {
  try {
    return async dispatch => {
      const result = await axios.get(config().inventorySearch + query);
      dispatch(setInventories(result.data));
    };
  } catch (e) {
    return dispatch => {
      dispatch(resetInventories(e.response));
    };
  }
};

const setInventories = data => {
  return {
    type: GET_INVENTORIES_SUCCESS,
    payload: data,
  };
};

const setInventoriesCount = data => {
  return {
    type: GET_INVENTORIESCOUNT_SUCCESS,
    payload: data,
  };
};

export const setReviewinventories = data => {
  return {
    type: SET_REVIEW_INVENTORY,
    payload: data,
  };
};

export const setEditInventories = data => {
  return {
    type: SET_EDIT_INVENTORY,
    payload: data,
  };
};
export const resetReviewInventories = () => {
  return {
    type: RESET_REVIEW_INVENTORY,
  };
};
export const resetInventories = data => {
  return {
    type: GET_INVENTORIES_FAILURE,
    payload: data,
  };
};
const resetInventoriesCount = data => {
  return {
    type: GET_INVENTORIESCOUNT_FAILURE,
    payload: data,
  };
};

export const addInventory = async data => {
  try {
    const result = await axios.post(config().addInventoryUrl, data);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const addMultipleInventories = async data => {
  try {
    const result = await axios.post(config().addMultipleInventories, data);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const addInventoriesFromExcel = async data => {
  try {
    const url = config().addInventoriesFromExcel;
    const result = await axios.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    debugger;
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getSerialNumbersByBatchNumber = async(id) => {
  try {
    const url  = config().getSerialNumbersByBatchNumber+id.batch;
    const result = await axios.get(url);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const getInventoryByBatchNumber = id => {
  try {
    return async dispatch => {
      const url  = config().getInventoryByBatchNumber+id;
      const result = await axios.get(url);
      dispatch(setInventories(result.data));
     
    }
   
    
  } catch (e) {
    return e.response;
  }
};
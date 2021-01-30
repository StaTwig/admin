import axios from 'axios';
import { config } from '../config';
import {
  SET_REVIEW_PO,
  SET_EDIT_PO,
  RESET_EDIT_PO,
  SET_POS,
  RESET_POS
} from '../constants/poconstants';
import { turnOn, turnOff } from "./spinnerActions";

export const createPO = async data => {
  try {
    debugger;
    const result = await axios.post(config().createPurchaseOrderUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getPO = async po => {
  try {
    const result = await axios.get(config().fetchAllPurchaseOrderUrl + po);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const changePOStatus = async data => {
  try {
    const result = await axios.post(config().changePOStatus, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const resetPOs = () => {
  return {
    type: RESET_POS
  }
}

export const getProducts = async () => {
  try {
    const result = await axios.get(config().getProducts);
    return result.data.data;
  } catch (e) {
    return [];
  }
};

export const getManufacturers = async () => {
  try {
    const result = await axios.get(config().getManufacturers);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const addNewProduct = async data => {
  try {
    const url = config().addNewProduct;
    const result = await axios.post(config().addNewProduct, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  } catch (e) {
    return e.response;
  }
};
export const addMultipleProducts = async data => {
  try {
    const url = config().addMultipleProducts;
    const result = await axios.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    debugger;
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const getPOs = (skip = 0, limit = 5) => {
  try {
    return async dispatch => {
      dispatch(turnOn());
      const result = await axios.get(
        `${
          config().getPOs
        }?skip=${skip}&limit=${limit}`,
      );
     // const result = await axios.get('http://54.164.66.73:3012/pomanagement/api/po/purchaseOrderStatistics');
      dispatch(setPurchaseOrders(result.data.data));
      dispatch(turnOff());
      return result;
    };
  } catch (e) {
    return [];
  }
};

const setPurchaseOrders = data => {
  return {
    type: SET_POS,
    payload: data,
  };
};
export const setReviewPos = data => {
  return {
    type: SET_REVIEW_PO,
    payload: data,
  };
};

export const setEditPos = data => {
  return {
    type: SET_EDIT_PO,
    payload: data,
  };
};

export const resetEditPos = data => {
  return {
    type: RESET_EDIT_PO,
    payload: data,
  };
};

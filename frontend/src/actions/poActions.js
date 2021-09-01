import axios from 'axios';
import { config } from '../config';
import {
  SET_REVIEW_PO,
  RESET_REVIEW_PO,
  SET_EDIT_PO,
  RESET_EDIT_PO,
  SET_POS,
  RESET_POS
} from '../constants/poconstants';
import { turnOn, turnOff } from "./spinnerActions";

export const createPO = async data => {
  try {
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

export const createOrder = async data => {
  try {
    console.log(config().createOrderUrl);
    const result = await axios.post(config().createOrderUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const addPOsFromExcel = async data => {
  try {
    const url = config().addPOsFromExcel;
    const result = await axios.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getProductsByCategory = async (id) => {
  try {
    const result = await axios.get(config().getProductsByCategoryUrl + id);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const searchProduct = async (id, warehouseId) => {
  try {
    const result = await axios.get(config().searchProduct + '&productType=' + id + '&warehouseId=' + warehouseId);
    console.log(result.data.data)
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
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const getPOs = (skip = 0, limit = 5) => {
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        `${config().fetchPurchaseOrderUrl}?skip=${skip}&limit=${limit}`,
      );

      // dispatch(setReviewPos(result.data));
      dispatch(turnOff());
      return result.data.data;
    } catch (e) {
      dispatch(turnOff());
      dispatch(resetPOs(e.response));
    }
  };
};

export const getSentPOs = async (to, orderId, productName, deliveryLocation, dateFilter, status, skip, limit) => { //outbound po with filter(to, orderId, productName, deliveryLocation, date, skip, limit)
  try {
    const result = await axios.get(
      `${config().fetchOutboundPurchaseOrderUrl}?to=${to}&orderId=${orderId}&productName=${productName}&dateFilter=${dateFilter}&deliveryLocation=${deliveryLocation}&poStatus=${status}&skip=${skip}&limit=${limit}`,
    );
    return result.data;
  } catch (e) {
    return [];
  }
};


export const getReceivedPOs = async (from, orderId, productName, deliveryLocation, dateFilter, status, skip, limit) => {//outbound po with filter(to, orderId, productName, deliveryLocation, date, skip, limit)
  try {
    const result = await axios.get(
      `${config().fetchInboundPurchaseOrderUrl}?from=${from}&orderId=${orderId}&productName=${productName}&dateFilter=${dateFilter}&deliveryLocation=${deliveryLocation}&poStatus=${status}&skip=${skip}&limit=${limit}`,
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getProductIdDeliveryLocationsOrganisations = async () => {
  try {
    const result = await axios.get(config().fetchProductIdsCustomerLocationsOrganisationsUrl);
    return result.data.data;
  } catch (e) {
    return [];
  }
}

export const getOrder = (id) => {
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        `${config().fetchPurchaseOrderUrl}?poId=${id}&skip=0&limit=1`,
      );
      dispatch(turnOff());
      return result.data.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getOrderIds = async () => {
  try {
    const result = await axios.get(config().getOrderIds);
    return result.data.data;
  } catch (e) {
    return [];
  }
};

export const getOpenOrderIds = async () => {
  try {
    const result = await axios.get(config().getOpenOrderIds);
    return result.data.data;
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

export const resetReviewPos = data => {
  return {
    type: RESET_REVIEW_PO,
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

export const getOrganizationsByTypes = async id => {
  try {
    const result = await axios.get(config().getOrganizationsTypewithauth + id);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const getExportFile = async (url, value) => {
  try {
    const result = await axios.get(url, {
      responseType: 'blob'
    });
    return result.data;
  } catch (e) {
    return e.response;
  }
};

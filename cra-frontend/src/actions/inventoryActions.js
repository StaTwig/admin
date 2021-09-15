import axios from "axios";

import { config } from "../config";
import {
  GET_INVENTORIES_FAILURE,
  GET_INVENTORIES_SUCCESS,
  SET_REVIEW_INVENTORY,
  GET_INVENTORIESCOUNT_FAILURE,
  GET_INVENTORIESCOUNT_SUCCESS,
  SET_EDIT_INVENTORY,
  RESET_REVIEW_INVENTORY,
  GET_INVENTORY_DETAILS_SUCCESS,
  GET_INVENTORY_DETAILS_FAILURE,
} from "../constants/inventoryConstants";
import { turnOn, turnOff } from "./spinnerActions";

export const getInventories = (
  skip,
  limit,
  dateFilter,
  productName,
  productCategory,
  status
) => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        `${
          config().getTransactions
        }?skip=${skip}&limit=${limit}&dateFilter=${dateFilter}&productName=${productName}&category=${productCategory}&status=${status}`
      );
      dispatch(setInventories(result.data.data.inventoryRecords));
      dispatch(setInventoriesCount(result.data.data.count));
      dispatch(turnOff());
      return result.data.data.length;
    } catch (e) {
      dispatch(turnOff());
      return (dispatch) => {
        dispatch(resetInventories(e.response));
        dispatch(resetInventoriesCount(e.response));
      };
    }
  };
};

export const getTransactionFilterList = async () => {
  try {
    const result = await axios.get(`${config().getTransactionFilterList}`);
    return result.data.data.productDetails;
  } catch (e) {
    return [];
  }
};

export const getInventoryDetails = (skip = 0, limit = 5) => {
  return async (dispatch) => {
    dispatch(turnOn());
    try {
      const result = await axios.get(
        `${config().getInventoryDetailsUrl}?skip=${skip}&limit=${limit}`
      );
      dispatch(setInventoryDetails(result.data));
      dispatch(turnOff());
    } catch (e) {
      dispatch(turnOff());
      dispatch(resetInventoryDetails());
    }
  };
};

export const getInventory = (skip = 0, limit = 5) => {
  return async (dispatch) => {
    dispatch(turnOn());
    try {
      const result = await axios.get(
        `${config().inventoriesUrl}?skip=${skip}&limit=${limit}`
      );
      dispatch(setInventoryDetails(result.data));
      dispatch(turnOff());
    } catch (e) {
      dispatch(turnOff());
      dispatch(resetInventoryDetails());
    }
  };
};

export const getRegions = async () => {
  try {
    const result = await axios.get(config().getRegionsUrl);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getCountryByRegion = async (id) => {
  try {
    const result = await axios.get(config().getCountryByRegionUrl + id);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const GetCountriesFromWarehouses = async (id) => {
  try {
    const result = await axios.get(`${config().getCountries}?region=${id}`);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const GetStatesFromWarehouses = async (id) => {
  try {
    const result = await axios.get(
      `${config().getStatesByCountry}?country=${id}`
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const GetCitiesFromWarehouses = async (id) => {
  try {
    const result = await axios.get(`${config().getCitiesByState}?state=${id}`);
    console.log(result);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const GetWarehousesWithCity = async (id) => {
  try {
    const result = await axios.get(
      `${config().getWarehousesByCity}?city=${id}`
    );
    console.log(result);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getWareHousesByCountry = async (id) => {
  try {
    const result = await axios.get(config().getWareHousesByCountryUrl + id);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const getWareHousesByRegion = async (id) => {
  try {
    const urlobj = config();
    const url = urlobj.getWareHousesByRegionUrl + id;
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getWarehouseByOrgId = async (id) => {
  try {
    const result = await axios.get(config().getWarehouseByOrgId + id);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getAllWarehouses = async () => {
  try {
    const result = await axios.get(config().getAllWarehouses);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getInventoriesById = (query) => {
  try {
    return async (dispatch) => {
      const result = await axios.get(config().inventorySearch + query);
      dispatch(setInventories(result.data));
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    return (dispatch) => {
      dispatch(resetInventories(e.response));
    };
  }
};

const setInventories = (data) => {
  return {
    type: GET_INVENTORIES_SUCCESS,
    payload: data,
  };
};
const setInventoryDetails = (data) => {
  return {
    type: GET_INVENTORY_DETAILS_SUCCESS,
    payload: data,
  };
};

const setInventoriesCount = (data) => {
  return {
    type: GET_INVENTORIESCOUNT_SUCCESS,
    payload: data,
  };
};

export const setReviewinventories = (data) => {
  return {
    type: SET_REVIEW_INVENTORY,
    payload: data,
  };
};

export const setEditInventories = (data) => {
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
export const resetInventories = (data) => {
  return {
    type: GET_INVENTORIES_FAILURE,
    payload: data,
  };
};
export const resetInventoryDetails = (data) => {
  return {
    type: GET_INVENTORY_DETAILS_FAILURE,
    payload: data,
  };
};
const resetInventoriesCount = (data) => {
  return {
    type: GET_INVENTORIESCOUNT_FAILURE,
    payload: data,
  };
};

export const addInventory = async (data) => {
  try {
    const result = await axios.post(config().addInventoryUrl, data);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const addProductsToInventory = async (data) => {
  try {
    const result = await axios.post(config().addProductsToInventory, data);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const addInventoriesFromExcel = async (data) => {
  try {
    const url = config().addInventoriesFromExcel;
    const result = await axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getSerialNumbersByBatchNumber = async (id) => {
  try {
    const url = config().getSerialNumbersByBatchNumber + id.batch;
    const result = await axios.get(url);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const getProductDetailsByWarehouseId = async (id) => {
  try {
    const result = await axios.get(
      config().getProductDetailsByWarehouseIdUrl + id
    );
    return result.data.data;
  } catch (e) {
    return {};
  }
};

export const getInventoryByBatchNumber = (id) => {
  try {
    return async (dispatch) => {
      const url = config().getInventoryByBatchNumber + id;
      const result = await axios.get(url);
      console.log(result);
      // dispatch(setInventories(result.data));
      return result.sata;
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    return e.response;
  }
};

export const getShipmentIds = async (id) => {
  try {
    const result = await axios.get(config().getShipmentIdsUrl);
    return result.data.data;
  } catch (e) {
    return {};
  }
};

export const getNearExpiringProductsByBatch = async (id) => {
  try {
    const result = await axios.get(config().bacthcNearExpiryUrl);
    return result.data.data;
  } catch (e) {
    return {};
  }
};

export const getExpiredProductsByBatch = async (id) => {
  try {
    const result = await axios.get(config().batchExpiredUrl);
    return result.data.data;
  } catch (e) {
    return {};
  }
};

export const getInventoryByWareHouse = async (
  skip = 0,
  limit = 5,
  warehouseId = ""
) => {
  try {
    const result = await axios.get(
      `${
        config().inventoriesUrl
      }?skip=${skip}&limit=${limit}&warehouseId=${warehouseId}`
    );
    return result.data.data;
  } catch (e) {
    return {};
  }
};

export const getBatchDetailsByWareHouse = async (inventory_id, product_id) => {
  try {
    const result = await axios.get(
      `${
        config().batchWarehouseUrl
      }?inventory_id=${inventory_id}&product_id=${product_id}`
    );
    return result.data.data;
  } catch (e) {
    return {};
  }
};

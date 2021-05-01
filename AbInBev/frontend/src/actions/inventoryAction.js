import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';

export const getProductsInventory = (_filters) => {

  function getQueryStringFromFilters(filters) {
    let queryStr = '';
    if (filters.inventoryType && filters.inventoryType.length) {
      queryStr = '?orgType=' + filters.inventoryType;
      if (filters.state && filters.state.length) {
        queryStr = queryStr + '&state=' + filters.state;
      }
      if (filters.district && filters.district.length) {
        queryStr = queryStr + '&district=' + filters.district;
      }
      if (filters.organization && filters.organization.length) {
        queryStr = queryStr + '&organization=' + filters.organization;
      }
      if (filters.sku && filters.sku.length) {
        queryStr = queryStr + '&sku=' + filters.sku;
      }
    }
    return queryStr;
  }
  const queryString = getQueryStringFromFilters(_filters);
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getInventoryProductsUrl + `${queryString}`,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getAllStates = () => {
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getAllStates,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
}

export const getDistrictsByState = (_state) => {
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getDistrictsByState + `?state=` + _state,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
}

export const getAllSKUs = () => {
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getAllSKUs,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
}

export const getOrganizationsByType = (orgType) => {
  return async dispatch => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getOrganizationsByType + `?orgType=` + orgType,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
}
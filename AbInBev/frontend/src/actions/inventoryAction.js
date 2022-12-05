import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';
function getQueryStringFromFilters(filters) {
  let queryStr = '';
  if (filters.inventoryType && filters.inventoryType.length) {
    if (
      filters.inventoryType === 'ALL_VENDORS' &&
      filters.vendorType &&
      filters.vendorType.length
    ) {
      queryStr = '?orgType=' + filters.vendorType;
    } else {
      queryStr = '?orgType=' + filters.inventoryType;
    }
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

    if (filters.invDetails && filters.invDetails.length) {
      queryStr = queryStr + '&invDetails=' + filters.invDetails;
    }
  }
  return queryStr;
}
export const getProductsInventory = (_filters) => {
  const queryString = getQueryStringFromFilters(_filters);
  return async (dispatch) => {
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
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getAllStates);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getDistrictsByState = (_state) => {
  return async (dispatch) => {
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
};

export const getAllSKUs = () => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getAllSKUs);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getOrganizationsByType = (filters) => {
  let queryStr = '';
  if (filters.organizationType && filters.organizationType.length) {
    if (filters.organizationType === 'VENDOR') {
      if (filters.vendorType === 'ALL_VENDORS' || filters.inventoryType === "ALL_VENDORS") {
        queryStr = 'SUPPLIER';
      } else {
        queryStr = filters.vendorType;
      }
    } else {
      queryStr = filters.organizationType;
    }

    if (filters.state && filters.state !== '') {
      queryStr = queryStr + '&state=' + filters.state;
    }

    if (filters.district && filters.district !== '') {
      queryStr = queryStr + '&district=' + filters.district;
    }
  }

  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getOrganizationsByTypeAbInBev + `${queryStr}`,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getOrganizationByID = (orgId) => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getOrganizationInfoByID + '?orgId=' + orgId,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

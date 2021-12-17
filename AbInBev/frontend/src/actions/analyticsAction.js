import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';

export const getAnalyticsAllStats = (param) => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getAnalyticsBySKUurl + param);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getOrgTypeStats = (param) => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getOrganisationTypeStatsurl + param,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getSupplierPerformanceByOrgType = (orgType) => {
  let queryParam = '';
  if (orgType && orgType.length && orgType !== '') {
    queryParam = queryParam + '?supplierType=' + orgType;
  } else {
    queryParam = queryParam + '?supplierType=ALL';
  }
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(
        config().getSupplierPerfomance + queryParam,
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

export const getAllTargets = () => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getAllTargets);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};


export const getAnalyticsByBrand = (cond = '') => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getAnalyticsByBrandurl + cond);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getAllBrands = () => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getAllBrandsurl);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getAllOrganisationStats = (param = '') => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getOrganisationStatsurl + param);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const updateTargets = async (data) => {
  try {
    const result = await axios.post(config().updateTargets, data);
    return result;
  } catch (e) {
    return e.response;
  }
};


export const getAllOrganisationTypeStats = (param = '') => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getStatsBySKUOrgTypeUrl + param);
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

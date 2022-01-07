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

export const getSupplierPerformanceByOrgType = (data) => {
  let queryParam = '';
  if (data && data.orgType && data.orgType?.length && data.orgType !== '') {
    queryParam = queryParam + '?supplierType=' + data.orgType;
  } 
  console.log(queryParam)

  if (data && data.location && data.location?.length && data.location !== '') {
    queryParam = queryParam + ((data.orgType && data.orgType?.length && data.orgType !== '') ? '&' : '?') +'location=' + data.location;
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

export const getNewConfig = (data) => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      const result = await axios.get(config().getNewConfig + `?district=${data.district}&vendorType=${data.vendorType}`); //BELGAUM S1
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};
export const setNewConfig = async (data) => {
  try {
    const result = await axios.post(config().setNewConfig, data);
    return result;
  } catch (e) {
    return e.response;
  }
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

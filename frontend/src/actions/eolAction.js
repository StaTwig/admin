import axios from 'axios';
import { config } from '../config';

export const GetEOLInfoBySerialNumber = async (data) => {
    try {
      const result = await axios.get(config().GetEOLInfoBySerialNumber + data);
      return result.data;
    } catch (e) {
      return [];
    }
  };

  export const getEOLInfo = (skip, limit, country, state, district, location, product) => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        const result = await axios.get(
          `http://localhost:3017/lastmilemanagement/api/GetEOLInfo?skip=${skip}&limit=${limit}&dateFilter=${dateFilter}&productName=${productName}&category=${productCategory}&status=${status}`
          );
        dispatch(setLastMile(result.data.data.inventoryRecords));
        dispatch(setLastMileCount(result.data.data.count));
        dispatch(turnOff());
        return result.data.data.length;
      }catch(e) {
        dispatch(turnOff());
        return dispatch => {
          dispatch(resetLastMile(e.response));
          dispatch(resetLastMileCount(e.response));

        };
      }
  }

};
  export const GetEOLInfoByProductId = async (data) => {
    try {
      const result = await axios.get(config().GetEOLInfoByProductId + data);
      return result.data;
    } catch (e) {
      return [];
    }
  };

  export const GetEOLInfoByIdentityId = async (data) => {
    try {
      const result = await axios.get(config().GetEOLInfoByIdentityId + data);
      return result.data;
    } catch (e) {
      return [];
    }
  };

  export const GetEOLInfoByPlaceAdministered = async (data) => {
    try {
      const result = await axios.get(config().GetEOLInfoByPlaceAdministered + data);
      return result.data;
    } catch (e) {
      return [];
    }
  };

export const GetEOLListByDateWindow = async (startDate,endDate) => {
  try {
    const result = await axios.get(
      `${config().GetEOLListByDateWindow}?startDate=${startDate}&endDate=${endDate}`,
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const setLastMile = data => {
  return {
    type: "GET_LAST_MILE",
    payload: data,
  };
};

export const setLastMileCount = data => {
  return {
    type: "GET_LAST_MILE",
    payload: data,
  };
};
export const resetLastMileCount = data => {
  return {
    type: "GET_LAST_MILE",
    payload: data,
  };
};

export const resetLastMile = data => {
  return {
    type: "GET_LAST_MILE",
    payload: data,
  };
};
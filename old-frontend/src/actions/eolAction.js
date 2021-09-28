import axios from 'axios';
import { config } from '../config';
import { turnOn, turnOff } from './spinnerActions';


export const GetEOLInfoBySerialNumber = async (data) => {
    try {
      const result = await axios.get(config().GetEOLInfoBySerialNumber + data);
      return result.data;
    } catch (e) {
      return [];
    }
  };

  export const getEOLInfo = (skip, limit, country, state, district, location, product,region) => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        console.log('------------------>')
        console.log("inside actions ==>")

        const result = await axios.get(
          `${config().GetEOLInfo}?skip=${skip}&limit=${limit}&country=${country}&state=${state}&city=${district}&location=${location}&product=${product}`
          );
          let resarr = [...result.data.data.eolResult]
          console.log(resarr)
        dispatch(setLastMile(resarr));

        dispatch(setLastMileCount(result.data.data[`count`]));
        console.log(result.data.data[`count`])
        dispatch(turnOff());
        return result.data.data.length;
      }catch(e) {
        console.log('>------------------>', e)

        dispatch(turnOff());
        return dispatch => {
          dispatch(resetLastMile(e.response));
          dispatch(resetLastMileCount(e.response));

        };
      }
  }

};

export const getProductsByWarehouse = async (id) => {
    try {
      const result = await axios.get(
        `${config().GetProductsByWarehouse}?location=${id}`
        );
      return result.data;
    }catch(e) {
      console.log('>------------------>', e)
      return [];
    }
}

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
    type: "GET_LAST_MILE_COUNT",
    payload: data,
  };
};
export const resetLastMileCount = data => {
  return {
    type: "RESET_LAST_MILE",
    payload: data,
  };
};

export const resetLastMile = data => {
  return {
    type: "RESET_LAST_MILE",
    payload: data,
  };
};
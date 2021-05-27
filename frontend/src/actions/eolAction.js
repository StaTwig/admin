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

import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';
import setAuthToken from '../utils/setAuthToken';

function getQueryString(filters) {
  let queryStr = '';
  if (filters.organizationType && filters.organizationType.length) {
    if (
      filters.organizationType === 'VENDOR' &&
      filters.vendorType &&
      filters.vendorType.length
    ) {
      queryStr = '&orgType=' + filters.vendorType;
    } else {
      queryStr = '&orgType=' + filters.organizationType;
    }
  }
  if (filters.transactionType && filters.transactionType.length) {
    queryStr = queryStr + '&txn_type=' + filters.transactionType;
  }

  if (filters.organization && filters.organization.length) {
    queryStr = queryStr + '&organization=' + filters.organization;
  }
  if (filters.startDate && filters.startDate.length) {
    queryStr = queryStr + '&start_date=' + filters.startDate;
  }
  if (filters.endDate && filters.endDate.length) {
    queryStr = queryStr + '&end_date=' + filters.endDate;
  }
  if (filters.state && filters.state.length) {
    queryStr = queryStr + '&state=' + filters.state;
  }
  if (filters.district && filters.district.length) {
    queryStr = queryStr + '&district=' + filters.district;
  }
  if (filters.month && filters.month.length) {
    queryStr = queryStr + '&month=' + filters.month;
  }
  if (filters.year) {
    queryStr = queryStr + '&year=' + filters.year;
  }
  if (filters.quarter && filters.quarter.length) {
    queryStr = queryStr + '&quarter=' + filters.quarter;
  }
  if (filters.date_filter_type && filters.date_filter_type.length) {
    queryStr = queryStr + '&date_filter_type=' + filters.date_filter_type;
  }
  return queryStr;
}

export const getTransactions = (filters) => {
  let skip = 0,
    limit = 100;

  let queryString = getQueryString(filters);

  let params = filters;
  return async (dispatch) => {
    try {
      setAuthToken(localStorage.getItem('theAbInBevToken'));
      dispatch(turnOn());
      const result = await axios.get(
        `${config().shipmentsUrl}?skip=${skip}&limit=${limit}` + queryString,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const fetchShipment = (shipmentId) => {
  return async (dispatch) => {
    try {
      setAuthToken(localStorage.getItem('theAbInBevToken'));
      dispatch(turnOn());
      const result = await axios.get(
        `${config().viewShipmentUrl}` + shipmentId,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const fetchChallanImage = (imageId) => {
  return async (dispatch) => {
    try {
      setAuthToken(localStorage.getItem('theAbInBevToken'));
      dispatch(turnOn());
      const result = await axios.get(
        `${config().fetchChallanImageUrl}/` + imageId,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};

export const getImage = async (imageId) => {
  try {
    const result = await axios.get(config().fetchChallanImageUrl + imageId);
    return result;
  } catch (e) {
    return { data: [] };
  }
};

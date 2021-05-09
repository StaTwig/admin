import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';
import setAuthToken from '../utils/setAuthToken';

function getQueryString(filters) {
  let queryStr = '';
  if (filters.inventoryType && filters.inventoryType.length) {
    queryStr = '&orgType=' + filters.inventoryType
  }
  if (filters.organization && filters.organization.length) {
    queryStr = '&organization=' + filters.organization
  }
  if (filters.startDate && filters.startDate.length) {
    queryStr = '&start_date=' + filters.startDate
  }
  if (filters.endDate && filters.endDate.length) {
    queryStr = '&end_date=' + filters.endDate
  }
  if (filters.state && filters.state.length) {
    queryStr = '&state=' + filters.state
  }
  if (filters.district && filters.district.length) {
    queryStr = '&district=' + filters.district
  }
  if (filters.month && filters.month.length) {
    queryStr = '&month=' + filters.month
  }
  if (filters.district && filters.district.length) {
    queryStr = '&year=' + filters.year
  }
  if (filters.quarter && filters.quarter.length) {
    queryStr = '&year=' + filters.year
  }
  
  return queryStr;
}

export const getTransactions = (filters) => {
    let skip = 0, limit = 100;
    let queryString = getQueryString(filters)
    return async dispatch => {
      try {
        setAuthToken(localStorage.getItem("theAbInBevToken"))
        console.log('inside actions');
        dispatch(turnOn());
        const result = await axios.get(
          `${config().shipmentsUrl}?skip=${skip}&limit=${limit}` + queryString,
        );
        dispatch(turnOff());
        console.log(result)
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
  };
import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';
import setAuthToken from '../utils/setAuthToken';

function getQueryString(filters) {
  let queryStr = '';
  if (filters.inventoryType && filters.inventoryType.length) {
    queryStr = '&orgType=' + filters.inventoryType

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
import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';
import setAuthToken from '../utils/setAuthToken';

export const getTransactions = (skip = 0, limit = 100) => {
    return async dispatch => {
      try {
        setAuthToken(localStorage.getItem("theAbInBevToken"))
        console.log('inside actions');
        dispatch(turnOn());
        const result = await axios.get(
          `${config().shipmentsUrl}?skip=${skip}&limit=${limit}`,
        );
        dispatch(turnOff());
        console.log(result)
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
  };
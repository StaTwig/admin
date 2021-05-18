import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';
import setAuthToken from '../utils/setAuthToken';

export const getOverviewAnalytics = (orgType = '', skip = 0, limit = 100) => {
  if (!orgType.length) {
    orgType = 'BREWERY';
  }
  return async dispatch => {
    try {
      setAuthToken(localStorage.getItem("theAbInBevToken"))
      dispatch(turnOn());
      const result = await axios.get(
        `${config().getOverviewStats}?orgType=${orgType}`,
      );
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
    }
  };
};
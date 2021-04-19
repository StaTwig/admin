import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';

export const getAnalyticsAllStats = () => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        const result = await axios.get(
          config().allStatsAnalticsUrl,
        );
        dispatch(turnOff());
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
  };
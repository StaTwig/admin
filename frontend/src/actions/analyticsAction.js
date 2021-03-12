import axios from 'axios';
import { config } from '../config';


export const getAnalytics = async () => {
    try {
      const result = await axios.get(config().getAnalyticsUrl);
      return result.data;
    } catch (e) {
      return e.response;
    }
  };
  
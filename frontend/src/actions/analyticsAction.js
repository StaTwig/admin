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
  
  export const getOverviewAnalytics = async () => {
    try {
      const result = await axios.get(config().getOverviewAnalyticsUrl);
      return result.data;
    } catch (e) {
      return e.response;
    }
  };
  
  export const getInventoryAnalytics = async () => {
    try {
      const result = await axios.get(config().getInventoryAnalyticsUrl);
      return result.data;
    } catch (e) {
      return e.response;
    }
  };
  
  export const getShipmentAnalytics = async () => {
    try {
      const result = await axios.get(config().getShipmentAnalyticsUrl);
      return result.data;
    } catch (e) {
      return e.response;
    }
  };
  
  
  export const getOrderAnalytics = async () => {
    try {
      const result = await axios.get(config().getOrderAnalyticsUrl);
      return result.data;
    } catch (e) {
      return e.response;
    }
  };
  
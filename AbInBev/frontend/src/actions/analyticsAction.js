import axios from 'axios';
import { turnOff, turnOn } from './spinnerActions';
import { config } from '../config';

export const getAnalyticsAllStats = (param) => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        const result = await axios.get(
          config().getAnalyticsBySKUurl+param,
        );
        dispatch(turnOff());
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
};
  
export const getAllStates = () => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        const result = await axios.get(
          config().getAllStates,
        );
        dispatch(turnOff());
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
  };
  
export const getAnalyticsByBrand = () => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        const result = await axios.get(
          config().getAnalyticsByBrandurl,
        );
        dispatch(turnOff());
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
};
  
export const getAllBrands = () => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        const result = await axios.get(
          config().getAllBrandsurl,
        );
        dispatch(turnOff());
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
  };
  
export const getAllOrganisationStats = (param = '') => {
    return async dispatch => {
      try {
        dispatch(turnOn());
        console.log(config().getOrganisationStatsurl+param);
        
        const result = await axios.get(
          config().getOrganisationStatsurl+param,
        );
        dispatch(turnOff());
        return result.data;
      } catch (e) {
        dispatch(turnOff());
      }
    };
  };
import axios from 'axios';
import {config } from '../config';

export const createShippingOrderUrl = async data => {
  try {
    const result = await axios.post(config().createShippingOrderUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};


export const getShippingOrders = async () => {
  try {
    const result = await axios.get(config().getShippingOrdersUrl);
    return result.data.data;
  } catch (e) {
    return [];
  }
};
  
export const getShippingOrderById = async (id) => {
  try {
    const result = await axios.get(config().viewShippingOrderUrl+id);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

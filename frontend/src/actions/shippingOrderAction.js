import axios from 'axios';
import { config } from '../config';
import { turnOn, turnOff } from "./spinnerActions";

export const createShipmentOrderUrl = async data => {
  try {
    const result = await axios.post(config().createShipmentOrderUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};


export const getAllShippingOrders = async () => {
  try {
    const result = await axios.get(config().fetchAllShippingOrders);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};
  
export const getShippingOrderById = async (id) => {
  try {
    const result = await axios.get(config().fetchShippingOrdersByKey+id);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

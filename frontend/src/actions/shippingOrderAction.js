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


  


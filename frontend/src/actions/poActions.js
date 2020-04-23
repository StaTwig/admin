import axios from 'axios';
import { config } from '../config';

export const createPO = async (data) => {
  try {
    debugger;
    const result =  await axios.post(axios.get(config().createPurchaseOrderUrl), data);
    return result;
  }catch(e){
    return e.response;
  }

}

export const getPOs = async () => {
  try {
    const result =  await axios.get(axios.get(config().fetchAllPurchaseOrdersUrl));
    return result;
  }catch(e){
    return e.response;
  }

}

export const getPO = async (po) => {
  try {
    const result =  await axios.get(axios.get(config().fetchAllPurchaseOrderUrl) + po);
    return result.data.data;
  }catch(e){
    return e.response;
  }

}

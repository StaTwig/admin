import axios from 'axios';
import { config } from '../config';
import {SET_REVIEW_PO} from "../constants/poConstants";

export const createPO = async (data) => {
  try {
    debugger;
    const result =  await axios.post(config().createPurchaseOrderUrl, data);
    return result;
  }catch(e){
    return e.response;
  }

}

export const getPOs = async () => {
  try {
    const result =  await axios.get(config().fetchAllPurchaseOrdersUrl);
    return result;
  }catch(e){
    return e.response;
  }

}

export const getPO = async (po) => {
  try {
    const result =  await axios.get(config().fetchAllPurchaseOrderUrl + po);
    return result.data.data;
  }catch(e){
    return e.response;
  }

}

export const setReviewPos = (data) =>{
  return {
    type: SET_REVIEW_PO,
    payload: data,
  };

}
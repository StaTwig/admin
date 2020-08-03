import axios from 'axios';
import { config } from '../config';
import {SET_REVIEW_PO,SET_EDIT_PO,RESET_EDIT_PO} from "../constants/poconstants";

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

export const getProducts = async () => {
  try {
    const result =  await axios.get(config().getProducts);
    return result.data.data;
  }catch(e){
    return e.response;
  }

}


export const getManufacturers = async () => {
  try {
    const result =  await axios.get(config().getManufacturers);
    return result.data.data;
  }catch(e){
    return e.response;
  }

}

export const addNewProduct = async (data) => {
  try {
  const url = config().addNewProduct;
    const result =  await axios.post(config().addNewProduct, data, {headers: { 'Content-Type': 'multipart/form-data' } });
    debugger;
    return result.data;
  }catch(e){
    return e.response;
  }

}

export const getPurchaseStats = async () => {
  try {
    const result =  await axios.get(config().fetchPurchaseOrderStatisticsUrl);
    return result;
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


export const setEditPos = (data) =>{
  return {
    type: SET_EDIT_PO,
    payload: data,
  };

}

export const resetEditPos = (data) =>{
  return {
    type: RESET_EDIT_PO,
    payload: data,
  };
}
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

export const getShippingOrderIds = async () => {
  try {
    const result = await axios.get(config().getShipmentIdsUrl);
    return result.data.data;
  } catch (e) {
    return [];
  }
};
export const fetchAllairwayBillNumber = async () => {
  try {
    const result = await axios.get(config().fetchairwayBillNumber);
    return result.data;
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

export const getWarehouseByOrgId = async (id) => {
  try {
    const result = await axios.get(config().getWarehouseByOrgId+id);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getAllOrganisations = async () => {
  try {
    const result = await axios.get(config().getOrganisations);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getProductsByInventoryId = async (id) => {
  try {
    const result = await axios.get(config().getProductsByInventoryUrl+id);
    return result.data;
  } catch (e) {
    return [];
  }
};
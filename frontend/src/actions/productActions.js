import axios from 'axios';

import { config } from '../config';

export const generateCodes = async query => {
  try {
    const result = await axios.get(
      `${config().generateCodes}?limit=${query.limit}&type=${query.type}`,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      },
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const getOrganisations = async (type = '') => {
  try {
    const result = await axios.get(`${config().getOrganisations}?type=${type}`);
    return result.data.data;
  } catch (e) {
    return [];
  }
};

export const getOrganisationsAtSignup = async () => {
  try {
    const result = await axios.get(config().getOrganisationsAtSignup);
    return result.data.data;
  } catch (e) {
    return [];
  }
};

export const getProductList = async () => {
  try {
    const result = await axios.get(config().productListUrl);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const fetchAllRegions = async () => {
  try {
    const result = await axios.get(config().fetchAllRegions);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const fetchCountriesByRegion = async (id) => {
  try {
    const result = await axios.get(config().fetchCountriesByRegion + id);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const fetchStateByCountry = async (id) => {
  try {
    const result = await axios.get(config().fetchStateByCountry + id);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const fetchCitiesByState = async (id) => {
  try {
    const result = await axios.get(config().fetchCitiesByState + id);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const getWarehouseByOrgId = async (id, showNewWarehouses = false) => {
  try {
    const result = await axios.get(config().getWarehouseByOrgId + id + `&showNewWarehouses=${showNewWarehouses}`);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getOrganisationsProfile = async () => {
  try {
    const result = await axios.get(config().getOrganisations);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const fetchUnregisteredOrganisations = async () => {
  try {
    const result = await axios.get(config().getUnregisteredOrganisations)
    return result.data;
  } catch(err) {
    return [];
  }
}
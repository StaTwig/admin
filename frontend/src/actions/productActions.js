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

export const getOrganisations = async () => {
  try {
    const result = await axios.get(config().getOrganisations);
    debugger;
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getWarehouseByOrgId = async (id) => {
  try {
    const result = await axios.get(config().getWarehouseByOrgId+id);
    return result;
  } catch (e) {
    return e.response;
  }
};

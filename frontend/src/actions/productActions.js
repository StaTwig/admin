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

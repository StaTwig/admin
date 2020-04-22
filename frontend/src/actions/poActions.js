import axios from 'axios';
export const createPO = async (data) => {
  try {
    debugger;
    const result =  await axios.post('http://52.90.57.31:3002/api/shipping/createPurchaseOrder', data);
    return result;
  }catch(e){
    return e.response;
  }

}

export const getPOs = async () => {
  try {
    const result =  await axios.get('http://52.90.57.31:3002/api/shipping/fetchAllPurchaseOrders');
    return result;
  }catch(e){
    return e.response;
  }

}

export const getPO = async (po) => {
  try {
    const result =  await axios.get(`http://52.90.57.31:3002/api/shipping/fetchpurchaseOrder?key=${po}`);
    return result.data.data;
  }catch(e){
    return e.response;
  }

}

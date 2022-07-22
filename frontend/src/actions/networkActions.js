import axios from "axios";
import { config } from "../config";

export const getBestSellers = async () => {
  try {
    const url = config().getBestSellersUrl;
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getmanufacturerInStockReport = async () => {
  try {
    const url = config().getmanufacturerInStockReportUrl;
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getmanufacturerOutStockReport = async () => {
  try {
    const url = config().getmanufacturerOutStockReportUrl;
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getManufacturerWarehouses = async (orgId, cName) => {
  try {
    const url = config().getManufacturerWarehouses;
    const result = await axios.get(url+`?warehouseOrg=${orgId}&countryName=${cName}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getManufacturerFilterOptions = async (type, regExp) => {
  try {
    const url = config().getManufacturerFilterOptions;
    const result = await axios.get(url+`?type=${type}&regExp=${regExp}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

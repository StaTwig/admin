import axios from "axios";
import { config } from "../config";

export const getBestSellers = async (reportWarehouse) => {
  try {
    const url = config().getBestSellersUrl;
    const result = await axios.get(url + `?warehouseId=${reportWarehouse}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getBestSellerSummary = async (reportWarehouse) => {
  try {
    const url = config().getBestSellersSummaryUrl;
    const result = await axios.get(url + `?warehouseId=${reportWarehouse}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getmanufacturerInStockReport = async (reportWarehouse) => {
  try {
    const url = config().getmanufacturerInStockReportUrl;
    const result = await axios.get(url + `?warehouseId=${reportWarehouse}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getmanufacturerOutStockReport = async (reportWarehouse) => {
  try {
    const url = config().getmanufacturerOutStockReportUrl;
    const result = await axios.get(url + `?warehouseId=${reportWarehouse}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getManufacturerWarehouses = async (orgId, cName, partnerLocation, MylocationFilter) => {
  try {
    const url = config().getManufacturerWarehouses;
    const result = await axios.get(
      url + `?warehouseOrg=${orgId}&countryName=${cName}&partnerLocation=${partnerLocation ? partnerLocation : ""}&mylocationFilter=${MylocationFilter ? MylocationFilter : ""}`
    );
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

export const getManufacturerFilterOptions = async (type, regExp) => {
  try {
    const url = config().getManufacturerFilterOptions;
    const result = await axios.get(url + `?type=${type}&regExp=${regExp}`);
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

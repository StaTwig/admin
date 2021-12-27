import axios from "axios";

import { config } from "../config";
import {
  GET_SHIPMENTS_FAILURE,
  GET_SHIPMENTS_SUCCESS,
  SET_REVIEW_SHIPMENT,
  SET_TRACING_SHIPMENT,
  SET_VISIBLE_SHIPMENT,
  SET_EDIT_SHIPMENT,
  SET_TRACK_SHIPMENT,
  RECEIVE_SHIPMENT,
} from "../constants/shipmentConstants";
import { turnOff, turnOn } from "./spinnerActions";

export const getShipments = (skip = 0, limit = 5) => {
  return async (dispatch) => {
    try {
      dispatch(turnOn());
      dispatch(resetShipments([]));
      const result = await axios.get(
        `${config().shipmentsUrl}?skip=${skip}&limit=${limit}`
      );
      dispatch(setShipments(result.data));
      // dispatch(setShipmentsCount(result.data));
      dispatch(turnOff());
      return result.data;
    } catch (e) {
      dispatch(turnOff());
      dispatch(resetShipments(e.response));
      // dispatch(resetShipmentsCount(e.response));
    }
  };
};

export const getInboundShipments = async (
  shipmentId,
  from,
  to,
  dateFilter,
  status,
  skip,
  limit
) => {
  try {
    const result = await axios.get(
      `${
        config().fetchInboundShipmentsUrl
      }?shipmentId=${shipmentId}&from=${from}&to=${to}&dateFilter=${dateFilter}&status=${status}&skip=${skip}&limit=${limit}`
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getOutboundShipments = async (
  shipmentId,
  from,
  to,
  dateFilter,
  status,
  skip,
  limit
) => {
  try {
    const result = await axios.get(
      `${
        config().fetchOutboundShipmentsUrl
      }?shipmentId=${shipmentId}&from=${from}&to=${to}&dateFilter=${dateFilter}&status=${status}&skip=${skip}&limit=${limit}`
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getSupplierAndReceiverList = async () => {
  try {
    const result = await axios.get(
      `${config().fetchSupplierAndReceiverListUrl}`
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getGMRShipments = async (skip, limit) => {
  try {
    const result = await axios.get(
      `${config().fetchGMRShipmentsUrl}?skip=${skip}&limit=${limit}`
    );
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getShipmentIds = async () => {
  try {
    const result = await axios.get(`${config().getShipmentIdsUrl}`);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const fetchairwayBillNumber = async () => {
  try {
    const result = await axios.get(`${config().fetchairwayBillNumber}`);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const getJourneyTrack = async (id) => {
  try {
    const result = await axios.get(`${config().trackJourney + id}`);
    return result;
  } catch (e) {
    return [];
  }
};

export const trackShipment = (shipmentId) => {
  try {
    return async (dispatch) => {
      const result = await axios.get(config().trackShipment + shipmentId);
      dispatch(setTrackShipment(result.data));
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    console.log(e);
  }
};

export const trackProduct = async (id) => {
  try {
    const configObject = config();
    const url = configObject.trackProduct + id;
    const result = await axios.get(url);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const chainOfCustody = async (id) => {
  try {
    const configObject = config();
    const url = configObject.chainOfCustody + id;
    const result = await axios.get(url);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const poDetailsByShipmentId = async (id) => {
  try {
    const configObject = config();
    const url = configObject.poDetailsByShipmentId + id;
    const result = await axios.get(url);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const productDetailsByShipmentId = async (id) => {
  try {
    const configObject = config();
    const url = configObject.productDetailsByShipmentId + id;
    const result = await axios.get(url);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getTemperature = async () => {
  try {
    const result = await axios.get(config().trackTemperature);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const getIotShipmentData = async (url) => {
  try {
    return await fetch(url)
      .then((data) => data.json())
      .then((data) => data);
  } catch (e) {
    return e.response;
  }
};

export const fetchIotEnabledApiResponse = async (id) => {
  try {
    const result = await axios.get(config().getIotEnabledStatus);
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const getShipmentsById = (query) => {
  try {
    return async (dispatch) => {
      const result = await axios.get(config().shipmentsSearch + query);
      const shipments = result.data.data.map((shipment) =>
        JSON.parse(shipment.data)
      );
      dispatch(setTracingShipments({ data: shipments }));
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    console.log(e);
    return (dispatch) => {
      dispatch(resetShipments(e.response));
    };
  }
};

export const createShipment = async (data) => {
  try {
    const result = await axios.post(config().createShipmentUrl, data);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const newShipment = async (data) => {
  try {
    const result = await axios.post(config().newShipmentUrl, data);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const getViewShipmentGmr = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(config().viewShipmentGmrUrl + id);
      return result.data.data;
    } catch (e) {
      return e.response;
    }
  };
};

export const getViewShipment = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(config().viewShipmentUrl + id);
      return result.data.data;
    } catch (e) {
      return e.response;
    }
  };
};

const setShipments = (data) => {
  return {
    type: GET_SHIPMENTS_SUCCESS,
    payload: data,
  };
};

// const setShipmentsCount = data => {
//   return {
//     type: GET_SHIPMENTSCOUNT_SUCCESS,
//     payload: data,
//   };
// };

export const setReviewShipments = (data) => {
  return {
    type: SET_REVIEW_SHIPMENT,
    payload: data,
  };
};

export const updateTrackingStatus = async (data) => {
  try {
    const result = await axios.post(config().updateTrackingStatusUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const receiveShipment = (data) => {
  return {
    type: RECEIVE_SHIPMENT,
    payload: data,
  };
};

export const setVisibleShipments = (index, visible) => {
  return {
    type: SET_VISIBLE_SHIPMENT,
    payload: { index, visible },
  };
};

export const setEditShipments = (data) => {
  return {
    type: SET_EDIT_SHIPMENT,
    payload: data,
  };
};

export const setTracingShipments = (data) => {
  return {
    type: SET_TRACING_SHIPMENT,
    payload: data,
  };
};

export const setTrackShipment = (data) => {
  return {
    type: SET_TRACK_SHIPMENT,
    payload: data,
  };
};

export const resetShipments = (data) => {
  return {
    type: GET_SHIPMENTS_FAILURE,
    payload: data,
  };
};

// const resetShipmentsCount = data => {
//   return {
//     type: GET_SHIPMENTSCOUNT_FAILURE,
//     payload: data,
//   };
// };

export const uploadImage = async (id, formData) => {
  try {
    const configObject = config();
    const url = configObject.uploadImage + id;
    const result = await axios.post(url, formData);
    return result;

    //   const requestOptions = {
    //     method: 'POST',
    //     headers: new Headers({
    //       'Authorization': 'bearer '+ localStorage.theLedgerToken ,
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }),
    //     body: formData,
    // };
    // const result = await fetch(url, requestOptions);
  } catch (e) {
    return e.reponse;
  }
};

export const fetchImage = async (id) => {
  try {
    const configObject = config();
    const url = configObject.fetchImage + id;
    const result = await axios.get(url);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const receiveApi = async (formData) => {
  try {
    const configObject = config();
    const url = configObject.receiveApi;
    const result = await axios.post(url, formData);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const chainOfCustodyTrack = async (id) => {
  try {
    // const configObject = config();
    const url =
      "http://54.164.66.73:3002/shipmentmanagement/api/shipment/chainOfCustody?shipmentId=" +
      id;
    const result = await axios.get(url);
    return result;
  } catch (e) {
    return e.response;
  }
};

import axios from "axios";

import { config } from "../config";
import {
  SET_AFFILIATED_PENDING_REQUESTS,
  SET_PERMISSIONS,
  SET_ORGANISATION_ADDRESSES,
  SET_ORGANISATION_USERS,
  SET_ORGANISATION_REQ_SENT,
  SET_AFFILATED_PENDING_REQ,
  SET_AFFILATED_ORGS,
  SET_ORGANISATIONS,
} from "../constants/organisationConstants";
import { turnOn, turnOff } from "./spinnerActions";

export const getRequestsPending = (skip = 0, limit = 5) => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(
        `${config().getApprovalsUrl}?skip=${skip}&limit=${limit}`
      );
      dispatch({
        type: SET_AFFILIATED_PENDING_REQUESTS,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getPermissions = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().getPermissionsUrl);
      dispatch({
        type: SET_PERMISSIONS,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getWareHouses = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().getWareHousesUrl);
      dispatch({
        type: SET_ORGANISATION_ADDRESSES,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getAllOrganisations = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().getAllOrgUrl);
      dispatch({
        type: SET_ORGANISATIONS,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const activateOrgUser = async (data) => {
  try {
    const result = await axios.get(
      `${config().activateOrgUserUrl}?id=${data.id}&role=${data.role}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const deactivateOrgUser = async (data) => {
  try {
    const result = await axios.get(
      `${config().deactivateOrgUserUrl}?id=${data.id}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const verifyOrgUser = async (data) => {
  try {
    const result = await axios.get(
      `${config().verifyOrgUserUrl}?id=${data.id}&role=${data.role}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const rejectOrgUser = async (data) => {
  try {
    const result = await axios.get(
      `${config().rejectOrgUserUrl}?id=${data.id}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const unaffiliateUser = async (data) => {
  try {
    const result = await axios.get(
      `${config().unaffiliateUserUrl}?id=${data.id}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const unaffiliateOrg = async (data) => {
  try {
    const result = await axios.post(config().unaffiliateOrgUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const acceptAffiliate = async (data) => {
  try {
    const result = await axios.get(
      `${config().acceptAffiliateUrl}?employee_id=${data.id}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const rejectAffiliate = async (data) => {
  try {
    const result = await axios.get(
      `${config().rejectAffiliateUrl}?employee_id=${data.id}`
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const addAffiliate = async (data) => {
  try {
    const result = await axios.post(config().addAffiliateUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getRecentReqSent = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().recentRequestsSentUrl);
      dispatch({
        type: SET_ORGANISATION_REQ_SENT,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getOrgUsers = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().getOrgUsersUrl);
      dispatch({
        type: SET_ORGANISATION_USERS,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getOrgActiveUsers = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().getOrgActiveUsers);
      dispatch({
        type: SET_ORGANISATION_USERS,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getAffilatedPendingReq = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().pendingAffiliatedReqUrl);
      dispatch({
        type: SET_AFFILATED_PENDING_REQ,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const getAffilatedOrgs = () => {
  try {
    return async (dispatch) => {
      dispatch(turnOn());
      const result = await axios.get(config().affiliatedOrgUrl);
      dispatch({
        type: SET_AFFILATED_ORGS,
        payload: result.data,
      });
      dispatch(turnOff());
      return result.data.data.length;
    };
  } catch (e) {
    throw Error(e.message);
  }
};

export const addOrgUser = async (data) => {
  try {
    const result = await axios.post(config().addOrgUserUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const addAddress = async (data) => {
  try {
    const reqData = {
      title: data.title,
      organisationId: data.organisationId,
      postalAddress: [
        data.flatno,
        data.area,
        data.landmark,
        data.town,
        data.state,
        data.country,
      ].join(", "),
      country: {
        countryId: "001",
        countryName: data.country,
      },
      region: {
        regionId: "reg123",
        regionName: "Earth Prime",
      },
      location: {
        longitude: data?.positions?.length
          ? data?.positions?.coords.longitude
          : "12.12323453534",
        latitude: data?.positions?.length
          ? data?.positions?.coords.latitude
          : "13.123435345435",
        geohash: "1231nejf923453",
      },
      supervisors: [],
      employeess: [],
    };

    const result = await axios.post(
      data.id
        ? config().updateOrgAddressrUrl + "?warehouseId=" + data.id
        : config().addOrgAddressrUrl,
      data.id ? { WarehouseAddress: reqData } : reqData
    );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getAddressByLatLong = async (data) => {
  const { latitude, longitude } = data.coords;
  try {
    const result = await axios.get(
      `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${latitude},${longitude}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=BCRdhsq4jB8NxBG7vTWpVbNxCb6b50j98_f_bwiy7Qw`
    );
    return result.length > 0
      ? result.Response.View.Result[0].Location.Address
      : {};
  } catch (e) {
    return e.response;
  }
};

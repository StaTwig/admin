import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  PROFILE_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  SET_USER_LOCATION,
} from "../constants/userConstants";
import { config } from "../config";
import axios from "axios";

export const updateProfile = async (data) => {
  try {
    const result = await axios.post(config().updateProfileUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const addWarehouse = async (data) => {
  try {
    const result = await axios.post(config().addWarehouse, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const verifyOtp = async (data, language) => {
  try {
    if (language === undefined) {
      language = "en";
    }
    const result = await axios.post(config().verifyOtpUrl, data, {
      headers: {
        "Accept-Language": language,
      },
    });
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getOrganizationsByType = async (data) => {
  try {
    const result = await axios.get(config().getOrganizationsByType + data);
    return result.data;
  } catch (e) {
    return [];
  }
};
export const getOrganizationsTypewithauth = async (data) => {
  try {
    const result = await axios.get(
      config().getOrganizationsTypewithauth + data
    );
    return result.data;
  } catch (e) {
    return [];
  }
};
export const verifyEmailAndPhoneNo = async (data) => {
  try {
    const result = await axios.get(`${config().emailverify}?${data}`);
    return result.data;
  } catch (e) {
    return [];
  }
};

export const checkUser = async (data) => {
  try {
    const result = await axios.post(config().checkUserUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const updateWarehouse = async (data, id) => {
  try {
    const result = await axios.post(config().updateWarehouse + id, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const registerUser = async (data, language) => {
  try {
    if (language === undefined) {
      language = "en";
    }
    const result = await axios.post(config().registerUrl, data, {
      headers: {
        "Accept-Language": language,
      },
    });
    return result;
  } catch (e) {
    return e.response;
  }
};

export const sendOtp = async (data, language) => {
  try {
    if (language === undefined) {
      language = "en";
    }
    const result = await axios.post(config().sendOtpUrl, data, {
      headers: {
        "Accept-Language": language,
      },
    });
    return result;
  } catch (e) {
    return e.response;
  }
};

export const forgotPassword = async (data) => {
  try {
    const result = await axios.post(config().forgotPasswordUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getUserInfo = () => {
  try {
    return async (dispatch) => {
      const result = await axios.get(config().userInfoUrl);
      dispatch(setProfile(result.data.data));
      return result;
    };
  } catch (e) {
    return e.response;
  }
};

export const getActiveWareHouses = async () => {
  try {
    const result = await axios.get(config().userInfoUrl);
    return result.data.data.warehouses;
  } catch (e) {
    return e.response;
  }
};

export const getUserInfoUpdated = async () => {
  try {
    const result = await axios.get(config().userInfoUrl);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getWarehouseById = async (id) => {
  try {
    const result = await axios.get(config().getWarehouseById + id);
    return result;
  } catch (e) {
    return e.response;
  }
};

// Alert Modal Popup Verification
export const getAlertModalData = async (id) => {
  try {
    const result = await axios.get(config().requestModalAlertUrl + id);
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

export const updateAlertModalData = async (id, status) => {
  try {
    const result = await axios.get(
      config().updateStatusModalAlert + id + "&status=" + status
    );
    return result.data.data;
  } catch (e) {
    return e.response;
  }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: AUTH_SUCCESS,
    payload: decoded,
  };
};

// Set logged in user
export const logoutUser = () => {
  localStorage.removeItem("theLedgerToken");
  localStorage.removeItem("location");
  window.location.href = "/";
  return {
    type: AUTH_ERROR,
  };
};

// Set user profile
export const setProfile = (data) => {
  return {
    type: PROFILE_SUCCESS,
    payload: data,
  };
};

// Set user profile
export const setAllUsers = (data) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: data,
  };
};

//set location from top panel dropdown
export const setUserLocation = (data) => {
  return {
    type: SET_USER_LOCATION,
    payload: data,
  };
};

export const getAllUsers = () => {
  try {
    return async (dispatch) => {
      const result = await axios.get(config().getAllUsersUrl);
      dispatch(setAllUsers(result.data.data));
      return result;
    };
  } catch (e) {
    return e.response;
  }
};

export const postUserLocation = async (data) => {
  try {
    const result = await axios.post(config().locationUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getAllManageAlerts = async () => {
  try {
    const result = await axios.get(config().getAllManageAlertsUrl);
    return result.data.data || [];
  } catch (e) {
    console.log("error: ", e);
    return [];
  }
};

export const createUpdateNewAlert = async (data) => {
  try {
    const result = await axios.post(config().createUpdateAlertsUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

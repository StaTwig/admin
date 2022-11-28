import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  PROFILE_SUCCESS,
  GET_ALL_USERS_SUCCESS,
} from "../constants/userConstants";
import { config } from "../../config";
import axios from "axios";

export const updateProfile = async (data) => {
  try {
    const result = await axios.post(config().updateProfileUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const addNewOrganisation = async (data) => {
  try {
    const result = await axios.post(config().addNewOrganisation, data);
    return result;
  } catch(err) {
    return err.response;
  }
}

export const verifyOtp = async (data) => {
  try {
    const result = await axios.post(config().verifyOtpUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const registerUser = async (data) => {
  try {
    const result = await axios.post(config().registerUrl, data);
    return result;
  } catch (e) {
    return e.response;
  }
};

export const addUsersFromExcel = async (data) => {
	try {
	  const url = config().addUsersFromExcel;
	  const result = await axios.post(url, data, {
		headers: { "Content-Type": "multipart/form-data" },
	  });
	  return result;
	} catch (e) {
	  return e.response;
	}
  };

export const sendOtp = async (data) => {
  try {
    const result = await axios.post(config().sendOtpUrl, data);
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

export const getUserInfoUpdated = async () => {
  try {
    const result = await axios.get(config().userInfoUrl);
    return result;
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
  localStorage.removeItem("theLedgerAdminToken");
  localStorage.removeItem("name");
  localStorage.removeItem("organisation");
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

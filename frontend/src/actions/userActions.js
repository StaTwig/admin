import { AUTH_SUCCESS, AUTH_ERROR } from '../constants/userConstants';
import { config } from '../config';
import axios from 'axios';

export const updateProfile = async (data) => {
  try  {
    const result = await  axios.post(config().updateProfileUrl, data);
    return result;
  }catch(e) {
    return e.response;
  }
};

export const verifyOtp = async (data) => {
  try  {
    const result = await  axios.post(config().verifyOtpUrl, data);
    return result;
  }catch(e) {
    return e.response;
  }
};

export const authenticateUser = async data => {
  try {
    const result = await axios.post(config().registerUrl, data );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const loginUser = async data => {
  try {
    const result = await axios.post(config().loginUrl, data );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const getUserInfo = async () => {
  try {
    const result = await axios.get(config().userInfoUrl );
    return result;
  } catch (e) {
    return e.response;
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: AUTH_SUCCESS,
    payload: decoded,
  };
};

// Set logged in user
export const logoutUser = () => {
  localStorage.removeItem('theLedgerToken')
  return {
    type: AUTH_ERROR,
  };
};

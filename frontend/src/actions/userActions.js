import { AUTH_SUCCESS, AUTH_ERROR } from '../constants/userConstants';
import { SERVER_URL } from '../config';
import axios from 'axios';

export const verifyOtp = async (data) => {
  try  {
    const result = await  axios.post(`${SERVER_URL}/api/auth/verify-otp`, data);
    return result;
  }catch(e) {
    return e.response;
  }
};

export const authenticateUser = async data => {
  try {
    const result = await axios.post(`${SERVER_URL}/api/auth/register`, data );
    return result;
  } catch (e) {
    return e.response;
  }
};

export const loginUser = async data => {
  try {
    const result = await axios.post(`${SERVER_URL}/usermanagement/api/auth/login`, data );
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

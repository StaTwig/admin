import {
  GET_ALL_USERS_SUCCESS,
} from '../constants/userConstants';

export const initialState = [];

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

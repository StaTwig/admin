import { SET_POS, RESET_POS } from '../constants/poconstants';

export const initialState = [];

export const poReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POS:
      return [
        // ...state, ...action.payload
        ...action.payload.data
      ];
    case RESET_POS:
      return initialState;

    default:
      return state;
  }
};

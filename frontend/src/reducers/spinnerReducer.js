import { TURN_OFF, TURN_ON } from "../constants/spinnerConstants";

export const spinnerReducer = (state = false, action) => {
  switch (action.type) {
    case TURN_ON:
      return true;
    case TURN_OFF:
      return false;
    default:
      return state;
  }
};

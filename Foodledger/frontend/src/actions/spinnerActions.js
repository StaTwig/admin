import { TURN_OFF, TURN_ON } from "../constants/spinnerConstants";

export const turnOn = () => {
  return {
    type: TURN_ON,
  };
};
export const turnOff = () => {
  return {
    type: TURN_OFF,
  };
};

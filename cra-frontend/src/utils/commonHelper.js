import { useSelector } from "react-redux";

export const getAddress = (address) => {
  return (
    address.firstLine +
    " " +
    (address.secondLine ? address.secondLine : "") +
    " " +
    address.city +
    " " +
    address.state +
    " " +
    address.zipCode +
    " " +
    address.country
  );
};

export const isType = (type, val) => {
  return !!(
    val.constructor && val.constructor.name.toLowerCase() === type.toLowerCase()
  );
};

function GetState(permission) {
  const user = useSelector((state) => {
    return state.user;
  });
  return user.permissions.permissions.indexOf(permission) > -1 ? true : false;
}

export function isAuthenticated(permission) {
  const result = GetState(permission);
  return result;
}

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
  if(val)
  return !!(
    val.constructor && val.constructor.name.toLowerCase() === type.toLowerCase()
  );
  else
    return false;
};

function GetState(permission) {
  const user = useSelector((state) => {
    return state.user;
  });
  let permissionArr = [];
  if (user)
    permissionArr = user.permissions.permissions;
  else
    permissionArr = localStorage.bkp.split(',');
  return permissionArr.indexOf(permission) > -1 ? true : false;
}

export function isAuthenticated(permission) {
  const result = GetState(permission);
  return result;
}

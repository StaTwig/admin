export const getAddress = (address) => {
  return address.firstLine +" "+ (address.secondLine ? address.secondLine : "") +" "+ address.city +" "+ address.state +" "+ address.zipCode +" "+ address.country;
}

export const isType = (type, val) => {
  return !!(val.constructor && val.constructor.name.toLowerCase() === type.toLowerCase());
}
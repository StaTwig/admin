exports.inventoryAdd = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" has been Added`;
};
exports.inventoryUpdate = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" has been Updated`;
};
exports.inventoryNearExpiry = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" will expire soon`;
};
exports.inventoryExpired = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" has expired`;
};

import {
    SET_EDIT_SHIPMENT
  } from '../constants/shipmentConstants';
  
  export const initialState = {shipmentId:'',
  client:'',
  supplierLocation:'',
  shipmentDate: '',
  deliveryTo:'Select receiver',
  deliveryLocation:'',
  estimateDeliveryDate: '',
  status: '',
  products:[
    {
  productName:'Select Product',
  quantity:'',
  manufacturerName:'Select Manufacturer',
  storageConditionmin:'',
  storageConditionmax:'',
  manufacturingDate: '',
  expiryDate : '',
  batchNumber:'',
  serialNumber:''}]}
  
  export const editShipmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EDIT_SHIPMENT:
        return action.payload;
      
      default:
        return state;
    }
  };
  
import {
    SET_EDIT_INVENTORY,
  RESET_EDIT_INVENTORY
  } from '../constants/inventoryConstants';
  
  export const initialState = {
  productName:'Select Product',
  manufacturerName: 'Select Manufacturer',
  quantity:'',
  manufacturingDate:'',
  expiryDate:'',
  storageConditionmin:'',
  storageConditionmax:'',
  batchNumber:'',
  serialNumber:''
}
  
  export const editInventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EDIT_INVENTORY:
        return action.payload;
      case RESET_EDIT_INVENTORY:
        return initialState;

      default:
        return state;
    }
  };
  
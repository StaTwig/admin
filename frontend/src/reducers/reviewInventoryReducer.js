import {
  SET_REVIEW_INVENTORY,
  RESET_REVIEW_INVENTORY,
} from '../constants/inventoryConstants';

export const initialState = [
  {
    productName: 'Select Product',
    manufacturerName: 'Select Manufacturer',
    quantity: '',
    manufacturingDate: '',
    expiryDate: '',
    storageConditionmin: '',
    storageConditionmax: '',
    batchNumber: '',
    serialNumber: '',
  },
];

export const reviewInventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_INVENTORY:
      return action.payload;
    case RESET_REVIEW_INVENTORY:
      return [
        {
          productName: 'Select Product',
          manufacturerName: 'Select Manufacturer',
          quantity: '',
          manufacturingDate: '',
          expiryDate: '',
          storageConditionmin: '',
          storageConditionmax: '',
          batchNumber: '',
          serialNumber: '',
        },
      ];;

    default:
      return state;
  }
};

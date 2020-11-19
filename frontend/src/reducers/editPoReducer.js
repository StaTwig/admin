import {
    SET_EDIT_PO,RESET_EDIT_PO
  } from '../constants/poconstants';

  const a = "Select Product"
  const b ="Select Manufacturer"

  export const initialState = {
      sendPOTo:'Select Send Po To',
      vendorId:'Select Vendor Id',
      unicefPo:'Select Po',
      vendorName:'Select Vendor Name',
       poNum :'Select Po#',
       locationId :'Select location Id',
       shippedFrom:'Select Shipped From',
       toLocation:'Select to Location',
      materialId:'Select Material Id',
      receiver: {name:"Select Receiver"},
      products : [{ [`${a}-${b}`]: "" }]
}
  
  export const editPoReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EDIT_PO:
        return action.payload.data;
      case RESET_EDIT_PO:
        return initialState;
      
      default:
        return state;
    }
  };
  
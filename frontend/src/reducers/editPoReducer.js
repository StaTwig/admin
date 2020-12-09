import {
    SET_EDIT_PO,RESET_EDIT_PO
  } from '../constants/poconstants';

  const a = "Select Product"
  const b ="Select Manufacturer"

  export const initialState = {
    sendpoto:{name:"Select Send Po To"},
      vendor:'',
      orderID:'',
      vendorName:'',
      plant: '',
      incoterms2: '',
      destination:'',
      material:'',
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
  
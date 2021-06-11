export const initialState = [];

export const lastMileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LAST_MILE':
    //   const inventories = action.payload;
      console.log(action.payload)
      return [
        // ...state, ...inventories
        // ...inventories
      ];
    case 'GET_LAST_MILE_COUNT':
        console.log(action.payload)
      return initialState
    default:
      return state;
  }
};

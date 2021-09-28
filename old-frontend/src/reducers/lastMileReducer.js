export const initialState = [];

export const lastMileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LAST_MILE':
      const lastmile = action.payload;
      // console.log(action.payload)
      return [
        // ...state, ...inventories
        ...lastmile
      ];
      case 'GET_LAST_MILE_FAILURE':
        return initialState
    default:
      return state;
  }
};

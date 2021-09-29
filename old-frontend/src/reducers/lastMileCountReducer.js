
export const initialState = 0;

export const lastMileCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LAST_MILE_COUNT':
      const lastmileCount = action.payload
      return lastmileCount;

    case 'GET_LAST_MILE_COUNT_FAILURE':
      return initialState
    default:
      return state;
  }
};

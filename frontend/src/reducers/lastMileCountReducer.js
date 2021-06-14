
export const initialState = {counts: {currentInventory: {}, inventoryAdded:{}, vaccinesExpired:{}, vaccinesNearExpiration:{}}, dict:{}, data:{}};

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

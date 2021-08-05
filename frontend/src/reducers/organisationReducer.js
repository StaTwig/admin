import {
  GET_FAILURE,
  SET_AFFILIATED_PENDING_REQUESTS,
  SET_PERMISSIONS,
  SET_ORGANISATION_ADDRESSES,
  SET_ORGANISATION_USERS,
  SET_ORGANISATION_REQ_SENT,
  SET_AFFILATED_PENDING_REQ,
  SET_AFFILATED_ORGS,
  SET_ORGANISATIONS,
  SET_ORGANISATION_TYPES,
  SET_COUNTRY_TYPES,
  SET_REGION_TYPES,
} from "../constants/organisationConstants";

export const initialState = {
  requestPending: [],
  permissions: [],
  addresses: [],
  users: [],
  requestsSent: [],
  affilatedPendingReq: [],
  affiliatedOrgs: [],
  list: [],
  countries: [],
  regions: []
};

export const organisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AFFILIATED_PENDING_REQUESTS:
      return { ...state, requestPending: action.payload.data };
    case SET_PERMISSIONS:
      return { ...state, permissions: action.payload.data };
    case SET_ORGANISATION_ADDRESSES:
      return { ...state, addresses: action.payload.data };
    case SET_ORGANISATION_TYPES:
      return { ...state, types: action.payload };
    case SET_ORGANISATION_USERS:
      return { ...state, users: action.payload.data };
    case SET_ORGANISATION_REQ_SENT:
      return {
        ...state,
        requestsSent: action.payload.data,
      };
    case SET_AFFILATED_PENDING_REQ:
      return {
        ...state,
        affilatedPendingReq: action.payload.data,
      };
    case SET_AFFILATED_ORGS:
      return { ...state, affiliatedOrgs: action.payload.data };
    case SET_ORGANISATIONS:
      return { ...state, list: action.payload.data };
    case SET_COUNTRY_TYPES:
      return { ...state, countries: action.payload };
    case SET_REGION_TYPES:
        return { ...state, regions: action.payload };
    case GET_FAILURE:
      return initialState;
    default:
      return state;
  }
};

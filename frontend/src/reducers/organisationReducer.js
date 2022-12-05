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
	SET_ALL_ORGANISATIONS,
	SET_ALL_ORGANISATION_ACTIVE_USERS,
	SET_WAREHOUSE_USERS,
	SET_ORG_ANALYTICS,
	SET_USER_ANALYTICS,
	SET_PENDING_ORGS,
} from "../admin/constants/organisationConstants";

export const initialState = {
  requestPending: [],
  permissions: [],
  addresses: [],
  users: [],
  requestsSent: [],
  affilatedPendingReq: [],
  affiliatedOrgs: [],
  pendingOrgs: [],
  list: [],
  countries: [],
  regions: [],
  allList: [],
  activeUsers: [],
  warehouseUsers: [],
  orgAnalytics: {},
  userAnalytics: {},
};

export const organisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AFFILIATED_PENDING_REQUESTS:
      return { ...state, requestPending: action.payload.data };
    case SET_PERMISSIONS:
      return { ...state, permissions: action.payload.data };
    case SET_ORGANISATION_ADDRESSES:
      return { ...state, addresses: action.payload.data };
    case SET_ORG_ANALYTICS:
        return { ...state, orgAnalytics: action.payload.data };
    case SET_USER_ANALYTICS:
          return { ...state, userAnalytics: action.payload.data };
    case SET_ORGANISATION_TYPES:
      return { ...state, types: action.payload };
    case SET_ORGANISATION_USERS:
      return { ...state, users: action.payload.data };
    case SET_WAREHOUSE_USERS:
        return { ...state, warehouseUsers: action.payload.data };
    case SET_ALL_ORGANISATION_ACTIVE_USERS:
        return { ...state, activeUsers: action.payload.data };
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
    case SET_PENDING_ORGS:
      return { ...state, pendingOrgs: action.payload.data };
    case SET_ORGANISATIONS:
      return { ...state, list: action.payload.data };
    case SET_ALL_ORGANISATIONS:
      return { ...state, allList: action.payload.data };
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

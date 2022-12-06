import axios from "axios";

import { config } from "../../config";
import {
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
	SET_ORG_ANALYTICS,
	SET_USER_ANALYTICS,
	SET_WAREHOUSE_USERS,
	SET_PENDING_ORGS,
} from "../constants/organisationConstants";
import { turnOn, turnOff } from "./spinnerActions";

export const getOrgTypeiIdsUrl = async (data) => {
	try {
		const result = await axios.get(config().getOrgTypeiIdsUrl + data);
		return result.data;
	} catch (e) {
		return [];
	}
};

export const updateOrgTypesUrl = async (data) => {
	try {
		//console.log(data,"------------");
		const id = "CONF000";
		const result = await axios.put(`${config().updateOrgTypesUrl}?id=${id}`, data);
		// console.log(result,"+++++++++++++");
		return result;
	} catch (e) {
		return e.response;
	}
};

export const addNewOrgTypesUrl = async (data) => {
	try {
		const id = "CONF000";
		const result = await axios.post(`${config().addNewOrgTypesUrl}?id=${id}`, data);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const getRequestsPending = (skip = 0, limit = 5) => {
	return async (dispatch) => {
		try {
			dispatch(turnOn());
			const result = await axios.get(`${config().getApprovalsUrl}?skip=${skip}&limit=${limit}`);
			dispatch({
				type: SET_AFFILIATED_PENDING_REQUESTS,
				payload: result.data,
			});
			dispatch(turnOff());
			console.log(result.data);
			return result.data.data.length;
		} catch (err) {
			dispatch(turnOff());
			throw Error(err.message);
		}
	};
};

export const getAllPermissions = async () => {
	try {
		const result = await axios.get(`${config().getPermissionsUrl}?new_role=${true}`);
		return result.data.data;
	} catch (e) {
		throw Error(e.message);
	}
};

export const getPermissions = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getPermissionsUrl);
			dispatch({
				type: SET_PERMISSIONS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getWareHouses = (params) => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getWareHousesUrl + (params ? `?${params}` : ""));
			dispatch({
				type: SET_ORGANISATION_ADDRESSES,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const fetchWarehousesByOrgId = async (orgId) => {
	try {
		const result = await axios.get(`${config().fetchWarehousesByOrgId}?orgId=${orgId}`);
		return result;
	} catch (e) {
		throw Error(e.message);
	}
};

export const getAllOrganisations = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getAllOrgUrl);
			dispatch({
				type: SET_ALL_ORGANISATIONS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getOrgDetails = async (orgId) => {
	try {
		const result = await axios.get(`${config().getOrgDetails}?orgId=${orgId}`);
		return result;
	} catch (err) {
		return err.response;
	}
};

export const activateOrgUser = async (data) => {
	try {
		const result = await axios.get(
			`${config().activateOrgUserUrl}?id=${data.id}&role=${data.role}`,
		);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const updateOrg = async (data) => {
	try {
		const result = await axios.post(config().updateOrgUrl, data);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const addOrgsFromExcel = async (data) => {
	try {
		const url = config().addOrgsFromExcel;
		const result = await axios.post(url, data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return result;
	} catch (e) {
		return e.response;
	}
};

export const deactivateOrgUser = async (data) => {
	try {
		const result = await axios.get(`${config().deactivateOrgUserUrl}?id=${data.id}`);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const verifyOrgUser = async (data) => {
	try {
		const result = await axios.get(
			`${config().verifyOrgUserUrl}?id=${data.id}&role=${data.role}&warehouseId=${data.warehouse}`,
		);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const rejectOrgUser = async (data) => {
	try {
		const result = await axios.get(`${config().rejectOrgUserUrl}?id=${data.id}`);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const unaffiliateUser = async (data) => {
	try {
		const result = await axios.get(`${config().unaffiliateUserUrl}?id=${data.id}`);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const unaffiliateOrg = async (data) => {
	try {
		const result = await axios.post(config().unaffiliateOrgUrl, data);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const acceptAffiliate = async (data) => {
	try {
		const result = await axios.get(`${config().acceptAffiliateUrl}?employee_id=${data.id}`);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const rejectAffiliate = async (data) => {
	try {
		const result = await axios.get(`${config().rejectAffiliateUrl}?employee_id=${data.id}`);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const addAffiliate = async (data) => {
	try {
		const result = await axios.post(config().addAffiliateUrl, data);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const getRecentReqSent = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().recentRequestsSentUrl);
			dispatch({
				type: SET_ORGANISATION_REQ_SENT,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getOrgUsers = (params) => {
	return async (dispatch) => {
		try {
			dispatch(turnOn());
			const url = params ? `${config().getOrgUsersUrl}?${params}` : config().getOrgUsersUrl;
			const result = await axios.get(url);
			dispatch({
				type: SET_ORGANISATION_USERS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data;
		} catch (e) {
			console.log(e.message);
		}
	};
};

export const getWarehouseUsers = (params) => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const url = params ? `${config().getWarehouseUsers}?${params}` : config().getWarehouseUsers;
			const result = await axios.get(url);
			dispatch({
				type: SET_WAREHOUSE_USERS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getWarehouseAndUsersById = async (warehouseId) => {
	try {
		const result = await axios.get(
			`${config().getWarehouseAndUsersById}?warehouseId=${warehouseId}`,
		);
		return result;
	} catch (err) {
		throw err;
	}
};

export const getOrgs = (params) => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const url = params ? `${config().getOrgUrl}?${params}` : config().getOrgUrl;
			const result = await axios.get(url);
			dispatch({
				type: SET_ORGANISATIONS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getOrgAnalytics = () => {
	return async (dispatch) => {
		try {
			dispatch(turnOn());
			const url = config().getOrgAnalytics;
			const result = await axios.get(url);
			dispatch({
				type: SET_ORG_ANALYTICS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data;
		} catch (err) {
			console.log(err);
		}
	};
};

export const getOrgUserAnalytics = (organisationId) => {
	return async (dispatch) => {
		try {
			dispatch(turnOn());
			const url = config().getOrgUserAnalytics + `?orgId=${organisationId}`;
			const result = await axios.get(url);
			dispatch({
				type: SET_USER_ANALYTICS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data;
		} catch (err) {
			console.log(err);
		}
	};
};

export const getTypes = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getOrgTypesUrl);
			dispatch({
				type: SET_ORGANISATION_TYPES,
				payload: result.data.data[0].organisationTypes,
			});
			dispatch(turnOff());
			return result.data.data[0].organisationTypes;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getCountryData = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getCountryDataUrl);
			dispatch({
				type: SET_COUNTRY_TYPES,
				payload: result.data.data[0],
			});
			dispatch(turnOff());
			return result.data.data[0];
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getRegionData = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			/**this should be replaced with a actual request */
			// const result = await axios.get(config().getRegionDataUrl);
			const result = [
				{
					key: 0,
					value: "Antarctica",
				},
				{
					key: 1,
					value: "Americas",
				},
				{
					key: 2,
					value: "Oceania",
				},
				{
					key: 3,
					value: "Europe",
				},
				{
					key: 4,
					value: "Asia",
				},
				{
					key: 5,
					value: "Africa",
				},
			];
			dispatch({
				type: SET_REGION_TYPES,
				payload: result,
			});
			dispatch(turnOff());
			return result;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getOrgActiveUsers = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getOrgActiveUsers);
			dispatch({
				type: SET_ALL_ORGANISATION_ACTIVE_USERS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getAffilatedPendingReq = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().pendingAffiliatedReqUrl);
			dispatch({
				type: SET_AFFILATED_PENDING_REQ,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const getAffilatedOrgs = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().affiliatedOrgUrl);
			dispatch({
				type: SET_AFFILATED_ORGS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result.data.data.length;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

export const addOrgUser = async (data) => {
	try {
		const result = await axios.post(config().addOrgUserUrl, data);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const updateUserRole = async (data) => {
	try {
		const result = await axios.get(
			`${config().updateUserRole}?userId=${data.userId}&role=${data.role}`,
		);
		return result;
	} catch (err) {
		return err.response;
	}
};

export const getLocationApproval = async () => {
	try {
		const result = await axios.get(config().getLocationApprovalUrl);
		return result.data;
	} catch (e) {
		return e.response;
	}
};

export const addAddress = async (data) => {
	try {
		const reqData = {
			title: data.title,
			organisationId: data.organisationId,
			// postalAddress: [
			//   data.flatno,
			//   data.area,
			//   data.landmark,
			//   data.town,
			//   data.state,
			//   data.country,
			// ].join(", "),
			warehouseAddress: {
				firstLine: data.area,
				secondLine: "",
				city: data.town,
				state: data.state,
				country: data.country,
				landmark: data.landmark,
				zipCode: data.pincode,
			},
			status: "ACTIVE",
			country: {
				countryId: "001",
				countryName: data.country,
			},
			region: {
				regionId: "reg123",
				regionName: "Earth Prime",
			},
			location: {
				longitude: data?.positions?.length ? data?.positions?.coords.longitude : "12.12323453534",
				latitude: data?.positions?.length ? data?.positions?.coords.latitude : "13.123435345435",
				geohash: "1231nejf923453",
			},
			supervisors: [],
			employeess: [],
		};

		const result = await axios.post(
			data.id
				? config().updateOrgAddressrUrl + "?warehouseId=" + data.id
				: config().addOrgAddressrUrl,
			data.id ? { WarehouseAddress: reqData } : reqData,
		);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const getLatLongByCity = async (param) => {
	try {
		const result = await axios.get(
			`https://geocode.search.hereapi.com/v1/geocode?q=${param}&apiKey=BCRdhsq4jB8NxBG7vTWpVbNxCb6b50j98_f_bwiy7Qw`,
		);
		console.log(result);

		return result.length > 0 ? result.items[0].Location.Address : {};
	} catch (e) {
		return e.response;
	}
};

export const getAddressByLatLong = async (data) => {
	const { latitude, longitude } = data.coords;
	try {
		const result = await axios.get(
			`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${latitude},${longitude}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=BCRdhsq4jB8NxBG7vTWpVbNxCb6b50j98_f_bwiy7Qw`,
		);
		return result.length > 0 ? result.Response.View.Result[0].Location.Address : {};
	} catch (e) {
		return e.response;
	}
};

export const addAddressesFromExcel = async (data) => {
	try {
		const url = config().addAddressesFromExcelUrl;
		const result = await axios.post(url, data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return result;
	} catch (e) {
		return e.response;
	}
};

export const modifyLocation = async (data) => {
	try {
		const result = await axios.post(config().modifyLocationUrl, data);
		return result;
	} catch (e) {
		return e.response;
	}
};

export const fetchAllRegions = async () => {
	try {
		const result = await axios.get(config().fetchAllRegions);
		return result.data;
	} catch (e) {
		return [];
	}
};

export const fetchCountriesByRegion = async (id) => {
	try {
		const result = await axios.get(config().fetchCountriesByRegion + id);
		return result.data;
	} catch (e) {
		return [];
	}
};
export const fetchStateByCountry = async (id) => {
	try {
		const result = await axios.get(config().fetchStateByCountry + id);
		return result.data;
	} catch (e) {
		return [];
	}
};
export const fetchCitiesByState = async (id) => {
	try {
		const result = await axios.get(config().fetchCitiesByState + id);
		return result.data;
	} catch (e) {
		return [];
	}
};

export const getAllRoles = async () => {
	try {
		const result = await axios.get(config().fetchAllRoles);
		return result.data.data;
	} catch (error) {
		return [];
	}
};

export const getPermissionByRoleAndOrg = async (role, orgId) => {
	try {
		const result = await axios.get(
			`${config().fetchPermissionsByRole}?role=${role}&orgId=${orgId}`,
		);
		return result.data.data;
	} catch (error) {
		return [];
	}
};

export const updatePermissionsByRole = async (data) => {
	try {
		console.log("url:", config().updatePermissions);
		const result = await axios.post(`${config().updatePermissions}`, data);
		return result.data.data;
	} catch (e) {
		return [];
	}
};

export const getAllRolesForTPL = async (organisationId) => {
	try {
		const result = await axios.get(`${config().fetchTPLRoles}/${organisationId}`);
		return result.data.data;
	} catch (error) {
		return [];
	}
};

export const getPendingOrgs = () => {
	try {
		return async (dispatch) => {
			dispatch(turnOn());
			const result = await axios.get(config().getPendingOrgs);
			dispatch({
				type: SET_PENDING_ORGS,
				payload: result.data,
			});
			dispatch(turnOff());
			return result;
		};
	} catch (e) {
		throw Error(e.message);
	}
};

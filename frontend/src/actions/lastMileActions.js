import axios from "axios";
import { config } from "../config";

export const fetchBatch = async (data) => {
	try {
		const result = await axios.post(`${config().fetchBatchDetails}`, data);
		return result;
	} catch (err) {
		throw err;
	}
};

export const getAllVaccinationDetails = async (data) => {
	try {
		const result = await axios.post(`${config().getAllVaccinationDetails}`, data);
		return result;
	} catch (err) {
		throw err;
	}
};

export const vaccinateIndividual = async (data) => {
	try {
		const result = await axios.post(`${config().vaccinateIndividual}`, data);
		return result;
	} catch (err) {
		throw err;
	}
};

export const fetchAnalytics = async () => {
	try {
		const result = await axios.get(`${config().getVaccineAnalytics}`);
		return result;
	} catch (err) {
		throw err;
	}
};

export const getVaccinationDetailsByVial = async (vaccineVialId) => {
	try {
		const result = await axios.get(
			`${config().getVaccinationDetailsByVial}?vaccineVialId=${vaccineVialId}`,
		);
		return result;
	} catch (err) {
		throw err;
	}
};

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	fetchAllRegions,
	fetchCitiesByState,
	fetchCountriesByRegion,
	fetchStateByCountry,
	fetchUnregisteredOrganisations,
} from "../../../actions/productActions";
import { createFilterOptions } from "@material-ui/lab";

const filter = createFilterOptions();

export default function Organization(props) {
	const { t } = useTranslation();

	const [allRegions, setAllRegions] = useState([]);
	const [allCountries, setAllCountries] = useState([]);
	const [allStates, setAllStates] = useState([]);
	const [allCities, setAllCities] = useState([]);
	const [unregisteredOrganisations, setUnregisteredOrganisations] = useState([]);

	useEffect(() => {
		async function getAllRegions() {
			let regions = await fetchAllRegions();
			setAllRegions(regions.data);
		}
		getAllRegions();

		async function fetchUnregisteredOrgs() {
			let arr = await fetchUnregisteredOrganisations();
			let temp = arr.data.map((elem) => elem.name);
			setUnregisteredOrganisations(temp);
		}
	}, []);

	async function getAllCountries(region) {
		let countries = await fetchCountriesByRegion(region);
		setAllCountries(countries.data);
	}

	async function getAllStates(country) {
		console.log(country)
		let states = await fetchStateByCountry(country.id);
		setAllStates(states.data);
	}

	async function getAllCities(state) {
		let cities = await fetchCitiesByState(state.id);
		setAllCities(cities.data);
	}

	const {
		watch,
		control,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm({
		organizationName: "",
		region: "",
		country: "",
		city: "",
		pincode: "",
		address: "",
	});

	const onSubmit = (data) => {
		props.onUserDataSubmit(data, true);
	};

	return (
		<section className="account-section">
			<div className="vl-connection-container">
				<form onSubmit={handleSubmit(onSubmit)} className="account-form-container">
					<hgroup className="form-headers">
						<h1 className="vl-heading f-700 vl-black">Register your Organization</h1>
						<h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm">
							Almost there, Please provide the below details to regsiter your organization with us
						</h2>
					</hgroup>
					<section className="vl-input-group form-auto-fill-section">
						<div className="input-single-column">
							<Controller
								name="organizationName"
								control={control}
								render={({ field }) => (
									<Autocomplete
										fullWidth
										freeSolo={true}
										options={unregisteredOrganisations}
										getOptionLabel={(option) => option || ""}
										{...field}
										onChange={(event, value) => {
											field.onChange(value);
										}}
										filterOptions={(options, params) => {
											const filtered = filter(options, params);
											const { inputValue } = params;
											const isExisting = options.some((option) => inputValue === option);
											if (inputValue !== "" || !isExisting) {
												filtered.push(inputValue);
											}
											return filtered;
										}}
										renderInput={(params) => <TextField {...params} label="Organization Name" />}
									/>
								)}
							/>
						</div>
						<div className="input-two-column">
							<Controller
								name="region"
								control={control}
								render={({ field }) => (
									<Autocomplete
										fullWidth
										options={allRegions}
										getOptionLabel={(option) => option || ""}
										{...field}
										onChange={(event, value) => {
											field.onChange(value);
											getAllCountries(value);
											setValue("country", "");
											setValue("state", "");
											setValue("city", "");
											setValue("address", "");
										}}
										renderInput={(params) => <TextField {...params} label="Region" />}
									/>
								)}
							/>
							<Controller
								name="country"
								control={control}
								render={({ field }) => (
									<Autocomplete
										fullWidth
										options={allCountries}
										getOptionLabel={(option) => option.name || ""}
										{...field}
										onChange={(event, value) => {
											field.onChange(value);
											getAllStates(value);
											setValue("state", "");
											setValue("city", "");
											setValue("address", "");
										}}
										renderInput={(params) => <TextField {...params} label="Country" />}
									/>
								)}
							/>
						</div>
						<div className="input-two-column">
							<Controller
								name="state"
								control={control}
								render={({ field }) => (
									<Autocomplete
										fullWidth
										options={allStates}
										getOptionLabel={(option) => option.name || ""}
										{...field}
										onChange={(event, value) => {
											field.onChange(value);
											getAllCities(value);
											setValue("city", "");
											setValue("address", "");
										}}
										renderInput={(params) => <TextField {...params} label="State" />}
									/>
								)}
							/>
							<Controller
								name="city"
								control={control}
								render={({ field }) => (
									<Autocomplete
										fullWidth
										options={allCities}
										getOptionLabel={(option) => option.name || ""}
										{...field}
										onChange={(event, value) => {
											field.onChange(value);
											setValue("address", "");
										}}
										renderInput={(params) => <TextField {...params} label="City" />}
									/>
								)}
							/>
						</div>
						<div className="input-two-column">
							<Controller
								name="pincode"
								control={control}
								render={({ field }) => (
									<TextField fullWidth variant="outlined" label="Pincode" {...field} required />
								)}
							/>
						</div>
						<div className="input-single-column">
							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<TextField
										fullWidth
										variant="outlined"
										label="Address"
										multiline
										{...field}
										required
									/>
								)}
							/>
						</div>
						{/* <section className="terms-condition">
							<div className="verify-terms-card">
								<Checkbox />
								<h2 className="vl-subheading f-400 vl-grey-xs">
									By checking this your are agree to the{" "}
									<span className="vl-blue">Terms & conditions</span> of
									<span className="vl-blue"> Vaccineledger</span>
								</h2>
							</div>
						</section> */}
					</section>
					<section className="call-full-btn-action">
						<button type="submit" className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
							Register
						</button>
					</section>
				</form>
			</div>
		</section>
	);
}

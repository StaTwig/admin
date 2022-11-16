import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { COUNTRY_CODE } from "../../../constants/countryCode";
import "./AddUsers.css";
import {
	fetchAllRegions,
	fetchCitiesByState,
	fetchCountriesByRegion,
	fetchStateByCountry,
} from "../../actions/organisationActions";

export default function AddUsers(props) {
	const { addresses, onSuccess, defaultRoles, handleClose } = props;

	const [allRegions, setAllRegions] = useState([]);
	const [allCountries, setAllCountries] = useState([]);
	const [allStates, setAllStates] = useState([]);
	const [allCities, setAllCities] = useState([]);

	useEffect(() => {
		async function getAllRegions() {
			let regions = await fetchAllRegions();
			setAllRegions(regions.data);
		}
		getAllRegions();
	}, []);

	async function getAllCountries(region) {
		let countries = await fetchCountriesByRegion(region);
		setAllCountries(countries.data);
	}

	async function getAllStates(country) {
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
		defaultValues: {
			firstName: "",
			lastName: "",
			emailId: "",
			phoneNumber: "",
			role: "",
			warehouseExists: "existing",
			warehouse: null,
			warehouseTitle: "",
			// region: "",
			// country: "",
			// state: "",
			// city: "",
			// pincode: "",
			// address: "",
		},
	});

	const watchEmail = watch("emailId");
	const watchPhone = watch("phoneNumber");
	const warehouseExists = watch("warehouseExists");

	console.log(watch())

	useEffect(() => {
		if (warehouseExists === "new") {
			setValue("warehouse", null);
		}
	}, [warehouseExists]);

	const addUser = (values) => {
		const reqData = {
			firstName: values.firstName,
			lastName: values.lastName,
			emailId: values.emailId,
			phoneNumber: values.phoneNumber,
			warehouseExists: values.warehouseExists,
			role: values.role,
			warehouseId: values.warehouse?.id,
			warehouseTitle: values.warehouseTitle,
			address: {
				line1: values.address,
				pincode: values.pincode,
				city: values.city,
				state: values.state,
				country: values.country,
				region: values.region,
			},
		};

		onSuccess(reqData);
	};

	return (
		<div className="addOrganization-container">
			<form onSubmit={handleSubmit(addUser)}>
				<div className="addorganization-header">
					<p className="vl-subheading f-500 vl-blue">Add Users</p>
					<i className="fa-solid fa-xmark" onClick={handleClose}></i>
				</div>
				<div className="addorganization-body">
					<div className="input-set">
						<p className="vl-body f-500 vl-black">Personal detail</p>
						<div className="input-two-column-space">
							<Controller
								name="firstName"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										fullWidth
										variant="outlined"
										label="First Name"
										{...field}
										error={Boolean(errors.firstName)}
										helperText={errors.firstName && "First Name is required!"}
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										fullWidth
										variant="outlined"
										label="Last Name"
										{...field}
										error={Boolean(errors.lastName)}
										helperText={errors.lastName && "Last Name is required!"}
									/>
								)}
							/>
						</div>
						<div className="input-two-column-space">
							<Controller
								name="emailId"
								control={control}
								rules={{ required: watchPhone ? false : true }}
								render={({ field }) => (
									<TextField
										fullWidth
										variant="outlined"
										label="Email Address"
										{...field}
										inputProps={{ style: { textAlign: "left" } }}
										error={Boolean(errors.emailId)}
										helperText={errors.emailId && "Email ID is required!"}
									/>
								)}
							/>
							<Controller
								name="phone"
								control={control}
								rules={{ required: watchEmail ? false : true }}
								render={({ field }) => (
									<PhoneInput
										international
										countryCallingCodeEditable={false}
										defaultCountry={COUNTRY_CODE}
										className="vl-custom-phone-input-2"
										{...field}
										maxLength={15}
										style={{
											borderColor: Boolean(errors.phone) ? "#da323c" : "",
										}}
									/>
								)}
							/>
							{errors.phone?.type === "custom" ? (
								<span className="error-msg text-dangerS">{errors.phone?.message}</span>
							) : null}
						</div>
					</div>
					<div className="input-set">
						<div className="radio-btn-group">
							<FormControl>
								<Controller
									name="warehouseExists"
									control={control}
									render={({ field }) => (
										<RadioGroup
											row
											aria-labelledby="demo-radio-buttons-group-label"
											defaultValue="female"
											name="radio-buttons-group"
											{...field}
										>
											<div className="vl-radio-btn vl-align-center">
												<Radio value={"existing"} inputProps={{ "aria-label": "A" }} />
												<p className="vl-body f-400 vl-grey-md vl-line-sm">Existing Warehouse</p>
											</div>
											<div className="vl-radio-btn vl-align-center">
												<Radio value={"new"} inputProps={{ "aria-label": "B" }} />
												<p className="vl-body f-400 vl-grey-md vl-line-sm">New Warehouse</p>
											</div>
										</RadioGroup>
									)}
								/>
							</FormControl>
						</div>
					</div>

					<div className="input-set">
						{warehouseExists === "existing" ? (
							<>
								<p className="vl-body f-500 vl-black">Location details</p>
								<div className="input-two-column-space">
									<Controller
										name="role"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												id="combo-box-demo"
												options={defaultRoles}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Assign Role"
														error={Boolean(errors.role)}
														helperText={errors.role && "Role is required!"}
													/>
												)}
												{...field}
												onChange={(event, value) => {
													field.onChange(value);
												}}
											/>
										)}
									/>
									<Controller
										name="warehouse"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												id="combo-box-demo"
												options={addresses}
												getOptionLabel={(option) => (option.title ? option.title : "")}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Assign Warehouse"
														error={Boolean(errors.warehouse)}
														helperText={errors.warehouse && "Warehouse is required!"}
													/>
												)}
												{...field}
												onChange={(event, value) => {
													field.onChange(value);
												}}
											/>
										)}
									/>
								</div>
							</>
						) : (
							<>
								<p className="vl-body f-500 vl-black">Warehouse details</p>
								<div className="input-two-column-space">
								<Controller
										name="role"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												id="combo-box-demo"
												options={defaultRoles}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Assign Role"
														error={Boolean(errors.role)}
														helperText={errors.role && "Role is required!"}
													/>
												)}
												{...field}
												onChange={(event, value) => {
													field.onChange(value);
												}}
											/>
										)}
									/>
									<Controller
										name="warehouseTitle"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<TextField
												fullWidth
												variant="outlined"
												label="Warehouse Title"
												{...field}
												error={Boolean(errors.warehouseTitle)}
												helperText={errors.warehouseTitle && "Warehouse Title is required!"}
											/>
										)}
									/>
								</div>
								<div className="input-two-column-space">
									<Controller
										name="region"
										control={control}
										rules={{ required: true }}
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
												renderInput={(params) => (
													<TextField
														{...params}
														label="Region"
														error={Boolean(errors.region)}
														helperText={errors.region && "Region is required!"}
													/>
												)}
											/>
										)}
									/>
									<Controller
										name="country"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												options={allCountries}
												getOptionLabel={(option) => option.name || ""}
												{...field}
												onChange={(event, value) => {
													field.onChange(value.name);
													getAllStates(value);
													setValue("state", "");
													setValue("city", "");
													setValue("address", "");
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Country"
														error={Boolean(errors.country)}
														helperText={errors.country && "Country is required!"}
													/>
												)}
											/>
										)}
									/>
								</div>
								<div className="input-two-column-space">
									<Controller
										name="state"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												options={allStates}
												getOptionLabel={(option) => option.name || ""}
												{...field}
												onChange={(event, value) => {
													field.onChange(value.name);
													getAllCities(value);
													setValue("city", "");
													setValue("address", "");
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														label="State"
														error={Boolean(errors.state)}
														helperText={errors.state && "State is required!"}
													/>
												)}
											/>
										)}
									/>
									<Controller
										name="city"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												options={allCities}
												getOptionLabel={(option) => option.name || ""}
												{...field}
												onChange={(event, value) => {
													field.onChange(value.name);
													setValue("address", "");
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														label="City"
														error={Boolean(errors.city)}
														helperText={errors.city && "City is required!"}
													/>
												)}
											/>
										)}
									/>
								</div>
								<div className="input-add-column-space">
									<Controller
										name="pincode"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<TextField
												type="number"
												fullWidth
												variant="outlined"
												label="Pincode"
												{...field}
												error={Boolean(errors.pincode)}
												helperText={errors.pincode && "Pincode is required!"}
											/>
										)}
									/>
									<Controller
										name="address"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<TextField
												fullWidth
												variant="outlined"
												label="Address"
												multiline
												{...field}
												error={Boolean(errors.address)}
												helperText={errors.address && "Address is required!"}
											/>
										)}
									/>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="addorganization-actions">
					<button className="vl-btn vl-btn-sm vl-btn-primary">Register</button>
				</div>
			</form>
		</div>
	);
}

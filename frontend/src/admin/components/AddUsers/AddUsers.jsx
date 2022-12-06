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
import { isValidPhoneNumber } from "react-phone-number-input";
import { verifyEmailAndPhoneNo } from "../../../actions/userActions";

export default function AddUsers(props) {
	const { addresses, onSuccess, defaultRoles, handleClose, t } = props;

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

		async function getCountriesForAmericas() {
			let countries = await fetchCountriesByRegion("Americas");
			setAllCountries(countries.data);
			const costarica = countries.data.filter((country) => country.name === "Costa Rica");
			let states = await fetchStateByCountry(costarica[0].id);
			setAllStates(states.data);
		}
		getCountriesForAmericas();
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
		setError,
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
			region: "Americas",
			country: "Costa Rica",
			// state: "",
			// city: "",
			// pincode: "",
			// address: "",
		},
	});

	const watchEmail = watch("emailId");
	const watchPhone = watch("phoneNumber");
	const warehouseExists = watch("warehouseExists");

	useEffect(() => {
		if (warehouseExists === "new") {
			setValue("warehouse", null);
		}
	}, [warehouseExists]);

	const validateEmailPhone = () => {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return new Promise((resolve, reject) => {
			try {
				let data;
				let type;

				if (watchEmail) {
					data = "emailId=" + watchEmail;
					type = "emailId";
					if (watchEmail.match(emailRegex) === null) {
						setError("emailId", {
							type: "custom",
							message: "Email ID is invalid!",
						});
						reject("Invalid email!");
					}
				}

				if (watchPhone) {
					data = "phoneNumber=" + watchPhone;
					type = "phone";
					if (isValidPhoneNumber(watchPhone) === false) {
						setError("phone", {
							type: "custom",
							message: "Phone Number is invalid!",
						});
						reject("Invalid phone!");
					}
				}

				if (data) {
					verifyEmailAndPhoneNo(data).then((res) => {
						if (res.status === 200) {
							resolve("Valid email/phone!");
						} else {
							setError(type, {
								type: "custom",
								message: "Duplicate " + (type === "emailId" ? "Email ID!" : "Phone Number!"),
							});
							reject("Duplicate EmailId/Phone!");
						}
					});
				}
			} catch (err) {
				reject(err);
			}
		});
	};

	const addUser = (values) => {
		validateEmailPhone()
			.then((res) => {
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
			})
			.catch((err) => {
				console.log("Error in validation - ", err);
			});
	};

	return (
		<div className="addOrganization-container">
			<form onSubmit={handleSubmit(addUser)}>
				<div className="addorganization-header">
					<p className="vl-subheading f-500 vl-blue"> {t("add_users")}</p>
					<i className="fa-solid fa-xmark" onClick={handleClose}></i>
				</div>
				<div className="addorganization-body">
					<div className="input-set">
						<p className="vl-body f-500 vl-black">{t("personal_detail")}</p>
						<div className="input-two-column-space">
							<Controller
								name="firstName"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<TextField
										fullWidth
										variant="outlined"
										label={t("first_name")}
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
										label={t("last_name")}
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
										label={t("email_address")}
										{...field}
										inputProps={{ style: { textAlign: "left" } }}
										error={Boolean(errors.emailId)}
										helperText={
											errors.emailId?.type === "required"
												? "Email or Phone is required!"
												: errors.emailId?.message
										}
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
												<p className="vl-body f-400 vl-grey-md vl-line-sm">
													{t("existing")} {t("warehouse")}
												</p>
											</div>
											<div className="vl-radio-btn vl-align-center">
												<Radio value={"new"} inputProps={{ "aria-label": "B" }} />
												<p className="vl-body f-400 vl-grey-md vl-line-sm">
													{t("new")} {t("warehouse")}
												</p>
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
								<p className="vl-body f-500 vl-black">{t("loc_detail")}</p>
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
														label={t("assign_role")}
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
														label={t("assign_warehouse")}
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
								<p className="vl-body f-500 vl-black">{t("warehouse_details")}</p>
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
														label={t("assign_role")}
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
												label={t("warehouse_title")}
												{...field}
												error={Boolean(errors.warehouseTitle)}
												helperText={errors.warehouseTitle && "Warehouse Title is required!"}
											/>
										)}
									/>
								</div>
								{/* <div className="input-two-column-space">
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
								</div> */}
								<div className="input-two-column">
									<TextField
										value="Americas"
										fullWidth
										variant="outlined"
										label={t("region")}
										InputProps={{
											readOnly: true,
										}}
										style={{ textAlign: "left" }}
									/>
									<TextField
										value="Costa Rica"
										fullWidth
										variant="outlined"
										label={t("country")}
										InputProps={{
											readOnly: true,
										}}
										style={{ textAlign: "left" }}
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
														label={t("state")}
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
														label={t("city")}
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
												label={t("pincode")}
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
												label={t("address")}
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
					<button className="vl-btn vl-btn-sm vl-btn-primary">{t("register")}</button>
				</div>
			</form>
		</div>
	);
}

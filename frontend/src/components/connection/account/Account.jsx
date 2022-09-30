import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { useHistory, useLocation } from "react-router";
import PhoneInput from "react-phone-number-input";
import { COUNTRY_CODE } from "../../../constants/countryCode";
import { useForm, Controller } from "react-hook-form";
import { getOrganizationsByType, verifyEmailAndPhoneNo } from "../../../actions/userActions";
import { getOrganisationsAtSignup } from "../../../actions/productActions";
import GoogleAuth from "../../landingpage/showcase/access-form/GoogleAuth";
import TorusAuth from "../../landingpage/showcase/access-form/TorusAuth";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function Account(props) {
	const location = useLocation();
	const [authData, setAuthData] = useState({
		firstName: location?.state?.firstName,
		lastName: location?.state?.lastName,
		emailId: location?.state?.emailId,
	});

	const history = useHistory();

	const [organizations, setOrganizations] = useState([""]);
	const [organisationTypes, setOrganisationTypes] = useState([""]);

	const [errorMessage, setErrorMessage] = useState();

	const {
		watch,
		control,
		setValue,
		setError,
		formState: { errors },
		clearErrors,
		handleSubmit,
	} = useForm({
		defaultValues: {
			firstName: authData?.firstName ? authData?.firstName : "",
			lastName: authData?.lastName ? authData?.lastName : "",
			email: authData?.emailId ? authData?.emailId : "",
			phone: "",
			organizationExists: "existing",
			organizationType: "",
			organization: "",
			skipOrgRegistration: false,
		},
	});

	const skipOrgRegistration = watch("skipOrgRegistration");
	const organizationExists = watch("organizationExists");
	const watchEmail = watch("email");
	const watchPhone = watch("phone");
	const watchOrgType = watch("organizationType");

	useEffect(() => {
		// Get org types
		async function fetchOrgTypes() {
			const orgTypes = await getOrganizationsByType("CONF000");
			const arr = [];
			orgTypes.data[0].organisationTypes.forEach((orgType) => {
				arr.push(orgType.name);
			});
			setOrganisationTypes(arr);
		}
		fetchOrgTypes();
	}, []);

	useEffect(() => {
		if (watchOrgType === "") return;

		async function fetchData(type) {
			const orgs = await getOrganisationsAtSignup(type);
			setOrganizations(orgs);

			let arr = [];
			arr = [...arr, ...orgs];
			setOrganizations(arr);
		}

		if (watchOrgType === "Third Party Logistics") {
			fetchData("TPL");
		} else {
			fetchData("");
		}
	}, [watchOrgType]);

	useEffect(() => {
		if (errors.email && errors.phone) {
			if (watchEmail || watchPhone) {
				clearErrors(["email", "phone"]);
			}
		}
	}, [watchEmail, watchPhone]);

	const onAuthSuccess = (data) => {
		console.log("Auth success - ", data);
		setValue("firstName", data.firstName);
		setValue("lastName", data.lastName);
		setValue("email", data.emailId);
	};

	const onFailure = (data) => {
		console.log("Auth failed - ", data);
	};

	const showOrganizationsByType = (orgType) => {
		let arr = organizations.filter((organization) => organization.type === orgType);
		return arr;
	};

	const validateEmailPhone = () => {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return new Promise((resolve, reject) => {
			try {
				let data;
				let type;

				if (watchEmail) {
					data = "emailId=" + watchEmail;
					type = "email";
					if (watchEmail.match(emailRegex) === null) {
						setError("email", { type: "custom", message: "Email ID is invalid!" });
						setErrorMessage("Email ID is invalid!");
						reject("Invalid email!");
					}
				}

				if (watchPhone) {
					data = "phoneNumber=" + watchPhone;
					type = "phone";
					if (isValidPhoneNumber(watchPhone) === false) {
						setError("phone", { type: "custom", message: "Phone Number is invalid!" });
						setErrorMessage("Phone number is invalid!");
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
								message: "Duplicate " + (type === "email" ? "Email ID!" : "Phone Number!"),
							});
							setErrorMessage("Duplicate EmailId/Phone!");
							reject("Duplicate EmailId/Phone!");
						}
					});
				}
			} catch (err) {
				reject(err);
			}
		});
	};

	const onSubmit = (data) => {
		if (!data.email && !data.phone) {
			console.log("Please enter email or phone!");
		} else {
			validateEmailPhone()
				.then((res) => {
					props.onUserDataSubmit(data, organizationExists === "existing" || skipOrgRegistration);
					if (organizationExists === "new" && !skipOrgRegistration) {
						history.push({
							pathname: "/neworganization",
						});
					}
				})
				.catch((err) => {
					console.log("Error in validation - ", err);
				});
		}
	};

	return (
		<section className="account-section">
			<div className="vl-connection-container">
				<form onSubmit={handleSubmit(onSubmit)} className="account-form-container">
					<hgroup className="form-headers">
						<h1 className="vl-heading f-700 vl-black">Create your Account</h1>
						<h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm">
							Join VaccineLedger to ensure quality and safety of your Vaccines using Blockchain
						</h2>
					</hgroup>
					<section className="vl-input-group form-auto-fill-section">
						<div className="input-two-auto-column">
							<GoogleAuth register={true} onAuthSuccess={onAuthSuccess} onFailure={onFailure} />
							<TorusAuth register={true} onAuthSuccess={onAuthSuccess} onFailure={onFailure} />
						</div>
						<div className="option-divider">
							<div className="divider-bar"></div>
							<p className="vl-subheading vl-grey-xs">OR</p>
							<div className="divider-bar"></div>
						</div>
					</section>

					<section className="vl-input-group form-auto-fill-section">
						<div className="input-two-column">
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
						<div className="input-single-column">
							<Controller
								name="email"
								control={control}
								rules={{ required: watchPhone === "" }}
								render={({ field }) => (
									<TextField
										fullWidth
										variant="outlined"
										label="Email Address"
										{...field}
										error={Boolean(errors.email)}
										helperText={
											errors.email?.type === "required"
												? "Email or Phone is required!"
												: errors.email?.message
										}
									/>
								)}
							/>
						</div>
						<div className="input-single-column">
							<Controller
								name="phone"
								control={control}
								rules={{ required: watchEmail === "" }}
								render={({ field }) => (
									<PhoneInput
										international
										countryCallingCodeEditable={false}
										defaultCountry={COUNTRY_CODE}
										className="vl-custom-phone-input"
										{...field}
										maxLength={15}
										style={{ borderColor: Boolean(errors.phone) ? "#da323c" : "" }}
									/>
								)}
							/>
							{errors.phone?.type === "custom" ? (
								<span className="error-msg text-dangerS">{errors.phone?.message}</span>
							) : null}
						</div>
						<div className="radio-btn-group">
							<FormControl>
								<Controller
									name="organizationExists"
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
												<p className="vl-body f-400 vl-grey-md vl-line-sm">Existing Organization</p>
											</div>
											<div className="vl-radio-btn vl-align-center">
												<Radio value={"new"} inputProps={{ "aria-label": "B" }} />
												<p className="vl-body f-400 vl-grey-md vl-line-sm">New Organization</p>
											</div>
										</RadioGroup>
									)}
								/>
							</FormControl>
						</div>
						{organizationExists === "existing" ? (
							<div className="input-two-column">
								<Controller
									name="organizationType"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Autocomplete
											fullWidth
											options={organisationTypes}
											getOptionLabel={(option) => option || ""}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Organization Type"
													error={Boolean(errors.organizationType)}
													helperText={errors.organizationType && "Organization type is required!"}
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
									name="organization"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Autocomplete
											fullWidth
											options={showOrganizationsByType(watchOrgType)}
											getOptionLabel={(option) => option.name || ""}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Organization Name"
													error={Boolean(errors.organization)}
													helperText={errors.organization && "Organization Name is required!"}
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
						) : (
							<div className="vl-input-groups">
								<div className="input-full-column">
									<Controller
										name="organizationType"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<Autocomplete
												fullWidth
												options={organisationTypes}
												getOptionLabel={(option) => option || ""}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Organization Type"
														error={Boolean(errors.organizationType)}
														helperText={errors.organizationType && "Organization type is required!"}
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
								<div className="verify-terms-card-sm">
									<Controller
										name="skipOrgRegistration"
										control={control}
										render={({ field }) => <Checkbox {...field} />}
									/>
									<h2 className="vl-subheading f-400 vl-grey-xs">
										Skip the Organization Registration
									</h2>
								</div>
							</div>
						)}
					</section>
					<section
						className={`call-by-action ${organizationExists === "existing" && "top-space"} `}
					>
						<button type="submit" className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
							Continue
						</button>
					</section>
				</form>
			</div>
		</section>
	);
}

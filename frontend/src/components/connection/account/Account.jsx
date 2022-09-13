import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import GoogleIcon from "../../../assets/files/images/social/google.png";
import TorusIcon from "../../../assets/files/images/social/torus.png";
import { useHistory, useLocation } from "react-router";
import PhoneInput from "react-phone-number-input";
import { COUNTRY_CODE } from "../../../constants/countryCode";
import { useForm, Controller } from "react-hook-form";
import { getOrganizationsByType } from "../../../actions/userActions";
import { getOrganisationsAtSignup } from "../../../actions/productActions";
import { useTranslation } from "react-i18next";
import GoogleAuth from "../../landingpage/showcase/access-form/GoogleAuth";

export default function Account(props) {
	const location = useLocation();
	const [googleData, setGoogleData] = useState();
	if (location?.state?.tokenId) {
		setGoogleData(location.state.profileObj);
	}
	const history = useHistory();
	const { t } = useTranslation();

	const [organizations, setOrganizations] = useState([""]);
	const [organisationTypes, setOrganisationTypes] = useState([""]);

	const {
		watch,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			firstName: googleData?.givenName,
			lastName: googleData?.familyName,
			email: googleData?.email,
			phone: "",
			organizationExists: "existing",
			organizationType: "",
			organization: "",
		},
	});

	const organizationExists = watch("organizationExists");
	const watchPhone = watch("phone");
	const watchOrgType = watch("organizationType");

	const onSubmit = (data) => {
		if (!data.email && !data.phone) {
			console.log("Please enter email or phone!");
		} else {
			props.onUserDataSubmit(data, organizationExists === "existing");

			if (organizationExists === "new") {
				history.push({
					pathname: "/neworganization",
				});
			}
		}
	};

	const showOrganizationsByType = (orgType) => {
		let arr = organizations.filter((organization) => organization.type === orgType);
		return arr;
	};

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
							{/* <GoogleAuth register={true} googleData={googleData} setGoogleData={setGoogleData} /> */}
							<div className="login-button-card">
								<div className="icon-space">
									<img src={GoogleIcon} alt="social" />
								</div>
								<p className="vl-subheading f-500 no-space">Sign Up with Google</p>
							</div>
							<div
								className="login-button-card"
								onClick={() => {
									history.push("/neworganization");
								}}
							>
								<div className="icon-space">
									<img src={TorusIcon} alt="social" />
								</div>
								<p className="vl-subheading f-500 no-space">Sign Up with Wallet ID</p>
							</div>
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
										helperText={errors.email && "Email or Phone is required!"}
									/>
								)}
							/>
						</div>
						<div className="input-single-column">
							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<PhoneInput
										international
										countryCallingCodeEditable={false}
										defaultCountry={COUNTRY_CODE}
										className="vl-custom-phone-input"
										{...field}
										maxLength={15}
									/>
								)}
							/>
							{/* <TextField
                fullWidth
                variant="outlined"
                label="Phone Number ( Optional )"
              /> */}
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
								{/* <div className="verify-terms-card-sm">
									<Checkbox />
									<h2 className="vl-subheading f-400 vl-grey-xs">
										Skip the Organization Registration
									</h2>
								</div> */}
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

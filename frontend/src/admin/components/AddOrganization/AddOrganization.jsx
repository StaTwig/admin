import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getOrganizationsByType } from "../../../actions/userActions";
import {
  fetchAllRegions,
  fetchCitiesByState,
  fetchCountriesByRegion,
  fetchStateByCountry,
} from "../../actions/organisationActions";
import PhoneInput from "react-phone-number-input";
import { COUNTRY_CODE } from "../../../constants/countryCode";
import "./AddOrganization.css";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import { addNewOrganisation } from "../../actions/userActions";
import Modal from "../../../shared/modal";
import SuccessPopup from "../../shared/Popup/SuccessPopup";

export default function AddOrganization({ handleClose }) {
  const dispatch = useDispatch();

  const [allRegions, setAllRegions] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [organisationTypes, setOrganisationTypes] = useState([""]);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [openFailurePopup, setOpenFailurePopup] = useState(false);

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

    async function getAllRegions() {
      let regions = await fetchAllRegions();
      setAllRegions(regions.data);
    }
    getAllRegions();

    async function getCountriesForAmericas() {
      let countries = await fetchCountriesByRegion("Americas");
      setAllCountries(countries.data);
      const costarica = countries.data.filter(
        (country) => country.name === "Costa Rica"
      );
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
    console.log(country);
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organizationType: "",
    organizationName: "",
    region: "Americas",
    country: "Costa Rica",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const watchEmail = watch("email");
  const watchPhone = watch("phone");
  const watchOrgType = watch("organizationType");
  const watchOrgName = watch("organizationName");

  const onSubmit = async (values) => {
    try {
      dispatch(turnOn());
      let payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: values.email,
        phoneNumber: values.phone,
        organisationName: values.organizationName,
        type: values.organizationType,
        address: {
          line1: values.address,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
          region: values.region,
        },
      };

      const result = await addNewOrganisation(payload);
      if (result.status === 200) {
        console.log("Organisation added successfully!");
        setOpenSuccessPopup(true);
      } else {
        console.log("Error - ", result.data);
        setOpenFailurePopup(true);
      }
      dispatch(turnOff());
    } catch (err) {
      console.log(err);
      setOpenFailurePopup(true);
      dispatch(turnOff());
    }
  };

  const closeModal = () => {
    if (openSuccessPopup) {
      setOpenSuccessPopup(false);
      handleClose();
    }
    setOpenFailurePopup(false);
  };

  return (
    <div className="addOrganization-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="addorganization-header">
          <p className="vl-subheading f-500 vl-blue">Add Organization</p>
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
                    style={{
                      borderColor: Boolean(errors.phone) ? "#da323c" : "",
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="input-set">
            <p className="vl-body f-500 vl-black">Organization details</p>
            <div className="input-two-column-space">
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
                        helperText={
                          errors.organizationType &&
                          "Organization type is required!"
                        }
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
                name="organizationName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Organisation Name"
                    {...field}
                    error={Boolean(errors.organizationName)}
                    helperText={
                      errors.organizationName &&
                      "Organisation Name is required!"
                    }
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
                label={"Region"}
                InputProps={{
                  readOnly: true,
                }}
                style={{ textAlign: "left" }}
              />
              <TextField
                value="Costa Rica"
                fullWidth
                variant="outlined"
                label={"Country"}
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
            <div className="input-two-column-space">
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
            </div>

            <div className="input-single-column-space">
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
          </div>
        </div>
        <div className="addorganization-actions">
          <button className="vl-btn vl-btn-sm vl-btn-primary">Register</button>
        </div>
      </form>
      {openSuccessPopup && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal}
            successMessage="Organisation added succesfully"
            // errorMessage="Put the Error Message Here"
          />
        </Modal>
      )}
      {openFailurePopup && (
        <Modal
          close={() => closeModal()}
          size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
        >
          <SuccessPopup
            onHide={closeModal}
            // successMessage="Product added succesfully"
            errorMessage="Unable to Add Organisation, please try again"
          />
        </Modal>
      )}
    </div>
  );
}

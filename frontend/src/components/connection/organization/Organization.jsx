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
} from "../../../actions/productActions";

export default function Organization(props) {
  const { t } = useTranslation();

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
    let states = await fetchStateByCountry(country.id);
    setAllStates(states.data);
  }

  async function getAllCities(state) {
    let cities = await fetchCitiesByState(state.id);
    setAllCities(cities.data);
  }

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    region: "Americas",
    country: "Costa Rica",
    state: "",
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="account-form-container"
        >
          <hgroup className="form-headers">
            <h1 className="vl-heading f-700 vl-black">{t("org_detail")}</h1>
            <h2 className="vl-subheading f-400 vl-grey-xs vl-line-sm">
              {t("org_detail_msg")}
            </h2>
          </hgroup>
          <section className="vl-input-group form-auto-fill-section">
            {/* <div className="input-two-column">
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
												label={t("region")}
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
												label={t("country")}
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
                error={Boolean(errors.firstName)}
                helperText={errors.firstName && "First Name is required!"}
                // disabled
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
                error={Boolean(errors.lastName)}
                helperText={errors.lastName && "Last Name is required!"}
                InputProps={{
                  readOnly: true,
                }}
                style={{ textAlign: "left" }}
              />
            </div>
            <div className="input-two-column">
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
            <div className="input-two-column">
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
            </div>
            <div className="input-single-column">
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
            <button
              type="submit"
              className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
            >
              {t("register")}
            </button>
          </section>
        </form>
      </div>
    </section>
  );
}

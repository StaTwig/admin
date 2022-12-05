import React, { useEffect } from "react";
import "./Filterbar.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Autocomplete, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { getCitiesAndOrgsForFilters } from "../../../actions/lastMileActions";

function valuetext(value) {
	return `${value}°C`;
}

export default function Filterbar(props) {
	const { setFilters, t } = props;

	const [cities, setCities] = useState([""]);
	const [organisations, setOrgnisations] = useState([""]);
	const [ageType, setAgeType] = useState("range");

	const [ageRange, setAgeRange] = useState([0, 100]);
	const [gender, setGender] = useState();
	const [city, setCity] = useState();
	const [organisation, setOrganisation] = useState();

	useEffect(() => {
		let data = {};
		if (ageRange && ageRange.length) {
			data.minAge = ageRange[0];
			data.maxAge = ageRange[1];
		}

		if (gender) {
			data.gender = gender;
		}

		if (city && city !== "") {
			data.city = city;
		}

		if (organisation && organisation !== "") {
			data.organisation = organisation;
		}

		setFilters(data);
	}, [gender, ageRange, city, organisation]);

	useEffect(async () => {
		try {
			let result = await getCitiesAndOrgsForFilters();
			if (result?.data?.success) {
				setCities(result.data.data.cities);
				setOrgnisations(result.data.data.organisations);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	const handleClear = (name) => {
		switch (name) {
			case "city": {
				setCity(null);
				break;
			}
			case "organisation": {
				setOrganisation(null);
				break;
			}
			case "gender": {
				setGender(null);
				break;
			}
			case "age": {
				setAgeType("range");
				setAgeRange([0, 100]);
				break;
			}
		}
	};

	const handleChange = (event, newValue) => {
		setAgeRange(newValue);
	};

	return (
		<section className="Filterbar--container">
			<div className="Filterbar--header">
				<h1 className="vl-subheading f-500 vl-black">{t("filter")}</h1>
			</div>
			<div className="Filterbar--body">
				<div className="Filterbar--filterCard">
					<div className="filterCard-header">
						<div className="filterCard-inner-header">
							<p className="vl-body f-500 vl-grey-md">{t("gender")}</p>
							<button onClick={() => handleClear("gender")} className="filter-clear-btn">
								{t("clear")}
							</button>
						</div>
						<p className="vl-note f-400 vl-grey-xs">{t("gender_msg")}</p>
					</div>
					<div className="filterCard-body side-space border-btm">
						<FormControl>
							<RadioGroup
								className="mui-custom-radio-group"
								name="radio-buttons-group"
								onClick={(event) => setGender(event.target.value)}
							>
								<FormControlLabel
                  name="gender"
									checked={gender === "MALE"}
									value="MALE"
									id="male"
									control={<Radio />}
									label={t("male")}
								/>
								<FormControlLabel
                  name="gender"
									checked={gender === "FEMALE"}
									value="FEMALE"
									id="female"
									control={<Radio />}
									label={t("female")}
								/>
								<FormControlLabel
                  name="gender"
									checked={gender === "GENERAL"}
									value="GENERAL"
									id="general"
									control={<Radio />}
									label={t("others")}
								/>
							</RadioGroup>
						</FormControl>
					</div>
				</div>

				<div className="Filterbar--filterCard">
					<div className="filterCard-header">
						<div className="filterCard-inner-header">
							<p className="vl-body f-500 vl-grey-md">{t("city")}</p>
							{/* <button onClick={() => handleClear("city")} className="filter-clear-btn">
								Clear
							</button> */}
						</div>
						<p className="vl-note f-400 vl-grey-xs">{t("city_msg")}</p>
					</div>
					<div className="filterCard-body border-btm">
						<Autocomplete
							disablePortal
							fullWidth
							options={cities}
							onChange={(event, value) => setCity(value)}
							value={city}
							renderInput={(params) => <TextField {...params} label="City" />}
						/>
					</div>
				</div>

				{props.user?.type === "GoverningBody" && (
					<div className="Filterbar--filterCard">
						<div className="filterCard-header">
							<div className="filterCard-inner-header">
								<p className="vl-body f-500 vl-grey-md">{t("organisation")}</p>
								{/* <button onClick={() => handleClear("organisation")} className="filter-clear-btn">
									Clear
								</button> */}
							</div>
							<p className="vl-note f-400 vl-grey-xs">{t("org_msg")}</p>
						</div>
						<div className="filterCard-body border-btm">
							<Autocomplete
								disablePortal
								fullWidth
								options={organisations}
								value={organisation}
								onChange={(event, value) => setOrganisation(value)}
								renderInput={(params) => <TextField {...params} label="Organization" />}
							/>
						</div>
					</div>
				)}

				<div className="Filterbar--filterCard">
					<div className="filterCard-header">
						<div className="filterCard-inner-header">
							<p className="vl-body f-500 vl-grey-md">{t("age")}</p>
							<button onClick={() => handleClear("age")} className="filter-clear-btn">
								{t("clear")}
							</button>
						</div>
						<p className="vl-note f-400 vl-grey-xs">Search the results by Organization Name</p>
					</div>
					<div className="filterCard-body side-space">
						<FormControl>
							<RadioGroup
								className="mui-custom-radio-group"
								defaultValue="range"
								name="radio-buttons-group"
								value={ageType}
								onClick={(event) => setAgeType(event.target.value)}
							>
								<FormControlLabel
									checked={ageType === "single"}
									value="single"
									control={<Radio />}
									label="Individual Age"
								/>
								<FormControlLabel
									checked={ageType === "range"}
									value="range"
									control={<Radio />}
									label="Range Group"
								/>
							</RadioGroup>
						</FormControl>
						{ageType === "range" ? (
							<div className="slider-select">
								<Slider
									getAriaLabel={() => "Temperature range"}
									value={ageRange}
									onChange={handleChange}
									valueLabelDisplay="auto"
									getAriaValueText={valuetext}
								/>
							</div>
						) : (
							<div className="filterCard-body border-btm">
								<TextField
									type="number"
									value={ageRange[0]}
									onChange={(event) => {
										let temp = event.target.value;
										setAgeRange([temp, temp]);
									}}
									InputProps={{
										inputProps: { min: 0, max: 120 },
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

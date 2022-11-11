import React from "react";
import { Select, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { vaccinateIndividual } from "../../../actions/lastMileActions";

export default function NewDose(props) {
	const { vaccineVialId, warehouseId, productId, batchNumber } = props;

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			gender: "MALE",
			age: 10,
		},
	});

	const newDose = async (values) => {
		try {
			const data = {
				vaccineVialId: vaccineVialId,
				warehouseId: warehouseId,
				productId: productId,
				batchNumber: batchNumber,
				...values,
			};

			// Call vaccinate api
			const result = await vaccinateIndividual(data);
			if (result.data.success) {
				props.newVaccination(result.data.data);
			} else {
        throw new Error(result.data.message);
      }
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="Beneficiary--Add-wrapper">
			<form onSubmit={handleSubmit(newDose)}>
				<div className="Beneficiary--Add-inner-wrapper">
					<h1 className="vl-subheading f-700 vl-grey-md">Beneficiary Details</h1>
					<div className="Add-form-space">
						<Controller
							name="gender"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Select label="Gender" {...field}>
									<MenuItem value={"MALE"}>Male</MenuItem>
									<MenuItem value={"FEMALE"}>Female</MenuItem>
									<MenuItem value={"GENERAL"}>General</MenuItem>
								</Select>
							)}
						/>
						<Controller
							name="age"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField fullWidth variant="outlined" label="Age" {...field} />
							)}
						/>
					</div>
					<div className="Beneficiary--action">
						<button type="submit" className="vl-btn vl-btn-md vl-btn-primary">
							Save
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}

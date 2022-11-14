import { Alert, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import "./ScanBatch.css";
import ScanImage from "../../../assets/files/designs/scan.jpg";
import { fetchBatch } from "../../../actions/lastMileActions";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function ScanBatch(props) {
	const { setBatchDetails, setSteps } = props;
	const [openAlert, setOpenAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const userLocation = useSelector((store) => store.userLocation);

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			batchNumber: "",
		},
	});

	const getBatchDetails = async (values) => {
		try {
			// Fetch batch details
			const data = {
				batchNumber: values.batchNumber,
				warehouseId: userLocation?.id ? userLocation.id : props.user.warehouseId[0],
			};
			const result = await fetchBatch(data);
			if (result?.data?.success === true) {
				setBatchDetails({ ...result.data.data[0], batchNumber: values.batchNumber });
				setSteps(2);
			} else {
				setErrorMessage(result?.data?.message);
				setOpenAlert(true);
			}
		} catch (err) {
			console.log(err);
			setErrorMessage("Batch not found!");
			setOpenAlert(true);
		}
	};

	const handleAlertClose = (event, reason) => {
		setErrorMessage("");
		if (reason === "clickaway") {
			return;
		}
		setOpenAlert(false);
	};

	return (
		<div className="ScanBatch--container">
			<form onSubmit={handleSubmit(getBatchDetails)}>
				<div className="ScanBatch--inner-wrapper">
					<div className="ScanBatch--Image-space">
						<img src={ScanImage} alt="ScanImage" />
					</div>
					<div className="ScanBatch--Batch-form">
						<h1 className="vl-subheading f-500 vl-black">Enter the Batch Number</h1>
						<Controller
							name="batchNumber"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField
									fullWidth
									variant="outlined"
									placeholder="XXXX XXXX XXXX"
									{...field}
									error={Boolean(errors.batchNumber)}
									helperText={errors.batchNumber && "Batch number is required!"}
								/>
							)}
						/>
						<div className="ScanBatch--action">
							<button type="submit" className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
								Continue
							</button>
						</div>
					</div>
				</div>
			</form>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={openAlert}
				autoHideDuration={6000}
				onClose={handleAlertClose}
			>
				<Alert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}

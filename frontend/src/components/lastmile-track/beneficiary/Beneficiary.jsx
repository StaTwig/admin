import React from "react";
import { useState } from "react";
import "./Beneficiary.css";
import AddImage from "../../../assets/files/designs/add.jpg";
import { useEffect } from "react";
import NewDose from "./NewDose";
import { getVaccinationDetailsByVial } from "../../../actions/lastMileActions";
import { useSelector } from "react-redux";

function ResultCard({ age, gender, variant }) {
	return (
		<div className={`Result-single-card result-variant-${variant}`}>
			<div className="more-action-btn">
				<i class="fa-solid fa-ellipsis-vertical"></i>
			</div>
			<div className="result-stats">
				<h1 className="vl-title f-700 vl-black">Age: {age}</h1>
				<h2 className="vl-subheading f-500 vl-black">Gender : {gender}</h2>
			</div>
		</div>
	);
}

export default function Beneficiary(props) {
	const { batchDetails } = props;

	const [LayoutType, setLayoutType] = useState(1);

	const [vialId, setVialId] = useState();
	const [doses, setDoses] = useState([]);

	const userLocation = useSelector((store) => store.userLocation);

	useEffect(async () => {
		if (LayoutType === 1 && vialId) {
			const result = await getVaccinationDetailsByVial(vialId);
			if (result?.data?.success) {
				setDoses(result.data.data[0].doses);
			} else {
				console.log("Error in fetching dose list - ", result.data.message);
			}
		}
	}, [LayoutType]);

	const newVaccination = async (result) => {
		if (!vialId) {
			setVialId(result.vaccineVialId);
		}
		setLayoutType(1);
	};

	return (
		<div className="Beneficiary--container">
			<div className="Beneficiary--inner-wrapper">
				<div className="Beneficiary--header">
					<h1 className="vl-subtitle f-700 vl-black">Register your Vaccination Details</h1>
					<button className="vl-btn vl-btn-sm vl-btn-primary" onClick={() => setLayoutType(2)}>
						<span>
							<i class="fa-solid fa-plus"></i>
						</span>{" "}
						Add Beneficary Detail
					</button>
				</div>
				<div className="Beneficiary--product">
					<div className="Beneficiary-product-card">
						<div className="Product-field-grid">
							<div className="field-header">
								<i class="fa-solid fa-vial-circle-check"></i>
								<p className="vl-body f-500 vl-blue">Product Name :</p>
							</div>
							<p className="vl-body f-500 vl-blue">{batchDetails.product.name}</p>
						</div>
						<div className="Product-field-grid">
							<div className="field-header">
								<i class="fa-solid fa-building"></i>
								<p className="vl-body f-500 vl-blue">Manufacturer Name :</p>
							</div>
							<p className="vl-body f-500 vl-blue">{batchDetails.product.manufacturer}</p>
						</div>
						<div className="batch-number">
							<p className="vl-note batch-number-label f-500">
								Batch No : {batchDetails?.batchNumber}
							</p>
						</div>
					</div>
				</div>
				<div className="Beneficiary--body">
					{LayoutType === 1 ? (
						doses.length === 0 ? (
							<section className="Beneficiary--Empty-wrapper">
								<div className="Beneficiary--Image-space">
									<img src={AddImage} alt="ScanImage" />
								</div>
								<h1 className="vl-note f-500 vl-black">
									Vaccinated List is Empty, Please Click Add button to Add the Details
								</h1>
							</section>
						) : (
							<section className="Beneficiary--Result-wrapper">
								<div className="Beneficiary--Result-inner-wrapper">
									<div className="Result-header">
										<div className="Result-title-space">
											<h1 className="vl-subheading f-700 vl-grey-md">Vaccinated Overview</h1>
											<p className="vl-body card-number-label f-700">
												{doses?.length ? doses.length : 0}
											</p>
										</div>
										<button
											className="vl-btn vl-btn-sm vl-btn-primary"
											onClick={props.completeVaccination}
										>
											Complete
										</button>
									</div>
									<div className="Result-body">
										{doses.map((dose) => (
											<ResultCard variant="1" age={dose.age} gender={dose.gender} />
										))}
									</div>
								</div>
							</section>
						)
					) : null}

					{LayoutType === 2 && (
						<NewDose
							vaccineVialId={vialId}
							warehouseId={userLocation ? userLocation.id : props?.user?.warehouseId[0]}
							productId={batchDetails.product.id}
							batchNumber={batchDetails?.batchNumber}
							newVaccination={newVaccination}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

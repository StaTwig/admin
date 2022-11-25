import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AnalyticsCard from "../../../common/AnalyticsCard/AnalyticsCard";
import OrgHeader from "../../../shared/Header/OrgHeader/OrgHeader";
import "./ProductList.css";
import ProductTable from "./ProductTable/ProductTable";
import Modal from "../../../../shared/modal";
import SuccessPopup from "../../../shared/Popup/SuccessPopup";
import { useSelector, useDispatch } from "react-redux";
import { getOrgAnalytics } from "../../../actions/organisationActions";
import { addNewProduct, getManufacturers, getProducts } from "../../../../actions/poActions";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createFilterOptions } from "@material-ui/lab";

const filter = createFilterOptions();

export default function AdminProductList(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	if (props.user.role !== "admin") {
		history.push("/overview");
	}
	const [manufacturers, setManufacturers] = useState([]);
	const [categories, setCategories] = useState([]);
	const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
	const [openFailurePopup, setOpenFailurePopup] = useState(false);

	const { orgAnalytics } = useSelector((state) => state.organisationReducer);
	const { totalCount, activeCount, inactiveCount } = orgAnalytics;

	const {
		control,
		reset,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm({
		productCategory: "",
		productName: "",
		manufacturer: "",
		unitOfMeasure: "",
	});

	useEffect(() => {
		dispatch(getOrgAnalytics());
	}, [dispatch]);

	useEffect(() => {
		async function fetchData() {
			const manufacturerResult = await getManufacturers();
			setManufacturers(manufacturerResult);
			const result = await getProducts();
			const categoryArray = result.map((product) => product.type);
			setCategories(
				categoryArray
					.filter((value, index, self) => self.indexOf(value) === index)
					.map((item) => {
						return item;
					}),
			);
		}
		fetchData();
	}, []);

	async function addProduct(values) {
		try {
			const formData = new FormData();
			formData.append("name", values.productName);
			formData.append("shortName", values.productName);
			formData.append("type", values.productCategory);
			formData.append("externalId", Math.random().toString(36).substr(2, 7));
			formData.append(
				"unitofMeasure",
				JSON.stringify({
					id: values.unitOfMeasure,
					name: values.unitOfMeasure,
				}),
			);
			formData.append("manufacturer", values.manufacturer);
			const res = await addNewProduct(formData);
			if (res.success) {
				setOpenSuccessPopup(true);
				console.log("Calling reset!");
				reset({
					productName: "",
					unitOfMeasure: "",
				});
				console.log("watch - ", watch());
			} else setOpenFailurePopup(true);
		} catch (Err) {
			setOpenFailurePopup(true);
			console.log(Err);
		}
	}

	const closeModal = () => {
		setOpenSuccessPopup(false);
		setOpenFailurePopup(false);
	};

	return (
		<>
			<OrgHeader />
			<section className="admin-page-layout">
				<div className="admin-container">
					<div className="admin-organization-container admin-section-space">
						<div className="tiles-three-column-layout">
							<AnalyticsCard
								layout="type4"
								icon="fa-building"
								value={totalCount}
								valueTitle={t("to_no_of_org")}
								bgColor="analytic-bg-1"
								textColor="analytic-text-1"
							/>
							<AnalyticsCard
								layout="type4"
								icon="fa-building"
								value={activeCount}
								valueTitle={t("active_org")}
								bgColor="analytic-bg-2"
								textColor="analytic-text-2"
							/>
							<AnalyticsCard
								layout="type4"
								icon="fa-building"
								value={inactiveCount}
								valueTitle={t("inactive_org")}
								bgColor="analytic-bg-3"
								textColor="analytic-text-3"
							/>
						</div>
						<div className="product-list-two-column">
							<ProductTable t={t} productAdded={openSuccessPopup} />
							<div className="add-product-container">
								<form onSubmit={handleSubmit(addProduct)}>
									<div className="add-product-card">
										<Controller
											name="productCategory"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<Autocomplete
													fullWidth
													freeSolo={true}
													options={categories}
													{...field}
													onChange={(event, value) => {
														field.onChange(value);
													}}
													filterOptions={(options, params) => {
														const filtered = filter(options, params);
														const { inputValue } = params;
														const isExisting = options.some((option) => inputValue === option);
														if (inputValue !== "" || !isExisting) {
															filtered.push(inputValue);
														}
														return filtered;
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label={t("product_category")}
															error={Boolean(errors.productCategory)}
															helperText={errors.productCategory && "Product Category is required!"}
														/>
													)}
												/>
											)}
										/>
										<Controller
											name="productName"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<TextField
													fullWidth
													variant="outlined"
													label={t("product_name")}
													multiline
													{...field}
													error={Boolean(errors.productName)}
													helperText={errors.productName && "Product Name is required!"}
												/>
											)}
										/>
										<Controller
											name="manufacturer"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<Autocomplete
													fullWidth
													options={manufacturers}
													{...field}
													onChange={(event, value) => {
														field.onChange(value);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label={t("manufacturer")}
															error={Boolean(errors.manufacturer)}
															helperText={errors.manufacturer && "Manufacturer is required!"}
														/>
													)}
												/>
											)}
										/>
										<Controller
											name="unitOfMeasure"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<TextField
													fullWidth
													variant="outlined"
													label={t("unit_of_measure")}
													multiline
													{...field}
													error={Boolean(errors.unitOfMeasure)}
													helperText={errors.unitOfMeasure && "Unit Of Measure is required!"}
												/>
											)}
										/>
										<button type="submit" className="vl-btn vl-btn-md vl-btn-full vl-btn-primary">
											{t("add_new_product")}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			{openSuccessPopup && (
				<Modal
					close={() => closeModal()}
					size="modal-sm" //for other size's use `modal-lg, modal-md, modal-sm`
				>
					<SuccessPopup
						onHide={closeModal}
						successMessage="Product added succesfully"
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
						errorMessage="Unable to Add product, please try again"
					/>
				</Modal>
			)}
		</>
	);
}

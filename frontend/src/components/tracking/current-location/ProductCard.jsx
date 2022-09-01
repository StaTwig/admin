import React, { useState } from "react";
import Chart from "react-apexcharts";

const ProductCard = ({ warehouse }) => {
	const [radialBarOptions, setRadialBarOptions] = useState({
		options: {
			stroke: {
				lineCap: "round",
			},
			colors: ["#FF872B"],
			plotOptions: {
				radialBar: {
					size: 50,
					inverseOrder: false,
					startAngle: 0,
					endAngle: 360,
					offsetX: 0,
					offsetY: 0,

					track: {
						show: true,
						startAngle: undefined,
						endAngle: undefined,
						background: "#eee",
						strokeWidth: "60%",
						opacity: 1,
						margin: 5,

						dropShadow: {
							enabled: false,
							top: 0,
							left: 0,
							blur: 3,
							opacity: 0.5,
						},
					},
					dataLabels: {
						show: true,
						name: {
							show: false,
							fontSize: "10px",
							fontFamily: undefined,
							color: undefined,
							offsetY: -10,
						},
						value: {
							show: true,
							fontSize: "12px",
							fontFamily: undefined,
							color: undefined,
							offsetY: 5,
							formatter: function (val) {
								return val + "%";
							},
						},
					},
				},
			},
		},

		sentSeries: [100],
		receivedSeries: [
			warehouse?.received
				? warehouse?.sent
					? ((warehouse?.received * 100) / warehouse?.sent).toFixed(2)
					: 100
				: 0,
		],

		fill: {
			colors: "#eeeeee",
			opacity: 0.9,
			type: "solid",
			gradient: {
				shade: "dark",
				type: "horizontal",
				shadeIntensity: 0.5,
				gradientToColors: "#eeeeee",
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 100],
				colorStops: [],
			},
		},
	});

	const productName = warehouse?.productName;
	const batch = warehouse?.batchNumber;
	const manufacturer = warehouse?.manufacturer;
	const label = warehouse?.label?.labelId;

	let mfgDate = warehouse?.productAttributes?.mfgDate
		? new Date(warehouse?.productAttributes?.mfgDate)
		: "N/A";
	if (mfgDate !== "N/A") {
		let mm = '0' + (mfgDate.getMonth() + 1);
		let yyyy = mfgDate.getFullYear();
		mfgDate = mm.slice(-2) + "/" + yyyy;
	}

	let expDate = warehouse?.productAttributes?.expDate
		? new Date(warehouse?.productAttributes?.expDate)
		: "N/A";
	if (expDate !== "N/A") {
		let mm = '0' + (expDate.getMonth() + 1);
		let yyyy = expDate.getFullYear();
		expDate = mm.slice(-2) + "/" + yyyy;
	}

	return (
		<>
			<div className="product-card-location">
				<ul className="product-details-list">
					<li className="product-list-card">
						<div className="mi-flex-ac gap-1">
							<i className="fa-solid fa-prescription-bottle-medical color-green"></i>
							<p className="mi-body-sm f-500 mi-reset grey">Product Name</p>
						</div>
						<p className="mi-body-sm f-500 mi-reset color-blue">{productName}</p>
					</li>
					<li className="product-list-card">
						<div className="mi-flex-ac gap-1">
							<i className="fa-solid fa-building color-green"></i>
							<p className="mi-body-sm f-500 mi-reset grey">Manufacturer</p>
						</div>
						<p className="mi-body-sm f-500 mi-reset color-blue">{manufacturer}</p>
					</li>
					<li className="product-list-card">
						<div className="mi-flex-ac gap-1">
							<i className="fa-solid fa-clipboard-list color-green"></i>
							<p className="mi-body-sm f-500 mi-reset grey">Batch</p>
						</div>
						<p className="mi-body-sm f-500 mi-reset color-blue">{batch}</p>
					</li>
					<li className="product-list-card">
						<div className="mi-flex-ac gap-1">
							<i className="fa-solid fa-tag color-green"></i>
							<p className="mi-body-sm f-500 mi-reset grey">Label</p>
						</div>
						<p className="mi-body-sm f-500 mi-reset color-blue">{label}</p>
					</li>
					<li className="product-list-card">
						<div className="mi-flex-ac gap-1">
							<i className="fa-solid fa-tag color-green"></i>
							<p className="mi-body-sm f-500 mi-reset grey">Quantity</p>
						</div>
						<p className="mi-body-sm f-500 mi-reset color-blue">{`${warehouse?.stock} (${warehouse?.productInfo?.unitofMeasure?.name})`}</p>
					</li>
				</ul>
				{/* <div className="product-quantity-details">
					<div>
						<Chart
							options={radialBarOptions.options}
							series={radialBarOptions.sentSeries}
							type="radialBar"
							width="160"
						/>
						<div className="mi-flex-jc mi-input-xs">
							<i className="fa-solid fa-truck-moving mr-1 color-green"></i>
							Quantity Sent
						</div>
					</div>
					<div>
						<Chart
							options={radialBarOptions.options}
							series={radialBarOptions.receivedSeries}
							type="radialBar"
							width="160"
						/>
						<div className="mi-flex-jc mi-input-xs">
							<i className="fa-solid fa-truck-moving mr-1 color-green"></i>
							Quantity Received
						</div>
					</div>
				</div> */}
				<div className="product-date-details">
					<div className="date-container">
						<div className="date-header mi-flex-ac gap-1">
							<i className="fa-solid fa-calendar-days calender-icon white"></i>
							<p className="mi-body-xs f-500 mi-reset white ">Mfg Date</p>
						</div>
						<p className="mi-body-xs f-500 mi-reset white">{mfgDate}</p>
					</div>
					<div className="date-container">
						<div className="date-header mi-flex-ac gap-1">
							<i className="fa-solid fa-calendar-days calender-icon white"></i>
							<p className="mi-body-xs f-500 mi-reset white ">Exp Date</p>
						</div>
						<p className="mi-body-xs f-500 mi-reset white">{expDate}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;

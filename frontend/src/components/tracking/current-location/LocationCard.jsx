import React from "react";
import ProductCard from "./ProductCard";

const TrackLocationCard = ({ currentLocation, t }) => {

	const warehouse = currentLocation[0];

	console.log(warehouse);

	return warehouse ? (
		<>
			<div className="current-location-container">
				<div className="current-location-header mi-flex-sb gap-2">
					<div className="header-content-space mi-flex-ac gap-2">
						<div className="current-location-icon-ctn">
							<i className="fa-solid fa-location-dot current-location-icon"></i>
						</div>
						<div className="header-text-space">
							<p className="mi-body-md f-500 mi-reset current-loc-org-name">
								{warehouse?.organisation?.name}
							</p>
							<p className="mi-body-sm mi-reset current-loc-address">
								{`${warehouse?.warehouse?.warehouseAddress?.firstLine} ${warehouse?.warehouse?.warehouseAddress?.city} ${warehouse?.warehouse?.warehouseAddress?.state} ${warehouse?.warehouse?.warehouseAddress?.zipCode} ${warehouse?.warehouse?.warehouseAddress?.country}`}
							</p>
						</div>
					</div>
					<div className="header-date-space">
						<p className="mi-body-sm mi-reset f-700 black">
							{new Date(warehouse?.updatdAt).toLocaleDateString()}
						</p>
					</div>
				</div>
				<div className="current-location-body">
					<p className="mi-body-md f-700 mi-reset black">{t("product_list")}</p>
					{currentLocation?.map((warehouse) => (
						<div className="product-list-area">
							<ProductCard warehouse={warehouse} />
						</div>
					))}
				</div>
			</div>
		</>
	) : (
		null
	);
};

export default TrackLocationCard;

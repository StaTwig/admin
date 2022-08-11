import React from "react";
import ChainGroup from "./ChainGroup";
import PoCard from "./PoCard";
import "./ChainofCustody.scss";
import TrackIllustration from "../../../assets/images/track.webp";

export default function ChainofCustody({ trackingData }) {
	const poDetails = trackingData?.poDetails;

	return trackingData ? (
		<div className="chain-of-custody-container">
			{poDetails && (
				<div
					className="chain-level-1"
					style={{ gridTemplateColumns: `0rem 1fr` }}
				>
					<div className="null-space"></div>
					<PoCard poDetails={poDetails} />
				</div>
			)}
			{trackingData?.trackedShipment?.map((element, index) => (
				<div
					key={index}
					className="chain-level-1"
					style={{ gridTemplateColumns: `${index * 1.5}rem 1fr` }}
				>
					<div className="null-space"></div>
					<ChainGroup shipmentData={element} />
				</div>
			))}
		</div>
	) : (
		<div className="tracking-illustation">
			<img src={TrackIllustration} alt="tracking" />
			<p className="mi-body-md f-500 grey mi-reset">
				Try search using your Tracking ID to track your Products/Shipment
			</p>
		</div>
	);
}

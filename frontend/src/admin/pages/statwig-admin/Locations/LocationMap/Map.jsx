import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, Polyline } from "@react-google-maps/api";
import blueStyles from "./data/BlueMap";
import greenPointer from "../../../../../assets/markers/green.png";
import bluePointer from "../../../../../assets/markers/blue.png";
import redPointer from "../../../../../assets/markers/red.png";

const pointers = [greenPointer, bluePointer, redPointer];

const containerStyle = {
	width: "100%",
	height: "100%",
	borderRadius: "1rem",
};

const options = {
	styles: blueStyles,
	disableDefaultUI: true,
	zoomControl: true,
	rotateControl: true,
	fullscreenControl: true,
};

export default function Map({ warehouses, trackingData, t }) {
	const [locationSelected, setLocationSelected] = useState(null);
	const [warehouseDetails, setWarehouseDetails] = useState(null);

	const India = {
		lat: 20.593683,
		lng: 78.962883,
	};

	const CostaRica = {
		lat: 9.7489,
		lng: -83.7534,
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
	});

	const lineSymbol = {
		path: "M 0,-1 0,1",
		strokeOpacity: 1,
		scale: 4,
	};

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={CostaRica} zoom={5} options={options}>
			{warehouses?.map((warehouse, index) => (
				<Marker
					position={{
						lat: warehouse?.location?.coordinates[0],
						lng: warehouse?.location?.coordinates[1],
					}}
					icon={{
						url: pointers[(index + 1) % 3],
						scaledSize: new window.google.maps.Size(30, 30),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(15, 15),
					}}
					onClick={() => {
						setLocationSelected({
							lat: warehouse?.location?.coordinates[0],
							lng: warehouse?.location?.coordinates[1],
						});
						setWarehouseDetails(warehouse);
					}}
				/>
			))}
			{locationSelected ? (
				<InfoWindow
					position={locationSelected}
					onCloseClick={() => {
						setLocationSelected(null);
						setWarehouseDetails(null);
					}}
				>
					<div className="info-popup-container">
						<div className="info-header">
							<div className="info-header-content">
								<i className="fa-solid fa-location-dot"></i>
								<p className="mi-body-sm f-500 mi-reset ">{warehouseDetails?.title}</p>
							</div>
						</div>
						<div className="info-body">
							<p className="mi-body-md f-500 mi-reset location-text-color">
								{`${warehouseDetails?.warehouseAddress?.firstLine}, ${warehouseDetails?.warehouseAddress?.city}`}
							</p>
						</div>
					</div>
				</InfoWindow>
			) : null}
		</GoogleMap>
	) : (
		<></>
	);
}

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";
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

export default function Map({ LocationTab, trackingData, t }) {
  const [locationClicked, setLocationClicked] = useState(null);
  const [ChainOfCustodySelected, setChainOfCustodySelected] = useState(null);
  const [CurrentLocationSelected, setCurrentLocationSelected] = useState(null);

  const chainOfCustody = trackingData?.trackedShipment;
  const currentLocationData = trackingData?.currentLocationData;

  useEffect(() => {
    setLocationClicked(null);
    setChainOfCustodySelected(null);
    setCurrentLocationSelected(null);
  }, [LocationTab]);

  const India = {
    lat: 20.593683,
    lng: 78.962883,
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={India}
      zoom={5}
      options={options}
    >
      <Marker
        position={{ lat: 20.593683, lng: 78.962883 }}
        icon={{
          url: pointers[0],
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

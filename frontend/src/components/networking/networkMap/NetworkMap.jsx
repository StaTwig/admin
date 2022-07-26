import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./NetworkMap.scss";

import mapStyles from "./data/mapStyles";
import ParksData from "./data/skateboard-parks.json";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 45.421532,
  lng: -75.697189,
};

const PointerDefault = {
  lat: 45.44905006153431,
  lng: -75.89244957349965,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  rotateControl: true,
  fullscreenControl: true,
};

export default function NetworkMap() {
  const [MapSelected, setMapSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={options}
    >
      <>
        <Marker
          position={PointerDefault}
          icon={{
            url: "/markers/defaultMap.gif",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        {ParksData?.featured?.map((park) =>
          park?.properties?.FACILITY_T === "flat" ? (
            <Marker
              key={park.properties.PARK_ID}
              position={{
                lat: park.geometry.coordinates[1],
                lng: park.geometry.coordinates[0],
              }}
              onClick={() => {
                setMapSelected(park);
              }}
              icon={{
                url: "/markers/loc1.png",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          ) : (
            <Marker
              key={park.properties.PARK_ID}
              position={{
                lat: park.geometry.coordinates[1],
                lng: park.geometry.coordinates[0],
              }}
              onClick={() => {
                setMapSelected(park);
              }}
              icon={{
                url: "/markers/loc2.png",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          )
        )}

        {MapSelected ? (
          <InfoWindow
            position={{
              lat: MapSelected.geometry.coordinates[1],
              lng: MapSelected.geometry.coordinates[0],
            }}
            onCloseClick={() => {
              setMapSelected(null);
            }}
          >
            <div className="info-popup-container">
              <div className="info-header">
                <div className="info-header-content">
                  <i class="fa-solid fa-map-location info-icon"></i>
                  <p className="mi-body-xl black f-700 mi-reset">
                    ABC Manufacturer
                  </p>
                </div>
              </div>
              <div className="info-body">
                <p className="mi-body-md black f-500  mi-reset">
                  Location Name placeholder
                </p>
                <p className="mi-body-sm black  mi-reset">
                  City Name placeholder
                </p>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

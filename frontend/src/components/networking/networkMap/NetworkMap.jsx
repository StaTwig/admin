import React, { useState } from "react";
import {useSelector} from "react-redux";
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

export default function NetworkMap({manufacturer}) {
  console.log('hey there')
  const {user} = useSelector((state) => state);
  const [MapSelected, setMapSelected] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      options={options}
    >
      <>
        {/* <Marker
          position={PointerDefault}
          icon={{
            url: "/markers/defaultMap.gif",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        /> */}
        {manufacturer?.warehouses?.map((park) =>
          park?.orgId === user.organisation?.split("/")[1] ? (
            <Marker
            key={park.warehouseId}
            position={{
              lat: parseFloat(park.location.latitude),
              lng: parseFloat(park.location.longitude),
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
              key={park.warehouseId}
              position={{
                lat: parseFloat(park.location.latitude),
                lng: parseFloat(park.location.longitude),
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
                lat: parseFloat(MapSelected.location.latitude),
                lng: parseFloat(MapSelected.location.longitude),
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
                    {MapSelected.orgName[0]}
                  </p>
                </div>
              </div>
              <div className="info-body">
                <p className="mi-body-md black f-500  mi-reset">
                {MapSelected.title}
                </p>
                <p className="mi-body-sm black  mi-reset">
                {MapSelected.city}
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

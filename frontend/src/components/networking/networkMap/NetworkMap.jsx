import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./NetworkMap.scss";
import BlueMap from "./data/BlueMap";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 45.421532,
  lng: -75.697189,
};

const options = {
  styles: BlueMap,
  disableDefaultUI: true,
  zoomControl: true,
  rotateControl: true,
  fullscreenControl: true,
};

export default function NetworkMap({
  manufacturer,
  reportWarehouse,
  setReportWarehouse,
}) {
  const { user } = useSelector((state) => state);
  const [MapSelected, setMapSelected] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
  });

  useEffect(() => {
    if (MapSelected) setReportWarehouse(MapSelected.warehouseId);
  }, [MapSelected]);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      options={options}
    >
      <>
        {manufacturer?.warehouses?.map((park) =>
          park?.orgId === user.organisation?.split("/")[1] ? (
            <Marker
              key={park.warehouseId}
              position={{
                lat: parseFloat(
                  Array.isArray(park?.location?.coordinates)
                    ? park?.location?.coordinates[0]
                    : park?.location?.latitude
                ),
                lng: parseFloat(
                  Array.isArray(park?.location?.coordinates)
                    ? park?.location?.coordinates[1]
                    : park?.location?.longitude
                ),
              }}
              onClick={() => {
                setMapSelected(park);
              }}
              onMouseEnter={() => setMapSelected(park)}
              onMouseLeave={() => setMapSelected(null)}
              icon={{
                url:
                  park.warehouseId === (reportWarehouse || user.warehouseId[0])
                    ? "/markers/loc3.png"
                    : "/markers/loc1.png",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          ) : (
            <Marker
              key={park.warehouseId}
              position={{
                lat: parseFloat(
                  Array.isArray(park?.location?.coordinates)
                    ? park?.location?.coordinates[0]
                    : park?.location?.latitude
                ),
                lng: parseFloat(
                  Array.isArray(park?.location?.coordinates)
                    ? park?.location?.coordinates[1]
                    : park?.location?.longitude
                ),
              }}
              onClick={() => {
                setMapSelected(park);
              }}
              onMouseEnter={() => setMapSelected(park)}
              onMouseLeave={() => setMapSelected(null)}
              icon={{
                url:
                  park.warehouseId === (reportWarehouse || user.warehouseId[0])
                    ? "/markers/loc3.png"
                    : "/markers/loc2.png",
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
              lat: parseFloat(MapSelected?.location?.coordinates[0]),
              lng: parseFloat(MapSelected?.location?.coordinates[1]),
            }}
            onCloseClick={() => {
              setMapSelected(null);
            }}
          >
            <div className="info-popup-container">
              <div className="info-header">
                <div className="info-header-content">
                  {MapSelected?.orgId === user.organisation?.split("/")[1] ? (
                    <i className="fa-solid fa-location-crosshairs info-icon"></i>
                  ) : (
                    <i className="fa-solid fa-map-location info-icon"></i>
                  )}

                  <p className="mi-body-xl black f-700 mi-reset">
                    {MapSelected?.orgName}
                  </p>
                </div>
              </div>
              <div className="info-body">
                <p className="mi-body-md black f-500  mi-reset">
                  {MapSelected.title}
                </p>
                <p className="mi-body-sm black  mi-reset">{MapSelected.city}</p>
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

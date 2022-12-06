import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript
} from "@react-google-maps/api";
import "./NetworkMap.scss";
import BlueMap from "./data/BlueMap";
import greenPointer from "../../../assets/markers/green.png";
import bluePointer from "../../../assets/markers/blue.png";
import redPointer from "../../../assets/markers/red.png";

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

  const [oms, setOms] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78"
  });

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
  // });

  React.useEffect(() => {
    console.log(selectedPlace, selectedMarker);
  }, [selectedPlace, selectedMarker]);


  useEffect(() => {
    if (MapSelected) setReportWarehouse(MapSelected.warehouseId);
  }, [MapSelected]);
  const onLoad = (map) => {
    const oms = require(`npm-overlapping-marker-spiderfier/lib/oms.min`)
    var newOms = new oms.OverlappingMarkerSpiderfier(map, {
      markersWontMove: true, // we promise not to move any markers, allowing optimizations
      markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
      basicFormatEvents: true // allow the library to skip calculating advanced formatting information
    });
    setOms(newOms);
  };

  const markerClickHandler = (event, place, marker) => {
    setSelectedMarker(marker);
    setSelectedPlace(place);
    setMapSelected(place);
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={onLoad}
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
              onLoad={(marker) => {
                oms.addMarker(marker);
                window.google.maps.event.addListener(
                  marker,
                  "spider_click",
                  (e) => {
                    markerClickHandler(e, park, marker);
                  }
                );
              }}
              // onClick={() => {
              //   setMapSelected(park);
              // }}
              // onMouseEnter={() => setMapSelected(park)}
              // onMouseLeave={() => setMapSelected(null)}
              icon={{
                url:
                  park.warehouseId === (reportWarehouse || user.warehouseId[0])
                    ? redPointer
                    : greenPointer,
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
              onLoad={(marker) => {
                oms.addMarker(marker);
                window.google.maps.event.addListener(
                  marker,
                  "spider_click",
                  (e) => {
                    markerClickHandler(e, park, marker);
                  }
                );
              }}
              // onClick={() => {
              //   setMapSelected(park);
              // }}
              // onMouseEnter={() => setMapSelected(park)}
              // onMouseLeave={() => setMapSelected(null)}
              icon={{
                url:
                  park.warehouseId === (reportWarehouse || user.warehouseId[0])
                    ? redPointer
                    : bluePointer,
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
            <div className='info-popup-container'>
              <div className='info-header'>
                <div className='info-header-content'>
                  {MapSelected?.orgId === user.organisation?.split("/")[1] ? (
                    <i className='fa-solid fa-location-crosshairs info-icon'></i>
                  ) : (
                    <i className='fa-solid fa-map-location info-icon'></i>
                  )}

                  <p className='mi-body-xl black f-700 mi-reset'>
                    {MapSelected?.orgName}
                  </p>
                </div>
              </div>
              <div className='info-body'>
                <p className='mi-body-md black f-500  mi-reset'>
                  {MapSelected.title}
                </p>
                <p className='mi-body-sm black  mi-reset'>{MapSelected.city}</p>
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

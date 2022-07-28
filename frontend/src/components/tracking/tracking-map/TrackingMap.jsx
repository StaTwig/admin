import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";

import mapStyles from "./data/mapStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  rotateControl: true,
  fullscreenControl: true,
};

export default function TrackingMap() {
  const [MapSelected, setMapSelected] = useState(null);

  const Hyderabad = {
    lat: 17.385044,
    lng: 78.486671,
  };

  const Dindigul = {
    lat: 10.367312,
    lng: 77.980293,
  };

  const Delhi = {
    lat: 28.70406,
    lng: 77.102493,
  };

  const mumbai = {
    lat: 19.075983,
    lng: 72.877655,
  };

  const India = {
    lat: 20.593683,
    lng: 78.962883,
  };

  const AtoB = [
    {
      lat: 28.70406,
      lng: 77.102493,
    },
    {
      lat: 17.385044,
      lng: 78.486671,
    },
  ];

  const BtoC = [
    {
      lat: 10.367312,
      lng: 77.980293,
    },
    {
      lat: 17.385044,
      lng: 78.486671,
    },
  ];

  const BtoD = [
    { lat: 17.385044, lng: 78.486671 },
    {
      lat: 19.075983,
      lng: 72.877655,
    },
  ];

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
      <>
        <Polyline
          path={AtoB}
          geodesic={true}
          options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0,
            strokeWeight: 5,
            icons: [
              {
                icon: lineSymbol,
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
        <Polyline
          path={BtoC}
          geodesic={true}
          options={{
            strokeOpacity: 0,
            strokeColor: "#0BC6A7",
            icons: [
              {
                icon: lineSymbol,
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
        <Polyline
          path={BtoD}
          geodesic={true}
          options={{
            strokeOpacity: 0,
            strokeColor: "#0BC6A7",
            icons: [
              {
                icon: lineSymbol,
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />

        <Marker
          position={Dindigul}
          onClick={() => {
            setMapSelected(Dindigul);
          }}
          icon={{
            url: "/markers/loc2.png",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        <Marker
          position={Hyderabad}
          onClick={() => {
            setMapSelected(Hyderabad);
          }}
          icon={{
            url: "/markers/loc1.png",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        <Marker
          position={Delhi}
          onClick={() => {
            setMapSelected(Delhi);
          }}
          icon={{
            url: "/markers/loc3.png",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        <Marker
          position={mumbai}
          onClick={() => {
            setMapSelected(mumbai);
          }}
          icon={{
            url: "/markers/loc2.png",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />

        {MapSelected ? (
          <InfoWindow
            position={MapSelected}
            onCloseClick={() => {
              setMapSelected(null);
            }}
          >
            <div className="info-popup-container">
              <div className="info-header">
                <div className="info-header-content">
                  <i class="fa-solid fa-location-dot"></i>

                  <p className="mi-body-md f-500 mi-reset location-text-color">
                    {MapSelected.lat === 28.70406
                      ? "Apollo Warehouse, Delhi"
                      : MapSelected.lat === 17.385044
                      ? "Apollo Warehouse, Hyderabad"
                      : MapSelected.lat === 19.075983
                      ? "Apollo Warehouse, Mumbai"
                      : "Apollo Warehouse, Dindigul"}
                  </p>
                </div>
              </div>
              <div className="info-body">
                <p className="mi-body-sm f-500 mi-reset header-text-color">
                  Product Details
                </p>
                <div className="product-details-list">
                  <div className="product-list-card map-card-design">
                    <p className="mi-body-sm f-500 mi-reset ">Paracetomal</p>
                    <p className="mi-body-sm f-500 mi-reset">
                      {MapSelected.lat === 28.70406
                        ? "1000"
                        : MapSelected.lat === 17.385044
                        ? "1000"
                        : MapSelected.lat === 19.075983
                        ? "400"
                        : "600"}
                      ( Packs )
                    </p>
                  </div>
                </div>
              </div>

              {MapSelected.lat === 17.385044 && (
                <div className="info-splited-location">
                  <p className="mi-body-sm f-500 mi-reset header-text-color">
                    Delivery Details
                  </p>
                  <div className="product-details-list">
                    <div className="product-list-card">
                      <p className="mi-body-xs f-500 mi-reset grey">
                        Apollo Warehouse, Mumbai
                      </p>
                      <p className="mi-body-xs f-500 mi-reset  grey">
                        400 ( Packs )
                      </p>
                    </div>
                    <div className="product-list-card">
                      <p className="mi-body-xs f-500 mi-reset grey">
                        Apollo Warehouse, Dindigul
                      </p>
                      <p className="mi-body-xs f-500 mi-reset  grey">
                        600 ( Packs )
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </InfoWindow>
        ) : null}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

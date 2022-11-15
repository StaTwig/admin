import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";
import blueStyles from "./data/BlueMap";
import greenPointer from "../../../assets/markers/green.png";
import bluePointer from "../../../assets/markers/blue.png";
import redPointer from "../../../assets/markers/red.png";

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

export default function TrackingMap({ LocationTab, trackingData, t }) {
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
      <>
        {LocationTab === "LOCATION"
          ? currentLocationData &&
            Object.keys(currentLocationData)?.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: currentLocationData[location][0]?.warehouse?.location
                    ?.coordinates[0],
                  lng: currentLocationData[location][0]?.warehouse?.location
                    ?.coordinates[1],
                }}
                onClick={() => {
                  setLocationClicked(location);
                  setChainOfCustodySelected(null);
                  setCurrentLocationSelected({
                    lat: currentLocationData[location][0]?.warehouse?.location
                      ?.coordinates[0],
                    lng: currentLocationData[location][0]?.warehouse?.location
                      ?.coordinates[1],
                  });
                }}
                icon={{
                  url: pointers[index % 3],
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
              />
            ))
          : chainOfCustody?.map((shipment, index) => (
              <div key={index}>
                {shipment?.supplier?.warehouse?.location?.coordinates
                  ?.length && (
                  <Marker
                    position={{
                      lat: shipment?.supplier?.warehouse?.location
                        ?.coordinates[0],
                      lng: shipment?.supplier?.warehouse?.location
                        ?.coordinates[1],
                    }}
                    onClick={() => {
                      let warehouse = shipment?.supplier?.warehouse;
                      let region = warehouse?.region?.regionName
                        ? ", " + warehouse?.region?.regionName
                        : warehouse?.region
                        ? ", " + warehouse?.region
                        : "";
                      let country = warehouse?.country?.countryName
                        ? ", " + warehouse?.country?.countryName
                        : warehouse?.country
                        ? ", " + warehouse?.country
                        : "";
                      let addr = `${warehouse?.warehouseAddress?.firstLine} ${country} ${region}`;
                      setLocationClicked({ index: index, address: addr });
                      setCurrentLocationSelected(null);
                      setChainOfCustodySelected({
                        lat: shipment?.supplier?.warehouse?.location
                          ?.coordinates[0],
                        lng: shipment?.supplier?.warehouse?.location
                          ?.coordinates[1],
                      });
                    }}
                    icon={{
                      url: pointers[index % 3],
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                  />
                )}
                {shipment?.receiver?.warehouse?.location?.coordinates
                  ?.length && (
                  <Marker
                    position={{
                      lat: shipment?.receiver?.warehouse?.location
                        ?.coordinates[0],
                      lng: shipment?.receiver?.warehouse?.location
                        ?.coordinates[1],
                    }}
                    onClick={() => {
                      let warehouse = shipment?.receiver?.warehouse;
                      let region = warehouse?.region?.regionName
                        ? ", " + warehouse?.region?.regionName
                        : warehouse?.region
                        ? ", " + warehouse?.region
                        : "";
                      let country = warehouse?.country?.countryName
                        ? ", " + warehouse?.country?.countryName
                        : warehouse?.country
                        ? ", " + warehouse?.country
                        : "";
                      let addr = `${warehouse?.warehouseAddress?.firstLine} ${country} ${region}`;
                      setLocationClicked({ index: index, address: addr });
                      setCurrentLocationSelected(null);
                      setChainOfCustodySelected({
                        lat: shipment?.receiver?.warehouse?.location
                          ?.coordinates[0],
                        lng: shipment?.receiver?.warehouse?.location
                          ?.coordinates[1],
                      });
                    }}
                    icon={{
                      url: pointers[index % 3],
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                  />
                )}
                {shipment?.receiver?.warehouse?.location?.coordinates?.length &&
                  shipment?.supplier?.warehouse?.location?.coordinates
                    ?.length && (
                    <Polyline
                      path={[
                        {
                          lat: shipment?.supplier?.warehouse?.location
                            ?.coordinates[0],
                          lng: shipment?.supplier?.warehouse?.location
                            ?.coordinates[1],
                        },
                        {
                          lat: shipment?.receiver?.warehouse?.location
                            ?.coordinates[0],
                          lng: shipment?.receiver?.warehouse?.location
                            ?.coordinates[1],
                        },
                      ]}
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
                  )}
              </div>
            ))}

        {CurrentLocationSelected ? (
          <InfoWindow
            position={CurrentLocationSelected}
            onCloseClick={() => {
              setCurrentLocationSelected(null);
            }}
          >
            <div className="info-popup-container">
              <div className="info-header">
                <div className="info-header-content">
                  <i className="fa-solid fa-location-dot"></i>

                  <p className="mi-body-md f-500 mi-reset location-text-color">
                    {`${currentLocationData[locationClicked][0]?.warehouse?.warehouseAddress?.firstLine}, ${currentLocationData[locationClicked][0]?.warehouse?.warehouseAddress?.city}`}
                  </p>
                </div>
              </div>
              <div className="info-body">
                <p className="mi-body-sm f-500 mi-reset header-text-color">
                  {t("product_details")}
                </p>
                <div className="product-details-list">
                  {currentLocationData[locationClicked]?.map((product) => (
                    <div className="product-list-card map-card-design">
                      <p className="mi-body-sm f-500 mi-reset ">
                        {product?.productName}
                      </p>
                      <p className="mi-body-sm f-500 mi-reset">
                        {`${product?.productQuantity} ( ${product?.productInfo?.unitofMeasure?.name} )`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </InfoWindow>
        ) : null}

        {ChainOfCustodySelected ? (
          <InfoWindow
            position={ChainOfCustodySelected}
            onCloseClick={() => {
              setChainOfCustodySelected(null);
            }}
          >
            <div className="info-popup-container">
              <div className="info-header">
                <div className="info-header-content">
                  <i className="fa-solid fa-location-dot"></i>

                  <p className="mi-body-md f-500 mi-reset location-text-color">
                    {locationClicked?.address}
                  </p>
                </div>
              </div>
              <div className="info-body">
                <p className="mi-body-sm f-500 mi-reset header-text-color">
                  {t("product_details")}
                </p>
                {chainOfCustody[locationClicked.index]?.products?.map(
                  (product) => (
                    <div className="product-details-list">
                      <div className="product-list-card map-card-design">
                        <p className="mi-body-sm f-500 mi-reset ">
                          {product?.productName}
                        </p>
                        <p className="mi-body-sm f-500 mi-reset">
                          {`${product?.productQuantity} ( ${product?.unitofMeasure?.name} )`}
                        </p>
                      </div>
                    </div>
                  )
                )}
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

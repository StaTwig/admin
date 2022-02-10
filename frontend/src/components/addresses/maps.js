import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export function MapContainer(props) {

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});


  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    setShowingInfoWindow(true)

  }

  const onMapClicked = () => {
    if (!showingInfoWindow) return;
    setShowingInfoWindow(false);
    setActiveMarker(null);
  };

  const { lat, lng } = props;
  
  return (
    <>
      <Map
        google={props.google}
        zoom={14}
        initialCenter={{
          lat: lat,
          lng: lng,
        }}
        onClick={onMapClicked}
      >
        <Marker
          name={props.region || "current location"}
          position={{ lat, lng }}
          onClick={onMarkerClick}
        />

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}>
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>

    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
})(MapContainer);

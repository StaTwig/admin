import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const { lat, lng } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: lat,
          lng: lng,
        }}
      ></Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78",
})(MapContainer);

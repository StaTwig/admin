
import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    width: '95%',
    height: '90%',
    boxShadow: "0px 3px 10px #00000029",
    borderRadius: 10,
    background: "#FFFFFF 0% 0% no-repeat padding-box"
  }

 
 
export class MapContainer extends Component {
  render() {
   /*  var points = [
    { lat: 42.02, lng: -77.01 },
    { lat: 42.03, lng: -77.02 },
    { lat: 41.03, lng: -77.04 },
    { lat: 42.05, lng: -77.02 }
]
var bounds = new this.props.google.maps.LatLngBounds();
for (var i = 0; i < points.length; i++) {
  bounds.extend(points[i]);
} */
    return (
      <Map google={this.props.google} zoom={10}
 
        style = {style} 
            
        /*initialCenter={{
            lat: 42.02,
            lng: -77.01
        }}
        bounds={bounds}*/
 
      >
        {this.props.data.map((row, index) => {
          return row?.shipmentUpdates?.filter(s => s.status == 'RECEIVED').map((r, i) => {
            return (
              row?.receiver?.warehouse?.location?.latitude && row?.receiver?.warehouse?.location?.longitude ?
              <Marker
                title={row.receiver.warehouse.title}
                name={row.receiver.warehouse.warehouseAddress.city}
                position={{ lat: row.receiver.warehouse.location.latitude, lng: row.receiver.warehouse.location.longitude }} />
              : null)
            
          }
          )
        })}
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBLwFrIrQx_0UUAIaUwt6wfItNMIIvXJ78")
})(MapContainer)

import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';

const style = {
    width: '95%',
    height: '90%',
    boxShadow: "0px 3px 10px #00000029",
    borderRadius: 10,
    background: "#FFFFFF 0% 0% no-repeat padding-box"
  }

 
 
export class MapContainer extends Component {
  render() {
    var points = [];
    const { data } = this.props;
    data.forEach(s => {
      s?.shipmentUpdates?.filter(s => s.status == 'RECEIVED').forEach(rs => {
        if (s?.receiver?.warehouse?.location?.latitude && s?.receiver?.warehouse?.location?.longitude && s?.receiver?.warehouse?.location?.latitude != "0" && s?.receiver?.warehouse?.location?.longitude != "0")
          points.push({ lat: parseFloat(s?.receiver?.warehouse?.location?.latitude), lng: parseFloat(s?.receiver?.warehouse?.location?.longitude) });
      })
    });
    var bounds = new this.props.google.maps.LatLngBounds();
    // console.log(points);
    for (var i = 0; i < points.length; i++) 
      bounds.extend(points[i]);
    
    return (
      <Map google={this.props.google} zoom={5}
        style = {style} 
        center={{
            lat: points.length ? points[0].lat : 42.02,
            lng: points.length ? points[0].lng : -77.01
        }}
        // bounds={bounds}
      >
        <Polygon
          paths={points}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
        {this.props.data.map((row, index) => {
          return row?.shipmentUpdates?.filter(s => s.status == 'RECEIVED').map((r, i) => {
            return (
              row?.receiver?.warehouse?.location?.latitude && row?.receiver?.warehouse?.location?.longitude ?
              <Marker
                title={row.receiver.warehouse.title}
                  name={row.receiver.warehouse.warehouseAddress.city}
                  label={index}
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
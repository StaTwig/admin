import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import carboxyl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

carboxyl.accessToken =
  "pk.eyJ1IjoidGhyaW5ldGhyYSIsImEiOiJja2wzdDAwMWYwN3JuMm5uMTQxcjQyb2w2In0.XfGU-QlqlhgTpjm2I_Ye9Q";

const Map = (props) => {
  const { t, lang } = props;
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const colors = ["#a8a8a8", "#0194e9", "#fa7924", "#ffab1c"];
  const { warehouseLocation, warehouseArr, visible, shipment } = props;
  const markers = [];
  let newMarker;

  const user = useSelector((state) => {
    return state.user;
  });

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
  }

  const midPoint = (lat1, lon1, lat2, lon2) => {
    const dLon = toRad(lon2 - lon1);

    //convert to radians
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    lon1 = toRad(lon1);

    const Bx = Math.cos(lat2) * Math.cos(dLon);
    const By = Math.cos(lat2) * Math.sin(dLon);
    const lat3 = Math.atan2(
      Math.sin(lat1) + Math.sin(lat2),
      Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
    );
    const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

    return { lat: radians_to_degrees(lat3), long: radians_to_degrees(lon3) };
  };

  // Initialize map when component mounts
  useEffect(() => {
    let map = new carboxyl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: zoom,
    });

    if (warehouseLocation?.latitude) {
      map = new carboxyl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [
          parseFloat(warehouseLocation.longitude),
          parseFloat(warehouseLocation.latitude),
        ],
        zoom: 2,
      });
      setLng(warehouseLocation.longitude);
      setLat(parseFloat(warehouseLocation.latitude));
      const coords = [
        parseFloat(warehouseLocation.longitude),
        parseFloat(warehouseLocation.latitude),
      ];
      newMarker = new carboxyl.Marker().setLngLat(coords).addTo(map);
      markers.push(newMarker);
    }

    if (warehouseArr.length > 0) {
      warehouseArr.forEach((w, i) => {
        if (w.location?.latitude) {
          if (i === 0) {
            map = new carboxyl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/mapbox/light-v10",
              center: [
                parseFloat(w.location.longitude),
                parseFloat(w.location.latitude),
              ],
              zoom: 2,
            });
            setLng(parseFloat(w.location.longitude));
            setLat(parseFloat(w.location.latitude));
          }
          const coords = [
            parseFloat(w.location.longitude),
            parseFloat(w.location.latitude),
          ];
          let color = colors[Math.floor(Math.random() * 3) + 1];
          let options = { color: color };
          if (warehouseLocation) {
            options.color = colors[0];
            if (
              warehouseLocation.latitude === w.location.latitude &&
              warehouseLocation.longitude === w.location.longitude
            ) {
              options.color = colors[Math.floor(Math.random() * 3) + 1];
              options.scale = 2;
            }
          }

          newMarker = new carboxyl.Marker(options).setLngLat(coords).addTo(map);
          markers.push(newMarker);
        }
      });
    }

    if (visible && shipment?.supplier !== undefined) {
      var geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              properties: {},
              coordinates: [
                [
                  parseFloat(
                    shipment?.receiver?.warehouse?.location?.longitude
                  ),
                  parseFloat(shipment?.receiver?.warehouse?.location?.latitude),
                ],
                [
                  parseFloat(
                    shipment?.supplier?.warehouse?.location?.longitude
                  ),
                  parseFloat(shipment?.supplier?.warehouse?.location?.latitude),
                ],
              ],
            },
          },
        ],
      };

      map.on("load", function () {
        map.addSource("LineString", {
          type: "geojson",
          data: geojson,
        });

        map.addLayer({
          id: "LineString",
          type: "line",
          source: "LineString",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#BF93E4",
            "line-width": 5,
          },
        });
      });

      newMarker = new carboxyl.Marker()
        .setLngLat([
          parseFloat(shipment?.receiver?.warehouse?.location?.longitude),
          parseFloat(shipment?.receiver?.warehouse?.location?.latitude),
        ])
        .addTo(map);
      markers.push(newMarker);
      newMarker = new carboxyl.Marker()
        .setLngLat([
          parseFloat(shipment?.supplier?.warehouse?.location?.longitude),
          parseFloat(shipment?.supplier?.warehouse?.location?.latitude),
        ])
        .addTo(map);
      markers.push(newMarker);

      let popL = midPoint(
        parseFloat(shipment?.receiver?.warehouse?.location?.latitude),
        parseFloat(shipment?.receiver?.warehouse?.location?.longitude),
        parseFloat(shipment?.supplier?.warehouse?.location?.latitude),
        parseFloat(shipment?.supplier?.warehouse?.location?.longitude)
      );
      setLng(popL.long);
      setLat(popL.lat);
      new carboxyl.Popup({
        offset: 25,
        className: "popUp",
        closeOnClick: false,
      })
        .setLngLat([popL.long, popL.lat])
        .setHTML(
          `<div class="pt-1 text-white pb-1 pl-2 pr-2">
              <div class="row"><span class="col-7 disabled">${t(
                "shipment_id"
              )}:</span> <span class=" col-3 font-weight-bold">${
            shipment.id
          }</span></div>
              <div class="row"> <span class="col-5 disabled text-decoration-underline"> ${
                user?.walletAddress
              }</span> </div>
              <div class="row pt-1 pb-1">
                <div class="col-1"> </div> 
                <div class="col-2 disabled">${t("from")}:</div> 
                <div class="col">
                  <div class="font-weight-bold">${
                    shipment.supplier.org.name
                  } </div>
                  <div class="disabled">${
                    shipment.supplier?.warehouse?.warehouseAddress?.city
                  }</div>
                </div>
              </div>
              <div class="row pt-1 pb-1">
                <div class="col-1"> </div>
                <div class="col-2 disabled">${t("to")}:</div>
                <div class="col">
                  <div class="font-weight-bold">${
                    shipment.receiver.org.name
                  }</div>
                  <div class="disabled">${
                    shipment.receiver?.warehouse?.warehouseAddress?.city
                  }</div>
                </div>
              </div>
            </div>`
        )
        .addTo(map);
    }

    map.addControl(new carboxyl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    const language = new MapboxLanguage({ defaultLanguage: lang });
    map.addControl(language);
    return () => map.remove();
  }, [props]);

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;

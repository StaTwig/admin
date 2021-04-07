import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGhyaW5ldGhyYSIsImEiOiJja2wzdDAwMWYwN3JuMm5uMTQxcjQyb2w2In0.XfGU-QlqlhgTpjm2I_Ye9Q';

const Map = (props) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const colors = ['#a8a8a8', '#0194e9', '#fa7924', '#ffab1c']

  // Initialize map when component mounts
  useEffect(() => {
    let map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom:  zoom
    });
    if(props?.warehouseLocation) {
      map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ props.warehouseLocation.latitude, props.warehouseLocation.longitude],
        zoom: 10
      });
      const coords = [props.warehouseLocation.latitude, props.warehouseLocation.longitude];
      new mapboxgl.Marker().setLngLat(coords).addTo(map);
    }
    if (props?.warehouseArr.length > 0) {
      props?.warehouseArr.forEach((w, i) => {
        if (i === 0) {
          map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [w.location.latitude, w.location.longitude],
            zoom: 10
          });
        }
        const coords = [w.location.latitude, w.location.longitude];
        new mapboxgl.Marker({ color: colors[Math.floor(Math.random() * 3) + 1] }).setLngLat(coords).addTo(map);
      });
    }

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

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
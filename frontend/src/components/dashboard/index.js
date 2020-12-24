import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapView from './MapView';


const DashBoard = (props) => {
    return(
         <div className="dashboard">
          <h1 className="breadcrumb">DASH BOARD </h1>
           <MapView/>
        </div>
    )
}

export default DashBoard;
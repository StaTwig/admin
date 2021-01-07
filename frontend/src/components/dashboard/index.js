import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import MapView from './maps/MapView';
import Tabs from './dashboardtabs/tabs';


const DashBoard = (props) => {
    const [visible, setVisible] = useState(false)
    return(
        <div>
         <div className="dashboard">
          <h1 className="breadcrumb dash">DASHBOARD </h1>
     <div><Tabs {...props} visible={visible} setVisible = {setVisible}/></div>
    </div>
    <div className="panel"><MapView/></div>
   </div>
    )
}

export default DashBoard;
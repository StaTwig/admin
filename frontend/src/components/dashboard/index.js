import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Map from '../Map';
import Tabs from './dashboardtabs/tabs';
import { isAuthenticated } from "../../utils/commonHelper";

const DashBoard = props => {
  const { warehouses, warehouseArr, warehouseLocation, shipment, shipmentIds, visible } = props;
  const [warehouseText, setWarehouseText] = useState('');
  const [refArr, setRefArr] = useState([]);

  if (!isAuthenticated('network')) props.history.push(`/profile`);

  const onWarehouseChange = v => {
    setWarehouseText(v);
    if (!visible) 
      setRefArr(warehouses?.filter(w => w.title ? (w.title.toLowerCase().includes(v.toLowerCase()) || w.id.toLowerCase().includes(v.toLowerCase())) : w.id.toLowerCase().includes(v.toLowerCase())));
    else
      setRefArr(shipmentIds?.filter(s => s.id.toLowerCase().includes(v.toLowerCase())));
  };

  return (
    <div className="dashboard">
      <div style={{position:"relative", top:"-22px", right:"25px"}}>
        <h1 className="breadcrumb dash">YOUR NETWORK </h1>
      </div>
      <div className="panel">
        <Map shipment={shipment} visible={visible} warehouseArr={warehouseArr} warehouseLocation={warehouseLocation} />
        <div className="">
          <Tabs
            {...props}
            warehouseText={warehouseText}
            setWarehouseText={setWarehouseText}
            filteredWareHouses={refArr}
            onWarehouseChange={onWarehouseChange}
            onSearchClick={(w) => props.onSearchClick(w)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

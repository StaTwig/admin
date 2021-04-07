import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Map from '../Map';
import Tabs from './dashboardtabs/tabs';

const DashBoard = props => {
  const [visible, setVisible] = useState(false);
  const [warehouseText, setWarehouseText] = useState('');
  const onWarehouseChange = v => {
    setWarehouseText(v);
  };
  const { warehouses, warehouseArr, warehouseLocation } = props;

  return (
    <div className="dashboard">
      <div >
        <h1 className="breadcrumb dash">YOUR NETWORK </h1>
      </div>
      <div className="panel">
        <Map warehouseArr={warehouseArr} warehouseLocation={warehouseLocation} />
        <div className="">
          <Tabs
            {...props}
            visible={visible}
            setVisible={setVisible}
            warehouseText={warehouseText}
            filteredWareHouses={warehouses?.filter(w => w.title.toLowerCase().includes(warehouseText.toLowerCase()))}
            onWarehouseChange={onWarehouseChange}
            onSearchClick={(w) => props.onSearchClick(w)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

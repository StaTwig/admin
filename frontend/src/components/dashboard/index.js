import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Map from '../Map';
import Tabs from './dashboardtabs/tabs';

const DashBoard = props => {
  const [visible, setVisible] = useState(false);
  const [warehouseText, setWarehouseText] = useState('');
  const onWarehouseChange = e => {
    setWarehouseText(e.target.value);
  };

  return (
    <div>
      <div className="dashboard">
        <h1 className="breadcrumb dash">DASHBOARD </h1>
        <div>
          <Tabs
            {...props}
            visible={visible}
            setVisible={setVisible}
            warehouseText={warehouseText}
            onWarehouseChange={onWarehouseChange}
            onSearchClick={() => props.onSearchClick(warehouseText)}
          />
        </div>
      </div>
      <div className="panel">
        <Map warehouseLocation={props.warehouseLocation} />
      </div>
    </div>
  );
};

export default DashBoard;
